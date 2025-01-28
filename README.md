# c11n-testing

Cucumber + Playwright + Typescript

Features:

- use playwright to run ui as well as api tests
- use cucumber to run api tests

## Prerequisites

- Node.js 20.x
- pnpm 9.x

## Setup

install dependencies

```bash
pnpm install
pnpm exec playwright install 
```


create .env file

```bash
cp .env-sample .env
```

and provide following values:

```dotenv
- BASE_URL=
- APP_NAME=
- USERNAME_CUSTOMER=
- PASSWORD_CUSTOMER=
- USERNAME_CASE_WORKER=
- PASSWORD_CASE_WORKER=
- USERNAME_MANAGER=
- PASSWORD_MANAGER=
- USERNAME_DISPATCHER=
- PASSWORD_DISPATCHER=
- CLIENT_ID=
- CLIENT_SECRET=
- API_USERNAME=
- API_PASSWORD=
```

## Usage

run tests all playwright test both api and ui

```bash
pnpm test
```

run tests with ui

```bash
pnpm test:ui
```

run tests headless

```bash
pnpm test:headless
```

run all cucumber tests

```bash
pnpm cucumber
```
