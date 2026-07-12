const models = [
  { name: 'GPT-4o Mini', input: 0.15, output: 0.6, context: '128k' },
  { name: 'Claude 3.5 Sonnet', input: 0.3, output: 1.5, context: '200k' },
  { name: 'Gemini 1.5 Flash', input: 0.07, output: 0.3, context: '1M' }
];

function estimateCost(model: (typeof models)[number], inputTokens: number, outputTokens: number) {
  return (inputTokens / 1_000_000) * model.input + (outputTokens / 1_000_000) * model.output;
}

export default function App() {
  const sample = estimateCost(models[0], 250_000, 80_000);

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Open source • privacy friendly • no login</p>
        <h1>ModelBudget</h1>
        <p className="lead">
          Estimate, compare and optimize AI model costs before you ship production features.
        </p>
        <div className="stats" role="list">
          {models.map((model) => (
            <article key={model.name} className="stat-card" role="listitem">
              <h2>{model.name}</h2>
              <p>Context: {model.context}</p>
              <p>Sample estimate: ${estimateCost(model, 250_000, 80_000).toFixed(4)}</p>
            </article>
          ))}
        </div>
        <p className="summary">Sample scenario estimate: ${sample.toFixed(4)} for the selected setup.</p>
      </section>
    </main>
  );
}
