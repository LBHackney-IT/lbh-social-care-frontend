import { render } from '@testing-library/react';
import * as caseStatusApi from 'utils/api/caseStatus';
import { mockedAPIservererror } from 'factories/APIerrors';
import CaseStatusView from './CaseStatusView';

import { mockedCaseStatusFactory } from 'factories/caseStatus';
import { mockedResident } from 'factories/residents';
import { CaseStatus } from 'types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
  reload: jest.fn(),
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

const person = mockedResident;

describe('CaseStatusView component', () => {
  it('displays the case status of a person', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CIN',
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(<CaseStatusView person={person} />);

    expect(queryByText('Child in need')).toBeInTheDocument();
  });

  it('displays only one "CIN" in case they are multiple', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CIN',
        }),
        mockedCaseStatusFactory.build({
          type: 'CIN',
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const { queryByText } = render(<CaseStatusView person={person} />);

    expect(queryByText('Child in need')).toBeInTheDocument();
  });

  it('displays only one "CIN", one "CP" and one "LAC"', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CIN',
        }),
        mockedCaseStatusFactory.build({
          type: 'CP',
        }),
        mockedCaseStatusFactory.build({
          type: 'LAC',
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(<CaseStatusView person={person} />);

    expect(queryByText('Child in need')).toBeInTheDocument();
    expect(queryByText('Child protection')).toBeInTheDocument();
    expect(queryByText('Looked after child')).toBeInTheDocument();
  });

  it("displays nothing if there's no case status", async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [] as CaseStatus[],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(<CaseStatusView person={person} />);

    expect(queryByText('Child in need')).not.toBeInTheDocument();
  });

  it('displays an error if API error', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIservererror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(<CaseStatusView person={person} />);

    expect(
      queryByText(/There was a problem with getting case status./)
    ).toBeInTheDocument();
  });
});
