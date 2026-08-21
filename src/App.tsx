import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { MODELS, PRICING_SNAPSHOT_DATE } from './data/models';
import { estimateMonthlyCost, estimateRequestCost, formatUsd } from './features/costs';
import { buildGrowthProjection } from './features/projections';

type Locale = 'en' | 'it';

const MAX_MODELS = 4;
const STORAGE_KEY = 'modelbudget:snapshots:v2';
const COLORS = ['#087f72', '#d8572a', '#2764ad', '#9b3e72'];
const DEFAULTS = {
  inputTokens: 250_000,
  outputTokens: 80_000,
  monthlyRequests: 1_500,
  growthRatePercent: 12,
  selectedModelIds: ['gpt-5-mini', 'claude-sonnet-4-5', 'gemini-3-flash']
};

const snapshotSchema = z.object({
  name: z.string().trim().min(1).max(48),
  inputTokens: z.number().finite().min(0).max(100_000_000),
  outputTokens: z.number().finite().min(0).max(100_000_000),
  monthlyRequests: z.number().finite().min(1).max(100_000_000),
  growthRatePercent: z.number().finite().min(0).max(300),
  selectedModelIds: z.array(z.string()).min(1).max(MAX_MODELS)
});
type Snapshot = z.infer<typeof snapshotSchema>;

const COPY = {
  en: {
    eyebrow: 'AI cost planning, made simple',
    title: 'Plan AI spend before it becomes a surprise.',
    lead: 'Set your token mix and traffic. Compare the models that matter to your product in a single decision surface.',
    usage: 'Usage assumptions',
    compare: 'Compare models',
    input: 'Input tokens per request', output: 'Output tokens per request', requests: 'Monthly requests', growth: 'Monthly growth (%)',
    primary: 'Primary model', snapshotName: 'Snapshot name', save: 'Save snapshot', snapshots: 'Saved snapshots', load: 'Load', remove: 'Delete', none: 'No saved snapshots yet.',
    localOnly: 'Snapshots stay on this device.',
    maxModels: `Choose no more than ${MAX_MODELS} models.`, keepOne: 'Keep at least one model in the comparison.',
    primarySpend: 'Primary monthly spend', lowestSpend: 'Lowest selected spend', difference: 'Monthly difference',
    chartTitle: 'Six-month cost trajectory', chartNote: 'Each line applies the same growth assumption.', chartAria: 'Cost trajectory for compared models',
    estimates: 'Compared model estimates', context: 'Context', inputPrice: 'Input / 1M', outputPrice: 'Output / 1M', request: 'Per request', monthly: 'Monthly',
    pricing: `List-price snapshot from ${PRICING_SNAPSHOT_DATE}. Verify provider pricing, regional rates, cache discounts and batch pricing before purchase decisions.`,
    saved: 'Snapshot saved locally.', loaded: 'Snapshot loaded.', removed: 'Snapshot removed.',
    recommendation: (name: string, savings: string) => `${name} is the lowest-cost selected option, ${savings}/month below the primary model.`,
    lowest: (name: string) => `${name} is currently the lowest-cost selected option.`, switchLanguage: 'Switch language'
  },
  it: {
    eyebrow: 'Pianificazione dei costi AI, resa semplice',
    title: 'Pianifica la spesa AI prima che diventi una sorpresa.',
    lead: 'Imposta il mix di token e il traffico. Confronta in un unico spazio i modelli che contano per il tuo prodotto.',
    usage: 'Ipotesi di utilizzo', compare: 'Confronta modelli',
    input: 'Token input per richiesta', output: 'Token output per richiesta', requests: 'Richieste mensili', growth: 'Crescita mensile (%)',
    primary: 'Modello principale', snapshotName: 'Nome snapshot', save: 'Salva snapshot', snapshots: 'Snapshot salvati', load: 'Carica', remove: 'Elimina', none: 'Nessuno snapshot salvato.',
    localOnly: 'Gli snapshot restano su questo dispositivo.',
    maxModels: `Puoi selezionare al massimo ${MAX_MODELS} modelli.`, keepOne: 'Mantieni almeno un modello nel confronto.',
    primarySpend: 'Spesa mensile principale', lowestSpend: 'Spesa selezionata minima', difference: 'Differenza mensile',
    chartTitle: 'Traiettoria costi a sei mesi', chartNote: 'Ogni linea applica la stessa ipotesi di crescita.', chartAria: 'Traiettoria costi dei modelli confrontati',
    estimates: 'Stime dei modelli confrontati', context: 'Contesto', inputPrice: 'Input / 1M', outputPrice: 'Output / 1M', request: 'Per richiesta', monthly: 'Mensile',
    pricing: `Snapshot dei prezzi di listino: ${PRICING_SNAPSHOT_DATE}. Verifica prezzi provider, tariffe regionali, sconti cache e batch prima di prendere decisioni di acquisto.`,
    saved: 'Snapshot salvato in locale.', loaded: 'Snapshot caricato.', removed: 'Snapshot eliminato.',
    recommendation: (name: string, savings: string) => `${name} e l'opzione selezionata meno costosa, con ${savings}/mese in meno del modello principale.`,
    lowest: (name: string) => `${name} e l'opzione selezionata meno costosa in questo momento.`, switchLanguage: 'Cambia lingua'
  }
} as const;

