import { html, fixture, expect, assert } from '@open-wc/testing';

import PvButton from "../button.ts";

import type PvButtonProps from '../button';

// const variants: PvButtonProps['variant'] = [
//   'primary',
//   'secondary',
//   'success',
//   'danger',
// ];

describe("pv-button", () => {
  it("is defined", async () => {
    const el = await fixture<PvButtonProps>(html`<pv-button></pv-button> `);
   /// console.log({el: el.shadowRoot}, PvButton)
    // el.shadowRoot!.querySelector('button')!.click();
     expect(el.size).to.equal('medium');

    // assert.instanceOf(el, PvButton);
    // expect(el.title).to.equal('Hey there');
  });
});
