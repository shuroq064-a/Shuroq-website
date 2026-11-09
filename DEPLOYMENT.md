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
| Active CLI account | `VUPPALA-AKSHAY` |
| Secondary CLI account (inactive) | `Akshay392938` |
| Token scopes (active) | `repo`, `workflow`, `gist`, `read:org` |
| Auth protocol | HTTPS |

Check with:

```bash
gh auth status
git config user.name
git config user.email
```

### Vercel

| Item | Value |
| --- | --- |
| CLI user | `honeyrao189-7273` |
| Project name | `shuroq-static-website` |
| Project ID | `prj_ProhlhwdsNwrbtk6kpS9r0YmglXG` |
| Org / Team ID | `team_tGHCjE3WvdxIaZuX6CoGGDLA` |
| Dashboard | https://vercel.com/honeyrao189-7273/shuroq-static-website |

Project link is stored locally in `.vercel/project.json` (git-ignored).

```bash
vercel whoami
vercel link      # re-link if the project/machine changes
```

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

**Automatic (normal path)** — Vercel builds every push to the connected
production branch (`main`).

**Manual**

```bash
vercel          # preview deployment
vercel --prod   # production deployment
```

If deployments stop after the repo move, open the Vercel project →
Settings → Git and point it at `shuroq064-a/Shuroq-website`, production branch
`main`.

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
   `Shuroq-website` as both `main` and `variation-1`.
2. The pushed commits were verified on the remote.
3. Branch `variation-1` was then deleted from `shuroq-static-website`
   (`main` left intact as a fallback).

Rollback: the same commit is still reachable from `Shuroq-website` (`main`,
`variation-1`) and from the local clone, so the branch can be restored with:

```bash
git push origin <sha>:refs/heads/variation-1
```
