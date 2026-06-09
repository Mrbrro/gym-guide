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

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENROUTER_API_KEY not found"
      });
    }

    const messages = [
      {
        role: "system",
        content: `Ти AI-помічник сайту Gym Guide.

Допомагай з вправами, технікою виконання та тренувальними програмами.
Відповідай українською мовою.
Відповіді мають бути короткими та практичними.`
      },
      {
        role: "system",
        content: `Контекст сторінки: ${context}`
      },
      ...history.map((item) => ({
        role: item.from === "user" ? "user" : "assistant",
        content: item.text
      })),
      {
        role: "user",
        content: message
      }
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct:free",
          messages,
          temperature: 0.5,
          max_tokens: 500
        })
      }
    );

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(500).json({
        error: data.error.message
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Не вдалося отримати відповідь.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message || "Chat error"
    });
  }
}
