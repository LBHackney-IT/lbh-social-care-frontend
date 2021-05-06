import { fireEvent, render } from '@testing-library/react';

import { Autocomplete } from './Autocomplete';

describe(`Autocomplete`, () => {
  const props = {
    label: 'Foo',
    name: 'autocomplete',
    onChange: jest.fn(),
    placeholder: 'Foo bar',
    options: [
      { text: 'foo', value: 14 },
      { text: 'bar', value: '10' },
    ],
  };

  it('should render properly', () => {
    const { getByTestId, asFragment } = render(<Autocomplete {...props} />);
    const autocomplete = getByTestId('autocomplete');

    fireEvent.click(autocomplete);
    expect(autocomplete).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should select value', () => {
    const { getByTestId, getAllByRole } = render(<Autocomplete {...props} />);
    const autocomplete = getByTestId('autocomplete');

    fireEvent.click(autocomplete);
    expect(getAllByRole('option').length).toBe(2);
    fireEvent.change(autocomplete, { target: { value: 'f' } });
    expect(getAllByRole('option').length).toBe(1);
    fireEvent.click(getByTestId('autocomplete_0'));
    expect(autocomplete).toHaveValue('foo');
  });
});
