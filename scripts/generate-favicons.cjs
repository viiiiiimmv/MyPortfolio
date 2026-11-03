const { ImageResponse } = require("next/og");
const React = require("react");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const LOGO_PATH_D =
  "M 717 601 L 635 556 L 627 555 L 618 559 L 463 646 L 463 742 Z M 423 351 L 357 389 L 351 396 L 348 404 L 347 657 L 150 534 L 141 531 L 129 531 L 119 535 L 2 601 L 149 683 L 326 785 L 346 791 L 364 791 L 379 787 L 389 782 L 400 774 L 413 758 L 421 739 L 423 725 Z M 177 323 L 265 374 L 413 286 L 426 281 L 441 281 L 455 286 L 626 390 L 635 387 L 717 340 L 480 199 L 465 192 L 445 187 L 424 187 L 413 189 L 387 200 Z M 409 0 L 369 22 L 41 214 L 29 224 L 13 244 L 5 259 L 0 276 L 1 345 L 4 355 L 12 370 L 27 387 L 36 394 L 307 556 L 308 486 L 307 481 L 302 472 L 293 465 L 98 346 L 91 339 L 85 328 L 83 311 L 89 294 L 97 285 L 408 103 Z";

function createIcoFromPngs(pngList) {
  // pngList: Array<{ width: number, height: number, buffer: Buffer }>
  const count = pngList.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let dataOffset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  for (const item of pngList) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color palette (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // size of image data in bytes
    entry.writeUInt32LE(dataOffset, 12); // offset of image data
    dirEntries.push(entry);
    dataOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngList.map((p) => p.buffer)]);
}

async function renderLogoPng(dimension) {
  const pad = Math.max(2, Math.round(dimension * 0.14));
  const radius = Math.max(2, Math.round(dimension * 0.22));
  const borderWidth = dimension >= 64 ? 2 : 1;

  const res = new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          borderRadius: `${radius}px`,
          border: `${borderWidth}px solid rgba(52, 211, 153, 0.6)`,
          padding: `${pad}px`,
        },
      },
      React.createElement(
        "svg",
        {
          viewBox: "0 0 718 792",
          width: "100%",
          height: "100%",
          style: {
            display: "block",
          },
        },
        React.createElement("path", {
          d: LOGO_PATH_D,
          fill: "#FFFFFF",
          fillRule: "evenodd",
        })
      )
    ),
    { width: dimension, height: dimension }
  );

  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  console.log("Generating Shiv Chauhan favicon & app icons...");

  // 1. Generate ICO sizes: 16, 32, 48
  const icoSizes = [16, 32, 48];
  const pngEntries = [];

  for (const s of icoSizes) {
    const buf = await renderLogoPng(s);
    pngEntries.push({ width: s, height: s, buffer: buf });
    console.log(`✓ Rendered PNG ${s}x${s} (${buf.length} bytes)`);
  }

  const icoBuffer = createIcoFromPngs(pngEntries);
  const faviconIcoPath = path.join(rootDir, "app", "favicon.ico");
  fs.writeFileSync(faviconIcoPath, icoBuffer);
  console.log(`✓ Saved multi-size app/favicon.ico (${icoBuffer.length} bytes)`);

  // Also write public/favicon.ico for static server fallbacks
  const publicFaviconPath = path.join(rootDir, "public", "favicon.ico");
  fs.writeFileSync(publicFaviconPath, icoBuffer);
  console.log(`✓ Saved public/favicon.ico (${icoBuffer.length} bytes)`);

  // 2. Generate Apple Touch Icon: 180x180
  const appleTouchBuf = await renderLogoPng(180);
  const appleTouchPath = path.join(rootDir, "public", "apple-touch-icon.png");
  fs.writeFileSync(appleTouchPath, appleTouchBuf);
  fs.writeFileSync(path.join(rootDir, "app", "apple-icon.png"), appleTouchBuf);
  console.log(`✓ Saved public/apple-touch-icon.png and app/apple-icon.png (${appleTouchBuf.length} bytes)`);

  // 2b. Generate App standard icon: 32x32
  const png32Buf = await renderLogoPng(32);
  fs.writeFileSync(path.join(rootDir, "app", "icon.png"), png32Buf);
  fs.writeFileSync(path.join(rootDir, "public", "icon.png"), png32Buf);
  console.log(`✓ Saved app/icon.png & public/icon.png (32x32)`);

  // 3. Generate Android / PWA Icons: 192x192 and 512x512
  const pwa192Buf = await renderLogoPng(192);
  fs.writeFileSync(path.join(rootDir, "public", "icon-192.png"), pwa192Buf);
  console.log(`✓ Saved public/icon-192.png (${pwa192Buf.length} bytes)`);

  const pwa512Buf = await renderLogoPng(512);
  fs.writeFileSync(path.join(rootDir, "public", "icon-512.png"), pwa512Buf);
  console.log(`✓ Saved public/icon-512.png (${pwa512Buf.length} bytes)`);

  // 4. Generate High-Fidelity SVG Favicon (light & dark adaptive badge)
  const svgFaviconContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Shiv Chauhan Logo">
  <defs>
    <linearGradient id="scBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#059669" stop-opacity="0.4"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="#050505"/>
  <rect width="496" height="496" x="8" y="8" rx="104" fill="none" stroke="url(#scBorder)" stroke-width="12"/>
  <g transform="translate(96, 80) scale(0.445)">
    <path d="${LOGO_PATH_D}" fill="#FFFFFF" fill-rule="evenodd"/>
  </g>
</svg>
`;

  fs.writeFileSync(path.join(rootDir, "public", "favicon.svg"), svgFaviconContent);
  fs.writeFileSync(path.join(rootDir, "public", "shiv-chauhan-logo.svg"), svgFaviconContent);
  fs.writeFileSync(path.join(rootDir, "app", "icon.svg"), svgFaviconContent);
  console.log(`✓ Updated public/favicon.svg, app/icon.svg & public/shiv-chauhan-logo.svg`);

  // Clean up mjs file
  try {
    fs.unlinkSync(path.join(rootDir, "scripts", "generate-favicons.mjs"));
  } catch {}

  console.log("All icons generated successfully!");
}

main().catch((err) => {
  console.error("Icon generation error:", err);
  process.exit(1);
});

