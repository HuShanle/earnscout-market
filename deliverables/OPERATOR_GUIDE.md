# EarnScout Market Operator Guide

This guide explains how to understand and use EarnScout Market for the Superteam Earn submission.

## Specific Submission vs Reusable Pattern

This repository is a specific submission for:

- Listing: `Imperial AI Agent Hackathon: Build the Agent Economy`
- Slug: `imperial-ai-agent-hackathon-build-the-agent-economy`
- Project: `EarnScout Market`

The implementation is also a reusable pattern:

- buyer agents purchase listing triage,
- seller agents compete on price and quality,
- delivery is a structured report,
- settlement proof is generated on Solana devnet,
- submission materials are packaged as GitHub, deck, video, and proof links.

For a different Superteam listing, regenerate the triage data, UI fixture, proof, README, deck, video, and submission payload. Do not reuse this exact submission text for another bounty.

## How To Use The Demo

Run the local dashboard:

```sh
cd examples/marketplace/web
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/?session=earnscout-fixture
```

Read the screen as a market flow:

1. Buyer request: the buyer asks for `earnscout imperial-ai-agent-hackathon-build-the-agent-economy`.
2. Seller bids: different sellers offer listing triage at different price and quality levels.
3. Award decision: the buyer selects best value.
4. Delivery: the winner returns a structured EarnScout triage report.
5. Settlement proof: devnet deposit and release prove payment can settle after delivery.

## How The Reward Works

The website does not directly pay the operator. The reward comes from the Superteam listing if the submission is selected by the sponsor or judges.

Submission package:

- GitHub: https://github.com/HuShanle/earnscout-market
- Pitch deck: https://github.com/HuShanle/earnscout-market/blob/main/deliverables/pitch_deck.md
- Demo video: https://github.com/HuShanle/earnscout-market/blob/main/deliverables/demo-video/earnscout-demo.webm
- Devnet proof: https://github.com/HuShanle/earnscout-market/blob/main/deliverables/devnet-proof/earnscout-settlement.md

After winning, a human operator must claim the agent submission and complete any wallet, KYC, invoice, or sponsor requirements. This should not be automated.

## Standard Superteam Workflow

Use this workflow for every future listing:

1. Fetch only agent-eligible listings.
2. Reject listings that require real funds, private keys, live trading, restricted identity, or unavailable KYC.
3. Create one workspace per listing.
4. Write `TRIAGE_REPORT.md` and `LISTING_SCORE.json`.
5. Write `BUILD_PLAN.md`.
6. Build the smallest complete deliverable.
7. Run typecheck, tests, build, and browser checks where relevant.
8. Produce README, screenshots, video, pitch deck, risk report, and proof.
9. Generate `SUBMISSION_DRAFT.md` and `submission_payload.json`.
10. Submit only after explicit human authorization.

## Current Limitations

- The fixture dashboard is deterministic.
- The no-Docker proof is real devnet settlement for the EarnScout service.
- The full Docker-based CoralOS multi-container market was not run locally because Docker is unavailable.
- No mainnet, real funds, private user keys, custody, or trading flow is used.

## Submission Safety Checklist

- All links are controlled by the operator.
- No `.env`, API key, private key, or wallet secret is committed.
- No copyrighted or trademarked assets are used without permission.
- Tests and smoke checks are recorded.
- Known limitations are stated honestly.
- The final Superteam API submission is made only after explicit authorization.

