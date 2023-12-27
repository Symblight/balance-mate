/* eslint-disable import/no-extraneous-dependencies */
// import { playwrightLauncher } from '@web/test-runner-playwright';
import { playwrightLauncher } from "@web/test-runner-playwright";
import { esbuildPlugin } from "@web/dev-server-esbuild";

const filteredLogs = ["Running in dev mode", "lit-html is in dev mode"];

const browsers = [
  playwrightLauncher({ product: "chromium" }),
  playwrightLauncher({ product: "firefox", concurrency: 1 }),
  playwrightLauncher({ product: "webkit" }),
];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: "lib/**/*.test.ts",
  rootDir: "./",
  nodeResolve: true,
  port: 8765,
  coverageConfig: {
    include: ["lib/**/*.ts"],
    threshold: {
      branches: 100,
      statements: 100,
      functions: 100,
      lines: 100,
    },
  },

  /** Resolve bare module imports */
  // nodeResolve: {
  //   exportConditions: ["browser", "development"],
  // },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (
        typeof arg === "string" &&
        filteredLogs.some((l) => arg.includes(l))
      ) {
        return false;
      }
    }
    return true;
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  browsers,
  plugins: [esbuildPlugin({ ts: true, target: "esnext" })],

  testRunnerHtml: (testFramework) => `<html>
  <head><link rel="stylesheet" href="./dist/themes/default.css"></head>
  <body>
    <script type="module" src="${testFramework}"></script>
  </body>
</html>`,

  // See documentation for all available options
});
