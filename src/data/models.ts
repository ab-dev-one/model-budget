export type AiModel = {
  id: string;
  name: string;
  inputPerMillion: number;
  outputPerMillion: number;
  contextWindow: string;
  profile: string;
};

export const MODELS: AiModel[] = [
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    inputPerMillion: 0.15,
    outputPerMillion: 0.6,
    contextWindow: '128k',
    profile: 'Balanced everyday assistant'
  },
  {
    id: 'claude-sonnet',
    name: 'Claude Sonnet',
    inputPerMillion: 0.3,
    outputPerMillion: 1.5,
    contextWindow: '200k',
    profile: 'Long-form reasoning and planning'
  },
  {
    id: 'gemini-flash',
    name: 'Gemini Flash',
    inputPerMillion: 0.07,
    outputPerMillion: 0.3,
    contextWindow: '1M',
    profile: 'High-throughput low-latency tasks'
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    inputPerMillion: 0.4,
    outputPerMillion: 1.2,
    contextWindow: '128k',
    profile: 'European stack and compliance-oriented workloads'
  }
];
