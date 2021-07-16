import StepForm from './StepForm';
import { Field } from 'data/flexibleForms/forms.types';
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
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

const mockFields = [
  {
    id: 'one',
    question: 'Test question',
    required: true,
    type: 'text',
  },
] as Field[];

describe('StepForm', () => {
  it('renders the correct fields', () => {
    render(
      <StepForm
        fields={mockFields}
        onSubmit={(values, { setStatus }) =>
          setStatus('Example status message')
        }
        finishForm={() => true}
      />
    );

    expect(screen.getByTestId('one')).toHaveTextContent('Test question');
    expect(screen.getByText('Save and continue'));
  });

  it('shows an error if submission fails', async () => {
    render(
      <StepForm
        fields={mockFields}
        onSubmit={(values, { setStatus }) =>
          setStatus('Example status message')
        }
        finishForm={() => true}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
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
      <StepForm
        fields={mockFields}
        onSubmit={() => true}
        finishForm={() => true}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test value' },
    });
    fireEvent.click(screen.getByText('Save and continue'));

    await waitFor(() => {
      expect(mockPush).toBeCalled();
      expect(mockPush).toBeCalledWith(`/submissions/foo`);
    });
  });

  it("also triggers the finish event if it's the only step", async () => {
    render(
      <StepForm
        fields={mockFields}
        onSubmit={() => true}
        finishForm={mockFinish}
        singleStep={true}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test value' },
    });
    fireEvent.click(screen.getByText('Save and finish'));

    await waitFor(() => {
      expect(mockFinish).toBeCalledTimes(1);
    });
  });
});
