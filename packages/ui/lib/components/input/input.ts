import {
  CSSResultGroup,
  CSSResultOrNative,
  LitElement,
  html,
  nothing,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";

import styles from "./input.css?inline";

export type InputSize = "xs" | "s" | "m" | "l";

/**
 * @tag pv-input
 * @summary Pavetra Input web component
 */

@customElement("pv-input")
export default class PvInput extends LitElement {
  private prefixSlot: boolean;

  private suffixSlot: boolean;

  constructor() {
    super();

    this.prefixSlot = false;
    this.suffixSlot = false;
  }

  static get styles(): CSSResultGroup {
    return [styles as unknown as CSSResultOrNative];
  }

  @property({ type: String, attribute: true })
  name = "";

  @property({ type: String, attribute: true })
  error = "";

  @property({ type: String, attribute: true })
  placeholder = "";

  @property({ type: Boolean, attribute: true })
  success = false;

  @property({ type: Boolean, attribute: true })
  active = false;

  @state()
  private _isFocusVisible: boolean = false;

  @property({ type: Boolean, attribute: true, reflect: true })
  disabled = false;

  @property({ type: String, attribute: true })
  size: InputSize = "m";

  @property({ type: Boolean, attribute: true, reflect: true })
  readOnly = false;

  /**
   * The current value of the text field. It is always a string.
   */
  @property()
  value = "";

  private handleChange(event: InputEvent) {
    if (this.disabled) return;
    this.value = ((event.target as HTMLInputElement) || null)?.value;
    this.dispatchEvent(new Event("change"));
  }

  private handleFocus() {
    if (!this.disabled) {
      this._isFocusVisible = true;
    }
    const event = new Event("focus", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  }

  private handleBlur() {
    this._isFocusVisible = false;
    const event = new Event("blur", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    
    const slots = Array.from(this.shadowRoot?.host.children || []).map(
      (element) => element.attributes.getNamedItem("slot")
    );
    const suffixSlot = slots.find((slot) => slot?.nodeValue === "suffix");
    const prefixSlot = slots.find((slot) => slot?.nodeValue === "prefix");

    this.suffixSlot = !!suffixSlot;
    this.prefixSlot = !!prefixSlot;
  }

  private renderPrefix() {
    if (!this.prefixSlot) return nothing;
    return html` <div class="input__affix_space_left">
      <div class="input__affix"><slot name="prefix"></slot></div>
    </div>`;
  }

  private renderSuffix() {
    if (!this.suffixSlot) return nothing;
    return html` <div class="input__affix_space_right">
      <div class="input__affix"><slot name="suffix"></slot></div>
    </div>`;
  }

  render() {
    return html`<div
      part="box"
      class="input ${classMap({
        input_error: this.error,
        input_success: this.success,
      })}"
      data-focus=${this._isFocusVisible || this.active}
      aria-disabled=${this.disabled}
    >
      ${this.renderPrefix()}
      <input
        part="input"
        ?readonly=${this.readOnly}
        ?disabled=${this.disabled}
        .placeholder=${this.placeholder}
        .value=${live(this.value)}
        .id=${this.id}
        @input=${this.handleChange}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        class="input__control ${classMap({
          input__control_space_r: this.prefixSlot,
          input__control_space_l: this.suffixSlot,
          input__control_xs: this.size === "xs",
          input__control_s: this.size === "s",
          input__control_m: this.size === "m",
          input__control_l: this.size === "l",
          input__control_disabled: this.disabled,
        })}"
      />
      ${this.renderSuffix()}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pv-input": PvInput;
  }
}
