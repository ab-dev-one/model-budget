import { formatUsd } from './costs';

export type ScenarioReportRow = {
  name: string;
  provider: string;
  contextWindow: string;
  inputPerMillion: number;
  outputPerMillion: number;
  perRequest: number;
  monthly: number;
};

export type ScenarioReportInput = {
  scenarioName: string;
  inputTokens: number;
  outputTokens: number;
  monthlyRequests: number;
  growthRatePercent: number;
  pricingSnapshotDate: string;
  rows: ScenarioReportRow[];
};

export function buildScenarioMarkdown(input: ScenarioReportInput): string {
  const { scenarioName, inputTokens, outputTokens, monthlyRequests, growthRatePercent, pricingSnapshotDate, rows } = input;

  const lines = [
    `# ${scenarioName}`,
    '',
    `- Input tokens per request: ${inputTokens}`,
    `- Output tokens per request: ${outputTokens}`,
    `- Monthly requests: ${monthlyRequests}`,
    `- Monthly growth: ${growthRatePercent}%`,
    `- Pricing snapshot: ${pricingSnapshotDate}`,
    '',
    '| Model | Provider | Context | Input / 1M | Output / 1M | Per request | Monthly |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...rows.map((row) =>
      `| ${row.name} | ${row.provider} | ${row.contextWindow} | ${formatUsd(row.inputPerMillion)} | ${formatUsd(row.outputPerMillion)} | ${formatUsd(row.perRequest)} | ${formatUsd(row.monthly)} |`
    )
  ];

  return lines.join('\n');
}
