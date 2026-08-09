import { useEffect, useMemo, useState } from 'react';
import { MODELS } from './data/models';
import { estimateMonthlyCost, estimateRequestCost, formatUsd } from './features/costs';
import { buildGrowthProjection } from './features/projections';

type Locale = 'en' | 'it';

const SCENARIO_STORAGE_KEY = 'modelbudget:scenario:v1';

const COPY = {
  en: {
    eyebrow: 'Open source - browser only - no tracking',
    lead:
      'Estimate model spend before coding a feature. Tune token mix, request volume and compare models in real time.',
    controlsAria: 'Scenario controls',
    inputTokens: 'Input tokens per request',
    outputTokens: 'Output tokens per request',
    monthlyRequests: 'Monthly requests',
    monthlyGrowthRate: 'Monthly growth rate (%)',
    focusModel: 'Focus model',
    summaryAria: 'Scenario summary',
    focusMonthly: 'Focus model monthly',
    cheapestMonthly: 'Cheapest model monthly',
    potentialSavings: 'Potential monthly savings',
    projectionAria: '6 month projection',
    projectionTitle: '6 month projection',
    growthAssumption: 'Growth assumption',
    chartAria: 'Monthly cost projection chart',
    legendFocus: 'Focus model',
    legendCheapest: 'Cheapest model',
    resultsAria: 'Model comparison results',
    context: 'Context',
    perRequest: 'Per request',
    monthly: 'Monthly',
    tip:
      'Tip: start with your real prompt/output mix, then iterate model choice before implementing.',
    switchTo: 'Switch language',
    saveScenario: 'Save scenario',
    loadScenario: 'Load saved',
    resetScenario: 'Reset defaults',
    scenarioSaved: 'Scenario saved locally.',
    scenarioLoaded: 'Saved scenario loaded.',
    scenarioReset: 'Default scenario restored.',
    scenarioMissing: 'No saved scenario found yet.',
    recommendationSavings: (modelName: string, savings: string) =>
      `Switching to ${modelName} could save about ${savings}/month for the current scenario.`,
    recommendationCheapest: (modelName: string) =>
      `${modelName} is already your cheapest option in this scenario.`
  },
  it: {
    eyebrow: 'Open source - solo browser - nessun tracciamento',
    lead:
      'Stima la spesa del modello prima di sviluppare una funzionalita. Regola token, volume richieste e confronta i modelli in tempo reale.',
    controlsAria: 'Controlli scenario',
    inputTokens: 'Token input per richiesta',
    outputTokens: 'Token output per richiesta',
    monthlyRequests: 'Richieste mensili',
    monthlyGrowthRate: 'Tasso di crescita mensile (%)',
    focusModel: 'Modello di riferimento',
    summaryAria: 'Riepilogo scenario',
    focusMonthly: 'Costo mensile modello focus',
    cheapestMonthly: 'Costo mensile modello piu economico',
    potentialSavings: 'Risparmio mensile potenziale',
    projectionAria: 'Proiezione a 6 mesi',
    projectionTitle: 'Proiezione a 6 mesi',
    growthAssumption: 'Ipotesi di crescita',
    chartAria: 'Grafico proiezione costi mensili',
    legendFocus: 'Modello focus',
    legendCheapest: 'Modello piu economico',
    resultsAria: 'Risultati confronto modelli',
    context: 'Contesto',
    perRequest: 'Per richiesta',
    monthly: 'Mensile',
    tip:
      'Suggerimento: parti dal mix reale di token input/output e iterare la scelta modello prima dell implementazione.',
    switchTo: 'Cambia lingua',
    saveScenario: 'Salva scenario',
    loadScenario: 'Carica salvato',
    resetScenario: 'Ripristina default',
    scenarioSaved: 'Scenario salvato in locale.',
    scenarioLoaded: 'Scenario salvato caricato.',
    scenarioReset: 'Scenario predefinito ripristinato.',
    scenarioMissing: 'Nessuno scenario salvato disponibile.',
    recommendationSavings: (modelName: string, savings: string) =>
      `Passando a ${modelName} potresti risparmiare circa ${savings}/mese nello scenario corrente.`,
    recommendationCheapest: (modelName: string) =>
      `${modelName} e gia la tua opzione piu economica in questo scenario.`
  }
} as const;

const MODEL_PROFILE_BY_LOCALE: Record<Locale, Record<string, string>> = {
  en: {
    'gpt-4o-mini': 'Balanced everyday assistant',
    'claude-sonnet': 'Long-form reasoning and planning',
    'gemini-flash': 'High-throughput low-latency tasks',
    'mistral-large': 'European stack and compliance-oriented workloads'
  },
  it: {
    'gpt-4o-mini': 'Assistente bilanciato per uso quotidiano',
    'claude-sonnet': 'Ragionamento esteso e pianificazione',
    'gemini-flash': 'Task ad alta velocita e bassa latenza',
    'mistral-large': 'Workload orientati a compliance e stack europei'
  }
};

