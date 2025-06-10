import { render, screen, fireEvent } from '@testing-library/react';
import { AddSalaryButton } from '../AddSalaryButton';

describe('AddSalaryButton', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<AddSalaryButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders button text', () => {
    render(<AddSalaryButton onClick={() => {}} />);
    expect(screen.getByText(/push salary/i)).toBeInTheDocument();
  });
});
