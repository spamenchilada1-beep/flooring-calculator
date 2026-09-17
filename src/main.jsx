import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function calculateFlooring(length, width, waste) {
  const area = length * width;
  const wasteFactor = 1 + waste / 100;
  return { area, recommended: area * wasteFactor };
}

function App() {
  const [length, setLength] = useState('12');
  const [width, setWidth] = useState('10');
  const [waste, setWaste] = useState('10');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function calculate() {
    const l = Number(length), w = Number(width), wa = Number(waste);
    if (!(l > 0) || !(w > 0) || wa < 0 || wa > 50) {
      setError('Enter positive room dimensions and a waste allowance from 0% to 50%.');
      setResult(null);
      return;
    }
    setError('');
    setResult(calculateFlooring(l, w, wa));
  }

  function copyResults() {
    if (!result) return;
    navigator.clipboard?.writeText(`Flooring area: ${result.area.toFixed(2)} sq ft\nRecommended order: ${result.recommended.toFixed(2)} sq ft`);
  }

  return (
    <main className="page">
      <header className="hero">
        <div className="brand">
          <img className="brand-logo" src="/athena-calculators-logo.jpg" alt="ATHENA Calculators" />
        </div>
        <p className="eyebrow">FLOORING CALCULATOR</p>
        <h1>How Much Flooring Do I Need?</h1>
        <p className="intro">Estimate square footage and recommended material for flooring projects, with a built-in waste allowance.</p>
      </header>

      <section className="card">
        <div className="grid">
          <label>Room length (ft)<input type="number" min="0" step="0.1" value={length} onChange={e => setLength(e.target.value)} /></label>
          <label>Room width (ft)<input type="number" min="0" step="0.1" value={width} onChange={e => setWidth(e.target.value)} /></label>
          <label>Waste allowance (%)<input type="number" min="0" max="50" step="1" value={waste} onChange={e => setWaste(e.target.value)} /></label>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button onClick={calculate}>Calculate Flooring</button>
      </section>

      {result && <section className="results card" aria-live="polite">
        <div className="result-main"><span>Recommended order</span><strong>{result.recommended.toFixed(2)} sq ft</strong></div>
        <div className="result-row"><span>Room area</span><strong>{result.area.toFixed(2)} sq ft</strong></div>
        <div className="result-row"><span>Waste allowance</span><strong>{waste}%</strong></div>
        <button className="secondary" onClick={copyResults}>Copy Results</button>
      </section>}

      <section className="info">
        <h2>How it works</h2>
        <p>Flooring area = length � width. Recommended material adds your waste allowance to help cover cuts, fitting, and normal material loss.</p>
        <p><strong>Tip:</strong> For irregular rooms, divide the space into rectangles, calculate each section, then add the results together.</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
