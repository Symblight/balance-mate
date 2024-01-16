import { CSSResultGroup, CSSResultOrNative, LitElement, html } from "lit";
import { property, customElement, state } from "lit/decorators.js";

import { generateUniqueKey } from "../../shared/gen-id.ts";

import styles from "./avatar.css?inline";

export type AvatarSize = "xs" | "s" | "m" | "l" | number;

const avatarGeneratorKeys = generateUniqueKey("avatar-");

const getSize = (value: AvatarSize) => {
  if (value && !Number.isNaN(Number(value))) {
    return Number(value);
  }

  switch (value) {
    case "l": {
      return 38;
    }
    case "m": {
      return 28;
    }
    case "s": {
      return 22;
    }
    case "xs": {
      return 16;
    }
    default: {
      return 28;
    }
  }
};

/**
 * @tag pv-avatar
 * @summary Pavetra Avatar web component
 */

@customElement("pv-avatar")
export default class PvAvatar extends LitElement {
  /**
   * The source URL for the avatar image.
   */
  @property({ type: String, attribute: true })
  src = "";

  /**
   * The size of the avatar.
   */
  @property()
  size: AvatarSize = "m";

  /**
   * The private mask identifier for avatar generation.
   */
  @state()
  private maskId = `${avatarGeneratorKeys.next().value}`;

  static get styles(): CSSResultGroup {
    return [styles as unknown as CSSResultOrNative];
  }

  render() {
    const sizeSVG = getSize(this.size);

    return html` <svg
      class="avatar"
      aria-hidden="true"
      style="height:${sizeSVG * 2}px; width: ${sizeSVG * 2}px"
    >
      <mask id=${this.maskId}>
        <circle cx=${sizeSVG} cy=${sizeSVG} fill="white" r=${sizeSVG}></circle>
      </mask>
      <g mask="url(#${this.maskId})">
        <image
          x="0"
          y="0"
          height="100%"
          width="100%"
          class="avatar__image"
          href="${this.src}"
          style="height:${sizeSVG * 2}px; width:${sizeSVG * 2}px"
          preserveAspectRatio="xMidYMid slice"
        ></image>
        <circle
          cx=${sizeSVG}
          cy=${sizeSVG}
          r=${sizeSVG}
          class="avatar__circle"
          fill="${!this.src ? String("gray") : "none"}"
        ></circle>
      </g>
    </svg>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "pv-avatar": PvAvatar;
  }
}
