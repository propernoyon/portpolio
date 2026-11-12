# mdnoyon.com — TypeScript version

Portfolio page + SMS sender, built with Vite and TypeScript, deployed on Vercel.

## Structure
- `index.html` — portfolio page (same markup as the old `index.php`)
- `sms.html` — SMS sender page (same markup as the old `sms.php`)
- `src/main.ts`, `src/scripts/*.ts` — site scripts (old `main.js`, `ripple.js`, `wow-anim.js`, `contact-form-script.js`)
- `src/sms.ts` — SMS form script
- `src/types/globals.d.ts` — types for the jQuery plugins
- `api/sms.ts` — Vercel serverless function that calls the GreenWeb SMS API
- `api/contact.ts` — emails "Contact Now" form messages to you via Resend
- `public/` — CSS, fonts, images and third-party jQuery plugins, served unchanged

## Run locally
    npm install
    npm run dev          # pages only
    npx vercel dev       # pages + /api/sms (needs SMS_API_TOKEN in .env)

## Deploy
1. Push to GitHub.
2. Vercel → Add New → Project → import the repo. Set **Root Directory** to `portfolio-ts`.
3. Settings → Environment Variables → add `SMS_API_TOKEN`, `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (see `.env.example`).
4. Settings → Domains → add `mdnoyon.com` and `www.mdnoyon.com`, then update DNS at your registrar.
