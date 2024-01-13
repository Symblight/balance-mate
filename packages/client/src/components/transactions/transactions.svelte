<script>
  import Transaction from "./transaction/transactions-transaction.svelte";
  import "./transactions.css";
</script>

<section class="transactions">
  <div class="transactions__head">
    <span>All Transactions</span>
    <pv-button variant="inline" rounded> See all</pv-button>
  </div>

  <ul class="transactions__list">
    <li class="transactions__item">
      <Transaction />
    </li>
    <li>
      <Transaction />
    </li>
  </ul>
</section>
