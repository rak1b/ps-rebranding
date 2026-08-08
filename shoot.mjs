import { chromium } from "playwright";

const OUT =
  "C:/Users/Rakib/AppData/Local/Temp/claude/d--paymensave-rebranding-landing/74db4598-9186-437e-8e7a-9329205c1218/scratchpad";
const browser = await chromium.launch();

// Normal render
const page = await browser.newPage({ viewport: { width: 1512, height: 780 } });
await page.goto("http://localhost:3111", { waitUntil: "networkidle" });
await page.waitForTimeout(2600);
await page.screenshot({ path: `${OUT}/v16-js.png` });
console.log("shot with JS");
await page.close();

// JavaScript disabled — simulates the broken-hydration case
const ctx = await browser.newContext({
  viewport: { width: 1512, height: 780 },
  javaScriptEnabled: false,
});
const noJs = await ctx.newPage();
await noJs.goto("http://localhost:3111", { waitUntil: "load" });
await noJs.waitForTimeout(2600);
await noJs.screenshot({ path: `${OUT}/v16-nojs.png` });
console.log("shot without JS");

await browser.close();
console.log("done");
