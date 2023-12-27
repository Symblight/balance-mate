import "./app.css";
import "pv-wb"
import "pv-wb/theme/theme.css"
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
