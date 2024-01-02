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
import { when } from "lit/directives/when.js";
import { FormControlMixin } from "@open-wc/form-control";

import { generateUniqueKey } from "../../shared/gen-id.ts";

import "../icon/icon.ts";

import styles from "./text-field.css?inline";

export type TextFieldSize = "xs" | "s" | "m" | "l";

const textFieldGeneratorKeys = generateUniqueKey("text-field-");

/**
 * @tag pv-text-field
 * @summary Pavetra Text Field web component
 */

@customElement("pv-text-field")
export default class PvTextField extends FormControlMixin(LitElement) {
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

  @property({ type: Boolean, attribute: true, reflect: true })
  invalid = false;

  @property({ type: Boolean, attribute: true, reflect: true })
  valid = false;

  @property({ type: Boolean, attribute: true, reflect: true })
  required = false;

  @property({ type: String, attribute: true })
  placeholder = "";

  @property({ type: Boolean, attribute: true })
  private active = false;

  @state()
  private _isFocusVisible: boolean = false;

  @state()
  private ariaId = `${textFieldGeneratorKeys.next().value}-${this.id}`;

  @property({ type: Boolean, attribute: true, reflect: true })
  disabled = false;

  @property({ type: String, attribute: true })
  size: TextFieldSize = "m";

  @property({ type: Boolean, attribute: true, reflect: true })
  readOnly = false;

  @property()
  type: HTMLInputElement["type"] = "text";

  /**
   * The current value of the text field. It is always a string.
   */
  @property()
  value = "";

  private handleChange(event: InputEvent) {
    if (this.disabled) return;
    this.value = ((event.target as HTMLInputElement) || null)?.value;;
    this.setValue(this.value);
    this.dispatchEvent(new Event("change"));
  }

  private handleFocus() {
    if (this.disabled) return;

    this._isFocusVisible = true;
    const event = new Event("focus", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  }

  private handleBlur() {
    if (this.disabled) return;
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
      (element) => element.attributes.getNamedItem("slot"),
    );
    const suffixSlot = slots.find((slot) => slot?.nodeValue === "suffix");
    const prefixSlot = slots.find((slot) => slot?.nodeValue === "prefix");

    this.suffixSlot = !!suffixSlot;
    this.prefixSlot = !!prefixSlot;
  }

  private renderPrefix() {
    if (!this.prefixSlot) return nothing;
    return html`<div class="text-field__affix_space_left">
      <div class="text-field__affix">
        <slot name="prefix"></slot>
      </div>
    </div>`;
  }

  private renderSuffix() {
    if (!this.suffixSlot && !this.invalid && !this.valid) return nothing;
    return html` <div class="text-field__affix_space_right">
      <div class="text-field__affix">
        <slot name="suffix">
          ${when(
            this.invalid || this.valid,
            () =>
              html`<pv-icon
                name=${this.valid ? "check" : "alert"}
                class=${classMap({
                  "text-field__validation-icon_valid": this.valid,
                  "text-field__validation-icon_invalid": this.invalid,
                })}
              ></pv-icon>`,
          )}
        </slot>
      </div>
    </div>`;
  }

  get textFieldSizeClass() {
    const size = this.size || "m";
    return {
      "text-field__control_size_xs": size === "xs",
      "text-field__control_size_s": size === "s",
      "text-field__control_size_m": size === "m",
      "text-field__control_size_l": size === "l",
    };
  }

  get textFieldSpaceClass() {
    return {
      "text-field__control_space_r": this.prefixSlot,
      "text-field__control_space_l": this.suffixSlot,
    };
  }

  render() {
    const hasValidation = this.invalid || this.valid;
    const ariaId = hasValidation && this.ariaId;
    return html`<div
        part="box"
        class="text-field ${classMap({
          "text-field_status_error": this.invalid,
          "text-field_status_success": this.valid,
          "text-field_focused": this._isFocusVisible || this.active,
          "text-field_disabled": this.disabled,
        })}"
      >
        ${this.renderPrefix()}
        <input
          part="input"
          .type=${this.type}
          .id=${this.id}
          .name=${this.name}
          .value=${live(this.value)}
          .placeholder=${this.placeholder}
          ?required=${this.required}
          ?readonly=${this.readOnly}
          ?disabled=${this.disabled}
          @input=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          aria-describedby=${ariaId}
          aria-invalid=${this.invalid}
          class="text-field__control ${classMap({
            "text-field__control_disabled": this.disabled,
            ...this.textFieldSpaceClass,
            ...this.textFieldSizeClass,
          })}"
        />
        ${this.renderSuffix()}
      </div>
      <div
        class="text-field__help-text ${classMap({
          "text-field__help-text_visible": hasValidation,
          "text-field__help-text_invalid": this.invalid,
          "text-field__help-text_valid": this.valid,
        })}"
        id=${ariaId}
      >
        <slot name="help-text"></slot>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pv-text-field": PvTextField;
  }
}
