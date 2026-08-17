import { notFound } from "next/navigation";

/**
 * Unmatched paths land here. Without this route the App Router falls back
 * to its own built-in 404 page, which sits outside the locale layout and
 * so loses the sidebar, the theme and the translations.
 *
 * Nothing is awaited on purpose: throwing before the first flush lets
 * Next answer with a real 404 status instead of a streamed soft 404.
 */
export default function CatchAllPage() {
  notFound();
}
