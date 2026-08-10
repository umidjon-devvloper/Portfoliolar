"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string | null;
};

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  honeypot: string;
};

function parse(formData: FormData): ContactPayload {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    honeypot: String(formData.get("company") ?? "").trim(),
  };
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const payload = parse(formData);

  // Bots fill hidden fields; silently accept without sending.
  if (payload.honeypot.length > 0) {
    return { status: "success", message: null };
  }

  if (
    payload.name.length < 2 ||
    !isValidEmail(payload.email) ||
    payload.message.length < 10
  ) {
    return { status: "error", message: null };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram credentials are not configured");
    return { status: "error", message: null };
  }

  const text = [
    "<b>diyorber.site — new message</b>",
    "",
    `<b>Name:</b> ${escapeHtml(payload.name)}`,
    `<b>Email:</b> ${escapeHtml(payload.email)}`,
    "",
    escapeHtml(payload.message),
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Telegram API error", await response.text());
      return { status: "error", message: null };
    }

    return { status: "success", message: null };
  } catch (error) {
    console.error("Failed to send Telegram message", error);
    return { status: "error", message: null };
  }
}
