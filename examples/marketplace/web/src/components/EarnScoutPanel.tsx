interface EarnScoutDelivery {
  service?: string
  listing?: {
    title?: string
    slug?: string
    deadline?: string
    reward?: string
  }
  recommendation?: string
  confidence?: number
  summary?: string
  deliverables?: string[]
  risks?: string[]
  plan?: string[]
  proofHash?: string
}

export function EarnScoutPanel({ report }: { report: EarnScoutDelivery }) {
  return (
    <section className="report-panel" data-testid="earnscout-report">
      <div className="report-head">
        <div>
          <span className="report-label">Delivered report</span>
          <h2>{report.listing?.title ?? 'Listing triage'}</h2>
        </div>
        <div className="recommendation">
          <span>{report.recommendation ?? 'review'}</span>
          <strong>{Math.round((report.confidence ?? 0) * 100)}%</strong>
        </div>
      </div>

      <p className="report-summary">{report.summary}</p>

      <div className="report-columns">
        <ReportList title="Deliverables" items={report.deliverables ?? []} />
        <ReportList title="Risks" items={report.risks ?? []} />
        <ReportList title="Execution plan" items={report.plan ?? []} />
      </div>

      <footer className="proof-row">
        <span>hash-bound delivery</span>
        <code>{report.proofHash}</code>
      </footer>
    </section>
  )
}

function ReportList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="report-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}
