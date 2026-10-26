# Fieldstone Kitchen & Bath Co.

A full-featured demo site for a fictional design-build kitchen & bath remodeling company, built to showcase what a lead-capture-driven marketing site for a trades business (kitchen/bath remodeling, HVAC, electrical, etc.) can look like — real photography, a multi-step estimate wizard, and an owner-only sample CRM behind the scenes. Public forms are local simulations and the public lead endpoint never parses or stores the payload.

> **This is a portfolio demo.** Fieldstone Kitchen & Bath Co. is a fictional business. Contact details use reserved/example domains and are not monitored.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — custom "Fieldstone" warm-stone/clay design system
- **Prisma** + **Neon Postgres** — leads, gallery projects, testimonials, settings, admin auth, rate limiting
- **bcryptjs** — admin password hashing
- Security headers (CSP, frame-ancestors, etc.) baked into `next.config.mjs`

## Highlights

- **Estimate Wizard** (`/estimate`) — a 4-step lead-capture flow (project type → scope/timeline → contact → review) with local-only sample details; no lead, SMS consent, estimate or callback is created.
- **Draggable before/after sliders** — credited stock photography of matched dated→remodeled kitchens and bathrooms, fully keyboard-operable.
- **Admin CRM** (`/admin`) — a lead pipeline (status tracking + internal notes), gallery project & testimonial management, and site-content editing, all gated behind a database-backed login (never a Vercel env-var password — see below).

## Local development

```bash
npm install
npx prisma migrate dev
npm run dev
```

Requires a `.env.local` with `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, and `SESSION_SECRET` (any long random string).

## Admin access

The first admin user is created once via `prisma/bootstrap-admin.js` (the public `POST /api/admin/bootstrap` route is disabled). Password changes happen self-service from `/admin/settings` once logged in.

Admin auth intentionally lives in Postgres rather than a Vercel environment variable — a "Sensitive" Vercel env var is write-only from the CLI, which can permanently lock an owner out of their own admin panel with no recovery path. A database-backed password can always be reset via a migration or script.

## Seeding sample data

```bash
node prisma/seed.js
```

Populates the gallery with the two stock-photo comparison pairs and a handful of testimonials.

---

Built by [Clinch Valley Digital](https://clinchvalleydigital.com).

See [PRESHIP.md](PRESHIP.md), [SECURITY.md](SECURITY.md) and [ASSETS.md](ASSETS.md) for release safeguards. Public forms collect no leads; existing older records are preserved.
