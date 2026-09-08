"use client";

import { useMemo, useState } from "react";
import { PARAGRAFER, KALLA } from "@/data/miljobalken";
import { fritextsok } from "@/lib/retrieval";

export default function HemPage() {
  const [q, setQ] = useState("");

  const traffar = useMemo(() => fritextsok(q), [q]);

  return (
    <>
      <section className="hero">
        <p className="hero-kicker">MILJÖBALKEN (1998:808) · PILOTDATA</p>
        <h1>Hitta rätt miljöregel, med exakt källa.</h1>
        <p className="lede">
          Sök i 1 kap. 1 § och 2 kap. Miljöbalken — de allmänna
          hänsynsreglerna som gäller alla verksamheter, oavsett bransch.
          Varje resultat visar paragrafens fulla lydelse och länk till
          Sveriges riksdags officiella författningssamling.
        </p>

        <form
          className="searchbox"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Sök t.ex. försiktighetsprincipen, kunskapskrav, kemiska produkter…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Sök i lagtext"
          />
          <button type="submit">Sök</button>
        </form>
        <p className="demo-note">
          Vill du ställa en fråga i vanlig svenska istället? Prova{" "}
          <a href="/fraga">Fråga MiljöGuiden</a>.
        </p>
      </section>

      <section className="register">
        <div className="register-heading">
          <h2>{q ? `Sökresultat` : "Alla paragrafer i pilotmängden"}</h2>
          <span className="register-count">
            {traffar.length} av {PARAGRAFER.length}
          </span>
        </div>

        {traffar.length === 0 && (
          <p className="empty-state">
            Ingen träff i pilotdatan för &quot;{q}&quot;. Pilotversionen
            omfattar hittills bara 1 kap. 1 § och 2 kap. Miljöbalken — fler
            kapitel läggs till i nästa steg.
          </p>
        )}

        {traffar.map((p) => (
          <article className="para-row" key={p.id}>
            <div className="para-num">
              {p.kapitel} kap.
              <br />
              {p.paragraf}
            </div>
            <div className="para-body">
              <h3>
                {p.avsnittsrubrik ?? p.kapitelRubrik}
                {p.andringslag && (
                  <span className="andringslag">{p.andringslag}</span>
                )}
              </h3>
              <p className="para-text">{p.text}</p>
            </div>
          </article>
        ))}
      </section>

      <p className="legal-notice">
        Källa: {KALLA.lag}, {KALLA.kalla}, ändrad t.o.m. {KALLA.andradTom}.{" "}
        <a href={KALLA.url} target="_blank" rel="noreferrer">
          Öppna originalkällan hos Sveriges riksdag
        </a>
        . Hämtad {KALLA.hamtad}.
      </p>
    </>
  );
}
