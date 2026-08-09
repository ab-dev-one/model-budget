import type { AiModel } from '../data/models';

export function estimateRequestCost(model: AiModel, inputTokens: number, outputTokens: number): number {
  const inputCost = (Math.max(inputTokens, 0) / 1_000_000) * model.inputPerMillion;
  const outputCost = (Math.max(outputTokens, 0) / 1_000_000) * model.outputPerMillion;
  return inputCost + outputCost;
}

export function estimateMonthlyCost(requestCost: number, monthlyRequests: number): number {
  return requestCost * Math.max(monthlyRequests, 0);
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).format(value);
}
