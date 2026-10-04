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
    id: 'gpt-6-astra',
    name: 'GPT-6 Astra',
    provider: 'OpenAI',
    inputPerMillion: 10,
    outputPerMillion: 50,
    contextWindow: '1.05M',
    profile: 'Flagship model for the most demanding reasoning and coding'
  },
  {
    id: 'gpt-6-1-sol',
    name: 'GPT-6.1 Sol',
    provider: 'OpenAI',
    inputPerMillion: 2,
    outputPerMillion: 10,
    contextWindow: '1.05M',
    profile: 'Near-flagship quality for complex, agentic workflows at lower cost'
  },
  {
    id: 'gpt-6-luna',
    name: 'GPT-6 Luna',
    provider: 'OpenAI',
    inputPerMillion: 0.1,
    outputPerMillion: 0.5,
    contextWindow: '1.05M',
    profile: 'Efficient model for focused, high-volume tasks'
  },
  {
    id: 'claude-fable-5-1',
    name: 'Claude Fable 5.1',
    provider: 'Anthropic',
    inputPerMillion: 10,
    outputPerMillion: 50,
    contextWindow: '1M',
    profile: 'Demanding reasoning and long-horizon agentic work'
  },
  {
    id: 'claude-opus-5-5',
    name: 'Claude Opus 5.5',
    provider: 'Anthropic',
    inputPerMillion: 4,
    outputPerMillion: 20,
    contextWindow: '1M',
    profile: 'Long-running agentic coding and knowledge work'
  },
  {
    id: 'claude-sonnet-5-5',
    name: 'Claude Sonnet 5.5',
    provider: 'Anthropic',
    inputPerMillion: 2,
    outputPerMillion: 10,
    contextWindow: '1M',
    profile: 'Best balance of speed and intelligence for production workloads'
  },
  {
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    inputPerMillion: 3,
    outputPerMillion: 15,
    contextWindow: '1M',
    profile: 'Previous-generation Sonnet for coding and analysis'
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    inputPerMillion: 1,
    outputPerMillion: 5,
    contextWindow: '200k',
    profile: 'Fastest model for responsive, customer-facing flows'
  },
  {
    id: 'gemini-3-8-flash',
    name: 'Gemini 3.8 Flash',
    provider: 'Google',
    inputPerMillion: 0.75,
    outputPerMillion: 3.75,
    contextWindow: '1M',
    profile: 'Fast agentic and software-engineering model (introductory price until 31 Dec 2026)'
  },
  {
    id: 'gemini-3-5-flash-lite',
    name: 'Gemini 3.5 Flash-Lite',
    provider: 'Google',
    inputPerMillion: 0.3,
    outputPerMillion: 2.5,
    contextWindow: '1M',
    profile: 'Low-cost multimodal model for high-volume agentic tasks'
  },
  {
    id: 'gemini-3-1-pro',
    name: 'Gemini 3.1 Pro (preview)',
    provider: 'Google',
    inputPerMillion: 2,
    outputPerMillion: 12,
    contextWindow: '1M',
    profile: 'Advanced multimodal reasoning and agentic tool use (prompts up to 200k tokens)'
  },
  {
    id: 'gemini-2-5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    inputPerMillion: 0.3,
    outputPerMillion: 2.5,
    contextWindow: '1M',
    profile: 'Stable hybrid-reasoning model for everyday workloads'
  },
  {
    id: 'grok-4-7',
    name: 'Grok 4.7',
    provider: 'xAI',
    inputPerMillion: 2,
    outputPerMillion: 6,
    contextWindow: '500k',
    profile: 'xAI most capable model for code and chat (prompts under 200k tokens)'
  },
  {
    id: 'grok-4-3',
    name: 'Grok 4.3',
    provider: 'xAI',
    inputPerMillion: 1.25,
    outputPerMillion: 2.5,
    contextWindow: '1M',
    profile: 'Cost-efficient long-context reasoning (prompts under 200k tokens)'
  },
  {
    id: 'mistral-medium-3-5',
    name: 'Mistral Medium 3.5',
    provider: 'Mistral AI',
    inputPerMillion: 1.5,
    outputPerMillion: 7.5,
    contextWindow: '256k',
    profile: 'Open-weight multimodal model for agentic and coding workloads'
  },
  {
    id: 'mistral-large-3',
    name: 'Mistral Large 3',
    provider: 'Mistral AI',
    inputPerMillion: 0.5,
    outputPerMillion: 1.5,
    contextWindow: '256k',
    profile: 'Open-weight general-purpose multimodal mixture-of-experts model'
  },
  {
    id: 'mistral-small-4',
    name: 'Mistral Small 4',
    provider: 'Mistral AI',
    inputPerMillion: 0.15,
    outputPerMillion: 0.6,
    contextWindow: '256k',
    profile: 'Cost-sensitive hybrid instruct, reasoning and coding model'
  },
  {
    id: 'deepseek-v4-1-flash',
    name: 'DeepSeek V4.1 Flash',
    provider: 'DeepSeek',
    inputPerMillion: 0.3,
    outputPerMillion: 1.2,
    contextWindow: '1M',
    profile: 'Very low-cost model with vision (peak rate; off-peak is half)'
  },
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek V4 Pro',
    provider: 'DeepSeek',
    inputPerMillion: 1.32,
    outputPerMillion: 3.96,
    contextWindow: '1M',
    profile: 'Low-cost reasoning and coding at scale (peak rate; off-peak is half)'
  }
];

// Standard on-demand list prices (cache misses, no batch), verified against provider pages.
export const PRICING_SNAPSHOT_DATE = 'October 2026';
