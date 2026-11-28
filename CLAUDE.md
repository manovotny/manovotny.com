# Project Context

## Stack

SvelteKit 3 (Svelte 5 runes — `$props`, `$state`, `$derived`) on Vite, deployed via `@sveltejs/adapter-vercel`. Kit config lives in `vite.config.ts` (no `svelte.config.js`), including the mdsvex preprocessor and the adapter's image settings. `src/lib` and `src/db` are imported through the `#lib/*` and `#db/*` subpath imports in `package.json` (not `$lib`/`$db`), with file extensions. Server env vars must be declared in `src/env.ts` before `$app/env/private` exposes them; Clerk's come from `clerkEnvVars()`, and without them `svelte-clerk` can't read its keys. TypeScript, Node 24.

Pages are mdsvex Markdown (`+page.md`) or Svelte under `src/routes/`. Notes sit in the `(notes)` route group, and Markdown pages render through `src/lib/markdown/layout.svelte`. Components live in `src/lib/components/`. `/bookmarks` is a private, Clerk-gated bookmarks app (route group `(bookmarks)`, code in `src/lib/bookmarks/`); see `docs/BOOKMARKS.md`.

Styling is Tailwind v4 through `@tailwindcss/vite` (no PostCSS config). `src/app.css` holds the `@font-face` rules, `@theme` tokens, and a few base styles and utilities. Fonts are self-hosted in `static/fonts/`. Vercel Web Analytics and Speed Insights load from script tags in `src/app.html`, not from the npm packages.

Tooling, all part of `npm test`:

- oxlint, with `sort-keys` as an error, so keep object keys sorted.
- oxfmt, which also sorts imports, `package.json`, and Tailwind classes (including inside `cn()`). Neither oxlint nor oxfmt sorts keys in JSON config files ([oxc-project/oxc#21644](https://github.com/oxc-project/oxc/issues/21644)), so keep those in order by hand.
- svelte-check, with `noUnusedLocals` and `noUnusedParameters` on, so unused code fails in `.ts` and `.svelte` files.
- knip, for unused files, exports, and dependencies. Its config in `knip.ts` hands knip every `<script>` body in `.svelte` and `.md` files, since its built-in Svelte compiler misses mdsvex pages. It turns off the drizzle plugin, since that plugin loads `src/db/config.ts`, which throws without `DATABASE_URL`; knip still treats that file as an entry through the `--config` in the `db:*` scripts. It lists `src/env.ts` as an entry, since SvelteKit loads it by convention. Drop `export` from anything only used in its own file.
- vitest, with tests in `tests/`.

## Security

- `ignore-scripts=true` in `.npmrc` blocks install-script attacks (e.g., the Axios supply chain RAT via `postinstall`).
- `allow-git=none` in `.npmrc` refuses git-spec dependencies. They bypass the registry (no immutable versions, signatures, or provenance), so they're a supply chain vector.
- `min-release-age=3` in `.npmrc` only installs versions published more than 3 days ago, so a compromised maintainer's fresh release stays out until the ecosystem has time to flag it. It applies to anything that resolves from the registry: `npm install`/`update`, `npm run check`'s ncu (which detects the key), and CI's `npm audit signatures`. That last one re-resolves the tree, so right after a dependency bump it fails with `ETARGET` until the new versions are 3 days old. Bypass case by case with `--min-release-age=0` only for an urgent patch.
- `save-exact=true` in `.npmrc` saves new dependencies at exact versions, and `fund=false` silences npm's funding notices.
- `engines.npm` is `>=11.12.0`, since older npm ignores `min-release-age` and `allow-git` with only a warning. Don't loosen it.
- `engines.node` is `24.x`, not `>=24`. With an open range, Vercel built with Node 26, which `@sveltejs/adapter-vercel` rejects, so every deploy failed.
- CI (`.github/workflows/test.yml`) installs with `npm ci --ignore-scripts`, then runs `npm audit signatures` (registry signatures and provenance), `npm audit --audit-level=high` (fails on high or critical advisories), the install-script allowlist check, and `npm test`. It doesn't build, since Vercel builds every PR.
- The install-script allowlist (`.github/actions/check-install-scripts`) fails CI if a package outside it has `hasInstallScript` in the lockfile. It allows `esbuild` and `fsevents`; their scripts never run because of `ignore-scripts=true`. Reassess it whenever a dependency is added.
- Dependabot is alerts only: `open-pull-requests-limit: 0` in `.github/dependabot.yml`, since auto-PRs are themselves a supply chain vector. Security alerts live in repo settings and are unaffected. Bump GitHub Actions by hand.
- Git hooks are repo-owned in `.githooks/`, not managed by a dependency. `.githooks/pre-commit` runs `lint-staged`. Turn them on once per clone with `npm run setup`.
- `overrides` in `package.json` pin safe versions of transitive deps where upstream is slow to update. Both are scoped under `@vercel/config`:
  - `zod@4.6.7` clears [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) (high).
  - `path-to-regexp@6.3.0`, under `@vercel/routing-utils`, clears [GHSA-9wv6-86v2-598j](https://github.com/advisories/GHSA-9wv6-86v2-598j) (high).

## Security follow-ups

- `zod@4.6.7` override. `@vercel/config` still depends on `zod@^3`, and the advisory is only fixed in 4.6.6+. It's safe because `vercel.ts` only imports a type from `@vercel/config`, so its zod never runs. Drop it when `@vercel/config` moves to zod 4.
- `path-to-regexp@6.3.0` override. `@vercel/routing-utils` 6.6.1 pins `path-to-regexp@6.1.0`. Drop it when `@vercel/config` ships a `@vercel/routing-utils` that uses 6.3.0 or later.
- `@vercel/og` is held at `1.0.1`. 1.0.3 crashes on import in Node (`Dynamic require of "fs" is not supported`), which fails `npm run build`. Upstream: [vercel/satori#971](https://github.com/vercel/satori/issues/971). That leaves a moderate `satori` advisory. `npm run check` keeps offering 1.0.3, so revert it to 1.0.1 until a release fixes #971.
- TypeScript is held at `6.0.3`. `@sveltejs/kit` and `svelte-check` peer on TypeScript `^6` (and `^5`), so TS 7 fails `npm install` with `ERESOLVE`. `npm run check` runs ncu with `--peer`, which skips it and lists the blocking peers under "Ignored incompatible updates". It takes TS 7 once the Svelte toolchain supports it.
- `engines.node` is pinned to `24.x`. Loosen it once `@sveltejs/adapter-vercel` supports a newer Node.

## Database

Drizzle + Neon. Schema and migrations live in `src/db/`. Migrations run at build time via `buildCommand` in `vercel.ts` (`npm run db:migrate && npm run build`), against whichever database that environment's `DATABASE_URL` points at. Keep migrations forward-only and additive; see `docs/BOOKMARKS.md`.

## Never commit

- Specs and implementation plans (`docs/superpowers/`).
