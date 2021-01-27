import { render } from '@testing-library/react';

import ObjectInput from './ObjectInput';

import DynamicInput from 'components/FormWizard/DynamicInput';

jest.mock('components/FormWizard/DynamicInput', () =>
  jest.fn(() => 'MockedDynamicInput')
);

describe('ObjectInput', () => {
  const props = {
    label: 'i am a object input',
    hint: 'i accept multiple inputs',
    name: 'oo',
    isInline: true,
    components: [
      {
        component: 'TextInput',
        name: 'first',
      },
      {
        component: 'TextInput',
        name: 'second',
      },
      {
        component: 'TextInput',
        name: 'third',
      },
    ],
    foo: 'bar',
  };

  it('should render properly', () => {
    const { asFragment } = render(<ObjectInput {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should pass the correct props to DynamicInput', () => {
    render(<ObjectInput {...props} />);
    expect(DynamicInput).toHaveBeenCalled();
    expect(DynamicInput).toHaveBeenNthCalledWith(
      1,
      {
        component: 'TextInput',
        foo: 'bar',
        labelSize: 's',
        name: 'oo.first',
      },
      {}
    );
    expect(DynamicInput).toHaveBeenNthCalledWith(
      2,
      {
        component: 'TextInput',
        foo: 'bar',
        labelSize: 's',
        name: 'oo.second',
      },
      {}
    );
    expect(DynamicInput).toHaveBeenNthCalledWith(
      3,
      {
        component: 'TextInput',
        foo: 'bar',
        labelSize: 's',
        name: 'oo.third',
      },
      {}
    );
  });
});
