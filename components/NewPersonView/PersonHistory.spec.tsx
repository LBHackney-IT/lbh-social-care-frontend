import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import PersonHistory from './PersonHistory';
import * as caseHooks from 'utils/api/cases';
import { SWRInfiniteResponse } from 'swr';
import { CaseData } from 'types';
import { mockedCaseNote } from 'factories/cases';
import { AppConfigProvider } from 'lib/appConfig';
import { mockedUser } from 'factories/users';
import { UserContext } from 'components/UserContext/UserContext';
import {
  FeatureFlagProvider,
  FeatureSet,
} from 'lib/feature-flags/feature-flags';

const features: FeatureSet = {
  'case-notes-deletion': {
    isActive: true,
  },
};

jest.mock('utils/api/cases');
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

    render(
      <FeatureFlagProvider features={features}>
        <UserContext.Provider
          value={{
            user: mockedUser,
          }}
        >
          <AppConfigProvider appConfig={{}}>
            <PersonHistory personId={mockedResident.id} />
          </AppConfigProvider>
        </UserContext.Provider>
      </FeatureFlagProvider>
    );
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

    render(
      <AppConfigProvider appConfig={{}}>
        <UserContext.Provider
          value={{
            user: mockedUser,
          }}
        >
          <PersonHistory personId={mockedResident.id} />
        </UserContext.Provider>
      </AppConfigProvider>
    );
    expect(screen.getByText('No events to show'));
  });

  it('handles when cases are still being loaded', () => {
    jest.spyOn(caseHooks, 'useCasesByResident').mockImplementation(() => {
      const response = {
        isValidating: true,
      } as SWRInfiniteResponse<CaseData, Error>;

      return response;
    });

    render(
      <AppConfigProvider appConfig={{}}>
        <UserContext.Provider
          value={{
            user: mockedUser,
          }}
        >
          {' '}
          <PersonHistory personId={mockedResident.id} />
        </UserContext.Provider>
      </AppConfigProvider>
    );
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

    render(
      <AppConfigProvider appConfig={{}}>
        <UserContext.Provider
          value={{
            user: mockedUser,
          }}
        >
          <PersonHistory personId={mockedResident.id} />
        </UserContext.Provider>
      </AppConfigProvider>
    );
    expect(screen.getByText(errorMessage));
  });
});
