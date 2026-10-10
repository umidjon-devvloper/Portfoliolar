"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/actions/send-message";

type Labels = {
  name: string;
  email: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  error: string;
};

const initial: ContactState = { status: "idle" };

const field =
  "mt-2 block w-full rounded-sm border border-seam bg-hull px-3.5 py-3 text-frost placeholder:text-fog/70 focus:border-signal focus:outline-none";

export function ContactForm({ labels }: { labels: Labels }) {
  const [state, action, pending] = useActionState(sendMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="border border-seam bg-hull p-6">
        <p className="font-medium">{labels.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate={false}>
      <label className="block text-sm text-fog">
        {labels.name}
        <input name="name" required minLength={2} autoComplete="name" className={field} />
      </label>
      <label className="block text-sm text-fog">
        {labels.email}
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="block text-sm text-fog">
        {labels.message}
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder={labels.messagePlaceholder}
          className={`${field} resize-y`}
        />
      </label>
      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="border-l-2 border-signal pl-3 text-sm">
          {labels.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-signal px-5 py-3 font-medium text-signal-ink transition-colors hover:bg-frost disabled:opacity-60"
      >
        {pending ? labels.sending : labels.send}
      </button>
    </form>
  );
}
