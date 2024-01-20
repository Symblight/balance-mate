import "pv-wc";
import "pv-wc/theme/theme.css";

import "./app.css";

import App from "./App.svelte";
import { $account, $profile } from "./services/profile";
import { fetcher } from "./services/fetch";

const root = document.querySelector("#app")!;

async function getProfile() {
  const { data: profile } = await fetcher(`/api/profile`);
  $profile.set(profile);
}

async function getAccount() {
  const { data: accounts } = await fetcher(`/api/accounts`);
  const [defaultAccount] = accounts;
  $account.set(defaultAccount);
}

export default async function initApp() {
  await Promise.all([getProfile(), getAccount()]);

  const app = new App({
    target: root,
  });

  return app;
}

initApp();
