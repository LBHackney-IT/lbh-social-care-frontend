import { render, fireEvent, waitFor } from '@testing-library/react';

import DynamicStep from './DynamicStep';

describe('DynamicStep component', () => {
  const props = {
    stepId: ['Foo'],
    components: [
      {
        component: 'TextInput',
        name: 'bar_input',
        width: 30,
        label: 'Foo',
      },
    ],
    formData: {
      id: 44000,
      bar_input: 'foo',
    },
    onStepSubmit: jest.fn(),
    onSaveAndExit: jest.fn(),
  };
  it('should render properly', () => {
    const { asFragment } = render(<DynamicStep {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle next button', async () => {
    const { getByRole } = render(<DynamicStep {...props} />);
    const input = getByRole('textbox', { name: 'Foo' });
    const nextButton = getByRole('button', { name: 'Continue' });

    expect(input).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    fireEvent.input(input, { target: { value: 'bar foo' } });
    fireEvent.submit(nextButton);

    await waitFor(() => expect(props.onStepSubmit).toHaveBeenCalled());
    expect(props.onStepSubmit).toHaveBeenCalledWith({
      bar_input: 'bar foo',
    });
  });

  it('should fire save and exit button', async () => {
    const { getByRole } = render(<DynamicStep {...props} />);
    const saveButton = getByRole('button', { name: 'Save and finish later' });

    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);

    await waitFor(() => expect(props.onSaveAndExit).toHaveBeenCalledTimes(1));
  });
});
