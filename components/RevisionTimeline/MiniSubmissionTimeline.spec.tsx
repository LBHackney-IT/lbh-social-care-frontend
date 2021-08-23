import { render, screen, waitFor } from '@testing-library/react';
import { Revision, Submission } from 'data/flexibleForms/forms.types';
import {
  mockInProgressSubmission,
  mockSubmission,
  mockSubmissionFactory,
} from 'factories/submissions';
import { mockedWorker } from 'factories/workers';
import MiniRevisionTimeline from './MiniRevisionTimeline';
import * as submissionHooks from 'utils/api/submissions';
import { SWRResponse } from 'swr';
import { ErrorAPI } from 'types';

jest.mock('utils/api/submissions');
jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe('MiniRevisionTimeline', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('correctly renders edits and creation', async () => {
    jest.spyOn(submissionHooks, 'useSubmission').mockImplementation(() => {
      const response = {
        data: mockSubmission,
        error: undefined,
        isValidating: false,
      } as SWRResponse<Submission, ErrorAPI>;

      return response;
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
    const edits: Revision[] = [
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

    const mockSubmission = {
      ...mockSubmissionFactory.build(),
      editHistory: edits,
    };

    jest.spyOn(submissionHooks, 'useSubmission').mockImplementation(() => {
      const response = {
        data: mockSubmission,
        error: undefined,
        isValidating: false,
      } as SWRResponse<Submission, ErrorAPI>;

      return response;
    });

    render(
      <MiniRevisionTimeline inProgressSubmission={mockInProgressSubmission} />
    );

    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(3);
    });
  });

  it('shows an error message when useSubmission returns an error', async () => {
    jest.spyOn(submissionHooks, 'useSubmission').mockImplementation(() => {
      const response = {
        data: mockSubmission,
        error: {} as ErrorAPI,
        isValidating: false,
      } as SWRResponse<Submission, ErrorAPI>;

      return response;
    });

    render(
      <MiniRevisionTimeline inProgressSubmission={mockInProgressSubmission} />
    );

    await waitFor(() => {
      expect(
        screen.getByText('Error fetching submission edit history', {
          exact: false,
        })
      );
    });
  });

  it('shows a loading spinner (mocked) when useSubmission is validating', async () => {
    jest.spyOn(submissionHooks, 'useSubmission').mockImplementation(() => {
      const response = {
        data: mockSubmission,
        error: undefined,
        isValidating: true,
      } as SWRResponse<Submission, ErrorAPI>;

      return response;
    });

    render(
      <MiniRevisionTimeline inProgressSubmission={mockInProgressSubmission} />
    );

    await waitFor(() => {
      expect(
        screen.getByText('MockedSpinner', {
          exact: false,
        })
      );
    });
  });
});
