import StepForm from './StepForm';
import { AutosaveProvider } from '../contexts/autosaveContext';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const mockPush = jest.fn();

const mockFinish = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  push: mockPush,
  query: {
    id: 'foo',
  },
}));

const mockFields = [
  {
    id: 'one',
    question: 'Test question',
    required: true,
    type: 'text',
  },
];

describe('StepForm', () => {
  it('renders the correct fields', () => {
    render(
      <AutosaveProvider>
        <StepForm
          person={{}}
          fields={mockFields as any}
          onSubmit={(values, { setStatus }) =>
            setStatus('Example status message')
          }
          onFinish={() => true}
        />
      </AutosaveProvider>
    );
    expect(screen.getByLabelText('Test question'));
    expect(screen.getByText('Save and continue'));
  });

  it('shows an error if submission fails', async () => {
    render(
      <AutosaveProvider>
        <StepForm
          person={{}}
          fields={mockFields as any}
          onSubmit={(values, { setStatus }) =>
            setStatus('Example status message')
          }
          onFinish={() => true}
        />
      </AutosaveProvider>
    );

    fireEvent.change(screen.getByLabelText('Test question'), {
      target: { value: 'test value' },
    });
    fireEvent.click(screen.getByText('Save and continue'));

    await waitFor(() => {
      expect(screen.getByText('Example status message'));
      expect(mockPush).toBeCalledTimes(0);
    });
  });

  it('returns to the task list if submission succeeds', async () => {
    render(
      <AutosaveProvider>
        <StepForm
          person={{}}
          fields={mockFields as any}
          onSubmit={() => true}
          onFinish={() => true}
        />
      </AutosaveProvider>
    );

    fireEvent.change(screen.getByLabelText('Test question'), {
      target: { value: 'test value' },
    });
    fireEvent.click(screen.getByText('Save and continue'));

    await waitFor(() => {
      expect(mockPush).toBeCalledTimes(1);
      expect(mockPush).toBeCalledWith(`/submissions/foo`);
    });
  });

  it("also triggers the finish event if it's the only step", async () => {
    render(
      <AutosaveProvider>
        <StepForm
          person={{}}
          fields={mockFields as any}
          onSubmit={() => true}
          onFinish={mockFinish}
          singleStep={true}
        />
      </AutosaveProvider>
    );

    fireEvent.change(screen.getByLabelText('Test question'), {
      target: { value: 'test value' },
    });
    fireEvent.click(screen.getByText('Save and finish'));

    await waitFor(() => {
      expect(mockFinish).toBeCalledTimes(1);
    });
  });
});
