import { chromium } from "playwright-core";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DIR = "/Users/sebastianlozano/Projects/experiment-skills/category-tiles-brief-media";
const URL = `file://${DIR}/mockup.html`;

const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });

// Side-by-side grid (control vs variant)
const ctx = await browser.newContext({ viewport: { width: 1100, height: 1280 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(300);
await page.screenshot({ path: `${DIR}/category-tiles-grid.png`, fullPage: true });
console.log("Saved category-tiles-grid.png");

// Per-column crops for inline use in the brief
const labels = ["control", "variant"];
const cols = await page.locator(".col").all();
for (let i = 0; i < cols.length; i++) {
  await cols[i].screenshot({ path: `${DIR}/category-tiles-${labels[i]}.png` });
  console.log(`Saved category-tiles-${labels[i]}.png`);
}

await browser.close();
