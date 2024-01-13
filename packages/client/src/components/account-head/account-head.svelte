<script lang="ts">
  import { $profile as profile } from "../../services/profile";
  import "./account-head.css";
</script>

<div class="account-head__container">
  <a class="account-head__brand" href="/">
    <img src="/logo.svg" alt="logo" class="account-head__logo" />
    <h1>My wallet</h1>
  </a>
  <div class="account-head__profile">
    <span>{$profile.info.email}</span>
    <pv-avatar size="s" src={$profile.info.picture}></pv-avatar>
    <pv-button variant="link" danger href="/logout" title="sign out">
      <pv-icon slot="icon" name="log-out"></pv-icon>
    </pv-button>
  </div>
</div>
