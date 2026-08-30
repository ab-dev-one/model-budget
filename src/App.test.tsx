import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => localStorage.clear());

  it('renders usage controls and a multi-model cost comparison in English', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /modelbudget/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/input tokens per request/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/output tokens per request/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly requests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly growth/i)).toBeInTheDocument();
    expect(screen.getAllByText(/gpt-5 mini/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/claude sonnet 4\.5/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('img', { name: /cost trajectory for compared models/i })).toBeInTheDocument();
  });

  it('switches UI labels to Italian', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'IT' }));

    expect(screen.getByLabelText(/token input per richiesta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/token output per richiesta/i)).toBeInTheDocument();
    expect(screen.getByText(/traiettoria costi a sei mesi/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /traiettoria costi dei modelli confrontati/i })).toBeInTheDocument();
  });

  it('saves a named snapshot locally', async () => {
    const user = userEvent.setup();
    render(<App />);

    const snapshotName = screen.getByLabelText(/snapshot name/i);
    await user.clear(snapshotName);
    await user.type(snapshotName, 'Launch plan');
    await user.click(screen.getByRole('button', { name: /save snapshot/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/snapshot saved locally/i);
    expect(screen.getByText('Launch plan')).toBeInTheDocument();
  });

  it('reveals a share link with the current scenario encoded', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /copy share link/i }));

    expect(await screen.findByLabelText(/copy share link/i)).toHaveDisplayValue(/[?&]s=/);
  });

  it('imports a valid scenario JSON file', async () => {
    const user = userEvent.setup();
    render(<App />);

    const scenario = {
      inputTokens: 500_000,
      outputTokens: 120_000,
      monthlyRequests: 3_000,
      growthRatePercent: 20,
      selectedModelIds: ['gpt-5', 'grok-4']
    };
    const file = new File([JSON.stringify(scenario)], 'scenario.json', { type: 'application/json' });

    await user.upload(screen.getByLabelText(/import json/i), file);

    expect(await screen.findByRole('status')).toHaveTextContent(/scenario imported/i);
    expect(screen.getByLabelText(/input tokens per request/i)).toHaveValue(500000);
  });

  it('rejects an invalid scenario JSON file', async () => {
    const user = userEvent.setup();
    render(<App />);

    const file = new File([JSON.stringify({ foo: 'bar' })], 'invalid.json', { type: 'application/json' });
    await user.upload(screen.getByLabelText(/import json/i), file);

    expect(await screen.findByRole('status')).toHaveTextContent(/not a valid modelbudget scenario/i);
  });
});