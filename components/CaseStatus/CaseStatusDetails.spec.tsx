import { render } from '@testing-library/react';
import * as caseStatusApi from 'utils/api/caseStatus';
import CaseStatusDetails from './CaseStatusDetails';
import { mockedAPIservererror } from 'factories/APIerrors';
import {
  mockedCaseStatusFactory,
  mockedStatusField,
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

  it('displays category of child protection plan for CP', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          id: 1,
          type: 'CP',
          startDate: '2021-09-09',
          endDate: '2021-09-10',
          answers: [
            mockedStatusField.build({
              option: 'category',
              value: 'C2',
              startDate: '2021-09-09',
              createdAt: '2021-09-08T10:54:32Z',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getByTestId, queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const elements = getByTestId('case_status_fields');
    expect(elements).not.toBeNull();
    expect(
      queryByText('Category of child protection plan')
    ).toBeInTheDocument();
    expect(queryByText('Physical abuse')).toBeInTheDocument();
  });

  it('displays the case status field even if an invalid lookup id is passed', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          id: 1,
          type: 'CP',
          startDate: '2021-09-09',
          endDate: '2021-09-10',
          answers: [
            mockedStatusField.build({
              option: 'category',
              value: 'ZZZ1',
              startDate: '2021-09-09',
              createdAt: '2021-09-08',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const { queryByText, getByTestId } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const elements = getByTestId('case_status_fields');
    expect(elements).not.toBeNull();
    expect(
      queryByText('Category of child protection plan')
    ).toBeInTheDocument();
    expect(queryByText('Not the category name')).not.toBeInTheDocument();
    expect(queryByText('ZZZ1')).toBeInTheDocument();
  });
});

describe('LAC Specific Tests for CaseStatusDetail component', () => {
  it('does not display scheduled status or previous status if they do not exist', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'category',
              value: 'C2',
              startDate: '2021-09-01',
            }),
          ],
        }),
      ],
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
    expect(queryByText('01 Sept 2021')).not.toBeInTheDocument();
  });

  it('displays a legal status and placement type for LAC', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2021-10-09',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('09 Oct 2021')).toBeInTheDocument();
    expect(queryByText('P3: Residential employment')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
    expect(queryByText('Legal status')).toBeInTheDocument();
    expect(queryByText('Placement type')).toBeInTheDocument();
  });

  it('displays a scheduled status, if there is one', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'category',
              value: 'C2',
              startDate: '2022-10-09',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('Scheduled changes')).toBeInTheDocument();
    expect(queryByText('Previous version')).not.toBeInTheDocument();
    expect(queryByText('09 Oct 2022')).toBeInTheDocument();
  });

  it('displays both scheduled status answers, if there are two', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2040-10-09',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2040-10-09',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    expect(queryByText('Scheduled changes')).toBeInTheDocument();
    expect(queryByText('Previous version')).not.toBeInTheDocument();
    expect(queryByText('09 Oct 2040')).toBeInTheDocument();
  });

  it("displays additional scheduled status answers, if there are some (this data shouldn't be possible)", async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2040-10-09',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2040-10-09',
            }),

            mockedStatusField.build({
              option: 'placementType',
              value: 'R1',
              startDate: '2040-10-08',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'L2',
              startDate: '2040-10-08',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryAllByText } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const scheduledChangesElement = queryAllByText('Scheduled changes');
    expect(scheduledChangesElement.length).toBe(2);
    expect(queryByText('Previous version')).not.toBeInTheDocument();
    expect(queryByText('09 Oct 2040')).toBeInTheDocument();
    expect(queryByText('08 Oct 2040')).toBeInTheDocument();
    expect(queryByText('P3: Residential employment')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
    expect(queryByText('R1: Residential care home')).toBeInTheDocument();
    expect(
      queryByText('L2: Emergency protection order (EPO)')
    ).toBeInTheDocument();
  });

  it('displays past status, if there is a current status and a status in the past', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryAllByTestId } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const caseStatusTable = queryAllByTestId('case_status_details_table');
    expect(caseStatusTable.length).toBe(2);
    expect(queryByText('Scheduled changes')).not.toBeInTheDocument();
    expect(queryByText('Previous version')).toBeInTheDocument();
    expect(queryByText('09 Oct 2021 - 13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('13 Oct 2021')).toBeInTheDocument();
  });

  it('displays multiple past status, if there is a current status and a multiple status in the past with different created dates', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C2',
              startDate: '2021-10-02',
              createdAt: '2021-09-03T10:54:32Z',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-02',
              createdAt: '2021-09-03T10:54:32Z',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'D1',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryAllByText, queryAllByTestId } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const pastElement = queryAllByText('Previous version');
    const caseStatusTable = queryAllByTestId('case_status_details_table');
    const placementTypeElement = queryAllByText('P3: Residential employment');
    expect(queryByText('Scheduled changes')).not.toBeInTheDocument();
    expect(pastElement).not.toBeNull();
    expect(pastElement.length).toBe(2);
    expect(caseStatusTable.length).toBe(3);
    expect(queryByText('02 Oct 2021 - 09 Oct 2021')).toBeInTheDocument();
    expect(queryByText('09 Oct 2021 - 13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('D1: Freeing order granted')).toBeInTheDocument();
    expect(queryByText('C2: Full care order')).toBeInTheDocument();
    expect(placementTypeElement).not.toBeNull();
    expect(placementTypeElement.length).toBe(3);
  });

  it('displays separate historical status, if there is a multiple previous status with the same start dates', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2021-10-02',
              createdAt: '2021-09-03T10:54:32Z',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-02',
              createdAt: '2021-09-03T10:54:32Z',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'E1',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'D1',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T11:54:32Z',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T11:54:32Z',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C2',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryAllByText, queryAllByTestId } = render(
      <CaseStatusDetails person={mockedResident} />
    );

    const pastElement = queryAllByText('Previous version');
    const caseStatusTable = queryAllByTestId('case_status_details_table');
    const placementTypeElement = queryAllByText('P3: Residential employment');
    expect(queryByText('Scheduled changes')).not.toBeInTheDocument();
    expect(pastElement).not.toBeNull();
    expect(pastElement.length).toBe(3);
    expect(caseStatusTable.length).toBe(4);
    expect(queryByText('02 Oct 2021 - 09 Oct 2021')).toBeInTheDocument();
    expect(queryByText('09 Oct 2021 - 09 Oct 2021')).toBeInTheDocument();
    expect(queryByText('09 Oct 2021 - 13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('D1: Freeing order granted')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
    expect(queryByText('E1: Placement order granted')).toBeInTheDocument();
    expect(queryByText('C2: Full care order')).toBeInTheDocument();
    expect(placementTypeElement).not.toBeNull();
    expect(placementTypeElement.length).toBe(4);
  });
});
