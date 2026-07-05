import type { RoundBid } from '../types'

export function BidRow({ bid, won }: { bid: RoundBid; won: boolean }) {
  return (
    <div className={`bid ${won ? 'bid-won' : ''}`} data-testid="bid" data-seller={bid.by}>
      <span className="bid-seller">{bid.by}</span>
      <span className="bid-price">{bid.priceSol.toFixed(5)} SOL</span>
      {bid.note && <span className="bid-note">{bid.note}</span>}
      {typeof bid.qualityScore === 'number' && <span className="bid-chip">{bid.qualityScore}/100</span>}
      {typeof bid.etaMins === 'number' && <span className="bid-chip">{bid.etaMins}m</span>}
      {bid.risk && <span className={`bid-risk risk-${bid.risk}`}>{bid.risk}</span>}
      {won && <span className="bid-tag">won</span>}
    </div>
  )
}

export function DeclinedRow({ seller }: { seller: string }) {
  return (
    <div className="bid bid-declined" data-testid="declined" data-seller={seller}>
      <span className="bid-seller">{seller}</span>
      <span className="bid-note">declined - not in inventory</span>
    </div>
  )
}
