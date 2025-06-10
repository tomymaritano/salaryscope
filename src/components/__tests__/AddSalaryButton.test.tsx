import { render, screen, fireEvent } from '@testing-library/react';
import { AddSalaryButton } from '../AddSalaryButton';
import { NextIntlProvider } from 'next-intl';
import messages from '../../i18n/en.json';

describe('AddSalaryButton', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<AddSalaryButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders button text', () => {
    render(
      <NextIntlProvider messages={messages} locale="en">
        <AddSalaryButton onClick={() => {}} />
      </NextIntlProvider>
    );
    expect(screen.getByText(messages.buttons.addSalary)).toBeInTheDocument();
  });
});
