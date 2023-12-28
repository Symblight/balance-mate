import type { HTMLButtonAttributes } from "svelte/elements";

declare module "*.svelte";

declare global {
  export interface SvelteHTMLElements {
    "pv-button": HTMLButtonAttributes;
  }
}
