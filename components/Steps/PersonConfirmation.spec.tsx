import Router from 'next/router';
import PersonConfirmation from './PersonConfirmation';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({ query: { ref: '123456' } }),
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

  it('should route to the new resident view', () => {
    render(<PersonConfirmation {...props} />);
    const button = screen.getByText('View person');
    fireEvent.click(button);

    expect(Router.push).toHaveBeenCalledWith('/residents/123456');
  });
});
