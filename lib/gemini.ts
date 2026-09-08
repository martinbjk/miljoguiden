// Anropar Google Gemini (gratis-tier, Flash-modell) från servern.
// Kräver miljövariabeln GEMINI_API_KEY (se README för hur du skaffar en gratis nyckel).

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function fragaGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY saknas. Lägg till den i .env.local (se README)."
    );
  }

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1, // lågt — vi vill ha ett återhållsamt, källtroget svar
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) {
    const felText = await res.text();
    throw new Error(`Gemini-anropet misslyckades (${res.status}): ${felText}`);
  }

  const data = await res.json();
  const svar: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!svar) {
    throw new Error("Gemini gav inget svar (kan bero på säkerhetsfilter eller kvotgräns).");
  }

  return svar;
}
