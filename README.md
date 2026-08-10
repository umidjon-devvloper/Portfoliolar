# portfolio-umidjon

Personal portfolio website — **umidjon.site**

Full Stack Web & Mobile Developer / Entrepreneur.

## Status

Boshlash — repository initialized, project setup in progress.

## Tech Stack

- Next.js 15 (App Router, TypeScript, `src/`)
- TailwindCSS v4 + shadcn/ui
- framer-motion
- lucide-react
- next-themes (dark / light)
- next-intl (uz / ru / en)
- Content: typed objects in `src/content/*`
- Contact form: Telegram Bot API via server action
- Deploy: Vercel + custom domain

No backend / database required.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero, about, featured projects, services, CTA |
| `/about` | Full bio, working style, strengths, goals |
| `/projects` | All projects (filter: saas / mobile / web) |
| `/projects/[slug]` | Problem to solution to stack to result |
| `/services` | Agency services + pricing request CTA |
| `/contact` | Form + social links |
| `/resume` | CV + PDF download |

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local`:

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

## Deployment

Vercel: import repo, add env vars, connect domain `umidjon.site`.

DNS records:

- `A` -> `76.76.21.21`
- `CNAME www` -> `cname.vercel-dns.com`

## License

Private project. All rights reserved.
