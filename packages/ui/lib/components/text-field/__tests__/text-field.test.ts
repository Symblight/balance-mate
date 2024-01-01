import { assert } from "@open-wc/testing";

import PvInput from "../text-field.ts";

// import type PvButtonProps from '../button';

describe("pv-text-field", () => {
  it("is defined", () => {
    const el = document.createElement("pv-text-field");

    assert.instanceOf(el, PvInput);
  });
});
