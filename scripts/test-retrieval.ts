import { sokParagrafer } from "../lib/retrieval";

type TestFall = { fraga: string; forvantat: "svar" | "vet_inte"; kommentar: string };

const TESTFALL: TestFall[] = [
  // --- Borde ge svar (frågan ligger inom 1 kap. 1 § / 2 kap.) ---
  {
    fraga: "Vad innebär försiktighetsprincipen i miljöbalken?",
    forvantat: "svar",
    kommentar: "Direkt träff mot 2 kap. 3 §",
  },
  {
    fraga: "Måste vi byta till en mindre farlig kemikalie om det finns ett alternativ?",
    forvantat: "svar",
    kommentar: "Produktvalsprincipen, 2 kap. 4 §",
  },
  {
    fraga: "Vilken kunskap måste en verksamhetsutövare skaffa sig enligt miljöbalken?",
    forvantat: "svar",
    kommentar: "Kunskapskravet, 2 kap. 2 §",
  },
  {
    fraga: "Vad är miljöbalkens övergripande syfte och mål?",
    forvantat: "svar",
    kommentar: "Portalparagrafen, 1 kap. 1 §",
  },
  {
    fraga: "Hur görs en rimlighetsavvägning mellan nytta och kostnad för skyddsåtgärder?",
    forvantat: "svar",
    kommentar: "Rimlighetsavvägning, 2 kap. 7 §",
  },
  {
    fraga: "Vad räknas som miljöfarlig verksamhet enligt miljöbalken?",
    forvantat: "svar",
    kommentar: "Definition, 9 kap. 1 §",
  },
  {
    fraga: "Krävs tillstånd eller anmälan för att driva miljöfarlig verksamhet?",
    forvantat: "svar",
    kommentar: "Tillstånds- och anmälningsplikt, 9 kap. 6 §",
  },
  {
    fraga: "Behöver vi anmäla eller söka tillstånd för vår verksamhet?",
    forvantat: "svar",
    kommentar: "Nu inom underlaget tack vare 9 kap. 6 § — flyttad hit från vet_inte-listan",
  },
  // --- Borde INTE ge svar (ligger utanför pilotens kapitel) ---
  {
    fraga: "Vilka regler gäller för oljeavskiljare i en bilverkstad?",
    forvantat: "vet_inte",
    kommentar: "Kräver förordningen om miljöfarlig verksamhet (SFS 1998:899), inte Miljöbalken själv",
  },
  {
    fraga: "Vad räknas som farligt avfall och hur ska det hanteras?",
    forvantat: "vet_inte",
    kommentar: "Kräver 15 kap. (avfall) — inte inlagt än",
  },
  {
    fraga: "Vilket bötesbelopp riskerar man vid miljöbrott?",
    forvantat: "vet_inte",
    kommentar: "Kräver 29 kap. (straffbestämmelser) — inte inlagt än",
  },
  {
    fraga: "Hur fungerar strandskydd vid en sjö?",
    forvantat: "vet_inte",
    kommentar: "Kräver 7 kap. (skydd av områden) — inte inlagt än",
  },
];

let godkanda = 0;

for (const fall of TESTFALL) {
  const traffar = sokParagrafer(fall.fraga);
  const utfall: "svar" | "vet_inte" = traffar.length > 0 ? "svar" : "vet_inte";
  const ok = utfall === fall.forvantat;
  godkanda += ok ? 1 : 0;

  console.log(
    `${ok ? "OK  " : "FEL "} [${fall.forvantat.padEnd(9)}→${utfall.padEnd(9)}] ${fall.fraga}`
  );
  console.log(`     (${fall.kommentar})`);
  if (traffar.length > 0) {
    for (const t of traffar) {
      console.log(
        `       - ${t.paragraf.kapitel} kap. ${t.paragraf.paragraf} (${t.paragraf.avsnittsrubrik ?? t.paragraf.kapitelRubrik}), poäng=${t.poang.toFixed(2)}`
      );
    }
  }
  console.log("");
}

console.log(`Resultat: ${godkanda}/${TESTFALL.length} testfall gav förväntat utfall.`);
if (godkanda < TESTFALL.length) process.exitCode = 1;
