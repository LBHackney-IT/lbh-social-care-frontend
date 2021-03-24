import { render } from '@testing-library/react';
import PersonConfirmation from './PersonConfirmation';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { ref: '123456' },
  }),
}));

describe('Person Confirmation component', () => {
  const props = {
    formData: {
      bar_input: 'foo',
      firstName: 'first',
      lastName: 'last',
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
    ],
  };
  it('should render properly', () => {
    const { asFragment } = render(<PersonConfirmation {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
