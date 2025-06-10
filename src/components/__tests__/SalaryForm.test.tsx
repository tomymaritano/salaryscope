import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SalaryForm from '../SalaryForm';

describe('SalaryForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as any;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('submits data successfully and shows success message', async () => {
    render(<SalaryForm />);

    fireEvent.change(screen.getByLabelText('País'), { target: { value: 'AR' } });
    fireEvent.change(screen.getByLabelText('Rol'), { target: { value: 'Frontend Developer' } });
    fireEvent.change(screen.getByLabelText('Tipo de contrato'), { target: { value: 'Full-time' } });
    fireEvent.change(screen.getByLabelText('Seniority'), { target: { value: 'Junior' } });
    fireEvent.change(screen.getByLabelText('Monto mensual'), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText('Moneda'), { target: { value: 'USD' } });

    fireEvent.click(screen.getByRole('button', { name: /enviar salario/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(await screen.findByText(/salario enviado/i)).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    render(<SalaryForm />);
    fireEvent.click(screen.getByRole('button', { name: /enviar salario/i }));
    expect(await screen.findAllByText(/campo requerido/i)).not.toHaveLength(0);
  });
});
