import {
  CaseStatus,
  CaseStatusFields,
  ChildProtectionCategoryOptions,
  LACLegalStatusOptions,
  LACPlacementTypeOptions,
  CaseStatusAnswerDisplay,
} from 'types';
import _ from 'lodash';

export enum CaseStatusOptionMapping {
  placementReason = 'Placement reason',
  category = 'Category of child protection plan',
  legalStatus = 'Legal status',
  placementType = 'Placement type',
}

export const CaseStatusSelectOptionLookup = (
  caseStatusAnswerValue: string,
  caseStatusAnswerOption: string
): string => {
  let returnString = '';
  switch (caseStatusAnswerOption) {
    case 'category':
      returnString =
        ChildProtectionCategoryOptions[
          caseStatusAnswerValue as keyof typeof ChildProtectionCategoryOptions
        ];
      break;
    case 'legalStatus':
      returnString =
        LACLegalStatusOptions[
          caseStatusAnswerValue as keyof typeof LACLegalStatusOptions
        ];
      break;
    case 'placementType':
      returnString =
        LACPlacementTypeOptions[
          caseStatusAnswerValue as keyof typeof LACPlacementTypeOptions
        ];
      break;
  }
  return returnString ? returnString : `${caseStatusAnswerValue}`;
};

export const sortCaseStatusAnswers = (
  caseStatuses: CaseStatus
): {
  currentStatusAnswers: CaseStatusAnswerDisplay[] | undefined;
  scheduledStatusAnswers?: CaseStatusAnswerDisplay[] | undefined;
  pastStatusAnswers?: CaseStatusAnswerDisplay[] | undefined;
} => {
  let currentStatus: CaseStatusAnswerDisplay[] | undefined;
  let scheduledStatus: CaseStatusAnswerDisplay[] | undefined;
  let pastStatus: CaseStatusAnswerDisplay[] | undefined;

  const groupedAnswers = groupAnswersByGroupId(caseStatuses.answers);
  if (caseStatuses.type !== 'LAC') {
    if (groupedAnswers && groupedAnswers.length > 1) {
      currentStatus = [groupedAnswers[0]];
    } else {
      currentStatus = groupedAnswers;
    }
  } else if (groupedAnswers) {
    if (new Date(groupedAnswers[0].startDate) > new Date()) {
      const scheduledAnswers = groupedAnswers.shift();
      if (scheduledAnswers) {
        scheduledStatus = [scheduledAnswers];
      }
    }
    const currentAnswers = groupedAnswers.shift();
    if (currentAnswers) {
      currentStatus = [currentAnswers];
    }
    pastStatus = groupedAnswers;
  }

  return {
    currentStatusAnswers: currentStatus,
    scheduledStatusAnswers: scheduledStatus,
    pastStatusAnswers: sortGroupedAnswersByStartDateAndCreatedAt(pastStatus),
  };
};

const sortGroupedAnswersByStartDateAndCreatedAt = (
  groupedAnswers: CaseStatusAnswerDisplay[] | undefined
): CaseStatusAnswerDisplay[] | undefined => {
  return groupedAnswers === undefined
    ? undefined
    : groupedAnswers.sort((a, b) => {
        if (a.startDate === b.startDate && a.createdAt && b.createdAt) {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        }
        return Date.parse(b.startDate) - Date.parse(a.startDate);
      });
};

const groupAnswersByGroupId = (
  caseStatusAnswers: CaseStatusFields[] | undefined
): CaseStatusAnswerDisplay[] | undefined => {
  return caseStatusAnswers === undefined
    ? undefined
    : _.chain(caseStatusAnswers)
        .groupBy('groupId')
        .map((value) => ({
          startDate: value[0].startDate,
          createdAt: value[0].createdAt,
          status: value,
          endDate: value[0].endDate,
        }))
        .value()
        .sort((a, b) => {
          return Date.parse(b.startDate) - Date.parse(a.startDate);
        });
};

