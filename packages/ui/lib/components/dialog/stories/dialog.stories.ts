import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";

// import "../../../styles/theme.css";
import "../dialog.ts";
import "../../button/button.ts";
import "../../text-field/text-field.ts";

import type PvDialogProps from "../dialog.ts";

function Template({ open }: PvDialogProps) {
  function handleToggle() {
    const dialog = document.querySelector("pv-dialog");

    if (!dialog) return;

    if (!dialog.open) {
      dialog.show();
    } else {
      dialog.close();
    }
  }
  return html`
    <pv-button @click=${handleToggle}>Open</pv-button>
    <pv-dialog headerTitle="Dialog test">
      <div>
        <form>
          Hello world
          <pv-text-field></pv-text-field>
        </form>
      </div>
      <div slot="footer">
        <pv-button @click=${handleToggle}>Submit</pv-button>
        <pv-button @click=${handleToggle} variant="secondary">Cancel</pv-button>
      </div>
    </pv-dialog>
  `;
}

const meta = {
  title: "Dialog",
  component: "pv-dialog",
  tags: ["autodocs"],
  render: Template,
  argTypes: {
    open: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<PvDialogProps>;
export default meta;

type Story = StoryObj<PvDialogProps>;
export const Regular: Story = {
  args: {},
};
