import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendFolder = "/client/build/";
const targetDirectory = "/server/public";

const sourcePath = path.join(__dirname, "../../packages/", frontendFolder);
const targetPath = path.join(__dirname, "../../packages/", targetDirectory);

const clean = async () => {
  const targetExists = await fs
    .stat(targetPath)
    .then((stats) => stats.isDirectory())
    .catch(() => false);
  if (targetExists) {
    await fs.rm(targetPath, { recursive: true });
  }

  await fs.mkdir(targetPath, { recursive: true });
};

(async function moveFolder() {
  try {
    await clean();
    const files = await fs.readdir(
      path.join(__dirname, "../../packages/", frontendFolder),
    );

    for (const file of files) {
      const targetStats = await fs.stat(targetPath);

      const sourcePathFile = path.join(sourcePath, file);
      const targetPathFile = path.join(targetPath, file);

      if (targetStats.isFile()) {
        await fs.unlink(targetPath);
      }

      await fs.rename(sourcePathFile, targetPathFile);
    }
  } catch (err) {
    console.error("Error", err);
  }
})();
