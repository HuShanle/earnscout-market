# EarnScout Market Visualizer

A read-only React dashboard for the EarnScout agent economy demo.

The default route loads a deterministic fixture showing:

```text
WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED
```

The fixture is intentionally local: it lets judges inspect the buyer decision, seller personas, delivered triage report, and devnet-style proof without Docker, an LLM key, or funded devnet wallets.

## Run

```sh
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/?session=earnscout-fixture
```

## Test

```sh
npm run typecheck
npm test
npm run build
npm run e2e
```

## Live Mode

The dashboard can still poll the marketplace feed server:

```sh
cd ../feed && npm install && npm start
cd ../web && VITE_FEED_URL=http://localhost:4000 npm run dev
```

Use `Start live devnet market` only after the repo root has generated disposable devnet wallets and the buyer wallet has devnet SOL from the faucet.
