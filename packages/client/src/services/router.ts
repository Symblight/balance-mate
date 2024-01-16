import type { PvButton } from "pv-wc";
import { navigate } from "svelte-routing";

export let customLink = (node: PvButton) => {
  function onClick(event: MouseEvent) {
    event.preventDefault();
    navigate(node.href);
  }

  node.addEventListener("click", onClick);

  return {
    destroy() {
      node.removeEventListener("click", onClick);
    },
  };
};
