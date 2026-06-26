// Tiny zero-dependency static file server for the Wanderlines slice.
// Usage: node serve.mjs [port]
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.argv[2]) || 5173;
const TYPES = {
  ".html": "text/html", ".css": "text/css", ".mjs": "text/javascript",
  ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml",
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(req.url.split("?")[0]);
    if (path === "/") path = "/index.html";
    const file = join(ROOT, normalize(path).replace(/^(\.\.[/\\])+/, ""));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end("forbidden"); return; }
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end("not found");
  }
}).listen(PORT, () => console.log(`Wanderlines on http://127.0.0.1:${PORT}`));
