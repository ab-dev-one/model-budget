import { scenarioStateSchema, type ScenarioState } from './scenario';

const SHARE_PARAM = 's';

// Payload is plain ASCII (numbers and kebab-case ids), so btoa/atob need no UTF-8 handling.
export function encodeScenarioState(state: ScenarioState): string {
  const base64 = btoa(JSON.stringify(state));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeScenarioState(encoded: string): ScenarioState | null {
  try {
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const parsed = scenarioStateSchema.safeParse(JSON.parse(atob(padded)));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function buildShareUrl(state: ScenarioState): string {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set(SHARE_PARAM, encodeScenarioState(state));
  return url.toString();
}

export function readScenarioStateFromLocation(): ScenarioState | null {
  const raw = new URLSearchParams(window.location.search).get(SHARE_PARAM);
  return raw ? decodeScenarioState(raw) : null;
}
