import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders planner controls and comparison cards in English by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /modelbudget/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/input tokens per request/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/output tokens per request/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly requests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly growth rate/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /gpt-4o mini/i })).toBeInTheDocument();
    expect(screen.getByText(/potential monthly savings/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /monthly cost projection chart/i })).toBeInTheDocument();
  });

  it('switches UI labels to Italian', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'IT' }));

    expect(screen.getByLabelText(/token input per richiesta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/token output per richiesta/i)).toBeInTheDocument();
    expect(screen.getByText(/risparmio mensile potenziale/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /grafico proiezione costi mensili/i })).toBeInTheDocument();
  });

  it('resets scenario values to defaults', async () => {
    const user = userEvent.setup();
    render(<App />);

    const inputTokens = screen.getByLabelText(/input tokens per request/i);
    await user.clear(inputTokens);
    await user.type(inputTokens, '111111');

    await user.click(screen.getByRole('button', { name: /reset defaults/i }));

    expect(screen.getByLabelText(/input tokens per request/i)).toHaveValue(250000);
    expect(screen.getByRole('status')).toHaveTextContent(/default scenario restored/i);
  });
});
