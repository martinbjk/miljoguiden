// Källa: Miljöbalk (1998:808), Sveriges riksdag / Svensk författningssamling.
// Hämtad från: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/miljobalk-1998808_sfs-1998-808/
// Ändrad t.o.m. SFS 2026:1442. Lagtext omfattas inte av upphovsrätt (författningar är
// undantagna enligt 9 § lagen om upphovsrätt till litterära och konstnärliga verk).
//
// VIKTIGT: Detta är en avgränsad pilotmängd (1 kap. 1 § samt hela 2 kap.), inte hela
// Miljöbalken. Se README för hur fler kapitel läggs till.

export type Paragraf = {
  id: string;          // t.ex. "2:3"
  kapitel: number;
  kapitelRubrik: string;
  paragraf: string;    // t.ex. "3 §"
  avsnittsrubrik?: string; // underrubrik i lagtexten, t.ex. "Försiktighetsprincipen"
  text: string;
  andringslag?: string; // t.ex. "Lag (2018:1407)"
};

export const KALLA = {
  lag: "Miljöbalk (1998:808)",
  sfsNr: "1998:808",
  andradTom: "SFS 2026:1442",
  kalla: "Sveriges riksdag / Svensk författningssamling",
  url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/miljobalk-1998808_sfs-1998-808/",
  hamtad: "2026-09-08",
};

