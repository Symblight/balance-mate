<script lang="ts">
  import "./menu-page-container.css";

  function handleClose() {
    history.back();
  }
</script>

<div class="menu-page-container">
  <pv-button
    variant="inline"
    on:click={handleClose}
    on:keydown={handleClose}
    role="link"
    tabindex="0"
  >
    <pv-icon slot="icon" name="arrow-narrow-left"></pv-icon>
  </pv-button>
  <div class="menu-page-container__content">
    <slot />
  </div>
</div>
