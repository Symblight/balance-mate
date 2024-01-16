<script lang="ts">
  import { onMount } from "svelte";

  import { fetcher } from "../../services/fetch";
  import type { Transaction } from "../../services/transactions";

  import AccountHead from "../../components/account-head/account-head.svelte";
  import AccountTotal from "../../components/account-total/account-total.svelte";
  import PageContainer from "../../components/page-container/page-container.svelte";
  import Transactions from "../../components/transactions/transactions.svelte";

  let transactions: Transaction[] = [];
  let isFetchingTransactions = true;

  onMount(async () => {
    const { data } = await fetcher(`/api/transactions`, {
      query: { page: 1, limit: 5 },
    });
    transactions = data;
    isFetchingTransactions = false;
  });

  async function handleCreate(event: CustomEvent) {
    const values = event.detail;
    await fetcher(`/api/transactions`, {
      method: "POST",
      body: values,
    });
  }
</script>

<PageContainer>
  <AccountHead />
  <AccountTotal on:create={handleCreate} />
  <Transactions {transactions} isLoading={isFetchingTransactions} />
</PageContainer>
