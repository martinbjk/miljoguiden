// Anropar Google Gemini (gratis-tier, Flash-modell) från servern.
// Kräver miljövariabeln GEMINI_API_KEY (se README för hur du skaffar en gratis nyckel).

const GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function fragaGemini(prompt: string, retries = 3): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY saknas. Lägg till den i .env.local (se README)."
    );
  }

  for (let i = 0; i < retries; i++) {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 4096,
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }

    // Om det är 503 (överbelastning), vänta 2 sekunder och försök igen
    if (res.status === 503 && i < retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }

    const felText = await res.text();
    throw new Error(`Gemini-anropet misslyckades (${res.status}): ${felText}`);
  }

  throw new Error("Kunde inte ansluta till Gemini efter flera försök.");
}
