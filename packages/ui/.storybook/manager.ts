import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";

import { pavetraTheme } from "./theme";

addons.setConfig({
  theme: pavetraTheme,
});
