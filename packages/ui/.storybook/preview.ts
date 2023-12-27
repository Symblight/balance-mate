import type { Preview } from "@storybook/web-components";
import { themes } from "@storybook/theming";

import { pavetraTheme } from "./theme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // docs: {
    //   theme: {
    //     ...themes.normal,
    //     ...pavetraTheme,
    //   },
    // },
  },
};

export default preview;
