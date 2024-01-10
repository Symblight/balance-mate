import "pv-wc";
import "pv-wc/theme/theme.css";

import "./app.css";

import App from "./App.svelte";
import { $profile } from "./services/profile";

const root = document.querySelector("#app")!;

async function getProfile() {
  const res = await fetch(`/api/profile`);
  const { data: profile } = await res.json();
  $profile.set(profile);
}

export default async function initApp() {
  await getProfile();

  const app = new App({
    target: root,
  });

  return app;
}

initApp();
