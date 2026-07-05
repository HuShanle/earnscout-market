const stages = ['WANT', 'BID', 'AWARD', 'DEPOSITED', 'DELIVERED', 'RELEASED']

export function Explainer() {
  return (
    <section className="flow-panel" data-testid="explain" aria-label="settlement flow">
      <div className="flow-title">
        <strong>Market stage</strong>
        <span>One paid report, competed and settled end-to-end.</span>
      </div>
      <ol className="flow-rail">
        {stages.map((stage) => (
          <li key={stage}>
            <span>{stage}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
