import { render, screen } from '@testing-library/react';
import {
  mockInProgressSubmission,
  mockInProgressSubmissionFactory,
} from 'factories/submissions';
import UnfinishedSubmissions from './UnfinishedSubmissions';
import * as submissionHooks from 'utils/api/submissions';
import { InProgressSubmission } from 'data/flexibleForms/forms.types';
import { SWRResponse } from 'swr';
import { Paginated, ErrorAPI } from 'types';

jest.mock('utils/api/submissions');
jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe('UnfinishedSubmissions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // test we call the useUnfinishedSubmissions with the personId

  it('renders a list of clickable submissions', () => {
    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {
          data: {
            items: [
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
            ] as InProgressSubmission[],
            count: 3,
          },
        } as SWRResponse<Paginated<InProgressSubmission>, ErrorAPI>;

        return response;
      });

    render(<UnfinishedSubmissions personId={1} />);

    expect(screen.getByText('Unfinished submissions'));
    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('link').length).toBe(3);
  });

  it('truncates a long list', () => {
    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {
          data: {
            items: [
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
            ] as InProgressSubmission[],
            count: 6,
          },
        } as SWRResponse<Paginated<InProgressSubmission>, ErrorAPI>;

        return response;
      });

    render(<UnfinishedSubmissions personId={1} />);

    expect(screen.getByText('and 2 more'));
    expect(screen.getAllByRole('listitem').length).toBe(5);
  });

  it('calculates item left based on response count', () => {
    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {
          data: {
            items: [
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
              mockInProgressSubmission,
            ] as InProgressSubmission[],
            count: 50,
          },
        } as SWRResponse<Paginated<InProgressSubmission>, ErrorAPI>;

        return response;
      });

    render(<UnfinishedSubmissions personId={1} />);

    expect(screen.getByText('and 46 more'));
    expect(screen.getAllByRole('listitem').length).toBe(5);
  });

  it('displays the percentage of steps completed for a fully complete submission', () => {
    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {
          data: {
            items: [mockInProgressSubmission] as InProgressSubmission[],
            count: 3,
          },
        } as SWRResponse<Paginated<InProgressSubmission>, ErrorAPI>;

        return response;
      });

    render(<UnfinishedSubmissions personId={1} />);

    expect(screen.getByText('100% complete ·', { exact: false }));
  });

  it('displays the percentage of steps completed for an empty submission', () => {
    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {
          data: {
            items: [
              mockInProgressSubmissionFactory.build({
                completedSteps: 0,
              }),
            ] as InProgressSubmission[],
            count: 3,
          },
        } as SWRResponse<Paginated<InProgressSubmission>, ErrorAPI>;

        return response;
      });

    render(<UnfinishedSubmissions personId={1} />);

    expect(screen.getByText('0% complete ·', { exact: false }));
  });

  it('displays the percentage of steps correctly for a partially completed submission', () => {
    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {
          data: {
            items: [
              mockInProgressSubmissionFactory.build({
                completedSteps: 2,
                formId: 'face-overview-assessment',
              }),
            ] as InProgressSubmission[],
            count: 3,
          },
        } as SWRResponse<Paginated<InProgressSubmission>, ErrorAPI>;

        return response;
      });

    render(<UnfinishedSubmissions personId={1} />);

    expect(screen.getByText('7% complete ·', { exact: false }));
  });

  it('handles when we can not find the associated form for a submission', () => {
    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {
          data: {
            items: [
              mockInProgressSubmissionFactory.build({
                formId: 'invalid form id',
              }),
            ] as InProgressSubmission[],
            count: 3,
          },
        } as SWRResponse<Paginated<InProgressSubmission>, ErrorAPI>;

        return response;
      });

    render(<UnfinishedSubmissions personId={1} />);

    expect(screen.getByText('Unknown % complete · ', { exact: false }));
  });
});
