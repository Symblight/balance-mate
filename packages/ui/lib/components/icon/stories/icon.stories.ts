import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";

import "../../../styles/theme.css";
import "../icon.ts";

import type PvIconProps from "../icon.ts";

import { iconsLibrary } from "../../../icons/index.ts";

function Template() {
  return html` ${Object.keys(iconsLibrary).map(
    (name) => html`<pv-icon name=${name}></pv-icon> `
  )}`;
}

const meta = {
  title: "Icons",
  component: "pv-icon",
  tags: ["autodocs"],
  render: Template,
} satisfies Meta<PvIconProps>;
export default meta;

type Story = StoryObj<PvIconProps>;
export const Regular: Story = {
  args: { },
};
