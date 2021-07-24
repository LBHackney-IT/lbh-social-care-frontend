import { fireEvent, render, screen } from '@testing-library/react';
import EmailInputStories from 'components/Form/EmailInput/EmailInput.stories';
import { mockSubmission } from 'factories/submissions';
import SubmissionDetailDialog from './SubmissionDetailDialog';

const mockHandler = jest.fn();

describe('SubmissionDetailDialog', () => {
  it('renders the right basic information and controls', () => {
    render(
      <SubmissionDetailDialog
        submission={mockSubmission}
        isOpen={true}
        onDismiss={jest.fn()}
      />
    );
    expect(screen.getAllByRole('heading').length).toBe(2);
    expect(screen.getAllByRole('list').length).toBe(2);
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  it('correctly calculates the last edited date', () => {
    render(
      <SubmissionDetailDialog
        submission={mockSubmission}
        isOpen={true}
        onDismiss={jest.fn()}
      />
    );
    expect(screen.getByText('21 Jun 2021 1.00 pm'));
  });

  it('correctly shows a list of editors', () => {
    render(
      <SubmissionDetailDialog
        submission={{
          ...mockSubmission,
          editHistory: [
            {
              editTime: '2021-06-21T12:00:00.000Z',
              worker: {
                email: 'example@email.com',
              },
            },
          ],
        }}
        isOpen={true}
        onDismiss={jest.fn()}
      />
    );
    expect(screen.getByText('Editors'));
    expect(screen.getAllByRole('list').length).toBe(3);
    expect(screen.getByText('example@email.com'));
  });

  it('fires the dismiss handler', () => {
    render(
      <SubmissionDetailDialog
        submission={mockSubmission}
        isOpen={true}
        onDismiss={mockHandler}
      />
    );
    fireEvent.click(screen.getByText('Close'));
    expect(mockHandler).toBeCalledTimes(1);
  });
});
