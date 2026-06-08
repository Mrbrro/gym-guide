const OpenAI = require("openai");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { message, context = "", history = [] } = req.body || {};
    if (!message) {
      res.status(400).json({ error: "Missing message" });
      return;
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const transcript = [
      {
        role: "system",
        content:
          "Ти спортивний AI-помічник сайту Gym guide. Відповідай українською, коротко, практично і в контексті вправ, техніки, підбору тренувань і безпеки. Якщо не вистачає даних, став уточнююче питання."
      },
      { role: "system", content: `Контекст сайту: ${context}` },
      ...history.map((item) => ({
        role: item.from === "user" ? "user" : "assistant",
        content: item.text
      })),
      { role: "user", content: message }
    ];

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      input: transcript,
      temperature: 0.4
    });

    res.status(200).json({ reply: response.output_text || "Не вдалося згенерувати відповідь." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chat error" });
  }
};
