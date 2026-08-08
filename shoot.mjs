import { chromium } from "playwright";

const OUT =
  "C:/Users/Rakib/AppData/Local/Temp/claude/d--paymensave-rebranding-landing/74db4598-9186-437e-8e7a-9329205c1218/scratchpad";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1512, height: 780 } });

const errors = [];
const failed = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`[console] ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`[pageerror] ${e}`));
page.on("requestfailed", (r) =>
  failed.push(`[requestfailed] ${r.url().slice(0, 120)} — ${r.failure()?.errorText}`)
);
page.on("response", (r) => {
  if (r.status() >= 400)
    failed.push(`[http ${r.status()}] ${r.url().slice(0, 120)}`);
});

await page.goto("http://localhost:3111", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

const h = await page.evaluate(() => document.body.scrollHeight);
console.log("page height:", h);

// Sweep the whole page in viewport-sized steps
const step = 700;
const checkpoints = [2000, 6000, 10500, 14500, 18500];
for (let y = 0; y <= h - 780; y += step) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(280);
}
for (const y of checkpoints) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}/sweep-${y}.png` });
  console.log(`checkpoint ${y}`);
}

await browser.close();
console.log("CONSOLE/PAGE ERRORS:\n" + (errors.join("\n") || "(none)"));
console.log("FAILED REQUESTS:\n" + (failed.join("\n") || "(none)"));
