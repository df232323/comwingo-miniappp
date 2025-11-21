export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, surname, phone, birthdate, platform, telegram, additional } = req.body;
  const botToken = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  const text = `
📝 Новая заявка:
👤 Имя: ${name}
👤 Фамилия: ${surname}
📱 Телефон: ${phone}
🎂 Дата рождения: ${birthdate}
📱 Платформа: ${platform}
💬 Telegram: ${telegram}
📄 Дополнительно: ${additional}
  `;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
}
