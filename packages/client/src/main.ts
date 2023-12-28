import "./app.css";
import "pv-wc"
import "pv-wc/theme/theme.css"
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
