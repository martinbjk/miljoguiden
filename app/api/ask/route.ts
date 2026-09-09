import { NextRequest, NextResponse } from "next/server";
import { sokParagrafer } from "@/lib/retrieval";
import { fragaGemini } from "@/lib/gemini";
import { KALLA } from "@/data/miljobalken";

export async function POST(req: NextRequest) {
  try {
    const { fraga } = await req.json();

    if (!fraga || typeof fraga !== "string" || fraga.trim().length < 3) {
      return NextResponse.json(
        { fel: "Skriv en fråga innan du skickar." },
        { status: 400 }
      );
    }

    const traffar = sokParagrafer(fraga);

    if (traffar.length === 0) {
      return NextResponse.json({
        svar:
          "Jag hittar inte tillräckligt stöd i de källor som hittills är inlagda (1 kap. 1 §, 2 kap. samt delar av 9 kap. Miljöbalken) för att svara på den här frågan. Prova att formulera om frågan, eller vänta tills fler kapitel har lagts till.",
        kallor: [],
        osaker: true,
      });
    }

    const kontext = traffar
      .map(
        (t) =>
          `[${t.paragraf.kapitel} kap. ${t.paragraf.paragraf}]${
            t.paragraf.avsnittsrubrik ? ` (${t.paragraf.avsnittsrubrik})` : ""
          }\n${t.paragraf.text}`
      )
      .join("\n\n---\n\n");

    const prompt = `Du är en juridisk vägledningsassistent för MiljöGuiden Sverige. Du får ENDAST använda lagtexten nedan som källa. Du får aldrig hitta på paragrafer, lagrum eller innehåll som inte finns i texten.

REGLER:
- Svara på vanlig, tydlig svenska.
- Varje sakpåstående ska kunna kopplas till en specifik paragraf i underlaget nedan. Ange paragrafen i formatet "(2 kap. 3 §)" direkt efter påståendet.
- Om underlaget inte räcker för att besvara frågan fullt ut, säg det uttryckligen och ange vad som saknas. Gissa aldrig.
- Presentera inte detta som en juridiskt bindande bedömning. Detta är vägledning, inte myndighetsbeslut.
- Om en paragraf bara bemyndigar regeringen eller en myndighet att meddela föreskrifter (t.ex. "Regeringen får meddela föreskrifter om...") utan att själv räkna upp de konkreta kraven, säg uttryckligen att de detaljerade kraven fastställs i en förordning eller föreskrift som inte ingår i detta underlag, och att den behöver kontrolleras separat.
- Var kortfattad och praktisk — sikta på 150-250 ord.

UNDERLAG (utdrag ur ${KALLA.lag}, ${KALLA.andradTom}):

${kontext}

FRÅGA FRÅN ANVÄNDAREN:
${fraga}

SVAR:`;

    const svar = await fragaGemini(prompt);

    return NextResponse.json({
      svar,
      kallor: traffar.map((t) => ({
        referens: `${t.paragraf.kapitel} kap. ${t.paragraf.paragraf}`,
        rubrik: t.paragraf.avsnittsrubrik ?? t.paragraf.kapitelRubrik,
        url: KALLA.url,
      })),
      osaker: false,
    });
  } catch (err) {
    console.error(err);
    const meddelande = err instanceof Error ? err.message : "Okänt fel.";
    return NextResponse.json({ fel: meddelande }, { status: 500 });
  }
}
