import { render, fireEvent, screen } from '@testing-library/react';
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

  it('enables an option when disabled is false', () => {
    const props = {
      label: 'Foo',
      name: 'foo_select',
      options: [
        { value: 'foo', text: 'bar', disabled: false },
        { value: 'fizz', text: 'buzz' },
      ],
    };

    render(<Select {...props} />);

    expect(screen.getByRole('option', { name: 'bar' })).not.toBeDisabled();
    expect(screen.getByRole('option', { name: 'buzz' })).not.toBeDisabled();
  });

  it('disables an option when disabled is true', () => {
    const props = {
      label: 'Foo',
      name: 'foo_select',
      options: [
        { value: 'foo', text: 'bar', disabled: true },
        { value: 'fizz', text: 'buzz' },
      ],
    };

    render(<Select {...props} />);

    expect(screen.getByRole('option', { name: 'bar' })).toBeDisabled();
    expect(screen.getByRole('option', { name: 'buzz' })).not.toBeDisabled();
  });
});
