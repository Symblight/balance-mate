import {
  CSSResultGroup,
  CSSResultOrNative,
  LitElement,
  PropertyValueMap,
  html,
} from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { customElement, property } from "lit/decorators.js";

import { iconsLibrary } from "../../icons/index.ts";

import styles from "./icon.css?inline";

/**
 * @tag pv-icon
 * @summary Pavetra Icon web component
 */

@customElement("pv-icon")
export default class PvIcon extends LitElement {
  getIcon(url: string) {
    this.svgCode = iconsLibrary[url];
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.getIcon(this.name);
  }

  @property({ type: String, attribute: true })
  name = "";

  @property({ type: String, state: true })
  svgCode = "";

  static get styles(): CSSResultGroup {
    return [styles as unknown as CSSResultOrNative];
  }

  protected override update(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    if (changedProperties.has('name') && changedProperties.get('name') !== this.name) {
      this.getIcon(this.name);
    }
    super.update(changedProperties);
  }

  render() {
    return html`${unsafeSVG(this.svgCode)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pv-icon": PvIcon;
  }
}
