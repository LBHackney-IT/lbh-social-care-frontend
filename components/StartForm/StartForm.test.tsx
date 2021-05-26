import StartForm from './StartForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

const mockHandler = jest.fn();

describe('StartForm', () => {
  it('renders the correct fields', () => {
    jest.mock('next/router');
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

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
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Social care ID'));
    expect(screen.getByLabelText('What do you want to start?'));
  });

  it('prefills a social care id from the url', async () => {
    jest.mock('next/router');
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        social_care_id: 123,
      },
    });

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
    jest.mock('next/router');
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
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
