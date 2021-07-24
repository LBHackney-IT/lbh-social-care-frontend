import { fireEvent, render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import { mockedWorker } from 'factories/workers';
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
    expect(screen.getAllByRole('list').length).toBe(3);
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  it('correctly formats important dates', () => {
    render(
      <SubmissionDetailDialog
        submission={mockSubmission}
        isOpen={true}
        onDismiss={jest.fn()}
      />
    );
    expect(screen.getAllByText('21 Jun 2021 1.00 pm').length).toBe(3);
  });

  it('correctly shows a list of editors', () => {
    render(
      <SubmissionDetailDialog
        submission={mockSubmission}
        isOpen={true}
        onDismiss={jest.fn()}
      />
    );

    expect(screen.getByText('Editors'));
    expect(screen.getAllByRole('list').length).toBe(3);
    expect(screen.getAllByText('foo.bar@hackney.gov.uk').length).toBe(2);
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
