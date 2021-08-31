import { render, screen } from '@testing-library/react';
import {
  mockInProgressSubmission,
  mockInProgressSubmissionFactory,
  mockSubmission,
} from 'factories/submissions';
import UnfinishedSubmissions from './UnfinishedSubmissions';

describe('UnfinishedSubmissions', () => {
  it('renders a list of clickable submissions', () => {
    render(
      <UnfinishedSubmissions
        submissions={{
          items: [
            { ...mockSubmission, submissionId: '123' },
            { ...mockSubmission, submissionId: '125' },
            { ...mockSubmission, submissionId: '126' },
          ],
          count: 3,
        }}
      />
    );

    expect(screen.getByText('Unfinished submissions'));
    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('link').length).toBe(3);
  });

  it('truncates a long list', () => {
    render(
      <UnfinishedSubmissions
        submissions={{
          items: [
            { ...mockSubmission, submissionId: '123' },
            { ...mockSubmission, submissionId: '124' },
            { ...mockSubmission, submissionId: '125' },
            { ...mockSubmission, submissionId: '126' },
            { ...mockSubmission, submissionId: '127' },
            { ...mockSubmission, submissionId: '128' },
          ],
          count: 6,
        }}
      />
    );

    expect(screen.getByText('and 2 more'));
    expect(screen.getAllByRole('listitem').length).toBe(5);
  });

  it('displays the percentage of steps completed for a fully complete submission', () => {
    render(
      <UnfinishedSubmissions
        submissions={{
          items: [mockInProgressSubmission],
          count: 1,
        }}
      />
    );

    expect(screen.getByText('100% complete ·', { exact: false }));
  });

  it('displays the percentage of steps completed for an empty submission', () => {
    render(
      <UnfinishedSubmissions
        submissions={{
          items: [mockInProgressSubmissionFactory.build({ completedSteps: 0 })],
          count: 1,
        }}
      />
    );

    expect(screen.getByText('0% complete ·', { exact: false }));
  });

  it('displays the percentage of steps correctly for a partially completed submission', () => {
    render(
      <UnfinishedSubmissions
        submissions={{
          items: [
            mockInProgressSubmissionFactory.build({
              completedSteps: 2,
              formId: 'face-overview-assessment',
            }),
          ],
          count: 1,
        }}
      />
    );

    expect(screen.getByText('7% complete ·', { exact: false }));
  });

  it('handles when we can not find the associated form for a submission', () => {
    render(
      <UnfinishedSubmissions
        submissions={{
          items: [
            mockInProgressSubmissionFactory.build({
              formId: 'invalid form id',
            }),
          ],
          count: 1,
        }}
      />
    );

    expect(screen.getByText('Unknown % complete · ', { exact: false }));
  });
});