export const caseStatusesTest: CaseStatus[] = [
  {
    id: 2,
    type: 'CP',
    answers: [
      {
        option: 'category',
        value: 'C1',
        startDate: '2021-09-15',
        createdAt: '2021-09-01T10:54:32Z',
      },
    ],
    startDate: '2021-08-12T14:35:37.7023130',
    endDate: '',
    notes: 'this is a note',
  },
  {
    id: 1,
    type: 'CIN',
    answers: [],
    startDate: '2021-08-12T14:35:37.7023130',
    endDate: '',
    notes: 'this is a note',
  },
  {
    id: 3,
    type: 'LAC',
    answers: [
      {
        option: 'legalStatus',
        value: 'C1',
        startDate: '2021-10-15',
        createdAt: '2021-10-01T10:54:32Z',
      },
      {
        option: 'placementType',
        value: 'A3',
        startDate: '2021-10-15',
        createdAt: '2021-10-01T10:54:32Z',
      },
    ],

    startDate: '2021-08-12T14:35:37.7023130',
    endDate: '',
    notes: '',
  },
  {
    id: 5,
    type: 'LAC',
    answers: [
      {
        option: 'category',
        value: 'C2',
        startDate: '2021-09-01',
        groupId: 'asdf',
        createdAt: '2021-09-01T10:54:32Z',
      },
    ],
    startDate: '2021-08-01',
    endDate: '',
    notes: '',
  },
  {
    id: 6,
    type: 'LAC',
    answers: [
      {
        option: 'category',
        value: 'C2',
        startDate: '2040-10-09',
        createdAt: '2021-09-01T10:54:32Z',
        groupId: 'abc',
      },
    ],
    notes: '',
    startDate: '2021-09-09',
    endDate: '',
  },
];

export const LACcaseStatusesTest: CaseStatus[] = [
  {
    id: 4,
    type: 'LAC',
    answers: [
      {
        option: 'legalStatus',
        value: 'C1',
        startDate: '2021-07-02',
        createdAt: '2021-07-01T10:54:32Z',
        groupId: 'abcd',
        endDate: '2021-08-02',
      },
      {
        option: 'placementType',
        value: 'A3',
        startDate: '2021-07-02',
        createdAt: '2021-07-01T10:54:32Z',
        groupId: 'abcd',
        endDate: '2021-08-02',
      },
      {
        option: 'legalStatus',
        value: 'C1',
        startDate: '2021-08-02',
        createdAt: '2021-08-01T10:54:32Z',
        groupId: 'efgh',
        endDate: '2021-08-03',
      },
      {
        option: 'placementType',
        value: 'A3',
        startDate: '2021-08-02',
        createdAt: '2021-08-01T10:54:32Z',
        groupId: 'efgh',
        endDate: '2021-08-03',
      },

      {
        option: 'legalStatus',
        value: 'C2',
        startDate: '2021-08-03',
        createdAt: '2021-07-30T11:54:32Z',
        groupId: 'ijkl',
        endDate: '2021-09-15',
      },
      {
        option: 'placementType',
        value: 'K1',
        startDate: '2021-08-03',
        createdAt: '2021-07-30T11:54:32Z',
        groupId: 'ijkl',
        endDate: '2021-09-15',
      },

      {
        option: 'legalStatus',
        value: 'C2',
        startDate: '2021-11-15',
        createdAt: '2021-10-01T10:54:32Z',
        groupId: 'mnop',
      },
      {
        option: 'placementType',
        value: 'A4',
        startDate: '2021-11-15',
        createdAt: '2021-10-01T10:54:32Z',
        groupId: 'mnop',
      },
      {
        option: 'legalStatus',
        value: 'D1',
        startDate: '2021-09-15',
        createdAt: '2021-09-01T10:54:32Z',
        groupId: 'qrst',
      },
      {
        option: 'placementType',
        value: 'A5',
        startDate: '2021-09-15',
        createdAt: '2021-09-01T10:54:32Z',
        groupId: 'qrst',
      },
    ],
    startDate: '2021-08-02T14:35:37.7023130',
    endDate: '',
    notes: 'this is a LAC note',
  },
];
