import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await cp(resolve(root, "out"), resolve(dist, "client"), { recursive: true });
await cp(resolve(root, "worker", "index.js"), resolve(dist, "server", "index.js"));

const hosting = JSON.parse(await readFile(resolve(root, ".openai", "hosting.json"), "utf8"));
await mkdir(resolve(dist, ".openai"), { recursive: true });
await writeFile(
  resolve(dist, ".openai", "hosting.json"),
  `${JSON.stringify(hosting, null, 2)}\n`,
  "utf8",
);
