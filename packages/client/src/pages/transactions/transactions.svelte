<script lang="ts">
  import { onMount } from "svelte";

  import { fetcher } from "../../services/fetch";
  import type { Transaction } from "../../services/transactions";

  import AccountHead from "../../components/account-head/account-head.svelte";
  import PageContainer from "../../components/page-container/page-container.svelte";
  import Transactions from "../../components/transactions/transactions.svelte";

  let transactions: Transaction[] = [];
  let isFetchingTransactions = true;

  onMount(async () => {
    const { data } = await fetcher(`/api/transactions`, {
      query: { page: 1, limit: 10 },
    });
    transactions = data;
    isFetchingTransactions = false;
  });
</script>

<PageContainer>
  <AccountHead />
  <Transactions {transactions} isLoading={isFetchingTransactions} />
</PageContainer>
