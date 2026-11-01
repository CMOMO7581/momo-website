# Site content

Everything a visitor reads lives in this folder. Edit a file, commit, and push; Vercel rebuilds the site.

- `en.json` and `zh.json` hold the English and Traditional Chinese copy. Each key appears in both files with the same name. Values can contain simple HTML such as `<strong>`, `<a href="…">`, and `<span class="fig">` (the orange headline numbers). If you add a key to one file, add it to the other too, or the build will fail.
- `links.json` holds the project and writing links. Leave a value as `""` to hide that link.
- `site.json` holds the Formspree form ID (`formspreeId`).

The resume PDFs go in `public/resume/` as `Momo-Chen-Resume-EN.pdf` and `Momo-Chen-Resume-ZH.pdf`. Each Download button turns on once its file is there.
