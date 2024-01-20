import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { optimize } from "svgo";
import esbuild from "esbuild";

const renderTemplate = ({ svgCode, name }) => `'${name}': '${svgCode}'`;

const getIconFileData = async (iconFolder, file) => {
  const content = await fs.readFile(path.join(iconFolder, file), "utf8");
  const hasFillNone = content.includes('fill="none"');

  const svg = optimize(content, {
    path: path.join(iconFolder, file),
    multipass: true,
    plugins: [
      {
        name: "removeAttrs",
        params: {
          attrs: "(height|width|fill|stroke)",
        },
      },
      {
        name: "addAttributesToSVGElement",
        params: {
          attributes: [
            { fill: hasFillNone ? "none" : "currentColor" },
            {
              width: "1em",
            },
            {
              height: "1em",
            },
            {
              stroke: !hasFillNone ? "none" : "currentColor",
            },
          ],
        },
      },
    ],
  });

  const iconObject = renderTemplate({
    svgCode: svg.data,
    name: file.replace(".svg", ""),
  });

  const iconBody = iconObject.trimEnd();

  return iconBody;
};

const getIconsCode = async (iconFolder) => {
  const store = "export const iconsLibrary: Record<string, string> = {";
  const files = await fs.readdir(iconFolder);

  const icons = files.map((file) => {
    if (!file.includes(".svg")) {
      return;
    }
    return getIconFileData(iconFolder, file);
  });
  const body = await Promise.all(icons);
  return `${body.reduce((acc, item) => (acc += `\n${item},`), store)}\n}`;
};

const generate = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const iconFolder = path.resolve(__dirname, `../lib/icons/svgs`);
  const outputIconPath = path.join(__dirname, "../lib/icons/index.ts");
  const result = await getIconsCode(iconFolder);
  await fs.writeFile(outputIconPath, result);
};

async function buildLib() {
  esbuild
    .build({
      entryPoints: ["lib/icons/index.mjs"],
      bundle: true,
      outdir: "dist",
      minify: true,
      format: "esm",
      //  treeShaking: true,
      // legalComments: 'external',
      plugins: [
        // minifyHTMLLiteralsPlugin(),
        // gzipPlugin({
        //   gzip: true,
        // }),
      ],
      // write: false,
      // splitting: true,
      //  outfile: "dist/index.js",
    })
    .catch((e) => {
      process.exit(1);
    });
}

async function build() {
  await generate();
  // await buildLib();
}

build();
