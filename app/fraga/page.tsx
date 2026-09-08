"use client";

import { useState } from "react";

type Kalla = { referens: string; rubrik: string; url: string };
type Svar = { svar: string; kallor: Kalla[]; osaker: boolean };

const EXEMPEL = [
  "Vi använder lösningsmedel i vår verkstad — vad behöver vi tänka på?",
  "Vad innebär försiktighetsprincipen i practical?",
  "Måste vi välja en mindre farlig kemikalie om ett alternativ finns?",
  "Vad är miljöbalkens övergripande syfte?",
];

function skapaRiksdagenUrl(kalla: Kalla): string {
  const kapitelMatch = kalla.referens.match(/(\d+)\s*kap/i);
  const paragrafMatch = kalla.referens.match(/(\d+)\s*§/);

  if (kapitelMatch && paragrafMatch) {
    const kapitel = kapitelMatch[1];
    const paragraf = paragrafMatch[1];
    return `https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/miljobalk-1998808_sfs-1998-808/#K${kapitel}P${paragraf}`;
  }

  return kalla.url;
}

export default function FragaPage() {
  const [fraga, setFraga] = useState("");
  const [laddar, setLaddar] = useState(false);
  const [resultat, setResultat] = useState<Svar | null>(null);
  const [fel, setFel] = useState<string | null>(null);

  async function skicka(text: string) {
    if (!text.trim()) return;
    setLaddar(true);
    setFel(null);
    setResultat(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fraga: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFel(data.fel ?? "Något gick fel.");
      } else {
        setResultat(data);
      }
    } catch {
      setFel("Kunde inte nå servern. Kontrollera din internetanslutning.");
    } finally {
      setLaddar(false);
    }
  }

  return (
    <>
      <section className="hero">
        <p className="hero-kicker">AI-FRÅGA · GEMINI FLASH · KÄLLBEGRÄNSAD</p>
        <h1>Fråga MiljöGuiden</h1>
        <p className="lede">
          Skriv din fråga med vanlig svenska. Svaret bygger uteslutande på
          lagtexten i pilotmängden (1, 2 och 9 kap. Miljöbalken) —
          MiljöGuiden hittar aldrig på paragrafer eller källor.
        </p>
      </section>

      <section className="ask-panel">
        <form
          className="ask-form"
          onSubmit={(e) => {
            e.preventDefault();
            skicka(fraga);
          }}
        >
          <textarea
            value={fraga}
            onChange={(e) => setFraga(e.target.value)}
            placeholder="T.ex. Vi driver en liten verkstad och använder lösningsmedel. Vad behöver vi tänka på ur miljösynpunkt?"
            aria-label="Din fråga"
          />
          <button type="submit" disabled={laddar}>
            {laddar ? "Söker i lagtexten…" : "Skicka fråga"}
          </button>
        </form>

        <div className="example-chips">
          {EXEMPEL.map((ex) => (
            <button key={ex} type="button" onClick={() => { setFraga(ex); skicka(ex); }}>
              {ex}
            </button>
          ))}
        </div>

        {fel && <div className="error-banner">{fel}</div>}

        {resultat && (
          <>
            {resultat.osaker && (
              <div className="uncertain-banner">
                MiljöGuiden hittar inte tillräckligt stöd i pilotdatan för
                att svara säkert på det här. Formulera gärna om frågan.
              </div>
            )}

            {!resultat.osaker && (
              <div className="answer-card">
                <h3>BEDÖMNING</h3>
                <div className="answer-body">{resultat.svar}</div>

                {resultat.kallor.length > 0 && (
                  <div className="answer-sources">
                    Källor:{" "}
                    {resultat.kallor.map((k, i) => (
                      <span key={k.referens}>
                        <a href={skapaRiksdagenUrl(k)} target="_blank" rel="noreferrer">
                          {k.referens} — {k.rubrik}
                        </a>
                        {i < resultat.kallor.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>

      <p className="legal-notice">
        MiljöGuiden Sverige är ett informations- och arbetsverktyg. Detta är
        vägledning, inte ett myndighetsbeslut. Vid osäkerhet ska aktuell
        lagtext och ansvarig myndighet eller domstol kontrolleras.
      </p>
    </>
  );
}
