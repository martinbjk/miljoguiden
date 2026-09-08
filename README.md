# MiljöGuiden Sverige — pilotversion

Ett sök- och AI-frågeverktyg för svensk miljölagstiftning. Den här
pilotversionen innehåller **1 kap. 1 § och hela 2 kap. Miljöbalken**
(de allmänna hänsynsreglerna) — inte hela balken. Se "Nästa steg" nedan
för hur fler kapitel läggs till.

Byggd för att vara helt gratis att köra: Next.js (gratis hosting på
Vercel) + Google Gemini Flash (gratis API-nyckel, inget kreditkort).

## Vad är redan klart

- Sökbar lagtextregister för 1 kap. 1 § och 2 kap. Miljöbalken, med
  exakt källa (SFS-nummer, ändringslag, länk till riksdagen.se)
- En AI-frågesida som bara får svara utifrån den inlagda lagtexten,
  med tvingande källhänvisning och en "jag vet inte"-väg när underlaget
  inte räcker
- Design byggd från grunden för det här verktyget, inte en mall

## Det som INTE är byggt än (medvetet, se tidigare diskussion)

Databas/pgvector, fler kapitel, förordningar, EU-rätt, domstolsdatabas,
versionsbevakning, användarkonton, export, adminpanel. Detta är steg 1
av en mycket större plan — se `/omfattning.md` om du vill återskapa
hela den ursprungliga specen.

---

## 1. Testa lokalt

1. Se till att du har Node.js 18 eller senare installerat.
2. Öppna en terminal i den här mappen och kör:
   ```
   npm install
   ```
3. Skaffa en gratis Gemini-nyckel:
   1. Gå till https://aistudio.google.com/apikey
   2. Logga in med ett Google-konto (inget kreditkort krävs)
   3. Klicka "Create API key"
4. Kopiera `.env.example` till en ny fil som heter `.env.local` och
   klistra in din nyckel:
   ```
   cp .env.example .env.local
   ```
5. Öppna `.env.local` i en textredigerare och fyll i:
   ```
   GEMINI_API_KEY=din-nyckel-här
   ```
6. Starta utvecklingsservern:
   ```
   npm run dev
   ```
7. Öppna http://localhost:3000 i webbläsaren.

## 2. Lägg upp projektet på GitHub

1. Skapa ett nytt, tomt repo på https://github.com/new (namnge det
   t.ex. `miljoguiden-sverige`, lämna det utan README/gitignore-mallar
   eftersom de redan finns här).
2. Öppna en terminal i den här mappen och kör, i ordning:
   ```
   git init
   git add .
   git commit -m "Första version av MiljöGuiden Sverige"
   git branch -M main
   git remote add origin https://github.com/DITT-ANVANDARNAMN/miljoguiden-sverige.git
   git push -u origin main
   ```
3. Ersätt `DITT-ANVANDARNAMN` med ditt GitHub-användarnamn. `.env.local`
   pushas aldrig upp (den är listad i `.gitignore`), så din API-nyckel
   är säker.

## 3. Publicera gratis på Vercel (valfritt, för att kunna dela en länk)

1. Gå till https://vercel.com och logga in med ditt GitHub-konto.
2. Klicka "Add New… → Project" och välj repot du precis skapade.
3. Under "Environment Variables", lägg till:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** samma nyckel som i din `.env.local`
4. Klicka "Deploy". Efter någon minut får du en länk (t.ex.
   `miljoguiden-sverige.vercel.app`) som du kan dela.

---

## Nästa steg (i den ordning jag rekommenderar)

1. Lägg till fler kapitel (t.ex. 9 kap. Miljöfarlig verksamhet, som är
   det mest efterfrågade i praktiken) i `data/miljobalken.ts`.
2. Byt sökningen i `lib/retrieval.ts` mot embeddings (Gemini har en
   gratis embedding-modell) när datamängden blir för stor för
   nyckelordssökning.
3. Flytta lagtexten till en riktig databas (Supabase eller Neon, båda
   gratis i den här skalan) istället för en TypeScript-fil, så att
   den kan uppdateras utan ny driftsättning.
4. Lägg till versionshantering (gammal/ny lydelse) enligt den
   ursprungliga specifikationen, punkt 7.

## Viktigt om gränser

Gemini gratis-tier har hastighetsgränser (ca 10–15 anrop/minut). Det
räcker gott för att visa upp verktyget och för eget bruk, men om många
personer använder det samtidigt kommer vissa frågor att få ett
felmeddelande. Det är den kända begränsningen med en helt gratis
lösning, inte ett fel i koden.
