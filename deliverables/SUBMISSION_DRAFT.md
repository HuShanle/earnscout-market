# Submission Draft

## Listing

- Title: Imperial AI Agent Hackathon: Build the Agent Economy
- Slug: imperial-ai-agent-hackathon-build-the-agent-economy
- Type: bounty
- Reward: 5000 USDG
- Deadline: 2026-07-06T22:59:59.999Z

## Project Title

EarnScout Market

## One-line Summary

EarnScout Market lets buyer agents purchase Superteam Earn listing triage from competing seller agents, then settle the winning report through Solana devnet escrow.

## Links

- GitHub: https://github.com/HuShanle/earnscout-market
- Live Demo: local run instructions in https://github.com/HuShanle/earnscout-market#fast-local-demo
- Demo Video: https://github.com/HuShanle/earnscout-market/blob/main/deliverables/demo-video/earnscout-demo.webm
- Devnet Proof: https://github.com/HuShanle/earnscout-market/blob/main/deliverables/devnet-proof/earnscout-settlement.md
- Docs: https://github.com/HuShanle/earnscout-market/blob/main/deliverables/pitch_deck.md, https://github.com/HuShanle/earnscout-market/blob/main/deliverables/architecture.md

## What I Built

I forked the Solana CoralOS starter kit into an EarnScout agent economy. The paid service is listing execution triage: a buyer agent broadcasts a Superteam listing slug, seller personas bid, the buyer chooses best value, and the winner delivers a structured report with deliverables, risks, safety checks, and a scoped build plan.

The React dashboard shows the complete flow:

```text
WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED
```

## How It Satisfies The Listing

1. Working agent economy -> implemented buyer/seller flow using the CoralOS marketplace starter.
2. Service worth buying -> `earnscout` triage helps autonomous builders decide which Superteam listings to attempt.
3. Settlement proof -> dashboard and live mode use Solana devnet escrow links; local fixture shows the full release flow.
4. Fork point -> `examples/txodds/agent/service.ts` now returns EarnScout triage reports.
5. UX clarity -> dashboard shows seller bids, buyer scorecard, delivered report, and devnet proof.

## Technical Overview

- Stack: TypeScript, React, Vite, CoralOS starter kit, Solana devnet escrow rails.
- Service: deterministic `deliverService("earnscout <slug>")`.
- Sellers: speed, compliance, and build-plan personas.
- Dashboard: local fixture mode plus live feed support.
- No-Docker proof: `examples/txodds/server/earnscout_settle.ts` can settle an EarnScout delivery directly on Solana devnet.
- Safety: devnet only; no real funds, no mainnet, no user private keys, no custody.

## How To Run

```bash
cd examples/marketplace/web
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/?session=earnscout-fixture
```

## Validation

- `npm run typecheck` in `examples/marketplace/web`: passed.
- `npm test` in `examples/marketplace/web`: 6 passed.
- `npm run build` in `examples/marketplace/web`: passed.
- `npm run e2e` in `examples/marketplace/web`: 2 passed.
- `npm run typecheck` in `examples/txodds`: passed.
- `npm test` in `examples/txodds`: 7 passed.
- Playwright desktop/mobile rendered checks: passed with no console errors.
- No-Docker devnet proof: deposit tx `47nyVrwAhDjQ5KFnMbbEF1y1BRcjReFAvWVCJ8ARLYsk7aTHtAMTsTKB1kr2uNHLfS9t1aE2k1VoFYZ7nMkrTgza`; release tx `2gBTTfpXaogVfah8ZHAsn1eLZ7JPhwRYTxAjJ2iddxDfFzSNuwZ7wLFPDvrchpHLe4NZgaeqA2UDHoERaXFng3PW`.

## Limitations

- The local fixture is deterministic and does not create a fresh live devnet transaction.
- A live no-Docker Explorer proof for this exact EarnScout service has been generated and linked above.
- Docker is not installed in this environment, so the full CoralOS multi-container market was not run locally.
- Docker is not required for the direct EarnScout proof; it is only required for the full CoralOS multi-container market.
- Final Superteam submission still requires explicit user authorization.

## Eligibility Answers

| Question | Answer |
|---|---|
| Link your GitHub Repo | https://github.com/HuShanle/earnscout-market |
| Link your pitch deck | https://github.com/HuShanle/earnscout-market/blob/main/deliverables/pitch_deck.md |
| Link your demo video | https://github.com/HuShanle/earnscout-market/blob/main/deliverables/demo-video/earnscout-demo.webm |

## Human Review Checklist

- [ ] User controls all links.
- [ ] No private keys or secrets are included.
- [ ] No copyrighted or trademarked assets are used without rights.
- [ ] No real trading or funds are involved.
- [ ] Telegram is correct if required.
- [ ] Wallet/KYC requirements are understood.
- [ ] User authorized submission.
