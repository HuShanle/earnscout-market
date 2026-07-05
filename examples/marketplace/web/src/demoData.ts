import type { Round } from './types'

export const DEMO_SESSION = 'earnscout-fixture'

export const settledRound: Round = {
  round: 1,
  want: {
    service: 'earnscout',
    arg: 'imperial-ai-agent-hackathon-build-the-agent-economy',
    budgetSol: 0.001,
    buyer: 'buyer-agent',
    objective: 'Need an execution-ready bounty triage before the submission deadline.',
  },
  bids: [
    {
      by: 'speed-scout',
      priceSol: 0.00018,
      note: 'fast summary',
      etaMins: 2,
      qualityScore: 71,
      risk: 'medium',
    },
    {
      by: 'compliance-scout',
      priceSol: 0.00042,
      note: 'risk-first review',
      etaMins: 5,
      qualityScore: 94,
      risk: 'low',
    },
    {
      by: 'build-scout',
      priceSol: 0.00035,
      note: 'implementation plan',
      etaMins: 4,
      qualityScore: 88,
      risk: 'low',
    },
  ],
  declined: ['copy-scout'],
  award: {
    to: 'compliance-scout',
    reason:
      'The buyer values eligibility, safety, and devnet proof more than the cheapest summary for this deadline-bound bounty.',
    scorecard: [
      { label: 'Compliance depth', value: 96 },
      { label: 'Build readiness', value: 86 },
      { label: 'Price fit', value: 74 },
    ],
  },
  escrow: {
    reference: '5yK7mCUWkSGFvJw1pEF4rnE9YgVxDevnetRef',
    seller: 'DspZk...Scout',
    amountSol: 0.00042,
    deadlineSecs: 600,
  },
  deposit: {
    sig: '5syzoWto3RjRYfLMCAkJ8aK9k7zznG3YfmKkX7xEarnScoutDeposit',
    buyer: '7G8p...Buyer',
  },
  delivered: {
    raw: '',
    data: {
      service: 'earnscout-triage',
      listing: {
        title: 'Imperial AI Agent Hackathon: Build the Agent Economy',
        slug: 'imperial-ai-agent-hackathon-build-the-agent-economy',
        deadline: '2026-07-06T22:59:59.999Z',
        reward: '5000 USDG',
      },
      recommendation: 'attempt',
      confidence: 0.78,
      summary:
        'Build EarnScout Market: an agent-to-agent service where a buyer purchases execution triage and pays the best seller through Solana devnet escrow.',
      deliverables: [
        'Public GitHub repository with no committed keys',
        'Devnet demo showing WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED',
        'Five-slide pitch deck',
        'Three-minute demo video',
      ],
      risks: [
        'Deadline is tight; keep the MVP constrained',
        'Eligibility is linked to the Imperial AI Agent Hackathon context',
        'Use only disposable devnet wallets and no real funds',
      ],
      plan: [
        'Fork CoralOS starter kit',
        'Replace deliverService with deterministic bounty triage',
        'Show seller personas and buyer scorecard',
        'Export settlement proof and report payload',
      ],
      proofHash: 'sha256:2f3a9d8c7b1e5a42d6a9c0f4e7b88b31c42e1d9a',
    },
  },
  release: {
    sig: '3PMa9LBZn7VEMD1qZnmr7aFzK4sEarnScoutRelease',
  },
  status: 'settled',
}

export const biddingRound: Round = {
  round: 2,
  want: {
    service: 'earnscout',
    arg: 'develop-a-narrative-detection-and-idea-generation-tool',
    budgetSol: 0.0008,
    buyer: 'buyer-agent',
    objective: 'Compare a narrative detection task against the current build pipeline.',
  },
  bids: [
    {
      by: 'speed-scout',
      priceSol: 0.00018,
      note: 'quick filter',
      etaMins: 2,
      qualityScore: 70,
      risk: 'medium',
    },
    {
      by: 'build-scout',
      priceSol: 0.00032,
      note: 'prototype path',
      etaMins: 4,
      qualityScore: 84,
      risk: 'medium',
    },
  ],
  declined: ['visual-scout'],
  status: 'bidding',
}

export const fixtureRounds: Round[] = [settledRound, biddingRound]
