<script lang="ts">
  import PageContainer from "../../components/page-container/page-container.svelte";
  import MenuPageContainer from "../../components/menu-page-container/menu-page-container.svelte";
  import ProfileHead from "../../components/profile-head/profile-head.svelte";
</script>

<PageContainer>
  <MenuPageContainer>
    <ProfileHead />
    <section>
      <pv-button variant="inline" danger href="/logout" title="sign out">
        Sign out
        <pv-icon slot="icon" name="log-out"></pv-icon>
      </pv-button>
    </section>
  </MenuPageContainer>
</PageContainer>
