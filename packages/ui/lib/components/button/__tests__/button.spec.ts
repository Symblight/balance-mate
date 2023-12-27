import { assert } from "@open-wc/testing";

import PvButton from "../button.ts";

// import type PvButtonProps from '../button';

// const variants: PvButtonProps['variant'] = [
//   'primary',
//   'secondary',
//   'success',
//   'danger',
// ];

describe("pv-button", () => {
  it("is defined", () => {
    const el = document.createElement("pv-button");

    assert.instanceOf(el, PvButton);
  });
});
