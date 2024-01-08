import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";

// import "../../../styles/theme.css";
import "../avatar.ts";

import type PvAvatarProps from "../avatar.ts";

function Avatar({ size, src }: PvAvatarProps) {
  return html`<pv-avatar size=${size} src=${src}></pv-avatar> `;
}

export default {
  title: "Avatar",
  component: "pv-avatar",
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["xs", "s", "m", "l"],
      control: { type: "select" },
    },
    src: {
      control: { type: "text" },
    },
  },
  render: Avatar,
} satisfies Meta<PvAvatarProps>;

type Story = StoryObj<PvAvatarProps>;
export const Regular: Story = {
  args: {
    src: "https://www.emmys.com/sites/default/files/styles/bio_pics_detail/public/Hugh-Laurie-bio-450x600.jpg?itok=UUhQIccE",
  },
};
