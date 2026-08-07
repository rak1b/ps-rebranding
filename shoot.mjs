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
await page.screenshot({ path: `${OUT}/v15-glance.png` });
console.log("shot glance");

for (const y of [1400, 1950]) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${OUT}/v15-${y}.png` });
  console.log(`shot ${y}`);
}
await browser.close();
console.log("ERRORS:\n" + (logs.join("\n") || "(none)"));
