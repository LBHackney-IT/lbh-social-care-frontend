import { render, screen } from '@testing-library/react';
import { mockSubmission } from 'factories/submissions';
import { mockedWorker } from 'factories/workers';
import MiniRevisionTimeline from './MiniRevisionTimeline';

describe('MiniRevisionTimeline', () => {
  it('correctly renders edits and creation', () => {
    render(
      <MiniRevisionTimeline
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

    expect(screen.queryAllByText('foo.bar@hackney.gov.uk').length).toBe(2);
    expect(screen.getByText('28 Jul 2021', { exact: false }));
    expect(screen.getByText('23 Jun 2021', { exact: false }));
  });

  it('only shows up to three events', () => {
    render(
      <MiniRevisionTimeline
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
          ],
        }}
      />
    );

    expect(screen.getAllByRole('listitem').length).toBe(3);
  });
});
