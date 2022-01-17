import { render } from '@testing-library/react';
import * as caseStatusApi from 'utils/api/caseStatus';
import CaseStatusDetails from './CaseStatusDetails';
import { mockedAPIservererror } from 'factories/APIerrors';
import {
  mockedCaseStatusFactory,
  mockedStatusField,
} from 'factories/caseStatus';
import { mockedResident } from 'factories/residents';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
  reload: jest.fn(),
}));

describe('CaseStatusDetail - Permissions', () => {
  it('displays end/edit for CIN', () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CIN',
          notes: 'This is a note',
          answers: [],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    mockedUser.isInPlacementManagementUnit = false;
    mockedUser.isInSafeguardingReviewing = false;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByText('Edit / End')).toBeInTheDocument();
  });

  it('displays end/edit for CP if user has right permissions', () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CP',
          notes: 'This is a note',
          answers: [],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    mockedUser.isInPlacementManagementUnit = false;
    mockedUser.isInSafeguardingReviewing = true;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByText('Edit / End')).toBeInTheDocument();
  });

  it('does not display end/edit for CP if user has wrong permissions', () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CP',
          notes: 'This is a note',
          answers: [],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    mockedUser.isInPlacementManagementUnit = true;
    mockedUser.isInSafeguardingReviewing = false;

    const { queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(queryByText('Edit / End')).not.toBeInTheDocument();
  });

  it('displays end/edit for LAC if user has right permissions', () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          notes: 'This is a note',
          answers: [],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    mockedUser.isInPlacementManagementUnit = true;
    mockedUser.isInSafeguardingReviewing = false;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByText('Edit / End')).toBeInTheDocument();
  });

  it('does not display end/edit for LAC if user has wrong permissions', () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          notes: 'This is a note',
          answers: [],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    mockedUser.isInPlacementManagementUnit = false;
    mockedUser.isInSafeguardingReviewing = true;

    const { queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(queryByText('Edit / End')).not.toBeInTheDocument();
  });
});

describe('CaseStatusDetail component', () => {
  it("displays nothing if there's no case status", async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(queryByText('Child in need')).not.toBeInTheDocument();
    expect(queryByTestId('case_status_details_table')).toBeNull();
  });

  it('displays the notes of a person when there are notes', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CIN',
          notes: 'This is a note',
          answers: [],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(queryByText('Child in need')).toBeInTheDocument();
    expect(queryByText('This is a note')).toBeInTheDocument();
    expect(queryByTestId('case_status_details_table')).not.toBeNull();
  });

  it("displays multiple CIN status' if they exist", async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CIN',
          notes: 'first note',
          startDate: '2021-10-01',
          answers: [],
        }),
        mockedCaseStatusFactory.build({
          type: 'CIN',
          notes: 'second note',
          startDate: '2021-10-02',
          answers: [],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, getAllByTestId, queryAllByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );
    const caseStatusElements = getAllByTestId('case_status_details');
    const caseStatusDetailsTableElements = getAllByTestId(
      'case_status_details_table'
    );
    const childInNeedText = queryAllByText('Child in need');

    expect(caseStatusElements.length).toBe(2);
    expect(caseStatusDetailsTableElements.length).toBe(2);
    expect(childInNeedText.length).toBe(2);
    expect(queryByText('first note')).toBeInTheDocument();
    expect(queryByText('second note')).toBeInTheDocument();
    expect(queryByText('01 Oct 2021')).toBeInTheDocument();
    expect(queryByText('02 Oct 2021')).toBeInTheDocument();
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
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(
      queryByText(/There was a problem with getting case status./)
    ).toBeInTheDocument();
  });

  it('displays category of child protection plan for CP', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
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
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByTestId('case_status_fields')).not.toBeNull();
    expect(getByTestId('case_status_details_table')).not.toBeNull();
    expect(
      queryByText('Category of child protection plan')
    ).toBeInTheDocument();
    expect(queryByText('Physical abuse')).toBeInTheDocument();
    expect(queryByText('Dates')).toBeInTheDocument();

    const elements = getByTestId('start_end_date');
    expect(elements.textContent).toMatch(/(09 Sept 2021|09 Sep 2021)/i);
    expect(elements.textContent).toMatch(/(10 Sept 2021|10 Sep 2021)/i);
  });

  it('displays the case status answer even if an invalid value is passed', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
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
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByTestId('case_status_fields')).not.toBeNull();
    expect(getByTestId('case_status_details_table')).not.toBeNull();
    expect(
      queryByText('Category of child protection plan')
    ).toBeInTheDocument();
    expect(queryByText('ZZZ1')).toBeInTheDocument();
  });

  it('displays all groups of case status answers for CP, if there are multiple answer groups', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'CP',
          startDate: '2021-09-09',
          endDate: '2021-09-10',
          answers: [
            mockedStatusField.build({
              option: 'category',
              value: 'C1',
              startDate: '2021-09-09',
              createdAt: '2021-09-08',
              groupId: 'abc',
            }),
            mockedStatusField.build({
              option: 'category',
              value: 'C2',
              startDate: '2021-09-10',
              createdAt: '2021-09-10',
              groupId: 'def',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
    const { queryByText, queryAllByText, getAllByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getAllByTestId('case_status_fields')).toHaveLength(2);
    expect(getAllByTestId('case_status_details_table')).toHaveLength(2);
    expect(queryAllByText('Category of child protection plan')).toHaveLength(2);
    expect(queryByText('Neglect')).toBeInTheDocument();
    expect(queryByText('Physical abuse')).toBeInTheDocument();
  });
});

