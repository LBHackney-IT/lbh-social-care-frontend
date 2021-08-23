import PanelApprovalWidget from './PanelApprovalWidget';
import { render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import { mockedUser } from 'factories/users';
import { SubmissionState } from 'data/flexibleForms/forms.types';

jest.mock('axios');

beforeEach(() => jest.resetAllMocks());

describe('PanelApprovalWidget', () => {
  it("renders nothing if the submission doesn't have the right status", () => {
    render(
      <PanelApprovalWidget user={mockedUser} submission={mockSubmission} />
    );
    expect(screen.queryByText('This submission needs approval')).toBe(null);
  });

  it("doesn't let a user edit their own submissions", () => {
    render(
      <PanelApprovalWidget
        user={{
          ...mockedUser,
          email: 'foo.bar@hackney.gov.uk',
        }}
        submission={{
          ...mockSubmission,
          submissionState: SubmissionState.Approved,
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
      <PanelApprovalWidget
        user={mockedUser}
        submission={{
          ...mockSubmission,
          submissionState: SubmissionState.Approved,
        }}
      />
    );
    expect(screen.getByText('This submission needs panel approval'));
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByText('Yes, panel has approved'));
    expect(screen.getByText('No, return for edits'));
  });
});
