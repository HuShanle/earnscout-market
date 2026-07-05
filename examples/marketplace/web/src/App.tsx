import { useMemo, useState } from 'react'
import { DEMO_SESSION } from './demoData'
import { useFeed, startMarket } from './api'
import { MarketView } from './components/MarketView'
import { Explainer } from './components/Explainer'

const initialSession = new URLSearchParams(window.location.search).get('session') ?? DEMO_SESSION

export default function App() {
  const [session, setSession] = useState(initialSession)
  const [starting, setStarting] = useState(false)
  const [startErr, setStartErr] = useState<string>()
  const { rounds, connected, error } = useFeed(session)

  const settled = useMemo(() => rounds.filter((round) => round.status === 'settled').length, [rounds])
  const totalBids = useMemo(() => rounds.reduce((sum, round) => sum + round.bids.length, 0), [rounds])
  const latest = rounds[0]

  function loadDemo() {
    setStartErr(undefined)
    setSession(DEMO_SESSION)
    const url = new URL(window.location.href)
    url.searchParams.set('session', DEMO_SESSION)
    window.history.replaceState({}, '', url)
  }

  async function onStart() {
    setStarting(true)
    setStartErr(undefined)
    try {
      const id = await startMarket()
      setSession(id)
      const url = new URL(window.location.href)
      url.searchParams.set('session', id)
      window.history.replaceState({}, '', url)
    } catch (e) {
      setStartErr((e as Error).message)
    } finally {
      setStarting(false)
    }
  }

  return (
    <div className="app">
      <header className="app-head">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">E</span>
          <div>
            <h1>EarnScout Market</h1>
            <p>Agents buy execution triage, sellers compete, escrow releases on delivery.</p>
          </div>
        </div>
        <div className="head-actions">
          <span className={`dot ${connected ? 'dot-on' : 'dot-off'}`} data-testid="conn" title={connected ? 'connected' : (error ?? 'disconnected')} />
          <button className="ghost" onClick={loadDemo}>Load demo ledger</button>
          <button className="primary" onClick={onStart} disabled={starting} data-testid="start">
            {starting ? 'Starting...' : 'Start live devnet market'}
          </button>
        </div>
      </header>

      {startErr && <p className="start-err" data-testid="start-err">{startErr}</p>}

      <section className="summary-grid" aria-label="market summary">
        <div className="summary-card">
          <span className="summary-label">Service sold</span>
          <strong>Listing triage report</strong>
          <small>{latest?.want?.arg ?? 'No active order'}</small>
        </div>
        <div className="summary-card">
          <span className="summary-label">Auction depth</span>
          <strong>{totalBids} bids</strong>
          <small>{rounds.length} market rounds in ledger</small>
        </div>
        <div className="summary-card">
          <span className="summary-label">Settlement</span>
          <strong>{settled} released</strong>
          <small>Solana devnet escrow only</small>
        </div>
      </section>

      <div className="session-bar">
        <input
          aria-label="session id"
          placeholder="paste a market session id"
          value={session}
          onChange={(e) => setSession(e.target.value.trim())}
        />
      </div>

      <Explainer />

      <main>
        <MarketView rounds={rounds} />
      </main>
    </div>
  )
}
