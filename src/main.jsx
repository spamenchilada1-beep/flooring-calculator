import { useState } from 'react'
import { createRoot } from 'react-dom/client'
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
    window.gtag?.('event', 'calculator_completed', { calculator: 'flooring' })
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
      <section className="affiliate-card" aria-label="Recommended flooring project supplies">
        <p className="affiliate-label">FLOORING TOOLS &amp; SUPPLIES</p>
        <h2>Ready to install? Get the materials and tools next.</h2>
        <p>Use your flooring estimate, then compare installation tools and underlayment on Amazon.</p>
        <div className="affiliate-links">
          <a href="https://www.amazon.com/s?k=flooring+installation+tools&tag=athena-flooring-20" target="_blank" rel="sponsored noopener">Shop flooring installation tools <span>(paid link)</span></a>
          <a href="https://www.amazon.com/s?k=flooring+underlayment&tag=athena-flooring-20" target="_blank" rel="sponsored noopener">Shop flooring underlayment <span>(paid link)</span></a>
        </div>
      </section>
      <section className="info">
        <h2>How it works</h2>
        <p>Floor area = length × width. ATHENA adds a 10% planning allowance for cuts and normal material loss, then rounds up to whole boxes based on the coverage you enter.</p>
        <p><strong>Tip:</strong> Check the flooring manufacturer's box coverage because package sizes vary by product.</p>

        <h2>How much flooring do I need?</h2>
        <p>
          Measure the room length and width to get the floor area in square
          feet. Enter the coverage printed on the flooring package so the
          calculator can convert your recommended square footage into whole
          boxes.
        </p>

        <h2>How much extra flooring should I order?</h2>
        <p>
          ATHENA uses a 10% planning allowance for cuts and normal material
          loss. Your actual extra requirement can vary with the room layout,
          pattern, product, and installation method, so confirm the amount
          recommended by the flooring manufacturer when available.
        </p>

        <h2>Flooring calculator for remodeling projects</h2>
        <p>
          For multiple rooms, calculate each room separately and add the
          recommended material amounts. Keep a record of the product, color,
          lot information, and box coverage used for the order.
        </p>
        <h2>Flooring planning tips</h2>
        <p>Order enough material to cover the calculated area plus your selected waste allowance. Keep the product, color, lot information, and box coverage together when ordering.</p>
        <p>See the step-by-step guide: <a href="/flooring-calculator-square-feet">Flooring Calculator: Square Feet &amp; Boxes</a></p>
        <p>Need help converting square footage into boxes? Read the <a href="/how-many-boxes-of-flooring">flooring box guide</a>.</p>
      </section>
      <nav aria-label="More ATHENA Calculators">
        <p><strong>More ATHENA Calculators:</strong> <a href="https://athena-public-platform.pages.dev/#tools">ATHENA Tools</a> · <a href="https://paint-calculator-5wq.pages.dev/">Paint Calculator</a> · <a href="https://contractor-pricing-calculator.pages.dev/">Contractor Pricing Calculator</a> · <a href="https://concrete-calculator-cic.pages.dev/">Concrete Calculator</a></p>
      </nav>

      <footer>
        <p>Free flooring calculator for practical planning.</p>
        <p>As an Amazon Associate I earn from qualifying purchases.</p>
        <a href="/privacy.html">Privacy Policy</a>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)

