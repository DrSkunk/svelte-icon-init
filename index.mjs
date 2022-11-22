import { create } from "create-svelte";
import { execa } from "execa";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

if (process.argv.length !== 3) {
  console.error("Usage: svelte <name>");
  process.exit(1);
} else {
  const name = process.argv[2];
  console.log("Creating project...");
  await create(name, {
    name,
    template: "skeleton",
    types: "null",
    prettier: true,
    eslint: true,
    playwright: false,
  });
  process.chdir(process.argv[2]);
  await execa("npm", ["install"]);
  await execa("npm", [
    "install",
    "-D",
    "tailwindcss",
    "postcss",
    "autoprefixer",
    "svelte-preprocess",
    "unplugin-icons",
  ]);

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const src = path.join(__dirname, "files");
  const dst = path.resolve(".");
  copyDir(src, dst);
  console.log(process.cwd());
}

function copyDir(src, dst) {
  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    const dstFile = path.join(dst, file);
    if (fs.lstatSync(srcFile).isDirectory()) {
      try {
        fs.mkdirSync(dstFile);
      } catch (error) {}
      copyDir(srcFile, dstFile);
    } else {
      fs.copyFileSync(srcFile, dstFile);
    }
  });
}
