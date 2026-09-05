# PH Legal Services

A sample consultation-booking platform for Philippine lawyers and law firms —
built as a portfolio piece to demonstrate a complete booking flow (directory,
filters, multi-step form, confirmation) using **plain PHP, HTML, CSS, and
JavaScript — no SQL, no database.**

> **This is a demo.** Lawyer profiles, reviews, ratings, and IBP numbers are
> fictional sample data generated for this project. It does not represent a
> real legal service.

![stack](https://img.shields.io/badge/stack-PHP%20%C2%B7%20HTML%20%C2%B7%20CSS%20%C2%B7%20JS-6E1423)
![no database](https://img.shields.io/badge/database-none%20(JSON%20files)-A9812E)

---

## Live demo

Deployed as a static site on Vercel: `https://your-project-name.vercel.app`
_(replace with your actual deployment URL once live)_

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, practice areas, how-it-works, featured lawyers, testimonials |
| Directory | `lawyers.html` | Full lawyer list with search + filters (specialty, consultation mode) |
| Booking | `booking.html` | 3-step booking form: lawyer & schedule → your details → review & confirm |
| About | `about.html` | Platform story, stats, and a note for reviewers |
| Contact | `contact.html` | General contact form (not for legal advice) |

## Tech notes — why there's no database

The brief for this sample intentionally excludes SQL. Instead:

- **`data/lawyers.json`** is the single source of truth for the lawyer
  directory. Every page fetches it directly as a static file — this works
  identically on Vercel, GitHub Pages, or a local server, since it's just a
  plain HTTP GET of a JSON file.
- **`php/get-lawyers.php`** and **`php/book.php`** are included as a real,
  working PHP example: they read/write flat JSON files under `data/` with
  file locking (`flock`) to avoid clobbering concurrent writes. Run these
  locally (Laragon, XAMPP, or `php -S localhost:8000`) to see a genuine
  PHP + JSON backend in action.
- **On Vercel**, PHP isn't executed by default on static hosting, and even a
  PHP runtime there would have a **read-only filesystem**, so `book.php`
  couldn't persist bookings between requests anyway. The front end handles
  this gracefully: `js/booking.js` and `js/contact.js` try the PHP endpoint
  first, and if it's unreachable, fall back to storing the submission in the
  browser's `localStorage` — so the booking flow, confirmation screen, and
  docket reference number all still work end-to-end on the deployed demo.

In short: **build/run it locally with Laragon and it's a real PHP + JSON
mini-backend; deploy it to Vercel and it's a fully working front-end demo of
the same flow.** Swap the JSON files for real database calls in `php/*.php`
whenever you're ready to take this from sample to production.

## Project structure

```
lawbook-ph/
├── index.html
├── lawyers.html
├── booking.html
├── about.html
├── contact.html
├── css/
│   └── style.css              # full design system (tokens, layout, components)
├── js/
│   ├── main.js                 # nav toggle, shared data loader
│   ├── directory.js             # directory rendering + filtering
│   ├── booking.js                # 3-step booking form logic
│   ├── contact.js                 # contact form logic
│   └── lawyers-data.js             # inline fallback copy of data/lawyers.json
├── php/
│   ├── config.php               # shared helpers (JSON read/append, sanitization)
│   ├── get-lawyers.php           # GET  → returns data/lawyers.json
│   ├── book.php                  # POST → validates + appends to data/bookings.json
│   └── contact.php               # POST → validates + appends to data/messages.json
├── data/
│   ├── lawyers.json             # sample directory (8 fictional PH lawyers)
│   ├── bookings.json            # starts empty; written to by book.php locally
│   └── messages.json            # starts empty; written to by contact.php locally
├── vercel.json                  # clean URLs + cache headers for static hosting
└── .gitignore
```

## Running locally (Laragon / XAMPP)

1. Clone or copy this folder into your Laragon `www/` directory (or XAMPP's
   `htdocs/`).
2. Start Apache from Laragon's control panel.
3. Open `http://lawbook-ph.test` (Laragon's auto virtual host) or
   `http://localhost/lawbook-ph/` in your browser.
4. Make a booking — check `data/bookings.json` afterwards to see the record
   PHP just wrote.

No `composer install`, no database setup, no `.env` file required.

Prefer the command line? From the project root:

```bash
php -S localhost:8000
```

Then visit `http://localhost:8000`.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New Project → Import** the repository.
3. Framework preset: **Other** (or "Static"). No build command, no output
   directory override needed — `vercel.json` already points Vercel at the
   project root.
4. Deploy. The site works immediately with no environment variables and no
   database provisioning.

## Design notes

The visual language is drawn from the subject matter itself rather than a
generic "professional services" template: a deep ink-navy and muted brass
palette echoes Philippine judicial regalia, the hero uses a tilted "docket
file" as its centerpiece instead of a stock photo, and the lawyer directory
is styled as a row of folder tabs rather than identical shadowed cards. Type
pairs a serif (Source Serif 4) for headings — legible, document-like — with
IBM Plex Sans for body text and UI.

## Credits

Built as a solo portfolio project. Icons are hand-drawn inline SVGs (no icon
library dependency). Fonts loaded from Google Fonts (Source Serif 4, IBM
Plex Sans, IBM Plex Mono).
