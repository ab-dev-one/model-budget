import { buildScenarioMarkdown } from './report';

describe('buildScenarioMarkdown', () => {
  it('renders scenario assumptions and a comparison table', () => {
    const markdown = buildScenarioMarkdown({
      scenarioName: 'Launch plan',
      inputTokens: 250_000,
      outputTokens: 80_000,
      monthlyRequests: 1_500,
      growthRatePercent: 12,
      pricingSnapshotDate: 'August 2026',
      rows: [
        {
          name: 'GPT-5 mini',
          provider: 'OpenAI',
          contextWindow: '400k',
          inputPerMillion: 0.35,
          outputPerMillion: 2.4,
          perRequest: 0.001,
          monthly: 1.5
        }
      ]
    });

    expect(markdown).toContain('# Launch plan');
    expect(markdown).toContain('Monthly growth: 12%');
    expect(markdown).toContain('Pricing snapshot: August 2026');
    expect(markdown).toContain('| GPT-5 mini | OpenAI | 400k |');
  });
});
