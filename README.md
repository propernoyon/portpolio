# mdnoyon.com

Portfolio of Md Noyon (Toriqul Islam Noyon). Static pages built with Vite and TypeScript, deployed on Vercel.

## Run locally
    npm install
    npm run dev          # pages only
    npx vercel dev       # pages + /api/contact and /api/sms (needs the keys from .env.example in .env)
    npm run build        # type-check and build into dist/

## Where things are
- `index.html`, `about.html`, `services.html`, `projects.html`: page content and SEO tags.
- `site-chrome.ts`: the shared header, footer and career chart. Edit the menu, profile links or career history here once; every page picks it up at build time.
- `src/styles/site.css`: the whole design (colours, type, layout, motion, light and dark theme).
- `src/scripts/`: theme switch, header and mobile menu, scroll motion, work filter, contact form.
- `api/`: Vercel serverless functions for the contact form and the SMS page.
- `public/`: images, `robots.txt`, `sitemap.xml`, `404.html`.
