import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Summary from './Summary';
import { FormStep } from 'components/Form/types';
import 'next/router';

const mockReplace = jest.fn();

const query: { redirectUrl?: string } = {};

jest.mock('next/router', () => ({
  useRouter: () => ({
    query,
    replace: mockReplace,
  }),
}));

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

  it("should go to confirmation page if redirect url isn't given", async () => {
    render(<Summary {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() =>
      expect(mockReplace).toBeCalledWith('foo/bar-fooconfirmation')
    );
  });

  it('should redirect to the redirect url if one is given', async () => {
    query.redirectUrl = 'http://example.com';

    render(<Summary {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() =>
      expect(mockReplace).toBeCalledWith('http://example.com')
    );
  });
});
