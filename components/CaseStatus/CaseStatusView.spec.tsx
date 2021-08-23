import { render } from '@testing-library/react';
import * as caseStatusApi from 'utils/api/caseStatus';
import { mockedAPIservererror } from 'factories/APIerrors';
import CaseStatusView from './CaseStatusView';

import {
  mockedCaseStatusFactory,
  mockedPersonCaseStatusFactory,
} from 'factories/caseStatus';
import { mockedResident } from 'factories/residents';

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
  it('displays the casestatus of a person', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: person.id,
        caseStatuses: [
          mockedCaseStatusFactory.build({
            type: 'CIN',
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(<CaseStatusView person={person} />);

    expect(queryByText('Child in need - N0')).toBeInTheDocument();
  });

  it("displays nothing if there's no case status", async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: person.id,
        caseStatuses: [],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(<CaseStatusView person={person} />);

    expect(queryByText('Child in need')).not.toBeInTheDocument();
  });

  it('displays an error if API error', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
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
