# c11n-testing

#Setup
install pnpm

install dependencies

```
pnpm install
```

create .env file

```
cp .env-sample .env
```

and provide following values:

- APP_URL
- USERNAME_CUSTOMER
- PASSWORD_CUSTOMER
- USERNAME_CASE_WORKER
- PASSWORD_CASE_WORKER
- USERNAME_DISPATCHER
- PASSWORD_DISPATCHER

run tests

```
pnpm test
```

run tests with ui

```
pnpm test:ui
```

run tests headless

```
pnpm test:headless
```
