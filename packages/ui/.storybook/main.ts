import type { StorybookConfig } from "@storybook/web-components-vite";

import { join, dirname } from "node:path";

//export const title = 'Pavetra Design System';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../lib/**/*.stories.@(js|ts)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {
      builder: {
        viteConfigPath: ".storybook/vite.config.ts",
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
