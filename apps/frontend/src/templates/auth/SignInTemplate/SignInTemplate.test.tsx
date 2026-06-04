import { fireEvent, render, screen } from '@testing-library/react';
import { SignInTemplate } from '@/templates/auth/SignInTemplate';
import { vitest } from 'vitest';

describe('<SignInTemplate />', () => {
  it('should render heading', () => {
    render(<SignInTemplate onSignIn={vitest.fn()} />);

    const heading = screen.getByRole('heading', {
      name: 'Faça login ou inscreva-se',
    });

    expect(heading).toBeInTheDocument();
  });

  it('should render the OAuth buttons', () => {
    render(<SignInTemplate onSignIn={vitest.fn()} />);

    expect(screen.getByRole('button', { name: /GitHub/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
  });

  it('should call onSignIn with "github" when the GitHub button is clicked', () => {
    const onSignIn = vitest.fn();

    render(<SignInTemplate onSignIn={onSignIn} />);

    fireEvent.click(screen.getByRole('button', { name: /GitHub/i }));

    expect(onSignIn).toHaveBeenCalledWith('github');
  });

  it('should call onSignIn with "google" when the Google button is clicked', () => {
    const onSignIn = vitest.fn();

    render(<SignInTemplate onSignIn={onSignIn} />);

    fireEvent.click(screen.getByRole('button', { name: /Google/i }));

    expect(onSignIn).toHaveBeenCalledWith('google');
  });
});
