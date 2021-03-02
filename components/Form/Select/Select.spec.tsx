import { render, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select component', () => {
  const props = {
    label: 'Foo',
    name: 'foo_select',
    options: ['foo', 'bar'],
  };

  it('should render properly', () => {
    const { getByRole, getByTestId } = render(<Select {...props} />);

    expect(getByTestId('foo_select')).toBeInTheDocument();
    expect(getByRole('option', { name: 'bar' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'foo' })).toBeInTheDocument();
  });

  it('should handle selected option', () => {
    const { getByRole, getByTestId } = render(<Select {...props} />);

    fireEvent.change(getByTestId('foo_select'), { target: { value: 'foo' } });
    expect(
      (getByRole('option', { name: 'foo' }) as HTMLOptionElement).selected
    ).toBeTruthy();
    expect(
      (getByRole('option', { name: 'bar' }) as HTMLOptionElement).selected
    ).toBeFalsy();
  });
});
