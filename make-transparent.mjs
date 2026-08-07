import sharp from "sharp";

// [src, out, mode] — mode "light" keys near-white bgs, "dark" keys near-black
const FILES = [
  ["public/devices/ps-one-side.png", "public/devices/ps-one-side-t.png", "light"],
  ["public/devices/ps-one-upright.jpg", "public/devices/ps-one-upright-t.png", "light"],
  ["public/devices/ps-one-duo.jpg", "public/devices/ps-one-duo-t.png", "light"],
  ["public/devices/images.jpg", "public/devices/ps-one-angle-t.png", "dark"],
  ["public/devices/images (3).jpg", "public/devices/ps-one-flat-t.png", "dark"],
];

const isBgLight = (r, g, b) =>
  Math.min(r, g, b) >= 230 && Math.max(r, g, b) - Math.min(r, g, b) <= 18;
const isBgDark = (r, g, b) => Math.max(r, g, b) <= 48;
const featherLight = (r, g, b) => {
  if (Math.min(r, g, b) >= 205 && Math.max(r, g, b) - Math.min(r, g, b) <= 22) {
    return Math.round(255 * (1 - (Math.min(r, g, b) - 205) / 50));
  }
  return null;
};
const featherDark = (r, g, b) => {
  const maxV = Math.max(r, g, b);
  if (maxV <= 80) return Math.round(255 * ((maxV - 48) / 32));
  return null;
};

for (const [src, out, mode] of FILES) {
  const isBg = mode === "dark" ? isBgDark : isBgLight;
  const feather = mode === "dark" ? featherDark : featherLight;

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const px = data;

  const idx = (x, y) => (y * W + x) * 4;
  const cleared = new Uint8Array(W * H);

  const queue = [];
  const tryPush = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = y * W + x;
    if (cleared[i]) return;
    const o = i * 4;
    if (isBg(px[o], px[o + 1], px[o + 2])) {
      cleared[i] = 1;
      queue.push(x, y);
    }
  };
  for (let x = 0; x < W; x++) {
    tryPush(x, 0);
    tryPush(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    tryPush(0, y);
    tryPush(W - 1, y);
  }
  while (queue.length) {
    const y = queue.pop();
    const x = queue.pop();
    tryPush(x + 1, y);
    tryPush(x - 1, y);
    tryPush(x, y + 1);
    tryPush(x, y - 1);
  }
  for (let i = 0; i < W * H; i++) if (cleared[i]) px[i * 4 + 3] = 0;

  for (let pass = 0; pass < 6; pass++) {
    const touch = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const o = idx(x, y);
        if (px[o + 3] < 255) continue;
        const nb = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ].some(([nx, ny]) => {
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) return false;
          return px[idx(nx, ny) + 3] < 255;
        });
        if (!nb) continue;
        const a = feather(px[o], px[o + 1], px[o + 2]);
        if (a !== null) touch.push([o, Math.max(0, Math.min(254, a))]);
      }
    }
    if (!touch.length) break;
    for (const [o, a] of touch) px[o + 3] = Math.min(px[o + 3], a);
  }

  await sharp(px, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toFile(out);
  console.log(`done: ${out} (${mode})`);
}
