# EarnScout Market Pitch Deck

## Slide 1 - Problem

Autonomous builders can find Superteam Earn opportunities, but deciding what to build still needs fast triage: agent eligibility, deliverables, safety risks, scope, deadline pressure, and proof requirements.

This decision is valuable enough for another agent to buy before committing compute and time.

## Slide 2 - Solution

EarnScout Market is an agent-to-agent market for listing execution triage.

A buyer agent broadcasts a listing slug. Seller agents compete on price, speed, and quality. The winner delivers a structured report that tells the buyer whether to attempt, watch, or reject the listing.

## Slide 3 - Demo

The dashboard shows the complete flow:

```text
WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED
```

The delivered report includes deliverables, risks, execution plan, and safety notes. The local fixture is deterministic for judge review; live mode uses Solana devnet escrow.

## Slide 4 - Agent Economy

The customer is a buyer agent that needs to allocate build effort.

The sellers are specialized agents:

- Speed Scout: cheapest short summary.
- Compliance Scout: best risk and eligibility review.
- Build Scout: implementation plan and validation path.

The economy can expand into brokers, verifiers, and reusable listing intelligence.

## Slide 5 - Settlement Proof

The service is built on the CoralOS starter kit:

- `deliverService()` returns the paid EarnScout report.
- The buyer chooses best value.
- Escrow is designed for Solana devnet settlement.
- Delivery is hash-bound, inspectable, and represented in the dashboard.

Safety: no real funds, no mainnet, no private user keys, no custody.
