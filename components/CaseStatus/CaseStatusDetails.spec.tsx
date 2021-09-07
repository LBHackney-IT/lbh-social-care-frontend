import { render } from '@testing-library/react';
import * as caseStatusApi from 'utils/api/caseStatus';
import CaseStatusDetails from './CaseStatusDetails';
import { mockedAPIservererror } from 'factories/APIerrors';
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

describe('CaseStatusDetail component', () => {
  it("displays nothing if there's no case status", async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: mockedResident.id,
        caseStatuses: [],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('Child in need')).not.toBeInTheDocument();
  });

  it('displays the casestatus of a person', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: mockedResident.id,
        caseStatuses: [
          mockedCaseStatusFactory.build({
            type: 'CIN',
            notes: 'This is a note',
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('Child in need')).toBeInTheDocument();
    expect(queryByText('This is a note')).toBeInTheDocument();
  });

  it('displays multiple CIN in case they exist', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: mockedPersonCaseStatusFactory.build({
        personId: mockedResident.id,
        caseStatuses: [
          mockedCaseStatusFactory.build({
            type: 'CIN',
            notes: 'first note',
          }),
          mockedCaseStatusFactory.build({
            type: 'CIN',
            notes: 'second note',
          }),
        ],
      }),
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('first note')).toBeInTheDocument();
    expect(queryByText('second note')).toBeInTheDocument();
  });

  it('displays an error if API error', async () => {
    jest.spyOn(caseStatusApi, 'GetCaseStatus').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIservererror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(
      queryByText(/There was a problem with getting case status./)
    ).toBeInTheDocument();
  });
});
