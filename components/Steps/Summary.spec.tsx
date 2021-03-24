import { render, fireEvent, waitFor } from '@testing-library/react';
import Summary from './Summary';

import { FormStep } from 'components/Form/types';

describe('Summary component', () => {
  const props = {
    formData: {
      bar_input: 'foo',
    },
    formSteps: [
      {
        components: [
          {
            component: 'TextInput',
            name: 'bar_input',
            width: 30,
            label: 'Foo',
          },
        ],
        id: 'foo-bar',
        title: 'Foo Bar',
      },
    ] as FormStep[],
    onFormSubmit: jest.fn(),
    formPath: 'foo/bar-foo',
  };
  it('should render properly', async () => {
    const { asFragment, getByRole, getByText } = render(<Summary {...props} />);
    const submitBtn = getByRole('button', { name: 'Submit' });
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('Foo')).toBeInTheDocument();
    fireEvent.click(submitBtn);
    await waitFor(() => expect(props.onFormSubmit).toHaveBeenCalled());
  });
});
