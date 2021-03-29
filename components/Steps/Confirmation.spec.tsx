import { render } from '@testing-library/react';

import Confirmation from './Confirmation';
import { FormStep } from 'components/Form/types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { ref: 'foo123456bar' },
  }),
}));

describe('Confirmation component', () => {
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
    const { asFragment, getByText } = render(<Confirmation {...props} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('foo123456bar')).toBeInTheDocument();
  });
});
