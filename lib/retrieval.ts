import { PARAGRAFER, Paragraf } from "@/data/miljobalken";

// Svenska stoppord som inte ska räknas som sökträffar.
const STOPWORD = new Set([
  "och", "att", "det", "som", "för", "med", "eller", "är", "en", "ett",
  "vi", "vad", "vilka", "vilken", "gäller", "kan", "man", "om", "den",
  "de", "i", "på", "av", "till", "har", "sin", "sitt", "sina", "vår",
  "våra", "jag", "du", "hur", "ska", "skall", "inte", "finns",
  // Domänord som i praktiken förekommer i nästan varje fråga till just den
  // här appen ("...enligt miljöbalken?") men inte särskiljer paragrafer —
  // utan detta drar ordet "miljöbalken" oproportionerligt mycket poäng till
  // 1 kap. 1 §, eftersom det kapitlets rubrik och text råkar nämna lagens
  // eget namn flera gånger. Se scripts/test-retrieval.ts, testfall 1.
  "miljöbalken", "miljöbalk", "balken", "balk", "lagen", "regler", "regel",
]);

// Vanliga svenska böjningsändelser, längst först. Används för att jämföra
// ORDSTAMMAR istället för lösa delsträngar — se stam() nedan för varför.
const ANDELSER = [
  "heterna", "heter", "heten", "andet", "ande", "else", "orna", "erna",
  "arna", "ens", "are", "aren", "or", "ar", "er", "en", "et", "s", "a",
];

/**
 * Extremt enkel svensk stammare: klipper bort en känd böjningsändelse så
 * länge minst 4 tecken blir kvar. Inte lingvistiskt korrekt, men tillräckligt
 * för att "miljöbalken"/"miljöbalkens" och "kemikalie"/"kemikalier" ska
 * räknas som samma ord — utan den tidigare bugg där t.ex. "miljöbalken"
 * (frågeord) råkade matcha det fristående ordet "miljö" (som finns i
 * nästan alla paragrafer) bara för att det ena var en delsträng av det
 * andra. Vi jämför nu STAMMAR med likhet (===), inte lösa delsträngar.
 */
function stam(ord: string): string {
  for (const andelse of ANDELSER) {
    if (ord.length - andelse.length >= 4 && ord.endsWith(andelse)) {
      return ord.slice(0, -andelse.length);
    }
  }
  return ord;
}

function tokenisera(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zåäö0-9\s]/gi, " ")
    .split(/\s+/)
    .filter((ord) => ord.length > 2 && !STOPWORD.has(ord))
    .map(stam);
}

function paragrafTokens(p: Paragraf): string[] {
  // Underrubriken (t.ex. "Försiktighetsprincipen") är den mest träffsäkra
  // signalen som finns för en paragraf — den är i praktiken paragrafens
  // egen sammanfattning. Vi upprepar den några gånger så att den väger
  // tyngre än ord som bara råkar förekomma en gång i löptexten.
  const rubrikvikt = (p.avsnittsrubrik ? `${p.avsnittsrubrik} ` : "").repeat(4);
  return tokenisera(`${p.kapitelRubrik} ${rubrikvikt} ${p.text}`);
}

// Förberäkna tokens (stammar) per paragraf en gång.
const PARAGRAF_TOKENS = new Map<string, string[]>(
  PARAGRAFER.map((p) => [p.id, paragrafTokens(p)])
);

/**
 * IDF (invers dokumentfrekvens): ett ord som förekommer i nästan alla
 * paragrafer — t.ex. "verksamhet" eller "åtgärd", som är allmänjuridiskt
 * språk i hela kapitlet — ger nästan inget urskiljningsvärde och ska väga
 * lite. Ett ord som bara förekommer i en eller två paragrafer väger
 * desto tyngre. Räknas ut dynamiskt från datamängden, inte en hårdkodad
 * lista, så det uppdateras automatiskt när fler kapitel läggs till.
 */
function idf(stamOrd: string): number {
  let dokumentfrekvens = 0;
  for (const tokens of PARAGRAF_TOKENS.values()) {
    if (tokens.includes(stamOrd)) dokumentfrekvens++;
  }
  if (dokumentfrekvens === 0) return 0;
  return Math.log((PARAGRAFER.length + 1) / (dokumentfrekvens + 0.5));
}

export type Traff = { paragraf: Paragraf; poang: number };

/**
 * Rangordnar paragraferna efter ett IDF-viktat stam-överlapp med frågan,
 * och returnerar en TOM lista om underlaget är för svagt — det är den
 * listan som avgör om frågan över huvud taget skickas till AI:n (se
 * app/api/ask). Syftet är att hellre säga "jag vet inte" än att skicka en
 * löst matchad paragraf som underlag för ett svar som sedan låter säkert.
 *
 * minPoang och relativTroskel är medvetet konservativa. Se
 * scripts/test-retrieval.ts för hur de är verifierade, och justera dem
 * där innan du ändrar här.
 */
export function sokParagrafer(
  fraga: string,
  maxTraffar = 4,
  minPoang = 4.0,
  relativTroskel = 0.55
): Traff[] {
  const sokord = tokenisera(fraga);
  if (sokord.length === 0) return [];

  const idfPerOrd = new Map(sokord.map((ord) => [ord, idf(ord)]));

  const traffar: Traff[] = PARAGRAFER.map((p) => {
    const tokens = PARAGRAF_TOKENS.get(p.id) ?? [];
    let poang = 0;
    for (const ord of sokord) {
      const antalTraffar = tokens.filter((t) => t === ord).length;
      if (antalTraffar > 0) {
        poang += antalTraffar * (idfPerOrd.get(ord) ?? 0);
      }
    }
    return { paragraf: p, poang };
  });

  const bastaPoang = Math.max(0, ...traffar.map((t) => t.poang));

  // Underlaget är för svagt för att över huvud taget skicka till AI:n.
  if (bastaPoang < minPoang) return [];

  return traffar
    .filter((t) => t.poang > 0 && t.poang >= bastaPoang * relativTroskel)
    .sort((a, b) => b.poang - a.poang)
    .slice(0, maxTraffar);
}

export function fritextsok(query: string): Paragraf[] {
  const q = query.trim().toLowerCase();
  if (!q) return PARAGRAFER;
  return PARAGRAFER.filter(
    (p) =>
      p.text.toLowerCase().includes(q) ||
      p.avsnittsrubrik?.toLowerCase().includes(q) ||
      p.paragraf.toLowerCase().includes(q) ||
      p.kapitelRubrik.toLowerCase().includes(q)
  );
}
