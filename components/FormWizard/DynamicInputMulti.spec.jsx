import { render, fireEvent } from '@testing-library/react';

import DynamicInputMulti from './DynamicInputMulti';

import DynamicInput from 'components/FormWizard/DynamicInput';

jest.mock('components/FormWizard/DynamicInput', () =>
  jest.fn(() => 'MockedDynamicInput')
);

jest.mock('components/Icons/TimesCircle', () => () => 'MockedCloseButton');

describe('DynamicInputMulti', () => {
  const props = {
    label: 'i am a multi input',
    hint: 'i accept multiple inputs',
    name: 'dynamic',
    initialInputData: ['f', 'o', 'o'],
    currentData: { foo: 'bar' },
    isMulti: true,
    component: 'Dynamic',
    foo: 'bar',
    onDelete: jest.fn(),
  };

  it('should render properly', () => {
    const { asFragment } = render(<DynamicInputMulti {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly with isMultiInit false', () => {
    const newProps = {
      isMultiInit: false,
      initialInputData: [],
      isMultiTrigger: 'Add a something',
    };
    const { asFragment } = render(
      <DynamicInputMulti {...props} {...newProps} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(DynamicInput).not.toHaveBeenCalled();
  });

  it('should pass the correct props to DynamicInput', () => {
    render(<DynamicInputMulti {...props} />);
    expect(DynamicInput).toHaveBeenCalled();
    expect(DynamicInput).toHaveBeenNthCalledWith(
      1,
      {
        label: 'i am a multi input',
        hint: 'i accept multiple inputs',
        name: 'dynamic[0]',
        currentData: { foo: 'bar' },
        isMulti: true,
        component: 'Dynamic',
        foo: 'bar',
      },
      {}
    );
    expect(DynamicInput).toHaveBeenNthCalledWith(
      2,
      {
        label: null,
        hint: null,
        name: 'dynamic[1]',
        currentData: { foo: 'bar' },
        isMulti: true,
        component: 'Dynamic',
        foo: 'bar',
      },
      {}
    );
    expect(DynamicInput).toHaveBeenNthCalledWith(
      3,
      {
        label: null,
        hint: null,
        name: 'dynamic[2]',
        currentData: { foo: 'bar' },
        isMulti: true,
        component: 'Dynamic',
        foo: 'bar',
      },
      {}
    );
  });

  it('should add a new input on "Add a new one"', () => {
    const { getByText, getAllByText } = render(
      <DynamicInputMulti
        {...props}
        initialInputData={['foo', 'bar']}
        currentData={{ dynamic: [1, 2, 3] }}
      />
    );
    expect(getAllByText('MockedCloseButton').length).toBe(1);
    fireEvent.click(getByText('Add a new one'));
    expect(getAllByText('MockedCloseButton').length).toBe(2);
  });

  it('should pass the updated data to onDelete', () => {
    const { getByText } = render(
      <DynamicInputMulti
        {...props}
        initialInputData={['foo', 'bar']}
        currentData={{ dynamic: [1, 2, 3] }}
      />
    );
    fireEvent.click(getByText('MockedCloseButton'));
    expect(props.onDelete).toHaveBeenCalled();
    expect(props.onDelete).toHaveBeenCalledWith([1, 3]);
  });
});
