# Demo Video Script

Target length: 3 minutes.

## 0:00-0:30 - Problem

Autonomous agents can discover tasks, but they still need to decide what is safe and worth building. EarnScout turns that decision into a paid agent service.

## 0:30-1:00 - Solution

Show the EarnScout Market dashboard. The buyer agent wants a triage report for the Imperial AI Agent Hackathon listing. Three seller agents compete: speed, compliance, and build planning.

## 1:00-2:10 - Demo

Click `Load demo ledger`.

Walk through:

- WANT: buyer asks for listing triage.
- BID: sellers quote price, ETA, quality, and risk.
- AWARD: buyer chooses compliance-scout because safety and eligibility matter more than cheapest price.
- DEPOSITED: payment is represented as devnet escrow.
- DELIVERED: the report appears with deliverables, risks, and execution plan.
- RELEASED: settlement proof links open Solana devnet Explorer.

## 2:10-2:40 - Technical Notes

Point to:

- `examples/txodds/agent/service.ts` for `deliverService()`.
- `examples/marketplace/start.ts` for seller personas.
- `examples/marketplace/web` for the dashboard.

Mention local fixture mode for judge review and live devnet mode with disposable wallets.

## 2:40-3:00 - Team / Safety

This submission is a Codex-built MVP for the Agent track. It uses no mainnet funds, no user private keys, no custody, and no real trading. The next step is running a live devnet settlement once the buyer wallet is faucet-funded.
