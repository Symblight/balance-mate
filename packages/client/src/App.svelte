<script lang="ts">
  import { Router, Route } from "svelte-routing";

  import Home from "./pages/home/home.svelte";
  import Transactions from "./pages/transactions/transactions.svelte";
  import Profile from "./pages/profile/profile.svelte"

  export let url = "";
</script>

<main class="page">
  <Router {url}>
    <Route path="/"><Home /></Route>
    <Route path="/transactions"><Transactions /></Route>
    <Route path="/profile"><Profile /></Route>
  </Router>
</main>
