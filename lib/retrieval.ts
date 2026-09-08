import { PARAGRAFER, Paragraf } from "@/data/miljobalken";

// Svenska stoppord som inte ska räknas som sökträffar.
const STOPWORD = new Set([
  "och", "att", "det", "som", "för", "med", "eller", "är", "en", "ett",
  "vi", "vad", "vilka", "vilken", "gäller", "kan", "man", "om", "den",
  "de", "i", "på", "av", "till", "har", "sin", "sitt", "sina", "vår",
  "våra", "jag", "du", "hur", "ska", "skall", "inte", "finns",
]);

function tokenisera(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zåäö0-9\s]/gi, " ")
    .split(/\s+/)
    .filter((ord) => ord.length > 2 && !STOPWORD.has(ord));
}

export type Traff = { paragraf: Paragraf; poang: number };

/**
 * Rangordnar paragraferna efter hur många av frågans ord som förekommer
 * i paragrafens rubrik, underrubrik och löptext. Enkel men transparent —
 * ingen embedding-modell krävs för en så här liten datamängd. Byt gärna
 * ut mot pgvector + embeddings när fler kapitel läggs till (se README).
 */
export function sokParagrafer(fraga: string, maxTraffar = 4): Traff[] {
  const sokord = tokenisera(fraga);
  if (sokord.length === 0) return [];

  const traffar: Traff[] = PARAGRAFER.map((p) => {
    const innehall = tokenisera(
      `${p.kapitelRubrik} ${p.avsnittsrubrik ?? ""} ${p.text}`
    );
    let poang = 0;
    for (const ord of sokord) {
      poang += innehall.filter((i) => i.includes(ord) || ord.includes(i)).length;
    }
    return { paragraf: p, poang };
  });

  return traffar
    .filter((t) => t.poang > 0)
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
