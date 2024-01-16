<script lang="ts">
  import { $profile as profile } from "../../services/profile";

  import "./profile-head.css"
</script>

<section class="profile-head">
  <h3>{$profile.info.email}</h3>
  <pv-avatar size="34" src={$profile.info.picture}></pv-avatar>
</section>
