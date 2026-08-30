import { decodeScenarioState, encodeScenarioState } from './share';
import { sanitizeModelIds } from './scenario';
import type { ScenarioState } from './scenario';

describe('share encoding', () => {
  const state: ScenarioState = {
    inputTokens: 250_000,
    outputTokens: 80_000,
    monthlyRequests: 1_500,
    growthRatePercent: 12,
    selectedModelIds: ['gpt-5-mini', 'claude-sonnet-4-5']
  };

  it('round-trips a scenario through encode/decode', () => {
    expect(decodeScenarioState(encodeScenarioState(state))).toEqual(state);
  });

  it('returns null for garbage input', () => {
    expect(decodeScenarioState('not-valid-base64!!')).toBeNull();
    expect(decodeScenarioState('')).toBeNull();
  });

  it('returns null when the payload fails schema validation', () => {
    const encoded = btoa(JSON.stringify({ inputTokens: -1 }));
    expect(decodeScenarioState(encoded)).toBeNull();
  });
});

describe('sanitizeModelIds', () => {
  const known = ['gpt-5', 'gpt-5-mini', 'claude-sonnet-4-5'];

  it('drops unknown ids and de-duplicates', () => {
    expect(sanitizeModelIds(['gpt-5', 'gpt-5', 'unknown-model'], known)).toEqual(['gpt-5']);
  });

  it('caps the result at the max comparison size', () => {
    expect(sanitizeModelIds(['gpt-5', 'gpt-5-mini', 'claude-sonnet-4-5', 'gpt-5'], known)).toHaveLength(3);
  });
});
