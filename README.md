# Momo Chen — personal site

A static Next.js + TypeScript site. English is at `/`, Traditional Chinese at `/zh/`.

## Everyday edits

All visitor-facing text, links and settings live in [`content/`](content/README.md):

| To change… | Edit |
| --- | --- |
| Any wording, English or Chinese | `content/en.json`, `content/zh.json` |
| Project and writing links (blank = hidden) | `content/links.json` |
| Site address, Formspree form ID | `content/site.json` |
| Resume PDFs | `public/resume/Momo-Chen-Resume-EN.pdf`, `…-ZH.pdf` |
| Headshot | `public/headshot.jpg` (480×600) and `public/headshot.avif` (400×500) |

Commit and push to `main`, and Vercel rebuilds the site in about a minute.

## Run it locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000. `npm run build` makes the production version in `out/`.

The build first runs `npm run fonts`, which downloads Noto Sans TC and Noto Serif TC trimmed to the Chinese characters the site uses (about 120 KB instead of megabytes). After you edit Chinese copy, run a build or `npm run fonts` once so the new characters are included, and commit the updated files in `app/fonts/`. Vercel also runs it on every deploy.

## Deploy to Vercel

1. **Put the code on GitHub.** Create an empty repository at https://github.com/new (for example `momo-website`, no README). Then, in this folder:

   ```bash
   git remote add origin https://github.com/<your-username>/momo-website.git
   ```

   ```bash
   git push -u origin main
   ```

2. **Import it into Vercel.** Sign in at https://vercel.com with GitHub, choose **Add New → Project**, and pick the repository. Vercel detects Next.js; keep the defaults (build command `npm run build`) and click **Deploy**.

3. **Set the site address.** Vercel gives you a URL such as `momo-website.vercel.app`. Put the address you'll actually use (the custom domain, if you have one) in `content/site.json` as `url`, then commit and push. Share previews, the canonical links, hreflang tags and the sitemap all use it.

## Contact form (Formspree)

1. Create a free account at https://formspree.io using **cmomo7581@gmail.com** (or set it as the form's notification email), and confirm that address from the email Formspree sends.
2. Create a new form. Its endpoint looks like `https://formspree.io/f/abcdwxyz`; the last part (`abcdwxyz`) is the form ID.
3. Put it in `content/site.json` as `formspreeId`, commit and push.
4. Send a test message from the live site. The first submission may ask you to confirm the form in your inbox.

Spam protection: the form includes a hidden `_gotcha` field that people never see. Formspree discards submissions that fill it in, and the site doesn't send them at all. The free plan allows 50 submissions a month.

## Custom domain

1. Buy a domain from any registrar (Cloudflare, Namecheap, Porkbun, …).
2. In Vercel, open the project → **Settings → Domains**, add `yourdomain.com`, and also add `www.yourdomain.com` set to redirect to it.
3. Vercel shows the DNS records to add at your registrar, usually an **A** record for `@` pointing to Vercel's IP and a **CNAME** for `www` pointing to `cname.vercel-dns.com`. Use the exact values Vercel shows.
4. Wait for the domain to show **Valid Configuration** (minutes to a few hours). Vercel issues the HTTPS certificate on its own.
5. Update `url` in `content/site.json` to `https://yourdomain.com`, commit and push.

## After launch

- Check the share preview with https://www.opengraph.xyz or by pasting the link into LinkedIn's Post Inspector (https://www.linkedin.com/post-inspector/).
- Optionally add the site to Google Search Console (https://search.google.com/search-console) and submit `https://yourdomain.com/sitemap.xml`.
