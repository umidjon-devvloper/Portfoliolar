# Images — umidjon.site

Put files here and reference them from `src/content/*.ts` with a leading
slash, e.g. `cover: "/images/projects/thehotelsaas.webp"`.

## profile/
- `portrait.png` — hero portrait, transparent background (PNG), at least
  1000px tall. Referenced from `src/content/profile.ts` → `avatar`.

## projects/
One cover per project, named by slug. 16:10 works best (e.g. 1600×1000).
WebP or PNG.

| slug              | file                          |
|-------------------|-------------------------------|
| thehotelsaas      | thehotelsaas.webp             |
| sushi-time        | sushi-time.webp               |
| zapchasty         | zapchasty.webp                |
| kbkm              | kbkm.webp                     |
| artsuzani         | artsuzani.webp                |
| bukhara-suzana    | bukhara-suzana.webp           |
| sara-silvers      | sara-silvers.webp             |
| gijduvan-crafts   | gijduvan-crafts.webp          |
| zarina-portfolio  | zarina-portfolio.webp         |
| umidjon-agency    | umidjon-agency.webp           |

Once a file is added, set that project's `cover` in
`src/content/projects.ts` to `/images/projects/<file>`.
