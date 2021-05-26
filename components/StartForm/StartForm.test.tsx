import StartForm from './StartForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

<<<<<<< HEAD
jest.mock('next/router');
(useRouter as jest.Mock)
  .mockReturnValueOnce({
    query: {},
  })
  .mockReturnValueOnce({
    query: {
      social_care_id: 123,
    },
  })
  .mockReturnValueOnce({
    query: {},
  });

=======
>>>>>>> main
const mockHandler = jest.fn();

describe('StartForm', () => {
  it('renders the correct fields', () => {
<<<<<<< HEAD
=======
    jest.mock('next/router');
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

>>>>>>> main
    render(
      <StartForm
        forms={[
          {
            id: 'foo',
            name: 'Foo',
            steps: [],
          },
          {
            id: 'bar',
            name: 'Bar',
            steps: [],
          },
        ]}
<<<<<<< HEAD
        onSubmit={() => true}
=======
        onSubmit={jest.fn()}
>>>>>>> main
      />
    );
    expect(screen.getByLabelText('Social care ID'));
    expect(screen.getByLabelText('What do you want to start?'));
  });

  it('prefills a social care id from the url', async () => {
<<<<<<< HEAD
=======
    jest.mock('next/router');
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        social_care_id: 123,
      },
    });

>>>>>>> main
    render(
      <StartForm
        forms={[
          {
            id: 'foo',
            name: 'Foo',
            steps: [],
          },
        ]}
        onSubmit={mockHandler}
      />
    );

    expect(screen.queryAllByLabelText('Social care ID').length).toBe(0);
    fireEvent.click(screen.getByText('Continue'));
    await waitFor(() => {
      expect(mockHandler).toBeCalledWith(
        {
          socialCareId: 123,
          formId: 'foo',
        },
        expect.anything()
      );
    });
  });

  it('shows an error if submission fails', async () => {
<<<<<<< HEAD
=======
    jest.mock('next/router');
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
>>>>>>> main
    render(
      <StartForm
        forms={[
          {
            id: 'foo',
            name: 'Foo',
            steps: [],
          },
          {
            id: 'bar',
            name: 'Bar',
            steps: [],
          },
        ]}
        onSubmit={(values, { setStatus }) =>
          setStatus('Example status message')
        }
      />
    );

    fireEvent.change(screen.getByLabelText('Social care ID'), {
      target: { value: 123 },
    });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByRole('alert'));
      expect(screen.getByText('Example status message'));
    });
  });
});
