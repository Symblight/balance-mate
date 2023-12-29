<script lang="ts">
  import "./account-total.css";

  function handleClick(e: Event) {
    console.log("click", e);
  }
</script>

<section class="account-total__container">
  <section class="account-total__header">
    <div class="account-total__total-container">
      <span class="">total:</span>
      <h2 class="account-total__total-title">5000</h2>
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
  </section>
</section>
