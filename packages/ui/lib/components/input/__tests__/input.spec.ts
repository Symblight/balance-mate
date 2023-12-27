import { assert } from "@open-wc/testing";

import PvInput from "../input.ts";

// import type PvButtonProps from '../button';

describe("pv-input", () => {
  it("is defined", () => {
    const el = document.createElement("pv-input");

    assert.instanceOf(el, PvInput);
  });
});
