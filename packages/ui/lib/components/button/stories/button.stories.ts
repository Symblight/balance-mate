import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

// import "../../../styles/theme.css";
import "../button.ts";
import "../../icon/icon.ts";

import type PvButtonProps from "../button.ts";

function Button({
  variant = "primary",
  children,
  danger = false,
  disabled = false,
  rounded = false,
  loading = false,
  size,
}: PvButtonProps) {
  return html`
    <pv-button
      variant=${variant}
      size=${size}
      ?danger=${danger}
      ?disabled=${disabled}
      ?rounded=${rounded}
      ?loading=${loading}
    >
      ${children}
    </pv-button>
  `;
}

const meta = {
  title: "Button",
  component: "pv-button",
  tags: ["autodocs"],
  render: Button,
  argTypes: {
    size: {
      options: ["xs", "s", "m", "l"],
      control: { type: "select" },
    },
    variant: {
      options: ["primary", "secondary", "inline", "ghost", "link"],
      control: { type: "select" },
    },
    danger: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
      type: "string",
      defaultValue: unsafeHTML(`Button`) as HTMLCollection,
    },
  },
} satisfies Meta<PvButtonProps>;
export default meta;

type Story = StoryObj<PvButtonProps>;

export const Regular: Story = {
  args: {
    children: unsafeHTML(`Button`) as HTMLCollection,
    disabled: false,
    danger: false,
    rounded: false,
    size: "m",
  },
};

export const WithIcon: Story = {
  args: {
    children: html` <pv-icon
      slot="icon"
      name="close"
    ></pv-icon>` as unknown as HTMLCollection,
    variant: "inline",
  },
};

export const WithIconContent: Story = {
  args: {
    children: html`Sign out
      <pv-icon
        slot="icon"
        name="log-out"
      ></pv-icon>` as unknown as HTMLCollection,
    variant: "primary",
  },
};
