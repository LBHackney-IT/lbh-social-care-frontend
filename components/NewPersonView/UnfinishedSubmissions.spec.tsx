import { render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
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
});
