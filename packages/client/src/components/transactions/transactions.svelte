<script>
  import Transaction from "./transaction/transactions-transaction.svelte";
  import "./transactions.css";
</script>

<section>
  <div class="transactions__head">
    <span>All Transactions</span>
    <pv-button variant="secondary" rounded> See all</pv-button>
  </div>

  <ul>
    <li>
      <Transaction />
    </li>
    <li>
      <Transaction />
    </li>
  </ul>
</section>
