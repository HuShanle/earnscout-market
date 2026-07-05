import { describe, expect, it } from 'vitest'
import { deliverService } from './service.js'

describe('deliverService', () => {
  it('returns an EarnScout triage report for the hackathon listing', async () => {
    const raw = await deliverService('earnscout imperial-ai-agent-hackathon-build-the-agent-economy')
    const report = JSON.parse(raw) as {
      service: string
      recommendation: string
      deliverables: string[]
      safety: string[]
    }

    expect(report.service).toBe('earnscout-triage')
    expect(report.recommendation).toBe('attempt')
    expect(report.deliverables.join(' ')).toContain('WANT -> BID -> AWARD')
    expect(report.safety.join(' ')).toContain('No real funds')
  })

  it('falls back to watch for unknown listing slugs', async () => {
    const raw = await deliverService('unknown-listing')
    const report = JSON.parse(raw) as { recommendation: string; listing: { slug: string } }

    expect(report.recommendation).toBe('watch')
    expect(report.listing.slug).toBe('unknown-listing')
  })
})
