import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";

import "../text-field.ts";
import "../../icon/icon.ts";

import type PvTextFieldProps from "../text-field.ts";

function Template({
  slot,
  disabled = false,
  readOnly = false,
  size,
  value,
  type,
  invalid,
  valid,
  placeholder,
  multiline,
}: PvTextFieldProps) {
  function handleChange(e) {
    console.log(e.target.value, "value");
  }
  return html`
    <pv-text-field
      ?disabled=${disabled}
      ?readOnly=${readOnly}
      ?invalid=${invalid}
      ?valid=${valid}
      ?multiline=${multiline}
      size=${size}
      placeholder=${placeholder}
      value=${value}
      type=${type}
      @change=${handleChange}
    >
      ${slot}
    </pv-text-field>
  `;
}

const meta = {
  title: "TextField",
  component: "pv-text-field",
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
    multiline: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
    invalid: {
      control: { type: "boolean" },
    },
    valid: {
      control: { type: "boolean" },
    },
    type: {
      options: ["number", "text", "password"],
      control: { type: "select" }, // Automatically inferred when 'options' is defined
    },
    placeholder: {
      control: { type: "text" },
    },
  },
} satisfies Meta<PvTextFieldProps>;
export default meta;

type Story = StoryObj<PvTextFieldProps>;
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

export const Invalid: Story = {
  args: {
    invalid: true,
    valid: false,
  },
  render: ({ invalid, valid }) => {
    function handleSubmit(e: Event) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      console.log(formData);
    }

    return html`<form @submit=${handleSubmit}>
      <label for="text-field">Username</label
      ><pv-text-field
        id="text-field"
        name="username"
        ?invalid=${invalid}
        ?valid=${valid}
      >
        <span slot="help-text"
          >This field is required. Please be "Positive"</span
        >
      </pv-text-field>
      <label for="text-field">Email</label
      ><pv-text-field
        type="email"
        id="email"
        name="email"
        ?invalid=${invalid}
        ?valid=${valid}
      >
        <span slot="help-text">This field is required</span>
      </pv-text-field>
      <pv-button type="submit">Submit</pv-button>
    </form> `;
  },
};


export const Textarea: Story = {
  render: Template,
  args: {
    multiline: true
  },
};