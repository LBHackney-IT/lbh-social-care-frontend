//TO DO
// if there are scheduled case status' show these

// if there are no past LAC case status' don't show the scheduled title
// if there are past LAC case status' show these

import { render } from '@testing-library/react';
import * as caseStatusApi from 'utils/api/caseStatus';
import CaseStatusDetails from './CaseStatusDetails';
import { mockedAPIservererror } from 'factories/APIerrors';
import { mockedCaseStatusFactory } from 'factories/caseStatus';
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
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('Child in need')).not.toBeInTheDocument();
  });

  it('displays the notes of a person when there are notes', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CIN',
          notes: 'This is a note',
        }),
      ],
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
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CIN',
          notes: 'first note',
        }),
        mockedCaseStatusFactory.build({
          type: 'CIN',
          notes: 'first note',
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getAllByTestId } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const elements = getAllByTestId('case_status_details');
    expect(elements.length).toBe(2);
  });

  it('displays an error if API error', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
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

  it('does not display scheduled status or previous status if they do not exist', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: undefined,
      error: mockedAPIservererror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('Scheduled changes')).not.toBeInTheDocument();
    expect(queryByText('Previous version')).not.toBeInTheDocument();
  });
});
