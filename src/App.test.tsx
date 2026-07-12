import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the product hero and model cards', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /modelbudget/i })).toBeInTheDocument();
    expect(screen.getByText(/estimate, compare and optimize/i)).toBeInTheDocument();
    expect(screen.getByText(/gpt-4o mini/i)).toBeInTheDocument();
  });
});
