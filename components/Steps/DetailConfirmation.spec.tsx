import { render } from '@testing-library/react';

import DetailConfirmation from './DetailConfirmation';
import { FormStep } from 'components/Form/types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: 'foo123456bar' },
  }),
}));

describe('Detail Confirmation component', () => {
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
    successMessage: 'Done!',
    formPath: 'foo/bar-foo',
  };

  it('should render properly', () => {
    const { asFragment, getByText } = render(<DetailConfirmation {...props} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(props.successMessage)).toBeInTheDocument();
  });
});