describe('LAC Specific Tests for CaseStatusDetail component', () => {
  it('does not display scheduled status or previous status if there are no scheduled or past status answer groups', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'placementType',
              value: 'K1',
              startDate: '2021-08-01',
              groupId: 'abc1',
            }),
          ],
        }),
      ],
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText, getByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByTestId('case_status_details_table')).not.toBeNull();
    expect(queryByText('Scheduled changes')).not.toBeInTheDocument();
    expect(queryByText('Previous version')).not.toBeInTheDocument();
    expect(queryByText('01 Aug 2021')).toBeInTheDocument();
    expect(queryByText('K1: Secure children’s homes')).toBeInTheDocument();
  });

  it('displays grouped answers in one case status details table', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
              groupId: 'abc1',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2021-10-09',
              groupId: 'abc1',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, getByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByTestId('case_status_details_table')).not.toBeNull();
    expect(queryByText('09 Oct 2021')).toBeInTheDocument();
    expect(queryByText('P3: Residential employment')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
    expect(queryByText('Legal status')).toBeInTheDocument();
    expect(queryByText('Placement type')).toBeInTheDocument();
  });

  it('displays a scheduled status, if there is an answer group with a future start date', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C2',
              startDate: '2040-10-09',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, getByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByTestId('case_status_details_table')).not.toBeNull();
    expect(queryByText('Scheduled changes')).toBeInTheDocument();
    expect(queryByText('Previous version')).not.toBeInTheDocument();
    expect(queryByText('09 Oct 2040')).toBeInTheDocument();
    expect(queryByText('C2: Full care order')).toBeInTheDocument();
  });

  it('displays all scheduled status answers that are in the same answer group', async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2040-10-09',
              groupId: 'abc',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2040-10-09',
              groupId: 'abc',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, getByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    expect(getByTestId('case_status_details_table')).not.toBeNull();
    expect(queryByText('Scheduled changes')).toBeInTheDocument();
    expect(queryByText('Previous version')).not.toBeInTheDocument();
    expect(queryByText('09 Oct 2040')).toBeInTheDocument();
    expect(queryByText('P3: Residential employment')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
    expect(queryByText('Legal status')).toBeInTheDocument();
    expect(queryByText('Placement type')).toBeInTheDocument();
  });

  it("displays only one group of scheduled status answers, even if more than one answer group exists with a future start date (this data shouldn't be possible)", async () => {
    jest.spyOn(caseStatusApi, 'useCaseStatuses').mockImplementation(() => ({
      data: [
        mockedCaseStatusFactory.build({
          type: 'LAC',
          answers: [
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2040-10-09',
              groupId: 'abc',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2040-10-09',
              groupId: 'abc',
            }),

            mockedStatusField.build({
              option: 'placementType',
              value: 'R1',
              startDate: '2040-10-08',
              groupId: 'def',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'L2',
              startDate: '2040-10-08',
              groupId: 'def',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { getByTestId, queryByText, queryAllByText, queryAllByTestId } =
      render(
        <UserContext.Provider value={{ user: mockedUser }}>
          <CaseStatusDetails person={mockedResident} />
        </UserContext.Provider>
      );

    const caseStatusDetailsTableElements = queryAllByTestId(
      'case_status_details_table'
    );
    const scheduledChangesElement = queryAllByText('Scheduled changes');
    expect(caseStatusDetailsTableElements.length).toBe(2);
    expect(scheduledChangesElement.length).toBe(1);
    expect(queryByText('Previous version')).not.toBeInTheDocument();

    const elements = getByTestId('start_end_date');
    expect(elements.textContent).toMatch(/(09 Oct 2040)/i);
    expect(elements.textContent).toMatch(/(08 Oct 2040)/i);

    expect(queryByText('P3: Residential employment')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
    expect(queryByText('R1: Residential care home')).toBeInTheDocument();
    expect(
      queryByText('L2: Emergency protection order (EPO)')
    ).toBeInTheDocument();
  });

  it('displays current and past status answer groups, if there are two groups of answers, with start dates on or before today', async () => {
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
              groupId: 'abc',
              endDate: '2021-10-13',
            }),
            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
              groupId: 'def',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryAllByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    const caseStatusTable = queryAllByTestId('case_status_details_table');
    expect(caseStatusTable.length).toBe(2);
    expect(queryByText('Scheduled changes')).not.toBeInTheDocument();
    expect(queryByText('Previous version')).toBeInTheDocument();
    expect(queryByText('09 Oct 2021 - 13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('P3: Residential employment')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
  });

  it('displays multiple past status answer groups, if there is are multiple case status answer groups with start dates on or before today', async () => {
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
              groupId: 'abc',
              endDate: '2021-10-09',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-02',
              createdAt: '2021-09-03T10:54:32Z',
              groupId: 'abc',
              endDate: '2021-10-09',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'D1',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
              groupId: 'def',
              endDate: '2021-10-13',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
              groupId: 'def',
              endDate: '2021-10-13',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C1',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
              groupId: 'ghi',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
              groupId: 'ghi',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryAllByText, queryAllByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    const pastElement = queryAllByText('Previous version');
    const caseStatusTable = queryAllByTestId('case_status_details_table');
    const placementTypeElement = queryAllByText('P3: Residential employment');
    expect(pastElement.length).toBe(2);
    expect(caseStatusTable.length).toBe(3);
    expect(placementTypeElement.length).toBe(3);
    expect(queryByText('Scheduled changes')).not.toBeInTheDocument();
    expect(queryByText('02 Oct 2021 - 09 Oct 2021')).toBeInTheDocument();
    expect(queryByText('09 Oct 2021 - 13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('D1: Freeing order granted')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
    expect(queryByText('C2: Full care order')).toBeInTheDocument();
  });

  it('displays separate historical answer groups, if there is a multiple answer groups with the same start dates', async () => {
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
              groupId: 'abc',
              endDate: '2021-10-09',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-02',
              createdAt: '2021-09-03T10:54:32Z',
              groupId: 'abc',
              endDate: '2021-10-09',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'E1',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
              groupId: 'def',
              endDate: '2021-10-09',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T10:54:32Z',
              groupId: 'def',
              endDate: '2021-10-09',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'D1',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T11:54:32Z',
              groupId: 'ghi',
              endDate: '2021-10-13',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-09',
              createdAt: '2021-09-08T11:54:32Z',
              groupId: 'ghi',
              endDate: '2021-10-13',
            }),

            mockedStatusField.build({
              option: 'legalStatus',
              value: 'C2',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
              groupId: 'jkl',
            }),
            mockedStatusField.build({
              option: 'placementType',
              value: 'P3',
              startDate: '2021-10-13',
              createdAt: '2021-09-09T10:54:32Z',
              groupId: 'jkl',
            }),
          ],
        }),
      ],
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    const { queryByText, queryAllByText, queryAllByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <CaseStatusDetails person={mockedResident} />
      </UserContext.Provider>
    );

    const pastElement = queryAllByText('Previous version');
    const caseStatusTable = queryAllByTestId('case_status_details_table');
    const placementTypeElement = queryAllByText('P3: Residential employment');
    expect(pastElement.length).toBe(3);
    expect(caseStatusTable.length).toBe(4);
    expect(placementTypeElement.length).toBe(4);
    expect(queryByText('Scheduled changes')).not.toBeInTheDocument();
    expect(queryByText('02 Oct 2021 - 09 Oct 2021')).toBeInTheDocument();
    expect(queryByText('09 Oct 2021 - 09 Oct 2021')).toBeInTheDocument();
    expect(queryByText('09 Oct 2021 - 13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('13 Oct 2021')).toBeInTheDocument();
    expect(queryByText('D1: Freeing order granted')).toBeInTheDocument();
    expect(queryByText('C1: Interim care order')).toBeInTheDocument();
    expect(queryByText('E1: Placement order granted')).toBeInTheDocument();
    expect(queryByText('C2: Full care order')).toBeInTheDocument();
  });
});
