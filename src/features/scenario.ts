import { z } from 'zod';

export const MAX_COMPARISON_MODELS = 4;

export const scenarioStateSchema = z.object({
  inputTokens: z.number().finite().min(0).max(100_000_000),
  outputTokens: z.number().finite().min(0).max(100_000_000),
  monthlyRequests: z.number().finite().min(1).max(100_000_000),
  growthRatePercent: z.number().finite().min(0).max(300),
  selectedModelIds: z.array(z.string()).min(1).max(MAX_COMPARISON_MODELS)
});

export type ScenarioState = z.infer<typeof scenarioStateSchema>;

// Drops unknown or duplicate model ids so imported/shared data can't reference removed models.
export function sanitizeModelIds(ids: string[], knownIds: readonly string[]): string[] {
  const unique = Array.from(new Set(ids)).filter((id) => knownIds.includes(id));
  return unique.slice(0, MAX_COMPARISON_MODELS);
}
