import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";

// import "../../../styles/theme.css";
import "../spin.ts";

import type PvSpinProps from "../spin.ts";

function Spin({ size }: PvSpinProps) {
  return html` <pv-spin size=${size}> </pv-spin> `;
}

const meta = {
  title: "Spin",
  component: "pv-spin",
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["xs", "s", "m", "l"],
      control: { type: "select" },
    },
  },
  render: Spin,
} satisfies Meta<PvSpinProps>;
export default meta;

type Story = StoryObj<PvSpinProps>;
export const Regular: Story = {
  args: {},
};
