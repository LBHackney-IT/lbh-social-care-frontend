import ApprovalWidget from './ApprovalWidget';
import { render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import { mockedUser } from 'factories/users';

jest.mock('axios');

beforeEach(() => jest.resetAllMocks());

describe('ApprovalWidget', () => {
  it("renders nothing if the submission doesn't have the right status", () => {
    render(<ApprovalWidget user={mockedUser} submission={mockSubmission} />);
    expect(screen.queryByText('This submission needs approval')).toBe(null);
  });

  it("doesn't let a user edit their own submissions", () => {
    render(
      <ApprovalWidget
        user={{
          ...mockedUser,
          email: 'foo.bar@hackney.gov.uk',
        }}
        submission={{
          ...mockSubmission,
          submissionState: 'Submitted',
        }}
      />
    );
    expect(
      screen.getByText(
        'You cannot approve your own submissions. Ask a manager or colleague for help.'
      )
    );
  });

  it('otherwise, it shows the correct two actions', () => {
    render(
      <ApprovalWidget
        user={mockedUser}
        submission={{
          ...mockSubmission,
          submissionState: 'Submitted',
        }}
      />
    );
    expect(screen.getByText('This submission needs approval'));
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByText('Yes, approve'));
    expect(screen.getByText('No, return for edits'));
  });
});
