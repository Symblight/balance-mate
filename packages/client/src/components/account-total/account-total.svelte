<script lang="ts">
  import type { PvDialog } from "pv-wc";
  import "./account-total.css";

  let dialog: PvDialog | null;
  let total = 5000;

  function handleClick() {
    if (!dialog) return;

    if (dialog.open) {
      dialog.close();
    } else {
      dialog.show();
    }
  }
</script>

<section class="account-total__container">
  <section class="account-total__header">
    <div class="account-total__total-container">
      <pv-icon name="wallet"></pv-icon>
      <span class="">total:</span>
      <h2 class="account-total__total-title">{total}</h2>
    </div>
  </section>

  <section>
    <pv-button
      on:click={handleClick}
      on:keypress={handleClick}
      variant="primary"
      role="button"
      tabindex="0"
    >
      Add transaction
    </pv-button>
    <pv-dialog headerTitle="Add transaction" bind:this={dialog}>
      <form method="dialog">
        <pv-text-field type="number" placeholder="value"></pv-text-field>
      </form>
      <div slot="footer">
        <pv-button variant="primary" role="button" tabindex="0">
          Create
        </pv-button>
        <pv-button formmethod="dialog" variant="secondary" role="button" tabindex="0">
          Cancel
        </pv-button>
      </div>
    </pv-dialog>
  </section>
</section>
