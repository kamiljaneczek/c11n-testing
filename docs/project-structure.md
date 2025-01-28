|-- cucumber.js
|-- data
|   |-- case
|   |   |-- incident-product.json
|   |   `-- incident-service.json
|   |-- portal
|   |   `-- main-menu.ts
|   `-- users.ts
|-- docs
|   |-- c11n.md
|   |-- project-structure.md
|   |-- repo\ diagram.png
|   `-- test-relations.svg
|-- e2e
|   |-- api
|   |   |-- prod-inc-api.spec..ts
|   |   `-- service-inc-api.spec.ts
|   |-- incident
|   |   |-- prod-inc.spec.ts
|   |   `-- service-inc.spec.ts
|   |-- login
|   |   `-- login.spec.ts
|   |-- portal
|   |   |-- main-navigation.spec.ts
|   |   `-- portal.spec.ts
|   `-- utils
|       `-- test-runner.ts
|-- eslint.config.cjs
|-- features
|   |-- create-service-related-inc.feature
|   |-- dispatcher_incident_processing-eligiblef.eature
|   |-- dispatcher_incident_processing.-noteligible.feature
|   `-- manage-products.feature
|-- lib
|   |-- case.ts
|   |-- cucumber
|   |   |-- hooks.ts
|   |   `-- page-fixture.ts
|   |-- load-inc-test-data.ts
|   |-- login.ts
|   |-- playwright
|   |   |-- api
|   |   |-- controls.ts
|   |   `-- fixtures.ts
|   |-- portal.ts
|   |-- schemas
|   |   |-- incident-product.schema.ts
|   |   `-- incident-service.schema.ts
|   |-- types.ts
|   `-- utils.ts
|-- package.json
|-- playwright-report
|   `-- index.html
|-- playwright.config.ts
|-- pnpm-lock.yaml
|-- prettier.config.js
|-- step-definitions
|   |-- case_worker_processing.ts
|   |-- dispatcher_processing.ts
|   |-- incident-product-related-inc.ts
|   |-- incident-service-related-inc.ts
|   |-- incident.ts
|   |-- manage-products.ts
|   `-- portal.ts
|-- test-results
|   |-- cucumber-report.html
|   `-- cucumber-report.json
|-- test_runner
|   |-- cli.ts
|   `-- lib
`-- tsconfig.json