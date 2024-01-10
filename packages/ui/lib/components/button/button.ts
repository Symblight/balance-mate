import { CSSResultGroup, CSSResultOrNative, LitElement, html } from "lit";
import { MutationController } from "@lit-labs/observers/mutation-controller.js";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";
import { submit } from "@open-wc/form-helpers";

import "../spin/spin.ts";

import styles from "./button.css?inline";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "inline"
  | "ghost"
  | "link";
export type ButtonSize = "xs" | "s" | "m" | "l";

/**
 * @tag pv-button
 * @summary Pavetra Button web component
 */
@customElement("pv-button")
export default class PvButton extends LitElement {
  private _observer;

  constructor() {
    super();
    this.slotHasContent = false;

    this._observer = new MutationController(this, {
      config: {
        characterData: true,
        subtree: true,
      },
    });

    this._observer.callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "characterData") {
          this.manageTextObservedSlot();
          return;
        }
      }
    };
  }

  /**
   * The form associated with the button.
   * Type: String or HTMLFormElement
   */
  @property({ type: String })
  form: HTMLFormElement | string;

  /**
   * The variant style of the button.
   */
  @property()
  variant: ButtonVariant = "primary";

  /**
   * The size of the button.
   */
  @property({ type: String, attribute: true })
  size: ButtonSize = "m";

  /**
   * The type of the button.
   */
  @property()
  type: HTMLButtonElement["type"] = "button";

  /**
   * Indicates a danger state for the button.
   */
  @property({ type: Boolean, attribute: true })
  danger: boolean = false;

  /**
   * Indicates a loading state for the button.
   */
  @property({ type: Boolean, attribute: true })
  loading: boolean = false;

  /**
   * The href link for the button.
   */
  @property({ type: String, attribute: true })
  href: boolean = false;

  /**
   * Indicates whether the button is disabled.
   */
  @property({ type: Boolean, attribute: true })
  disabled: boolean = false;

  /**
   * Indicates whether the button should have rounded corners.
   */
  @property({ type: Boolean, attribute: true })
  rounded: boolean = false;

  /**
   * Tracks whether the button slot has content.
   */
  @state()
  slotHasContent = false;

  /**
   * The icon associated with the button.
   */
  @state()
  icon: Node | null = null;

  childrenContent: Node | null | string = null;

  static get styles(): CSSResultGroup {
    return [styles as unknown as CSSResultOrNative];
  }

  private handleClick() {
    if (this.type === "submit") {
      let targetForm: HTMLFormElement;

      if (this.form instanceof HTMLFormElement) {
        targetForm = this.form;
      } else if (typeof this.form === "string") {
        targetForm = document.getElementById(this.form) as HTMLFormElement;
      } else {
        targetForm = this.closest("form") as HTMLFormElement;
      }

      if (targetForm) {
        submit(targetForm);
      }
    }
  }

  handleSlotchange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({
      flatten: true,
    }) as Element[];

    this.childrenContent = childNodes
      .map((node) => (node.textContent ? node.textContent : ""))
      .join("")
      .trim();
  }

  get assignedNodesList() {
    const slotSelector = "slot:not([name])";
    const slotEl = this.renderRoot?.querySelector(
      slotSelector,
    ) as HTMLSlotElement;
    return slotEl?.assignedNodes() ?? [];
  }

  manageTextObservedSlot() {
    const assignedNodes = [...(this.assignedNodesList as Element[])].filter(
      (node) => {
        if (node.tagName) {
          return true;
        }
        return node.textContent ? node.textContent.trim() : false;
      },
    );
    this.slotHasContent = assignedNodes.length > 0;
  }

  updateChildren() {
    const iconSlot = this.shadowRoot?.querySelector(
      'slot[name="icon"]',
    ) as HTMLSlotElement;
    const icon = !iconSlot
      ? []
      : iconSlot.assignedElements().map((element) => {
          const newElement = element.cloneNode(true) as HTMLElement;
          newElement.removeAttribute("slot");
          return newElement;
        });

    this.manageTextObservedSlot();
    const [iconEl] = icon;
    this.icon = iconEl;
  }

  firstUpdated(changes: any) {
    super.firstUpdated(changes);
    this.updateComplete.then(() => {
      this.updateChildren();
    });
  }

  private get classes() {
    const size = this.size || "m";
    return classMap({
      button_variant_primary: this.variant === "primary",
      button_variant_secondary: this.variant === "secondary",
      button_variant_inline: this.variant === "inline",
      button_variant_ghost: this.variant === "ghost",
      button_variant_link: this.variant === "link",
      button_size_xs: size === "xs",
      button_size_s: size === "s",
      button_size_m: size === "m",
      button_size_l: size === "l",
      button_disabled: this.disabled,
      button_danger: this.danger,
      button_loading: this.loading,
      button_rounded: this.rounded,
      button_icon: !this.slotHasContent && !!this.icon,
    });
  }

  private renderIcon() {
    return html`${when(
        this.loading,
        () =>
          html`<div
            class="button__loading ${classMap({
              button__icon: !!this.childrenContent,
            })}"
          >
            <pv-spin class="button__spin" size="xs"></pv-spin>
          </div>`,
      )}
      <slot ?icon-only=${!this.slotHasContent} name="icon"> </slot> `;
  }

  private renderChildrenContent() {
    return html`
      ${this.renderIcon()}
      <span
        id="label"
        class="button__content ${classMap({
          button__content_hidden: !this.childrenContent,
        })}"
      >
        <slot @slotchange=${this.handleSlotchange}></slot>
      </span>
    `;
  }

  override render() {
    if (this.href) {
      return html`<a
        role="button"
        part="button"
        class="button ${this.classes}"
        href=${this.href}
        ?aria-busy=${this.loading}
      >
        ${this.renderChildrenContent()}
      </a>`;
    }
    return html`<button
      part="button"
      type=${this.type}
      class="button ${this.classes}"
      ?disabled=${this.disabled}
      aria-busy=${this.loading}
      @click=${this.handleClick}
    >
      ${this.renderChildrenContent()}
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pv-button": PvButton;
  }
}
