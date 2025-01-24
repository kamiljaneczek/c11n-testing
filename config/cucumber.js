module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["features/"],
    dryRun: false,
    require: ["step-definitions/*.ts", "lib/cucumber/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "html:test-results/cucumber-report.html", "json:test-results/cucumber-report.json", "rerun:@rerun.txt"],
    parallel: 1,
    timeout: 6000,
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    dryRun: false,
    require: ["step-definitions/*.ts", "lib/cucumber/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "html:test-results/cucumber-report.html", "json:test-results/cucumber-report.json", "rerun:@rerun.txt"],
    parallel: 2,
    timeout: 6000,
  },
};
