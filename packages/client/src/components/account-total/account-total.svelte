<script lang="ts">
  import "./account-total.css";

  function handleClick(e: any) {
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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <pv-button
      on:click={handleClick}
      aria-roledescription="button"
      type="button"
      role="button"
      tabindex="0"
    >
      Income
    </pv-button>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <pv-button on:click={handleClick} danger>Loss</pv-button>
  </section>
</section>
