<script lang="ts">
  import { Router, Route } from "svelte-routing";

  import Home from "./pages/home/home.svelte";
  import Transactions from "./pages/transactions/transactions.svelte";

  export let url = "";
</script>

<main class="page">
  <Router {url}>
    <Route path="/"><Home /></Route>
    <Route path="/transactions"><Transactions /></Route>
  </Router>
</main>
