<script lang="ts">
  import { DateTime } from "luxon";

  import "./transactions-transaction.css";

  export let date: string;
  export let amount: string;
  export let description: string;
</script>

<div class="transaction">
  <div class="transaction__logo">
    <pv-icon name="receipt"></pv-icon>
  </div>
  <div class="transaction__description">
    <span>{description}</span>
    <span class="transaction__date">
      {DateTime.fromJSDate(new Date(date)).toFormat("yyyy-MM-dd HH:mm")}
    </span>
  </div>
  <span
    class="transaction__amount"
    class:transaction__amount_negative={Number(amount) < 0}
    class:transaction__amount_positive={Number(amount) >= 0}
  >
    {amount}
  </span>
</div>
