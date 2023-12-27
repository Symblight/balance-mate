<script lang="ts">
  import AccountHead from "./components/account-head/account-head.svelte";
  import AccountTotal from "./components/account-total/account-total.svelte";
  import PageContainer from "./components/page-container/page-container.svelte";
  import Transactions from "./components/transactions/transactions.svelte";
</script>

<main class="page">
  <PageContainer>
    <AccountHead />
    <AccountTotal />
    <Transactions />
  </PageContainer>
</main>
