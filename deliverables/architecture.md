# EarnScout Market Architecture

## Runtime Flow

```text
Buyer agent
  WANT earnscout <listing-slug>
        |
        v
Seller personas
  speed-scout        -> cheap, fast summary
  compliance-scout   -> risk and eligibility depth
  build-scout        -> implementation plan
        |
        v
Buyer scorecard
  best value, not cheapest
        |
        v
Solana devnet escrow
  DEPOSITED -> DELIVERED -> RELEASED
        |
        v
Run ledger + dashboard
  bids, award reason, report payload, Explorer links
```

## Main Fork Points

- `examples/txodds/agent/service.ts`: replaced the original TxODDS service with deterministic EarnScout listing triage.
- `examples/marketplace/start.ts`: defaults the marketplace to `BUYER_SERVICE=earnscout` and three EarnScout seller personas.
- `examples/marketplace/web`: React dashboard with local fixture and live feed support.

## Safety Model

- Devnet only.
- Disposable generated keypairs only.
- No mainnet RPC, private user wallet, real funds, custody, trading, or payout flow.
- Local demo mode does not sign or send transactions.

## Proof Model

Each paid delivery is represented as a hash-bound report payload. In live mode, the original starter kit writes the run ledger and links deposit/release signatures to Solana Explorer with `cluster=devnet`.