export const PARAGRAFER: Paragraf[] = [
  {
    id: "1:1",
    kapitel: 1,
    kapitelRubrik: "Miljöbalkens mål och tillämpningsområde",
    paragraf: "1 §",
    avsnittsrubrik: "Portalparagrafen",
    text: "Bestämmelserna i denna balk syftar till att främja en hållbar utveckling som innebär att nuvarande och kommande generationer tillförsäkras en hälsosam och god miljö. En sådan utveckling bygger på insikten att naturen har ett skyddsvärde och att människans rätt att förändra och bruka naturen är förenad med ett ansvar för att förvalta naturen väl.\n\nMiljöbalken skall tillämpas så att\n1. människors hälsa och miljön skyddas mot skador och olägenheter oavsett om dessa orsakas av föroreningar eller annan påverkan,\n2. värdefulla natur- och kulturmiljöer skyddas och vårdas,\n3. den biologiska mångfalden bevaras,\n4. mark, vatten och fysisk miljö i övrigt används så att en från ekologisk, social, kulturell och samhällsekonomisk synpunkt långsiktigt god hushållning tryggas, och\n5. återanvändning och återvinning liksom annan hushållning med material, råvaror och energi främjas så att ett kretslopp uppnås.",
  },
  {
    id: "2:1",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "1 §",
    avsnittsrubrik: "Tillämpning och bevisbörda",
    text: "När frågor prövas om tillåtlighet, tillstånd, godkännande och dispens och när sådana villkor prövas som inte avser ersättning samt vid tillsyn enligt denna balk är alla som bedriver eller avser att bedriva en verksamhet eller vidta en åtgärd skyldiga att visa att de förpliktelser som följer av detta kapitel iakttas. Detta gäller även den som har bedrivit verksamhet som kan antas ha orsakat skada eller olägenhet för miljön.\n\nI detta kapitel avses med åtgärd en sådan åtgärd som inte är av försumbar betydelse i det enskilda fallet.",
  },
  {
    id: "2:2",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "2 §",
    avsnittsrubrik: "Kunskapskravet",
    text: "Alla som bedriver eller avser att bedriva en verksamhet eller vidta en åtgärd skall skaffa sig den kunskap som behövs med hänsyn till verksamhetens eller åtgärdens art och omfattning för att skydda människors hälsa och miljön mot skada eller olägenhet.",
  },
  {
    id: "2:3",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "3 §",
    avsnittsrubrik: "Försiktighetsprincipen",
    text: "Alla som bedriver eller avser att bedriva en verksamhet eller vidta en åtgärd skall utföra de skyddsåtgärder, iaktta de begränsningar och vidta de försiktighetsmått i övrigt som behövs för att förebygga, hindra eller motverka att verksamheten eller åtgärden medför skada eller olägenhet för människors hälsa eller miljön. I samma syfte skall vid yrkesmässig verksamhet användas bästa möjliga teknik.\n\nDessa försiktighetsmått skall vidtas så snart det finns skäl att anta att en verksamhet eller åtgärd kan medföra skada eller olägenhet för människors hälsa eller miljön.",
  },
  {
    id: "2:4",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "4 §",
    avsnittsrubrik: "Produktvalsprincipen",
    text: "Alla som bedriver eller avser att bedriva en verksamhet eller vidta en åtgärd skall undvika att använda eller sälja sådana kemiska produkter eller biotekniska organismer som kan befaras medföra risker för människors hälsa eller miljön, om de kan ersättas med sådana produkter eller organismer som kan antas vara mindre farliga. Motsvarande krav gäller i fråga om varor som innehåller eller har behandlats med en kemisk produkt eller bioteknisk organism.",
    andringslag: "Lag (2006:1014)",
  },
  {
    id: "2:5",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "5 §",
    avsnittsrubrik: "Hushållnings- och kretsloppsprincipen",
    text: "Alla som bedriver en verksamhet eller vidtar en åtgärd ska hushålla med råvaror och energi samt utnyttja möjligheterna att\n1. minska mängden avfall,\n2. minska mängden skadliga ämnen i material och produkter,\n3. minska de negativa effekterna av avfall, och\n4. återvinna avfall.\n\nI första hand ska förnybara energikällor användas.",
    andringslag: "Lag (2016:782)",
  },
  {
    id: "2:6",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "6 §",
    avsnittsrubrik: "Val av plats (lokaliseringsprincipen)",
    text: "För en verksamhet eller åtgärd som tar i anspråk ett mark- eller vattenområde ska det väljas en plats som är lämplig med hänsyn till att ändamålet ska kunna uppnås med minsta intrång och olägenhet för människors hälsa och miljön.\n\nVid prövning av frågor enligt 7 kap., tillståndsprövning enligt 9 och 11 kap., regeringens tillåtlighetsprövning enligt 17 kap. och prövning av verksamheter enligt 9 kap. 6, 6 a och 6 b §§, 11 kap. 9 a § och 12 kap. 6 § ska bestämmelserna i 3 och 4 kap. tillämpas endast i de fall som gäller ändrad användning av mark- eller vattenområden.\n\nEtt tillstånd eller en dispens får inte ges i strid med en detaljplan eller områdesbestämmelser enligt plan- och bygglagen (2010:900). Små avvikelser får dock göras, om syftet med planen eller bestämmelserna inte motverkas.",
    andringslag: "Lag (2013:758)",
  },
  {
    id: "2:7",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "7 §",
    avsnittsrubrik: "Rimlighetsavvägning",
    text: "Kraven i 2-5 §§ och 6 § första stycket gäller i den utsträckning det inte kan anses orimligt att uppfylla dem. Vid denna bedömning ska särskild hänsyn tas till nyttan av skyddsåtgärder och andra försiktighetsmått jämfört med kostnaderna för sådana åtgärder. När det är fråga om en totalförsvarsverksamhet eller en åtgärd som behövs för totalförsvaret, ska vid avvägningen hänsyn tas även till detta förhållande.\n\nTrots första stycket ska de krav ställas som behövs för att följa 5 kap. 4 och 5 §§.",
    andringslag: "Lag (2018:1407)",
  },
  {
    id: "2:8",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "8 §",
    avsnittsrubrik: "Ansvar för skadad miljö",
    text: "Alla som bedriver eller har bedrivit en verksamhet eller vidtagit en åtgärd som medfört skada eller olägenhet för miljön ansvarar till dess skadan eller olägenheten har upphört för att denna avhjälps i den omfattning det kan anses skäligt enligt 10 kap. I den mån det föreskrivs i denna balk kan i stället skyldighet att ersätta skadan eller olägenheten uppkomma.",
  },
  {
    id: "2:9",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "9 §",
    avsnittsrubrik: "Slutavvägning (stoppregeln)",
    text: "Kan en verksamhet eller åtgärd befaras föranleda skada eller olägenhet av väsentlig betydelse för människors hälsa eller miljön, även om sådana skyddsåtgärder och andra försiktighetsmått vidtas som kan krävas enligt denna balk, får verksamheten bedrivas eller åtgärden vidtas endast om regeringen finner att det finns särskilda skäl.\n\nEn verksamhet eller åtgärd får inte bedrivas eller vidtas om den medför risk för att ett stort antal människor får sina levnadsförhållanden väsentligt försämrade eller miljön försämras avsevärt.\n\nVad som sägs i första och andra stycket gäller inte, om regeringen har tillåtit verksamheten enligt 17 kap. 1, 3 eller 4 §.",
    andringslag: "Lag (2002:175)",
  },
  {
    id: "2:10",
    kapitel: 2,
    kapitelRubrik: "Allmänna hänsynsregler m.m.",
    paragraf: "10 §",
    text: "Om en verksamhet eller åtgärd är av synnerlig betydelse från allmän synpunkt kan regeringen tillåta denna, även om förutsättningarna är sådana som anges i 9 § andra stycket.\nDetta gäller dock inte om verksamheten eller åtgärden kan befaras försämra det allmänna hälsotillståndet.\n\nBeslut enligt första stycket får förenas med villkor för att tillgodose allmänna intressen.",
  },
];
