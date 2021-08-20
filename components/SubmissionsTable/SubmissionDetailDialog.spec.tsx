import { fireEvent, render, screen } from '@testing-library/react';
import { mockInProgressSubmission } from 'factories/submissions';
import SubmissionDetailDialog from './SubmissionDetailDialog';

const mockHandler = jest.fn();

describe('SubmissionDetailDialog', () => {
  it('renders the right basic information and controls', () => {
    render(
      <SubmissionDetailDialog
        submission={mockInProgressSubmission}
        isOpen={true}
        onDismiss={jest.fn()}
        url="/foo"
      />
    );
    expect(screen.getAllByRole('heading').length).toBe(2);
    expect(screen.getAllByRole('list').length).toBe(3);
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  it('correctly shows a list of editors', () => {
    render(
      <SubmissionDetailDialog
        submission={mockInProgressSubmission}
        isOpen={true}
        onDismiss={jest.fn()}
        url="/foo"
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
        url="/foo"
      />
    );
    fireEvent.click(screen.getByText('Close'));
    expect(mockHandler).toBeCalledTimes(1);
  });
});
