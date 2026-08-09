import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders planner controls and comparison cards', () => {
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
});
