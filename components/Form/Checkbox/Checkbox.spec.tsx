import { render } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  const props = {
    name: 'my-checkbox',
    label: 'My Checkbox',
    register: jest.fn(),
  };

  it('renders a checkbox', () => {
    const { getByLabelText } = render(<Checkbox {...props} />);
    const checkbox = getByLabelText(props.label) as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.id).toEqual(props.name);
    expect(checkbox.name).toEqual(props.name);
  });

  it('should render properly - as Tickbox', () => {
    const { asFragment } = render(<Checkbox {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly - as Checkbox', () => {
    const options = [
      {
        text: 'Foo',
        value: 'foo',
      },
      {
        text: 'Bar',
        value: 'bar',
      },
    ];
    const { asFragment } = render(<Checkbox {...props} options={options} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
