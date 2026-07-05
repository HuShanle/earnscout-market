# Risk Report

## Deliverable Coverage

- Working demo: local React dashboard works and shows the full market flow.
- `deliverService()` fork: implemented as EarnScout listing triage.
- GitHub repo: local repo is ready; public repo creation requires human authorization.
- Pitch deck: draft exists at `deliverables/pitch_deck.md`.
- Demo video: script exists at `deliverables/demo_video_script.md`.
- Explorer proof: live proof for this exact service is still pending faucet-funded devnet run.

## Reproducibility

Local demo path is reproducible with:

```powershell
cd repo/earnscout-market/examples/marketplace/web
npm install
npm run dev
```

Then open `http://127.0.0.1:5173/?session=earnscout-fixture`.

## Safety And Compliance

- No real funds used.
- No mainnet flow added.
- No user private keys requested.
- No Superteam submission/comment API calls made.
- No protected event or university logos added.

## Asset Rights

The UI is code-native and uses original text and simple generated concept art only. No protected sponsor logos, university marks, or third-party brand assets were added.

## Submission Recommendation

Recommendation: `fix` before final submission.

Required before submitting:

1. Create or approve a public GitHub repo URL.
2. Record or approve a demo video.
3. Fund buyer wallet `mYbXvBhrSY7WUphqB3Ehv3kBgRKm9g9BrPKcGmRoL2p` with devnet SOL, run one live EarnScout settlement, and include a real Explorer link for this exact service.
4. Confirm human eligibility for the Imperial/UK hackathon-linked bounty.
