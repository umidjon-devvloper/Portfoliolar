# Portfoliolar

Monorepo for three personal portfolio websites.

| App | Domain | Owner | Role |
|-----|--------|-------|------|
| `apps/umidjon` | umidjon.site | Umidjon | Full Stack Web & Mobile Developer + Entrepreneur |
| `apps/diyorbek` | diyorbek.site | Diyorbek | Full Stack Web Developer |
| `apps/usmonjon` | usmonjon.site | Usmonjon | Frontend Developer & UI/UX Designer |

Each app is an independent Next.js application with its own design language,
deployed separately on Vercel from this single repository.

## Tech Stack

- Next.js 15 (App Router, TypeScript, `src/`)
- TailwindCSS v4 + shadcn/ui primitives
- framer-motion, lucide-react, next-themes
- next-intl (uz / ru / en)
- Content: typed objects in `src/content/*`
- Contact form: Telegram Bot API via server action
- npm workspaces

No backend / database required.

## Structure

```
apps/
  umidjon/     full multi-page site
  diyorbek/    single page + anchors
  usmonjon/    single page + anchors
```

## Getting Started

```bash
npm install
npm run dev:umidjon     # http://localhost:3000
npm run dev:diyorbek    # http://localhost:3001
npm run dev:usmonjon    # http://localhost:3002
```

## Environment Variables

Each app needs its own `.env.local`:

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

## Deployment

Create three Vercel projects from this repository. For each one set:

- **Root Directory**: `apps/umidjon` (or `apps/diyorbek`, `apps/usmonjon`)
- **Environment Variables**: as above
- **Domain**: the matching custom domain

DNS records at the registrar:

- `A` -> `76.76.21.21`
- `CNAME www` -> `cname.vercel-dns.com`

## License

Private project. All rights reserved.