function readSnapshots(): Snapshot[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const parsed = z.array(snapshotSchema).safeParse(saved);
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}

function toSafeNumber(value: string, minimum: number, maximum: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, minimum), maximum) : minimum;
}

export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [inputTokens, setInputTokens] = useState(DEFAULTS.inputTokens);
  const [outputTokens, setOutputTokens] = useState(DEFAULTS.outputTokens);
  const [monthlyRequests, setMonthlyRequests] = useState(DEFAULTS.monthlyRequests);
  const [growthRatePercent, setGrowthRatePercent] = useState(DEFAULTS.growthRatePercent);
  const [selectedModelIds, setSelectedModelIds] = useState(DEFAULTS.selectedModelIds);
  const [primaryModelId, setPrimaryModelId] = useState(DEFAULTS.selectedModelIds[0]);
  const [snapshotName, setSnapshotName] = useState('Q3 planning');
  const [snapshots, setSnapshots] = useState<Snapshot[]>(readSnapshots);
  const [message, setMessage] = useState('');
  const t = COPY[locale];

  const rows = useMemo(() => MODELS.map((model) => {
    const perRequest = estimateRequestCost(model, inputTokens, outputTokens);
    return { ...model, perRequest, monthly: estimateMonthlyCost(perRequest, monthlyRequests) };
  }).sort((left, right) => left.monthly - right.monthly), [inputTokens, outputTokens, monthlyRequests]);

  const comparisonRows = rows.filter((row) => selectedModelIds.includes(row.id));
  const primary = comparisonRows.find((row) => row.id === primaryModelId) ?? comparisonRows[0];
  const cheapest = comparisonRows[0];
  const savings = Math.max((primary?.monthly ?? 0) - (cheapest?.monthly ?? 0), 0);
  const projections = comparisonRows.map((row) => ({
    ...row,
    points: buildGrowthProjection(row.monthly, growthRatePercent, 6)
  }));
  const projectionMax = Math.max(...projections.flatMap((series) => series.points.map((point) => point.monthlyCost)), 1);

  useEffect(() => {
    if (!message) return;
    const timeoutId = window.setTimeout(() => setMessage(''), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [message]);

  const toggleModel = (modelId: string) => {
    if (selectedModelIds.includes(modelId)) {
      if (selectedModelIds.length === 1) return setMessage(t.keepOne);
      const next = selectedModelIds.filter((id) => id !== modelId);
      setSelectedModelIds(next);
      if (primaryModelId === modelId) setPrimaryModelId(next[0]);
      return;
    }
    if (selectedModelIds.length === MAX_MODELS) return setMessage(t.maxModels);
    setSelectedModelIds((ids) => [...ids, modelId]);
  };

  const saveSnapshot = () => {
    const candidate = snapshotSchema.safeParse({ name: snapshotName, inputTokens, outputTokens, monthlyRequests, growthRatePercent, selectedModelIds });
    if (!candidate.success) return;
    const next = [candidate.data, ...snapshots.filter((snapshot) => snapshot.name !== candidate.data.name)].slice(0, 12);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSnapshots(next);
      setMessage(t.saved);
    } catch {
      setMessage('');
    }
  };

  const loadSnapshot = (snapshot: Snapshot) => {
    setInputTokens(snapshot.inputTokens); setOutputTokens(snapshot.outputTokens); setMonthlyRequests(snapshot.monthlyRequests);
    setGrowthRatePercent(snapshot.growthRatePercent); setSelectedModelIds(snapshot.selectedModelIds); setPrimaryModelId(snapshot.selectedModelIds[0]);
    setSnapshotName(snapshot.name); setMessage(t.loaded);
  };

  const removeSnapshot = (name: string) => {
    const next = snapshots.filter((snapshot) => snapshot.name !== name);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { return; }
    setSnapshots(next); setMessage(t.removed);
  };

  const chartPoints = (values: number[]) => values.map((value, index) => {
    const x = 42 + index * 103.6;
    const y = 14 + (1 - value / projectionMax) * 146;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');

  return <main className="app-shell"><section className="workspace">
    <header className="masthead"><div><p className="eyebrow">{t.eyebrow}</p><h1>ModelBudget</h1></div><div className="language-switch" role="group" aria-label={t.switchLanguage}>{(['en', 'it'] as const).map((language) => <button key={language} type="button" className={locale === language ? 'active' : ''} aria-pressed={locale === language} onClick={() => setLocale(language)}>{language.toUpperCase()}</button>)}</div></header>
    <section className="intro"><h2>{t.title}</h2><p>{t.lead}</p></section>
    <div className="planning-layout">
      <section className="control-panel" aria-label={t.usage}><div className="section-heading"><p>{t.usage}</p><span>{t.localOnly}</span></div><div className="input-grid">
        <label><span>{t.input}</span><input type="number" min="0" step="1000" value={inputTokens} onChange={(event) => setInputTokens(toSafeNumber(event.target.value, 0, 100_000_000))} /></label>
        <label><span>{t.output}</span><input type="number" min="0" step="1000" value={outputTokens} onChange={(event) => setOutputTokens(toSafeNumber(event.target.value, 0, 100_000_000))} /></label>
        <label><span>{t.requests}</span><input type="number" min="1" step="100" value={monthlyRequests} onChange={(event) => setMonthlyRequests(toSafeNumber(event.target.value, 1, 100_000_000))} /></label>
        <label><span>{t.growth}</span><input type="number" min="0" max="300" value={growthRatePercent} onChange={(event) => setGrowthRatePercent(toSafeNumber(event.target.value, 0, 300))} /></label>
      </div><label className="primary-select"><span>{t.primary}</span><select value={primary?.id} onChange={(event) => setPrimaryModelId(event.target.value)}>{comparisonRows.map((row) => <option key={row.id} value={row.id}>{row.name}</option>)}</select></label>
      <div className="snapshot-box"><label><span>{t.snapshotName}</span><input value={snapshotName} maxLength={48} onChange={(event) => setSnapshotName(event.target.value)} /></label><button type="button" className="primary-action" onClick={saveSnapshot}>{t.save}</button><div className="snapshot-list" aria-label={t.snapshots}>{snapshots.length ? snapshots.map((snapshot) => <div key={snapshot.name}><span>{snapshot.name}</span><button type="button" onClick={() => loadSnapshot(snapshot)}>{t.load}</button><button type="button" onClick={() => removeSnapshot(snapshot.name)}>{t.remove}</button></div>) : <p>{t.none}</p>}</div></div>
      </section>
      <section className="comparison-panel" aria-label={t.compare}><div className="section-heading"><p>{t.compare}</p><span>{selectedModelIds.length}/{MAX_MODELS}</span></div><div className="model-picker">{rows.map((row) => { const selected = selectedModelIds.includes(row.id); return <label key={row.id} className={selected ? 'model-option selected' : 'model-option'}><input type="checkbox" checked={selected} onChange={() => toggleModel(row.id)} /><span><strong>{row.name}</strong><small>{row.provider}</small></span><b>{formatUsd(row.monthly)}</b></label>; })}</div></section>
    </div>
    {message ? <p className="status-message" role="status" aria-live="polite">{message}</p> : null}
    <section className="kpi-row" aria-label="Budget summary"><article><span>{t.primarySpend}</span><strong>{formatUsd(primary?.monthly ?? 0)}</strong><small>{primary?.name}</small></article><article><span>{t.lowestSpend}</span><strong>{formatUsd(cheapest?.monthly ?? 0)}</strong><small>{cheapest?.name}</small></article><article><span>{t.difference}</span><strong>{formatUsd(savings)}</strong><small>{growthRatePercent}% monthly growth</small></article></section>
    <section className="chart-section"><div className="chart-heading"><div><p>{t.chartTitle}</p><span>{t.chartNote}</span></div><strong>{growthRatePercent}%</strong></div><svg className="projection-chart" viewBox="0 0 580 190" role="img" aria-label={t.chartAria}>{[14, 63, 112, 160].map((y) => <line key={y} x1="42" x2="560" y1={y} y2={y} className="chart-grid" />)}{[1, 2, 3, 4, 5, 6].map((month, index) => <text key={month} x={42 + index * 103.6} y="182" className="chart-label">M{month}</text>)}{projections.map((series, index) => <polyline key={series.id} points={chartPoints(series.points.map((point) => point.monthlyCost))} style={{ stroke: COLORS[index] }} className="chart-line" />)}</svg><div className="chart-legend">{projections.map((series, index) => <span key={series.id}><i style={{ backgroundColor: COLORS[index] }} />{series.name}</span>)}</div></section>
    <aside className="recommendation" aria-live="polite">{savings ? t.recommendation(cheapest.name, formatUsd(savings)) : t.lowest(primary?.name ?? '')}</aside>
    <section className="results-section" aria-label={t.estimates}><div className="section-heading"><p>{t.estimates}</p><span>{t.pricing}</span></div><div className="results-grid">{comparisonRows.map((row) => <article key={row.id} className={row.id === primary?.id ? 'result-card primary' : 'result-card'}><div><span>{row.provider}</span><h3>{row.name}</h3><p>{row.profile}</p></div><dl><div><dt>{t.context}</dt><dd>{row.contextWindow}</dd></div><div><dt>{t.inputPrice}</dt><dd>{formatUsd(row.inputPerMillion)}</dd></div><div><dt>{t.outputPrice}</dt><dd>{formatUsd(row.outputPerMillion)}</dd></div><div><dt>{t.request}</dt><dd>{formatUsd(row.perRequest)}</dd></div><div><dt>{t.monthly}</dt><dd>{formatUsd(row.monthly)}</dd></div></dl></article>)}</div></section>
  </section></main>;
}