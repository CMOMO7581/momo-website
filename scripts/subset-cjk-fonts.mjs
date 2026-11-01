// Downloads Noto Sans TC and Noto Serif TC trimmed to only the non-ASCII characters each page uses.
// The full fonts weigh megabytes; these subsets are a few dozen KB. Runs before every build, so
// new Chinese copy in content/*.json is always covered. If Google Fonts is unreachable, the
// committed files in app/fonts/ are kept.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const components = readdirSync(join(root, "components")).filter((f) => f.endsWith(".tsx"))
  .map((f) => readFileSync(join(root, "components", f), "utf8")).join("");
const nonAscii = (text) => [...new Set([...text].filter((c) => c.codePointAt(0) > 127))].sort().join("");

// Which copy keys render in which face, following app/globals.css. Body text (Noto Sans 400) gets
// every character, so a key that ends up elsewhere still has a Chinese glyph to fall back on.
const SERIF = /^(tagline|nav\..+|ui\.(dark|light)|(about|work|exp|wr|sk|r|c)\.h|w\d\.t|e\d\.[to]|wr\d\.[to]|sk\.(fin|code|tools|lang|hon))$/;
const SERIF_BOLD = /^about\.h$/;
const SANS_BOLD = /^(c\.status|r\.dl|ui\.soon|f\.submit|c\.copy|ui\.copied|ui\.selected)$/;
const boldMarkup = /<strong>([\s\S]*?)<\/strong>|<span class="fig">([\s\S]*?)<\/span>/g;

function charsFor(lang) {
  const copy = JSON.parse(readFileSync(join(root, "content", `${lang}.json`), "utf8"));
  const pick = (re) => Object.entries(copy).filter(([k]) => re.test(k)).map(([, v]) => v).join("");
  const bold = Object.values(copy).map((v) => [...v.matchAll(boldMarkup)].map((m) => m[1] ?? m[2]).join("")).join("");
  return {
    "noto-sans-tc-400": nonAscii(Object.values(copy).join("") + components),
    "noto-sans-tc-600": nonAscii(pick(SANS_BOLD) + bold + components),
    "noto-serif-tc-400": nonAscii(pick(SERIF) + components),
    "noto-serif-tc-600": nonAscii(pick(SERIF_BOLD) + components),
  };
}

const families = { "noto-sans-tc": "Noto Sans TC", "noto-serif-tc": "Noto Serif TC" };
// A modern browser user agent makes Google Fonts answer with woff2.
const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

try {
  for (const lang of ["en", "zh"]) {
    for (const [name, chars] of Object.entries(charsFor(lang))) {
      const [, file, weight] = name.match(/^(.+)-(\d+)$/);
      const css = await (await fetch(
        `https://fonts.googleapis.com/css2?family=${encodeURIComponent(families[file])}:wght@${weight}&text=${encodeURIComponent(chars)}`,
        { headers: { "User-Agent": ua } },
      )).text();
      const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
      if (!url) throw new Error(`No font URL for ${name}`);
      const font = Buffer.from(await (await fetch(url)).arrayBuffer());
      writeFileSync(join(root, "app", "fonts", `${file}-${lang}-${weight}.woff2`), font);
      console.log(`${file}-${lang}-${weight}.woff2: ${chars.length} characters, ${(font.length / 1024).toFixed(1)} KB`);
    }
  }
} catch (err) {
  console.warn(`Could not refresh Chinese font subsets (${err.message}); using the committed files.`);
}
