<script lang="ts">
  import TransactionItem from "./transaction/transactions-transaction.svelte";
  import { customLink } from "../../services/router";
  import type { Transaction } from "../../services/transactions";

  import "./transactions.css";

  export let transactions: Transaction[] = [];
  export let isLoading = false;
</script>

<section class="transactions">
  <div class="transactions__head">
    <span class="transactions__label">Transactions</span>
    <pv-button variant="inline" use:customLink rounded href="/transactions">
      See all
    </pv-button>
  </div>

  {#if isLoading}
    <div class="transactions__spin">
      <pv-spin size="m"></pv-spin>
    </div>
  {:else}
    <ul class="transactions__list">
      {#each transactions as transaction}
        <li class="transactions__item">
          <TransactionItem
            date={transaction.created_at}
            amount={transaction.amount}
            description={transaction.description}
          />
        </li>
      {/each}
    </ul>
  {/if}
</section>
