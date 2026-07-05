# Test Report

## Install Commands

```powershell
cd repo/earnscout-market/packages/agent-runtime
npm install
npm run build

cd ../harness-runtime
npm install
npm run build

cd ../../examples/marketplace/feed
npm install

cd ../web
npm install

cd ../../txodds
npm install
```

## Start Command

```powershell
cd repo/earnscout-market/examples/marketplace/web
npm run dev -- --host 127.0.0.1
```

Local URL:

```text
http://127.0.0.1:5173/?session=earnscout-fixture
```

## Automated Checks

```powershell
cd repo/earnscout-market/examples/marketplace/web
npm run typecheck
npm test
npm run build
npm run e2e

cd ../..
cd txodds
npm run typecheck
npm test

cd ../marketplace
npm run typecheck
```

Results:

- `marketplace/web` typecheck: passed.
- `marketplace/web` unit tests: 6 passed.
- `marketplace/web` build: passed.
- `marketplace/web` Playwright e2e: 2 passed.
- `txodds` typecheck: passed.
- `txodds` tests: 7 passed.
- `marketplace` typecheck: passed.
- `packages/agent-runtime` build: passed.
- `packages/harness-runtime` build: passed.

## Manual / Rendered Verification

Playwright loaded:

```text
http://127.0.0.1:5173/?session=earnscout-fixture
```

Checked desktop `1440x1100` and mobile `390x1200`.

- Page rendered 2 market rounds.
- EarnScout delivered report was visible.
- `Load demo ledger` interaction worked.
- Console errors/warnings: none.
- Screenshots:
  - `deliverables/screenshots/earnscout-desktop.png`
  - `deliverables/screenshots/earnscout-mobile.png`

## Known Limits

- The local fixture proves the product flow but does not create a fresh live devnet transaction.
- A live Explorer link for this exact EarnScout service still requires faucet-funding the generated buyer wallet and running the Docker/CoralOS market.
- Disposable devnet wallets were generated with `npm run setup`.
- Attempted RPC airdrop for buyer `mYbXvBhrSY7WUphqB3Ehv3kBgRKm9g9BrPKcGmRoL2p`; it failed with `fetch failed`, so live settlement remains pending.
- The dashboard uses devnet-style proof links in local mode.

## Untested Risks

- Live Docker CoralOS orchestration was not run in this pass.
- Faucet-funded devnet settlement was not executed yet.
- Public GitHub repo and demo video publication still require human authorization.
