import { useMemo, useState } from 'react';
import { MODELS } from './data/models';
import { estimateMonthlyCost, estimateRequestCost, formatUsd } from './features/costs';
import { buildGrowthProjection } from './features/projections';

export default function App() {
  const [inputTokens, setInputTokens] = useState(250_000);
  const [outputTokens, setOutputTokens] = useState(80_000);
  const [monthlyRequests, setMonthlyRequests] = useState(1500);
  const [growthRatePercent, setGrowthRatePercent] = useState(12);
  const [selectedModelId, setSelectedModelId] = useState(MODELS[0].id);

  const rows = useMemo(() => {
    return MODELS.map((model) => {
      const perRequest = estimateRequestCost(model, inputTokens, outputTokens);
      const monthly = estimateMonthlyCost(perRequest, monthlyRequests);
      return {
        ...model,
        perRequest,
        monthly
      };
    }).sort((a, b) => a.monthly - b.monthly);
  }, [inputTokens, outputTokens, monthlyRequests]);

  const selected =
    rows.find((row) => row.id === selectedModelId) ??
    rows[0];

  const cheapest = rows[0];
  const potentialSavings = Math.max(selected.monthly - cheapest.monthly, 0);
  const projectionMonths = 6;

  const selectedProjection = useMemo(
    () => buildGrowthProjection(selected.monthly, growthRatePercent, projectionMonths),
    [selected.monthly, growthRatePercent]
  );

  const cheapestProjection = useMemo(
    () => buildGrowthProjection(cheapest.monthly, growthRatePercent, projectionMonths),
    [cheapest.monthly, growthRatePercent]
  );

  const projectionMax = Math.max(
    ...selectedProjection.map((point) => point.monthlyCost),
    ...cheapestProjection.map((point) => point.monthlyCost),
    1
  );

  const chartWidth = 560;
  const chartHeight = 180;

  const toPolylinePoints = (values: number[]) => {
    return values
      .map((value, index) => {
        const x = (index / Math.max(values.length - 1, 1)) * chartWidth;
        const y = chartHeight - (value / projectionMax) * chartHeight;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  };

  const recommendation =
    potentialSavings > 0
      ? `Switching to ${cheapest.name} could save about ${formatUsd(
          potentialSavings
        )}/month for the current scenario.`
      : `${selected.name} is already your cheapest option in this scenario.`;

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />
      <section className="hero-card">
        <p className="eyebrow">Open source • browser only • no tracking</p>
        <h1>ModelBudget</h1>
        <p className="lead">
          Estimate model spend before coding a feature. Tune token mix, request volume and compare
          models in real time.
        </p>

        <section className="controls-grid" aria-label="Scenario controls">
          <label className="control">
            <span>Input tokens per request</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={inputTokens}
              onChange={(event) => setInputTokens(Number(event.target.value))}
            />
          </label>

          <label className="control">
            <span>Output tokens per request</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={outputTokens}
              onChange={(event) => setOutputTokens(Number(event.target.value))}
            />
          </label>

          <label className="control">
            <span>Monthly requests</span>
            <input
              type="number"
              min={1}
              step={100}
              value={monthlyRequests}
              onChange={(event) => setMonthlyRequests(Number(event.target.value))}
            />
          </label>

          <label className="control">
            <span>Monthly growth rate (%)</span>
            <input
              type="number"
              min={0}
              max={300}
              step={1}
              value={growthRatePercent}
              onChange={(event) => setGrowthRatePercent(Number(event.target.value))}
            />
          </label>

          <label className="control">
            <span>Focus model</span>
            <select
              value={selectedModelId}
              onChange={(event) => setSelectedModelId(event.target.value)}
            >
              {rows.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.name}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className="kpi-row" aria-label="Scenario summary">
          <article className="kpi-card">
            <h2>Focus model monthly</h2>
            <p>{formatUsd(selected.monthly)}</p>
          </article>
          <article className="kpi-card">
            <h2>Cheapest model monthly</h2>
            <p>{formatUsd(cheapest.monthly)}</p>
          </article>
          <article className="kpi-card">
            <h2>Potential monthly savings</h2>
            <p>{formatUsd(potentialSavings)}</p>
          </article>
        </section>

        <section className="projection-panel" aria-label="6 month projection">
          <div className="projection-head">
            <h2>6 month projection</h2>
            <p>
              Growth assumption: <strong>{growthRatePercent}% monthly</strong>
            </p>
          </div>

          <svg className="projection-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Monthly cost projection chart">
            <polyline
              points={toPolylinePoints(selectedProjection.map((point) => point.monthlyCost))}
              className="line-focus"
            />
            <polyline
              points={toPolylinePoints(cheapestProjection.map((point) => point.monthlyCost))}
              className="line-cheapest"
            />
          </svg>

          <div className="projection-legend">
            <p>
              <span className="legend-dot focus" /> Focus model: {selected.name}
            </p>
            <p>
              <span className="legend-dot cheapest" /> Cheapest model: {cheapest.name}
            </p>
          </div>
        </section>

        <aside className="recommendation" aria-live="polite">
          {recommendation}
        </aside>

        <div className="stats" role="list" aria-label="Model comparison results">
          {rows.map((row) => (
            <article key={row.id} className="stat-card" role="listitem">
              <h2>{row.name}</h2>
              <p>{row.profile}</p>
              <p>Context: {row.contextWindow}</p>
              <p>Per request: {formatUsd(row.perRequest)}</p>
              <p>Monthly: {formatUsd(row.monthly)}</p>
            </article>
          ))}
        </div>

        <p className="summary">
          Tip: start with your real prompt/output mix, then iterate model choice before implementing.
        </p>
      </section>
    </main>
  );
}
