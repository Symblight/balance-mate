<script lang="ts">
  import { link } from "svelte-routing";

  import { $profile as profile } from "../../services/profile";
  import { customLink } from "../../services/router";
  import "./account-head.css";
</script>

<div class="account-head__container">
  <a class="account-head__brand" href="/" use:link>
    <img src="/logo.svg" alt="logo" class="account-head__logo" />
    <h1>My wallet</h1>
  </a>
  <div class="account-head__profile">
    <pv-button use:customLink size="l" variant="link" href="/profile" class="account-head__avatar">
      <pv-avatar slot="icon" size="20" src={$profile.info.picture}></pv-avatar>
    </pv-button>
  </div>
</div>
