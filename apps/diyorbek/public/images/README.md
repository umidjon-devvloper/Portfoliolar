# Images — umidjon.site

Reference every file from `src/content/*.ts` with a leading slash, e.g.
`/images/pages/work.png`.

## profile/
- `portrait.png` — hero portrait, transparent background, 1000px+ tall.
  Wired to `src/content/profile.ts` → `avatar`.

## pages/
One illustration per page, shown beside the page heading.
**Transparent PNG, roughly 3:2 (e.g. 1400×900), 200 KB or less after
export.** Anything larger will be converted before it ships.

| page       | file             | subject in the design            |
|------------|------------------|---------------------------------|
| work       | `work.png`       | laptop with an editor open      |
| skills     | `skills.png`     | code window / circuit motif     |
| experience | `experience.png` | briefcase                       |
| services   | `services.png`   | laptop and phone together       |
| contact    | `contact.png`    | paper plane                     |
| 404        | `not-found.png`  | rocket                          |

A page without its file keeps the drawn vector fallback, so nothing
breaks while these are still missing.

## projects/
One cover per project, named by slug. 16:10 (e.g. 1600×1000), WebP or PNG.

| slug             | file                    |
|------------------|-------------------------|
| thehotelsaas     | `thehotelsaas.webp`     |
| sushi-time       | `sushi-time.webp`       |
| zapchasty        | `zapchasty.webp`        |
| kbkm             | `kbkm.webp`             |
| artsuzani        | `artsuzani.webp`        |
| bukhara-suzana   | `bukhara-suzana.webp`   |
| sara-silvers     | `sara-silvers.webp`     |
| gijduvan-crafts  | `gijduvan-crafts.webp`  |
| zarina-portfolio | `zarina-portfolio.webp` |
| umidjon-agency   | `umidjon-agency.webp`   |

Once added, set that project's `cover` in `src/content/projects.ts`.
