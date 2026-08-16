export type AiModel = {
  id: string;
  name: string;
  provider: string;
  inputPerMillion: number;
  outputPerMillion: number;
  contextWindow: string;
  profile: string;
};

export const MODELS: AiModel[] = [
  {
    id: 'gpt-4-1-mini',
    name: 'GPT-4.1 mini',
    provider: 'OpenAI',
    inputPerMillion: 0.4,
    outputPerMillion: 1.6,
    contextWindow: '128k',
    profile: 'Fast, capable model for high-volume product work'
  },
  {
    id: 'gpt-4-1',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    inputPerMillion: 2,
    outputPerMillion: 8,
    contextWindow: '200k',
    profile: 'Strong instruction following and coding workloads'
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    inputPerMillion: 0.8,
    outputPerMillion: 4,
    contextWindow: '200k',
    profile: 'Responsive assistant for customer-facing flows'
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    inputPerMillion: 3,
    outputPerMillion: 15,
    contextWindow: '1M',
    profile: 'Complex coding, analysis and agentic workflows'
  },
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    inputPerMillion: 15,
    outputPerMillion: 75,
    contextWindow: '200k',
    profile: 'Highest-stakes reasoning and long-running tasks'
  },
  {
    id: 'gemini-2-5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    inputPerMillion: 0.3,
    outputPerMillion: 2.5,
    contextWindow: '1M',
    profile: 'Fast multimodal and high-throughput workloads'
  },
  {
    id: 'gemini-2-5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    inputPerMillion: 1.25,
    outputPerMillion: 10,
    contextWindow: '1M',
    profile: 'Advanced reasoning and large-context work'
  },
  {
    id: 'mistral-small-3-1',
    name: 'Mistral Small 3.1',
    provider: 'Mistral AI',
    inputPerMillion: 0.1,
    outputPerMillion: 0.3,
    contextWindow: '128k',
    profile: 'Cost-sensitive multilingual and vision workloads'
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    provider: 'Mistral AI',
    inputPerMillion: 2,
    outputPerMillion: 6,
    contextWindow: '128k',
    profile: 'European stack and compliance-oriented workloads'
  }
];

export const PRICING_SNAPSHOT_DATE = 'May 2025';
