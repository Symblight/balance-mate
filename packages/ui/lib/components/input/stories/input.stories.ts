import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";

import "../../../styles/theme.css";
import "../input.ts";

import type PvInputProps from "../input.ts";

function Template({
  slot,
  disabled = false,
  readOnly = false,
  size,
  value,
}: PvInputProps) {
  function handleChange(e) {
    console.log(e.target.value, "value");
  }
  return html`
    <pv-input
      ?disabled=${disabled}
      ?readOnly=${readOnly}
      size=${size}
      value=${value}
      @change=${handleChange}
    >
      ${slot}
    </pv-input>
  `;
}

const meta = {
  title: "Input",
  component: "pv-input",
  tags: ["autodocs"],
  render: Template,
  argTypes: {
    size: {
      options: ["xs", "s", "m", "l"],
      control: { type: "select" }, // Automatically inferred when 'options' is defined
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
    value: {
      control: { type: "text" },
    },
  },
} satisfies Meta<PvInputProps>;
export default meta;

type Story = StoryObj<PvInputProps>;
export const Regular: Story = {
  args: {
    disabled: false,
    readOnly: false,
    size: "m",
    value: "",
  },
};

export const SuffixPrefix: Story = {
  args: {
    slot: html` <pv-icon slot="suffix" name="close"></pv-icon
      ><pv-icon slot="prefix" name="edit"></pv-icon>` as unknown as string,
  },
};
