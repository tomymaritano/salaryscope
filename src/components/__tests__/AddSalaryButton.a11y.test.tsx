import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AddSalaryButton } from '../AddSalaryButton';

expect.extend(toHaveNoViolations);

test('AddSalaryButton is accessible', async () => {
  const { container } = render(<AddSalaryButton onClick={() => {}} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
