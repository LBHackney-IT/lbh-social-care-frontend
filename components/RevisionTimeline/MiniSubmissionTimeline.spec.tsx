import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Revision, Submission } from 'data/flexibleForms/forms.types';
import {
  mockInProgressSubmission,
  mockSubmission,
} from 'factories/submissions';
import { mockedWorker } from 'factories/workers';
import MiniRevisionTimeline from './MiniRevisionTimeline';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// change mock to SWR
// test loading state
// test error handling

describe('MiniRevisionTimeline', () => {
  it('correctly renders edits and creation', async () => {
    mockedAxios.get.mockResolvedValue({
      data: mockSubmission,
    });

    render(
      <MiniRevisionTimeline inProgressSubmission={mockInProgressSubmission} />
    );

    await waitFor(() => {
      expect(screen.getByText('foo.bar@hackney.gov.uk', { exact: false }));
      expect(screen.getByText('21 Jun 2021', { exact: false }));
    });
  });

  it('only shows up to three events', async () => {
    const mockSubmissionClone = JSON.parse(
      JSON.stringify(mockSubmission)
    ) as Submission;

    const appendedEdits: Revision[] = [
      {
        worker: mockedWorker,
        editTime: '2021-06-21T12:00:00.000Z',
      },
      {
        worker: mockedWorker,
        editTime: '2021-06-21T12:00:00.000Z',
      },
      {
        worker: mockedWorker,
        editTime: '2021-06-21T12:00:00.000Z',
      },
      {
        worker: mockedWorker,
        editTime: '2021-06-21T12:00:00.000Z',
      },
    ];
    mockSubmissionClone.editHistory.push(...appendedEdits);

    mockedAxios.get.mockResolvedValue({
      data: mockSubmissionClone,
    });

    render(
      <MiniRevisionTimeline inProgressSubmission={mockInProgressSubmission} />
    );

    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(3);
    });
  });
});
