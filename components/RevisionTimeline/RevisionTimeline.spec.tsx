import { render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import { mockedWorker } from 'factories/workers';
import RevisionTimeline from './RevisionTimeline';

describe('RevisionTimeline', () => {
  it('correctly renders edits and creation', () => {
    render(
      <RevisionTimeline
        submission={{
          ...mockSubmission,
          editHistory: [
            {
              worker: mockedWorker,
              editTime: '2021-06-23T12:00:00.000Z',
            },
            {
              worker: mockedWorker,
              editTime: '2021-07-28T11:00:00.000Z',
            },
          ],
        }}
      />
    );

    expect(screen.getByText('History'));
    expect(
      screen.queryAllByText('Edited by foo.bar@hackney.gov.uk').length
    ).toBe(2);
    expect(screen.getByText('28 Jul 2021', { exact: false }));
    expect(screen.getByText('Started by foo.bar@hackney.gov.uk'));
    expect(screen.getByText('23 Jun 2021', { exact: false }));
    expect(screen.getByText('21 Jun 2021', { exact: false }));
  });

  it('only shows up to four events', () => {
    render(
      <RevisionTimeline
        submission={{
          ...mockSubmission,
          editHistory: [
            {
              worker: mockedWorker,
              editTime: '2021-06-23T12:00:00.000Z',
            },
            {
              worker: mockedWorker,
              editTime: '2021-07-28T11:00:00.000Z',
            },
            {
              worker: mockedWorker,
              editTime: '2021-07-28T11:00:00.000Z',
            },
            {
              worker: mockedWorker,
              editTime: '2021-07-28T11:00:00.000Z',
            },
            {
              worker: mockedWorker,
              editTime: '2021-07-28T11:00:00.000Z',
            },
          ],
        }}
      />
    );

    expect(screen.getAllByRole('listitem').length).toBe(4);
  });

  it('correctly renders an approval', () => {
    render(
      <RevisionTimeline
        submission={{
          ...mockSubmission,
          approvedAt: '2021-07-28T11:00:00.000Z',
          approvedBy: mockedWorker,
        }}
      />
    );

    expect(screen.getByText(`Approved by ${mockedWorker.email}`));
    expect(screen.getByText('28 Jul 2021', { exact: false }));
  });

  it('correctly renders a panel approval', () => {
    render(
      <RevisionTimeline
        submission={{
          ...mockSubmission,
          panelApprovedAt: '2021-07-28T11:00:00.000Z',
          panelApprovedBy: mockedWorker,
        }}
      />
    );

    expect(
      screen.getByText(`Approved on behalf of panel by ${mockedWorker.email}`)
    );
    expect(screen.getByText('28 Jul 2021', { exact: false }));
  });
});
