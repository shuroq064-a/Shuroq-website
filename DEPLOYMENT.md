# Deployment Guide — Shuroq Website

_Last updated: 2026-11-09_

Everything needed to push, deploy and recover this project. No passwords or
tokens are stored in this file — only where to find them.

---

## 1. Stack

| Item | Value |
| --- | --- |
| Framework | Next.js 16.4.5 (App Router) |
| React | 19.3.0 |
| Node | 24.15.0 |
| npm | 11.12.1 |
| Dev server | `npm run dev` → http://localhost:3000 |
| Build | `npm run build` → `npm run start` |
| Lint | `npm run lint` |
| Extra tooling | Agentation MCP (dev only, port 4747) |

---

## 2. Repositories

| Purpose | Remote name | URL | Branches |
| --- | --- | --- | --- |
| **Primary — deploy source** | `shuroq-website` | https://github.com/shuroq064-a/Shuroq-website.git | `main` (production), `variation-1` (working) |
| Legacy — code migrated out | `origin` | https://github.com/shuroq064-a/shuroq-static-website.git | `main` only (`variation-1` deleted after migration) |
| Original source | `upstream` | https://github.com/Shuroq-Tech/shuroq-static-website.git | read reference |

The site is built from **`Shuroq-website`**. Do not push production work to
`shuroq-static-website`.

```bash
git remote -v
```

---

## 3. Accounts

### GitHub

| Item | Value |
| --- | --- |
| Git author | Vuppala Akshay `<akshay.dunny08@gmail.com>` |
| Active CLI account | `shuroq064-a` (repo owner, `admin` on both repos) |
| Other CLI accounts | `VUPPALA-AKSHAY`, `Akshay392938` (read-only on these repos) |
| Token scopes (active) | `repo`, `workflow`, `gist`, `read:org` |
| Auth protocol | HTTPS |
| Local branch tracking | `variation-1` → `shuroq-website/variation-1` |

Check with:

```bash
gh auth status
git config user.name
git config user.email
```

### Vercel

| Item | Value |
| --- | --- |
| CLI user | `shuroq064-5343` |
| Login email | `shuroq064@gmail.com` |
| Auth method | GitHub OAuth (signed in with the `shuroq064-a` GitHub account) |
| Scope / team | `shuroq064-5343s-projects` (personal scope) |
| Project name | `shuroq` |
| Project ID | see `.vercel/project.json` (git-ignored) |
| Production domain | https://shuroq.vercel.app |
| Extra alias | https://shuroq-sigma.vercel.app (same project) |
| Dashboard | https://vercel.com/shuroq064-5343s-projects/shuroq |
| Framework preset | Next.js (`npm run build`, Next default output) |

Project link is stored locally in `.vercel/project.json` (git-ignored).

```bash
vercel whoami
vercel link --project shuroq   # re-link if the project/machine changes
vercel project inspect shuroq  # framework / node settings
```

> **Old Vercel account removed — project deleted.** The old account
> `honeyrao189-7273` (scope `vuppala-akshays-projects`) had its own project
> `shuroq` on `shuroq.vercel.app`. That account was logged in, the project was
> **deleted** (`vercel project rm shuroq --scope vuppala-akshays-projects`), and
> the CLI was logged back out. `shuroq.vercel.app` is now attached to the new
> project, so there is only one live site.

> **Git auto-deploy is connected.** The Vercel GitHub App is installed on
> `shuroq064-a/Shuroq-website`, so every push to `main` builds and promotes to
> production automatically. If it ever stops, re-check the app install at
> https://github.com/apps/vercel/installations and re-run
> `vercel git connect https://github.com/shuroq064-a/Shuroq-website`.

---

## 4. Where credentials live (never in the repo)

| Credential | Stored in | Notes |
| --- | --- | --- |
| GitHub token | OS keyring via `gh auth login` | Git over HTTPS reuses it; re-auth with `gh auth login` |
| Vercel token | `%APPDATA%\com.vercel.cli\Data\auth.json` | Created by `vercel login`; re-auth with `vercel login` |
| App environment variables | Vercel → Project → Settings → Environment Variables | Local values go in `.env.local` (git-ignored) |

Ignored by git (see `.gitignore`): `.env*`, `.vercel`, `.next`, `node_modules`,
`tsconfig.tsbuildinfo`, `.agentation.log`, `.baby-ui/`, `.stitch/`.

> Never commit tokens, `.env*` files or `.vercel/`. Rotate a token immediately
> if it is ever exposed.

---

## 5. Push workflow

```bash
git status
git add -A
git commit -m "Describe the change"

# working branch
git push shuroq-website variation-1:variation-1

# production branch
git push shuroq-website variation-1:main
```

Verify what landed:

```bash
git ls-remote --heads shuroq-website
```

---

## 6. Deploying

**Current setup — automatic.** Every push to the production branch `main` in
`shuroq064-a/Shuroq-website` triggers a Vercel build and promotes it to
production (`https://shuroq.vercel.app`). No manual step needed.

Manual deploy is still available from a local clone:

```bash
vercel          # preview deployment
vercel --prod   # production deployment → https://shuroq.vercel.app
```

**Re-connect if auto-deploy ever breaks** (Vercel GitHub App must be installed on
the repo — see section 3):

```bash
vercel git connect https://github.com/shuroq064-a/Shuroq-website
```

Production branch `main`.

### Build gotcha

Swiper reads the clock during render (autoplay), which Next 16 rejects while
prerendering (`blocking-prerender-current-time-client`). `Carousel_001` mounts
Swiper only after the first client render, so `/careers` builds statically —
keep that guard if the carousel is edited.

### Verifying production

```bash
curl -I https://shuroq.vercel.app/                 # 200
curl -I https://shuroq.vercel.app/careers          # 200
curl -I https://shuroq.vercel.app/about            # 200
curl -I https://shuroq.vercel.app/careers/index.html  # 307 → /careers
```

---

## 7. Pre-push checklist

```bash
npx tsc --noEmit        # types
npm run lint            # lint
npm run build           # production build
```

Then confirm the routes respond:

- `/` — home
- `/about` — about
- `/careers` — careers
- Legacy `*.html` URLs → 307 redirects (see `next.config.ts`)

---

## 8. Migration record — 2026-11-09

1. Work on `shuroq-static-website` branch `variation-1` was pushed to
   `Shuroq-website` as both `main` and `variation-1`
   (commit `418ba07`, pushed as `8cf4170..418ba07`).
2. Pushed commits verified on the remote (`git ls-remote --heads shuroq-website`
   shows `418ba07` on both branches).
3. Backup tag `backup-variation-1-pre-migration` (`8cf4170`) pushed to
   `Shuroq-website` so the old branch tip stays reachable.
4. Branch `variation-1` was then deleted from `shuroq-static-website`
   (`main` and every other team branch left intact).

Rollback: the same commit is reachable from `Shuroq-website` (`main`,
`variation-1`, tag `backup-variation-1-pre-migration`) and from the local
clone. Restore the old branch with:

```bash
git push origin 8cf4170:refs/heads/variation-1
```
