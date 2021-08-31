import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import PersonHistory from './PersonHistory';
import * as caseHooks from 'utils/api/cases';
import * as submissionHooks from 'utils/api/submissions';
import { SWRInfiniteResponse, SWRResponse } from 'swr';
import { CaseData, ErrorAPI, Paginated } from 'types';
import { InProgressSubmission } from 'data/flexibleForms/forms.types';
import { mockedCaseNote } from 'factories/cases';

jest.mock('utils/api/cases');
jest.mock('utils/api/submissions');
jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe('PersonHistory', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders cases correctly', () => {
    jest.spyOn(caseHooks, 'useCasesByResident').mockImplementation(() => {
      const response = {
        data: [
          {
            cases: [mockedCaseNote],
          },
        ],
      } as unknown as SWRInfiniteResponse<CaseData, Error>;

      return response;
    });

    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {} as SWRResponse<
          Paginated<InProgressSubmission>,
          ErrorAPI
        >;

        return response;
      });

    render(<PersonHistory personId={mockedResident.id} />);

    expect(screen.getByText('i am a case title'));
  });

  it('handles when there are no cases to display', () => {
    jest.spyOn(caseHooks, 'useCasesByResident').mockImplementation(() => {
      const response = {
        data: [
          {
            cases: [],
          },
        ],
      } as unknown as SWRInfiniteResponse<CaseData, Error>;

      return response;
    });

    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {} as SWRResponse<
          Paginated<InProgressSubmission>,
          ErrorAPI
        >;

        return response;
      });

    render(<PersonHistory personId={mockedResident.id} />);

    expect(screen.getByText('No events to show'));
  });

  it('handles when cases are still being loaded', () => {
    jest.spyOn(caseHooks, 'useCasesByResident').mockImplementation(() => {
      const response = {
        isValidating: true,
      } as SWRInfiniteResponse<CaseData, Error>;

      return response;
    });

    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {} as SWRResponse<
          Paginated<InProgressSubmission>,
          ErrorAPI
        >;

        return response;
      });

    render(<PersonHistory personId={mockedResident.id} />);

    expect(screen.getByText('MockedSpinner'));
  });

  it('handles when loading cases returns an error', () => {
    const errorMessage = 'foo-error-message';

    jest.spyOn(caseHooks, 'useCasesByResident').mockImplementation(() => {
      const response = {
        error: {
          message: errorMessage,
        },
      } as SWRInfiniteResponse<CaseData, Error>;

      return response;
    });

    jest
      .spyOn(submissionHooks, 'useUnfinishedSubmissions')
      .mockImplementation(() => {
        const response = {} as SWRResponse<
          Paginated<InProgressSubmission>,
          ErrorAPI
        >;

        return response;
      });

    render(<PersonHistory personId={mockedResident.id} />);

    expect(screen.getByText(errorMessage));
  });
});
