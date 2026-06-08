export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message, context = "", history = [] } = req.body || {};

    if (!message) {
      return res.status(400).json({
        error: "Missing message"
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    const chatHistory = history
      .map((item) => {
        const role = item.from === "user" ? "Користувач" : "Помічник";
        return `${role}: ${item.text}`;
      })
      .join("\n");

    const prompt = `
Ти AI-помічник сайту Gym Guide.

Твої задачі:
- допомагати з вибором вправ;
- пояснювати техніку виконання;
- складати програми тренувань;
- давати поради щодо набору маси, сили та схуднення;
- відповідати українською мовою;
- бути коротким, практичним та зрозумілим.

Контекст сторінки:
${context}

Попередній діалог:
${chatHistory}

Користувач:
${message}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 500
          }
        })
      }
    );

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Не вдалося отримати відповідь.";

    return res.status(200).json({
      reply
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Chat error"
    });
  }
}
