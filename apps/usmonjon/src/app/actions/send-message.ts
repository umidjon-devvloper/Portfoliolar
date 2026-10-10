"use server";

export type ContactState = { status: "idle" | "success" | "error" };

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim().slice(0, 200);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const message = String(formData.get("message") ?? "").trim().slice(0, 4000);
  const honeypot = String(formData.get("company") ?? "").trim();

  // Bots fill the hidden field; answer as if it worked and drop it.
  if (honeypot) return { status: "success" };

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return { status: "error" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram credentials are not configured");
    return { status: "error" };
  }

  const text = [
    "<b>usmonjon.site — yangi xabar</b>",
    "",
    `<b>Ism:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    "",
    escapeHtml(message),
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Telegram API error", await response.text());
      return { status: "error" };
    }
    return { status: "success" };
  } catch (error) {
    console.error("Failed to send Telegram message", error);
    return { status: "error" };
  }
}
