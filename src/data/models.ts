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
    id: 'gpt-5',
    name: 'GPT-5',
    provider: 'OpenAI',
    inputPerMillion: 1.75,
    outputPerMillion: 12,
    contextWindow: '400k',
    profile: 'Flagship reasoning, coding and agentic workloads'
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT-5 mini',
    provider: 'OpenAI',
    inputPerMillion: 0.35,
    outputPerMillion: 2.4,
    contextWindow: '400k',
    profile: 'Fast, cost-efficient model for high-volume product work'
  },
  {
    id: 'gpt-5-nano',
    name: 'GPT-5 nano',
    provider: 'OpenAI',
    inputPerMillion: 0.08,
    outputPerMillion: 0.5,
    contextWindow: '272k',
    profile: 'Lightweight tasks, classification and high-throughput routing'
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    inputPerMillion: 0.9,
    outputPerMillion: 4.5,
    contextWindow: '200k',
    profile: 'Responsive assistant for customer-facing flows'
  },
  {
    id: 'claude-sonnet-4-5',
    name: 'Claude Sonnet 4.5',
    provider: 'Anthropic',
    inputPerMillion: 3,
    outputPerMillion: 15,
    contextWindow: '1M',
    profile: 'Complex coding, analysis and agentic workflows'
  },
  {
    id: 'claude-opus-4-5',
    name: 'Claude Opus 4.5',
    provider: 'Anthropic',
    inputPerMillion: 12,
    outputPerMillion: 60,
    contextWindow: '500k',
    profile: 'Highest-stakes reasoning and long-running tasks'
  },
  {
    id: 'gemini-3-flash',
    name: 'Gemini 3 Flash',
    provider: 'Google',
    inputPerMillion: 0.2,
    outputPerMillion: 1.4,
    contextWindow: '1M',
    profile: 'Fast multimodal and high-throughput workloads'
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google',
    inputPerMillion: 1.5,
    outputPerMillion: 11,
    contextWindow: '2M',
    profile: 'Advanced reasoning and large-context work'
  },
  {
    id: 'grok-4-fast',
    name: 'Grok 4 Fast',
    provider: 'xAI',
    inputPerMillion: 0.2,
    outputPerMillion: 0.5,
    contextWindow: '2M',
    profile: 'Low-latency assistant and search-augmented workloads'
  },
  {
    id: 'grok-4',
    name: 'Grok 4',
    provider: 'xAI',
    inputPerMillion: 3,
    outputPerMillion: 15,
    contextWindow: '256k',
    profile: 'Advanced reasoning with real-time data access'
  },
  {
    id: 'mistral-medium-3-1',
    name: 'Mistral Medium 3.1',
    provider: 'Mistral AI',
    inputPerMillion: 0.4,
    outputPerMillion: 2,
    contextWindow: '256k',
    profile: 'Balanced European stack and compliance-oriented workloads'
  },
  {
    id: 'mistral-small-3-2',
    name: 'Mistral Small 3.2',
    provider: 'Mistral AI',
    inputPerMillion: 0.1,
    outputPerMillion: 0.3,
    contextWindow: '128k',
    profile: 'Cost-sensitive multilingual and vision workloads'
  },
  {
    id: 'deepseek-v3-2',
    name: 'DeepSeek V3.2',
    provider: 'DeepSeek',
    inputPerMillion: 0.28,
    outputPerMillion: 0.42,
    contextWindow: '128k',
    profile: 'Very low-cost reasoning and coding at scale'
  },
  {
    id: 'llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    inputPerMillion: 0.2,
    outputPerMillion: 0.6,
    contextWindow: '1M',
    profile: 'Open-weight multimodal model for self-hosted deployments'
  }
];

export const PRICING_SNAPSHOT_DATE = 'August 2026';
