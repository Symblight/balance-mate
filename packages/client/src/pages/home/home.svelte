<script lang="ts">
  import toast from "svelte-french-toast";
  import { onMount } from "svelte";

  import { fetcher, type FetcherResponse } from "../../services/fetch";
  import { $lastTransactions as transactions } from "../../services/transactions";

  import AccountHead from "../../components/account-head/account-head.svelte";
  import AccountTotal from "../../components/account-total/account-total.svelte";
  import PageContainer from "../../components/page-container/page-container.svelte";
  import Transactions from "../../components/transactions/transactions.svelte";

  import * as operations from "../../operations/create-transaction";

  let isFetchingTransactions = true;

  onMount(async () => {
    try {
      const { data } = await fetcher(`/api/transactions`, {
        query: { page: 1, limit: 5 },
      });
      transactions.set(data);
      isFetchingTransactions = false;
    } catch (error) {
      let requestError = error as FetcherResponse;
      toast.error(requestError.message || "error");
    }
  });

  function handleCreate(event: CustomEvent) {
    operations.createTransaction(event.detail);
  }
</script>

<PageContainer>
  <AccountHead />
  <AccountTotal on:create={handleCreate} />
  <Transactions
    transactions={$transactions}
    isLoading={isFetchingTransactions}
  />
</PageContainer>
