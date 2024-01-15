<script lang="ts">
  import { $account as account } from "../../services/profile";
  import TransactionDialog from "../transaction-dialog/transaction-dialog.svelte";

  import "./account-total.css";

  let isTransactionDialogVisible = false;

  function handleClick() {
    isTransactionDialogVisible = true;
  }
</script>

<section class="account-total__container">
  <section class="account-total__header">
    <div class="account-total__total-container">
      <pv-icon class="account-total__icon" name="wallet"></pv-icon>
      <span>total:</span>
      <h2 class="account-total__total-title">{$account.current_balance}</h2>
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
    <TransactionDialog bind:open={isTransactionDialogVisible} on:create />
  </section>
</section>
