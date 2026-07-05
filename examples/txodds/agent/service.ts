/**
 * `deliverService()` - THE fork point.
 *
 * EarnScout Market sells a concrete agent service: execution triage for Superteam Earn listings.
 * A buyer agent pays for a short, structured report before deciding whether to build. Seller agents
 * compete on price, speed, and compliance depth; the winning delivery is hash-bound to the escrow
 * reference and released on Solana devnet.
 *
 * Request grammar:
 *   "earnscout <listing-slug>" -> execution triage report for that listing
 *   "<listing-slug>"           -> same as above, for one-token calls from simple buyers
 */

interface TriageReport {
  service: 'earnscout-triage'
  listing: {
    title: string
    slug: string
    deadline: string
    reward: string
  }
  recommendation: 'attempt' | 'watch' | 'reject'
  confidence: number
  summary: string
  deliverables: string[]
  risks: string[]
  plan: string[]
  safety: string[]
  timestamp: string
}

const LISTINGS: Record<string, Omit<TriageReport, 'service' | 'timestamp'>> = {
  'imperial-ai-agent-hackathon-build-the-agent-economy': {
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
      'Working CoralOS fork with an earnscout deliverService',
      'Dashboard showing WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED',
      'README with one-command local demo path',
      'Five-slide pitch deck and three-minute video script',
    ],
    risks: [
      'Deadline pressure requires a narrow MVP',
      'Hackathon eligibility should be confirmed before final submission',
      'Devnet keypairs must be disposable and never mainnet-funded',
    ],
    plan: [
      'Fork the Solana CoralOS starter kit',
      'Replace the paid service with deterministic listing triage',
      'Configure seller personas for speed, compliance, and build planning',
      'Show escrow proof and hash-bound report delivery in the dashboard',
    ],
    safety: [
      'No real funds, no mainnet RPC, no private user wallet keys',
      'No protected sponsor or university marks in the UI',
      'Submission stays dry-run until human approval',
    ],
  },
}

const fallback = (slug: string): Omit<TriageReport, 'service' | 'timestamp'> => ({
  listing: {
    title: slug.split('-').filter(Boolean).map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(' ') || 'Unknown listing',
    slug,
    deadline: 'unknown',
    reward: 'unknown',
  },
  recommendation: 'watch',
  confidence: 0.52,
  summary:
    'EarnScout can produce an initial execution triage, but this listing needs full details before build commitment.',
  deliverables: [
    'Fetch full listing details',
    'Score agent eligibility and hard risks',
    'Produce a build plan only after triage passes',
  ],
  risks: [
    'Listing details were not embedded in this demo fixture',
    'Eligibility and payout requirements are unknown',
  ],
  plan: [
    'Run the Superteam Agent details endpoint',
    'Fill TRIAGE_REPORT.md and LISTING_SCORE.json',
    'Stop if capital, KYC, private keys, or real trading are required',
  ],
  safety: [
    'Read-only triage only until the human approves build and submission',
    'No real wallet keys or funds are requested',
  ],
})

export async function deliverService(request: string): Promise<string> {
  const tokens = request.trim().split(/\s+/).filter(Boolean)
  let verb = (tokens[0] ?? 'earnscout').toLowerCase()
  let rest = tokens.slice(1)
  if (verb !== 'earnscout') {
    rest = [verb, ...rest]
    verb = 'earnscout'
  }

  if (verb !== 'earnscout') {
    return JSON.stringify({ error: `unknown service: ${verb}` })
  }

  const slug = rest.join(' ') || 'imperial-ai-agent-hackathon-build-the-agent-economy'
  const report = LISTINGS[slug] ?? fallback(slug)
  return JSON.stringify({
    service: 'earnscout-triage',
    ...report,
    timestamp: new Date().toISOString(),
  } satisfies TriageReport)
}
