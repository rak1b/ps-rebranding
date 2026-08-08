import { chromium } from "playwright";

const OUT =
  "C:/Users/Rakib/AppData/Local/Temp/claude/d--paymensave-rebranding-landing/74db4598-9186-437e-8e7a-9329205c1218/scratchpad";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1512, height: 780 } });

const logs = [];
page.on("console", (m) => {
  if (m.type() === "error") logs.push(`[${m.type()}] ${m.text()}`);
});
page.on("pageerror", (e) => logs.push(`[pageerror] ${e}`));

await page.goto("http://localhost:3111", { waitUntil: "networkidle" });
await page.waitForTimeout(2600);

await page.evaluate((v) => window.scrollTo(0, v), 1060);
await page.waitForTimeout(2800);
await page.screenshot({ path: `${OUT}/v18-flow.png` });
console.log("shot flow act");

await page.evaluate((v) => window.scrollTo(0, v), 7450);
await page.waitForTimeout(2600);
await page.screenshot({ path: `${OUT}/v18-neon.png` });
console.log("shot neon");

await browser.close();
console.log("ERRORS:\n" + (logs.join("\n") || "(none)"));
