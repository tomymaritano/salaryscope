import { render, screen, fireEvent } from '@testing-library/react';
import { AddSalaryButton } from '../AddSalaryButton';
import { NextIntlProvider } from 'next-intl';
import en from '@/messages/en.json';

describe('AddSalaryButton', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <NextIntlProvider locale="en" messages={en}>
        <AddSalaryButton onClick={handleClick} />
      </NextIntlProvider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders button text', () => {
    render(
      <NextIntlProvider locale="en" messages={en}>
        <AddSalaryButton onClick={() => {}} />
      </NextIntlProvider>
    );
    expect(screen.getByText(/push salary/i)).toBeInTheDocument();
  });
});
