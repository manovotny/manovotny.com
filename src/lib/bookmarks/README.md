# Bookmarks

Private bookmarks tool at `/bookmarks`. Replaces Raindrop.io. Everything lives in
`src/lib/bookmarks/` and `src/routes/(bookmarks)/`; the only site files it touches
are `src/hooks.server.ts`, the sitemap route, `vercel.ts`, `static/robots.txt`,
`src/app.d.ts`, `package.json`, `scripts/import-raindrop.ts`, and a browser-safe
`process` guard in `src/lib/constants.ts` (the site never hydrated before this).
The database layer is site-wide: `src/lib/db/` holds the Drizzle schema, client,
config, and migrations; bookmarks keeps only its queries.

## Environment variables

| Name                           | Where                                                                        | Purpose                                                                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                 | Vercel + `.env.local`                                                        | Neon connection string. Production → `production` branch; preview/local → `dev` branch.                                                                                |
| `CLERK_SECRET_KEY`             | Vercel + `.env.local`                                                        | Clerk server key.                                                                                                                                                      |
| `PUBLIC_CLERK_PUBLISHABLE_KEY` | Vercel + `.env.local`                                                        | Clerk client key.                                                                                                                                                      |
| `BOOKMARKS_OWNER_USER_ID`      | Vercel + `.env.local`                                                        | Your Clerk user id. Anyone else signed in gets a 404.                                                                                                                  |
| `BOOKMARKS_CAPTURE_TOKEN`      | Vercel + `.env.local` + the Apple Shortcut                                   | May only `POST /api/bookmarks`. Lives on a phone, so it can't read or edit anything. `openssl rand -hex 32`.                                                           |
| `BOOKMARKS_API_TOKEN`          | Vercel + `.env.local` + the Claude Routine (as a host-scoped API credential) | Every service endpoint in the API table below. The cron endpoint takes `CRON_SECRET` instead. `openssl rand -hex 32`.                                                  |
| `CRON_SECRET`                  | Vercel (**set it yourself**) + `.env.local`                                  | Vercel sends `Authorization: Bearer $CRON_SECRET` to cron endpoints once the variable exists; it is not created automatically. The endpoint refuses to run without it. |

Clerk instance: **restricted** sign-up mode with only your account allowlisted.
The app also enforces `BOOKMARKS_OWNER_USER_ID`, so a stray sign-up still sees
nothing.

## Database

Drizzle + Neon. Schema and migrations live in `src/lib/db/`; migrations are
applied at build by `vercel.ts` (`npm run db:migrate && npm run build`).

```bash
npm run db:generate   # after editing src/lib/db/schema.ts
npm run db:migrate    # apply to whatever DATABASE_URL points at
npm run db:studio
```

Forward-only, additive migrations. Destructive changes go expand → migrate code
→ contract across separate deploys.

## Import from Raindrop

One-off. The CSV is personal data and must not be committed.

```bash
npm run import:raindrop -- /path/to/raindrop-export.csv          # dry run: prints the DB host + counts
npm run import:raindrop -- /path/to/raindrop-export.csv --write  # insert
```

Idempotent: re-running skips rows already present (matched on normalized URL).

## API

Bearer `BOOKMARKS_API_TOKEN` for the service endpoints below; `POST /api/bookmarks` also accepts `BOOKMARKS_CAPTURE_TOKEN`. The cron endpoint is separate and takes `CRON_SECRET` (see Broken links).

| Call                                                                                   | Purpose                                                                                           |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `POST /api/bookmarks` `{ url, title? }`                                                | Capture. Responds with the outcome only: `201 { duplicate: false }` or `200 { duplicate: true }`. |
| `GET /api/bookmarks/untagged?limit=25`                                                 | Rows the routine hasn't tagged.                                                                   |
| `GET /api/bookmarks/tags`                                                              | Tag vocabulary with counts.                                                                       |
| `PATCH /api/bookmarks/:id` `{ tags?, title?, description?, image?, processed?: true }` | Routine writes.                                                                                   |
| `GET /api/bookmarks/export`                                                            | Full JSON dump. The exit door.                                                                    |

## Apple Shortcut — "Save Bookmark"

This is the capture button. There is no browser extension; Apple's Shortcuts
app does the job on iPhone and Mac, and a Shortcut set to show in the share
sheet appears in Safari's share menu on both.

Build it once in the **Shortcuts** app on your iPhone (it syncs to the Mac):
tap **+**, name it "Save Bookmark", then add these actions in order.

1. **Receive** `URLs` and `Safari web pages` from **Share Sheet**. If there's no
   input, **Get Clipboard**.
2. **Get URLs from** Shortcut Input → variable `URL`.
3. **Get Details of Safari Web Page** → `Name` of Shortcut Input → variable
   `Title` (leave empty if unavailable).
4. **Get Contents of URL**
   - URL: `https://manovotny.com/api/bookmarks`
   - Method: `POST`
   - Headers: `Authorization` = `Bearer <BOOKMARKS_CAPTURE_TOKEN>`
   - Request Body: JSON — `url` = `URL`, `title` = `Title`
5. **Get Dictionary Value** `duplicate` from Contents of URL → `Duplicate`.
6. **If** `Duplicate` is `true` → **Show Notification** "Already saved".
   **Otherwise** → "Saved".
7. Open the Shortcut's settings (the ⓘ button), turn on **Show in Share Sheet**,
   and limit inputs to URLs and Safari web pages.

To use it: in Safari, tap **Share**, then **Save Bookmark**. On the Mac it is in
the same share menu (the box-with-arrow button in the toolbar). If it is not
listed, scroll the share sheet to **Edit Actions** and add it.

If the request fails (no network, site down), Shortcuts surfaces the error; the
save is not lost silently — retry from the same tab.

## Tagging routine

A Claude Code cloud Routine runs every 6 hours on this repo with the prompt
`Follow src/lib/bookmarks/routine.md.` It runs on included subscription usage
(routines count against the account's usage and daily run allowance — no API
key, but not free either). Setup:

1. **Cloud environment**: create a dedicated one for this routine with
   **Full network access** — the default trusted-network mode cannot fetch
   arbitrary bookmark URLs. Remove every connector it doesn't need.
2. **API credential**: add `BOOKMARKS_API_TOKEN` as a **Bearer API credential
   scoped to `manovotny.com`**, not as a plain environment variable. The
   proxy injects it on requests to that host only; the model and any fetched
   page never see the value.
3. **Environment variable**: `BOOKMARKS_BASE_URL=https://manovotny.com`.
4. Run it once by hand and confirm untagged saves get tags.

See `routine.md` for what it does; page content it reads is untrusted input.

## Broken links

`/api/bookmarks/cron/check-links` runs daily (see `vercel.ts`), checks the 100
least-recently-checked rows (~9 days per full sweep of the collection), and
records `http_status` — `0` when the host could not be reached at all. The
**Show → Broken links** filter surfaces `0` and `>= 400` excluding bot-block
codes (401/403/405/429/999).
