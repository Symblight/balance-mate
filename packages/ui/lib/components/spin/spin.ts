import { CSSResultGroup, CSSResultOrNative, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import styles from "./spin.css?inline";

export type SpinSize = "xs" | "s" | "m" | "l";
/**
 * @tag pv-spin
 * @summary Pavetra Spin web component
 */
@customElement("pv-spin")
export default class PvSpin extends LitElement {
  /**
   * The size of the spin element.
   */
  @property({ type: String, attribute: true })
  size: SpinSize = "m";

  static get styles(): CSSResultGroup {
    return [styles as unknown as CSSResultOrNative];
  }

  render() {
    return html`<span class="spin">
      <svg
        class="spin__svg ${classMap({
          spin_size_l: this.size === "l",
          spin_size_m: this.size === "m",
          spin_size_s: this.size === "s",
          spin_size_xs: this.size === "xs",
        })}"
        viewBox="0 0 1024 1024"
        focusable="false"
        data-icon="loading"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
        />
      </svg>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pv-spin": PvSpin;
  }
}
