import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SalaryForm from '../SalaryForm';

describe('SalaryForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const fillForm = () => {
    fireEvent.change(screen.getByLabelText('País'), { target: { value: 'AR' } });
    fireEvent.change(screen.getByLabelText('Rol'), { target: { value: 'Dev' } });
    fireEvent.change(screen.getByLabelText('Tipo de contrato'), { target: { value: 'Full-time' } });
    fireEvent.change(screen.getByLabelText('Seniority'), { target: { value: 'Junior' } });
    fireEvent.change(screen.getByLabelText('Monto mensual'), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText('Moneda'), { target: { value: 'USD' } });
  };

  it('shows success message on successful submit', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    render(<SalaryForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /enviar salario/i }));

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByText(/salario enviado/i)).toBeInTheDocument());
  });

  it('shows error message on failed submit', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    render(<SalaryForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /enviar salario/i }));

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByText(/hubo un error/i)).toBeInTheDocument());
  });
});
