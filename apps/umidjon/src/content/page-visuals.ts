/**
 * Illustration shown beside each page heading.
 *
 * Set a path once the file exists in `public/images/pages/`; leave it
 * null and the page falls back to its drawn vector, so a missing file
 * never breaks the layout.
 */
export const pageVisuals: Record<string, string | null> = {
  work: null,
  skills: null,
  experience: null,
  services: null,
  contact: null,
  notFound: null,
};