export default function App() {
  const defaultModelId = MODELS[0].id;
  const [locale, setLocale] = useState<Locale>('en');
  const [inputTokens, setInputTokens] = useState(250_000);
  const [outputTokens, setOutputTokens] = useState(80_000);
  const [monthlyRequests, setMonthlyRequests] = useState(1500);
  const [growthRatePercent, setGrowthRatePercent] = useState(12);
  const [selectedModelId, setSelectedModelId] = useState(defaultModelId);
  const [scenarioMessage, setScenarioMessage] = useState('');

  const t = COPY[locale];

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
      ? t.recommendationSavings(cheapest.name, formatUsd(potentialSavings))
      : t.recommendationCheapest(selected.name);

  useEffect(() => {
    if (!scenarioMessage) {
      return;
    }

    const timer = setTimeout(() => setScenarioMessage(''), 2200);
    return () => clearTimeout(timer);
  }, [scenarioMessage]);

  const saveScenario = () => {
    const payload = {
      inputTokens,
      outputTokens,
      monthlyRequests,
      growthRatePercent,
      selectedModelId
    };

    localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(payload));
    setScenarioMessage(t.scenarioSaved);
  };

  const loadScenario = () => {
    const raw = localStorage.getItem(SCENARIO_STORAGE_KEY);
    if (!raw) {
      setScenarioMessage(t.scenarioMissing);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as {
        inputTokens: number;
        outputTokens: number;
        monthlyRequests: number;
        growthRatePercent: number;
        selectedModelId: string;
      };

      setInputTokens(parsed.inputTokens ?? 250_000);
      setOutputTokens(parsed.outputTokens ?? 80_000);
      setMonthlyRequests(parsed.monthlyRequests ?? 1500);
      setGrowthRatePercent(parsed.growthRatePercent ?? 12);

      const exists = MODELS.some((model) => model.id === parsed.selectedModelId);
      setSelectedModelId(exists ? parsed.selectedModelId : defaultModelId);
      setScenarioMessage(t.scenarioLoaded);
    } catch {
      setScenarioMessage(t.scenarioMissing);
    }
  };

  const resetScenario = () => {
    setInputTokens(250_000);
    setOutputTokens(80_000);
    setMonthlyRequests(1500);
    setGrowthRatePercent(12);
    setSelectedModelId(defaultModelId);
    setScenarioMessage(t.scenarioReset);
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />
      <section className="hero-card">
        <div className="hero-top">
          <p className="eyebrow">{t.eyebrow}</p>
          <div className="language-switch" role="group" aria-label={t.switchTo}>
            <button
              type="button"
              className={`lang-button ${locale === 'en' ? 'active' : ''}`}
              aria-pressed={locale === 'en'}
              onClick={() => setLocale('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-button ${locale === 'it' ? 'active' : ''}`}
              aria-pressed={locale === 'it'}
              onClick={() => setLocale('it')}
            >
              IT
            </button>
          </div>
        </div>
        <h1>ModelBudget</h1>
        <p className="lead">{t.lead}</p>

        <section className="controls-grid" aria-label={t.controlsAria}>
          <label className="control">
            <span>{t.inputTokens}</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={inputTokens}
              onChange={(event) => setInputTokens(Number(event.target.value))}
            />
          </label>

          <label className="control">
            <span>{t.outputTokens}</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={outputTokens}
              onChange={(event) => setOutputTokens(Number(event.target.value))}
            />
          </label>

          <label className="control">
            <span>{t.monthlyRequests}</span>
            <input
              type="number"
              min={1}
              step={100}
              value={monthlyRequests}
              onChange={(event) => setMonthlyRequests(Number(event.target.value))}
            />
          </label>

          <label className="control">
            <span>{t.monthlyGrowthRate}</span>
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
            <span>{t.focusModel}</span>
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

        <div className="actions-row" role="group" aria-label="Scenario actions">
          <button type="button" className="action-button" onClick={saveScenario}>
            {t.saveScenario}
          </button>
          <button type="button" className="action-button" onClick={loadScenario}>
            {t.loadScenario}
          </button>
          <button type="button" className="action-button" onClick={resetScenario}>
            {t.resetScenario}
          </button>
        </div>

        {scenarioMessage ? (
          <p className="scenario-message" role="status" aria-live="polite">
            {scenarioMessage}
          </p>
        ) : null}

        <section className="kpi-row" aria-label={t.summaryAria}>
          <article className="kpi-card">
            <h2>{t.focusMonthly}</h2>
            <p>{formatUsd(selected.monthly)}</p>
          </article>
          <article className="kpi-card">
            <h2>{t.cheapestMonthly}</h2>
            <p>{formatUsd(cheapest.monthly)}</p>
          </article>
          <article className="kpi-card">
            <h2>{t.potentialSavings}</h2>
            <p>{formatUsd(potentialSavings)}</p>
          </article>
        </section>

        <section className="projection-panel" aria-label={t.projectionAria}>
          <div className="projection-head">
            <h2>{t.projectionTitle}</h2>
            <p>
              {t.growthAssumption}: <strong>{growthRatePercent}%</strong>
            </p>
          </div>

          <svg className="projection-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={t.chartAria}>
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
              <span className="legend-dot focus" /> {t.legendFocus}: {selected.name}
            </p>
            <p>
              <span className="legend-dot cheapest" /> {t.legendCheapest}: {cheapest.name}
            </p>
          </div>
        </section>

        <aside className="recommendation" aria-live="polite">
          {recommendation}
        </aside>

        <div className="stats" role="list" aria-label={t.resultsAria}>
          {rows.map((row) => (
            <article key={row.id} className="stat-card" role="listitem">
              <h2>{row.name}</h2>
              <p>{MODEL_PROFILE_BY_LOCALE[locale][row.id] ?? row.profile}</p>
              <p>{t.context}: {row.contextWindow}</p>
              <p>{t.perRequest}: {formatUsd(row.perRequest)}</p>
              <p>{t.monthly}: {formatUsd(row.monthly)}</p>
            </article>
          ))}
        </div>

        <p className="summary">{t.tip}</p>
      </section>
    </main>
  );
}
