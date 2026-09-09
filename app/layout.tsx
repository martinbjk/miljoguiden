import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MiljöGuiden Sverige",
  description:
    "Sök och förstå svensk miljölagstiftning med källhänvisning till officiell lagtext.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <a href="#innehall" className="skip-link">
          Hoppa till innehåll
        </a>
        <header className="topbar">
          <div className="topbar-inner">
            <a href="/" className="brand">
              <span className="brand-mark" aria-hidden="true" />
              MiljöGuiden Sverige
              <span className="brand-sub">— pilotversion</span>
            </a>
            <nav className="mainnav" aria-label="Huvudmeny">
              <a href="/">Sök i lagtext</a>
              <a href="/fraga">Fråga MiljöGuiden</a>
            </nav>
          </div>
        </header>
        <main id="innehall">{children}</main>
        <footer className="sitefoot">
          <p>
            MiljöGuiden Sverige är ett informations- och arbetsverktyg under
            utveckling. Informationen ersätter inte juridisk rådgivning,
            myndighetsbeslut eller kontroll av aktuell originalkälla.
            Pilotversionen innehåller endast 1 kap. 1 §, 2 kap. samt
            9 kap. 1, 2, 3 och 6 §§.
            Miljöbalken (1998:808).
          </p>
        </footer>
      </body>
    </html>
  );
}
