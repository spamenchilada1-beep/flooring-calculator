import { useState } from 'react'
import { calculateFlooring, createCopyText } from './calculator'
import './styles.css'

function App() {
  const [length, setLength] = useState('12')
  const [width, setWidth] = useState('10')
  const [coverage, setCoverage] = useState('20')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const calculate = () => {
    const next = calculateFlooring({ length, width, coverage })
    if (next.errors.length) { setError(next.errors.join(' ')); setResult(null); return }
    setError(''); setResult(next)
  }
  const copyResults = async () => {
    if (!result) return
    await navigator.clipboard?.writeText(createCopyText({ length, width, coverage, result }))
  }
  return (
    <main className="page">
      <header className="hero">
        <div className="brand"><img className="brand-logo" src="/athena-calculators-logo.jpg" alt="ATHENA Calculators" /></div>
        <p className="eyebrow">FLOORING CALCULATOR</p>
        <h1>How Much Flooring Do I Need?</h1>
        <p className="intro">Estimate flooring square footage, add a planning allowance, and calculate how many boxes to buy.</p>
      </header>
      <section className="card">
        <div className="grid">
          <label>Room length (ft)<input aria-label="Room length" type="number" min="0" step="0.1" value={length} onChange={e => setLength(e.target.value)} /></label>
          <label>Room width (ft)<input aria-label="Room width" type="number" min="0" step="0.1" value={width} onChange={e => setWidth(e.target.value)} /></label>
          <label>Coverage per box (sq ft)<input aria-label="Box coverage" type="number" min="0" step="0.1" value={coverage} onChange={e => setCoverage(e.target.value)} /></label>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button onClick={calculate}>Calculate Flooring</button>
      </section>
      {result && <section className="results card" aria-live="polite">
        <div className="result-main"><span>Recommended order</span><strong>{result.boxes} boxes</strong></div>
        <div className="result-row"><span>Floor area</span><strong>{result.roomArea.toFixed(1)} sq ft</strong></div>
        <div className="result-row"><span>With 10% planning allowance</span><strong>{result.recommendedArea.toFixed(1)} sq ft</strong></div>
        <div className="result-row"><span>Waste/extra material</span><strong>{result.wasteArea.toFixed(1)} sq ft</strong></div>
        <div className="result-row"><span>Coverage per box</span><strong>{coverage} sq ft</strong></div>
        <button className="secondary" onClick={copyResults}>Copy Results</button>
      </section>}
      <section className="info">
        <h2>How it works</h2>
        <p>Floor area = length × width. ATHENA adds a 10% planning allowance for cuts and normal material loss, then rounds up to whole boxes based on the coverage you enter.</p>
        <p><strong>Tip:</strong> Check the flooring manufacturer's box coverage because package sizes vary by product.</p>
      </section>
    </main>
  )
}

export default App