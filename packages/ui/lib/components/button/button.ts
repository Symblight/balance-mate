import { CSSResultGroup, CSSResultOrNative, LitElement, html } from "lit";
import { MutationController } from "@lit-labs/observers/mutation-controller.js";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";

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

  @property()
  variant: ButtonVariant = "primary";

  @property({ type: String, attribute: true })
  size: ButtonSize = "m";

  @property({ type: Boolean, attribute: true })
  danger: boolean = false;

  @property({ type: Boolean, attribute: true })
  loading: boolean = false;

  @property({ type: String, attribute: true })
  href: boolean = false;

  @property({ type: Boolean, attribute: true })
  disabled: boolean = false;

  @property({ type: Boolean, attribute: true })
  rounded: boolean = false;

  @state()
  slotHasContent = false;

  @state()
  icon: Node | null = null;

  static get styles(): CSSResultGroup {
    return [styles as unknown as CSSResultOrNative];
  }

  get assignedNodesList() {
    const slotSelector = "slot:not([name])";
    const slotEl = this.renderRoot?.querySelector(slotSelector);
    // @ts-ignore
    return slotEl?.assignedNodes() ?? [];
  }

  manageTextObservedSlot() {
    const assignedNodes = [...this.assignedNodesList].filter((node) => {
      if (node.tagName) {
        return true;
      }
      return node.textContent ? node.textContent.trim() : false;
    });
    this.slotHasContent = assignedNodes.length > 0;
  }

  updateChildren() {
    const iconSlot = this.shadowRoot?.querySelector('slot[name="icon"]') as HTMLSlotElement;
    const icon = !iconSlot
      ? []
      :
        iconSlot.assignedElements().map((element) => {
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
    return classMap({
      button_variant_primary: this.variant === "primary",
      button_variant_secondary: this.variant === "secondary",
      button_variant_inline: this.variant === "inline",
      button_variant_ghost: this.variant === "ghost",
      button_variant_link: this.variant === "link",
      button_size_xs: this.size === "xs",
      button_size_s: this.size === "s",
      button_size_m: this.size === "m",
      button_size_l: this.size === "l",
      button_disabled: this.disabled,
      button_danger: this.danger,
      button_loading: this.loading,
      button_rounded: this.rounded,
      button_icon: !this.slotHasContent && !!this.icon,
    });
  }

  private renderIcon() {
    return when(
      this.loading,
      () =>
        html`<div class="button__icon">
          <pv-spin class="button__spin" size="small"></pv-spin>
        </div>`,
      () => html`<slot ?icon-only=${!this.slotHasContent} name="icon"></slot>`,
    );
  }

  private renderChildrenContent() {
    return html`
      ${this.renderIcon()}
      <span id="label" class="button__content">
        <slot></slot>
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
      type="button"
      part="button"
      class="button ${this.classes}"
      ?disabled=${this.disabled}
      aria-busy=${this.loading}
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
