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

  console.log('group by guid', groupAnswersByGUID(caseStatuses.answers));

  if (caseStatuses.answers.length === 0) {
    currentStatus = undefined;
  } else {
    const groupedAnswers = groupAnswersByGUID(caseStatuses.answers);
    if (
      groupedAnswers &&
      groupedAnswers.length === 1 &&
      new Date(groupedAnswers[0].startDate) <= new Date()
    ) {
      currentStatus = groupedAnswers;
    } else if (groupedAnswers) {
      scheduledStatus = groupedAnswers.filter(
        (answer) => new Date(answer.startDate) > new Date()
      );
      pastStatus = groupedAnswers.filter(
        (answer) => new Date(answer.startDate) <= new Date()
      );
      if (pastStatus.length > 0) {
        let tempCurrentStatus = pastStatus[0];
        let tempCurrentStatusIndex = 0;
        pastStatus.forEach((status, index) => {
          if (status.createdAt && tempCurrentStatus.createdAt) {
            if (status.createdAt > tempCurrentStatus.createdAt) {
              tempCurrentStatus = status;
              tempCurrentStatusIndex = index;
            }
          }
        });
        currentStatus = [tempCurrentStatus];
        pastStatus.splice(tempCurrentStatusIndex, 1);
      }
    }
  }

  console.log(
    'past status',
    sortGroupedAnswersByStartDateAndCreatedAt(pastStatus)
  );

  return {
    currentStatusAnswers: currentStatus,
    scheduledStatusAnswers: scheduledStatus,
    pastStatusAnswers: sortGroupedAnswersByStartDateAndCreatedAt(pastStatus),
  };
};

// const groupAnswersByStartDate = (
//   caseStatusAnswers: CaseStatusFields[] | undefined
// ): CaseStatusAnswerDisplay[] | undefined => {
//   return caseStatusAnswers === undefined
//     ? undefined
//     : _.chain(caseStatusAnswers)
//         .groupBy('startDate')
//         .map((value, key) => ({
//           startDate: removeCreatedAtText(key),
//           status: value,
//         }))
//         .value()
//         .sort((a, b) => {
//           return Date.parse(b.startDate) - Date.parse(a.startDate);
//         });
// };

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

// const groupAnswersByStartDateAndCreatedAt = (
//   caseStatusAnswers: CaseStatusFields[] | undefined
// ): CaseStatusAnswerDisplay[] | undefined => {
//   return caseStatusAnswers === undefined
//     ? undefined
//     : _.chain(caseStatusAnswers)
//         .groupBy((item) => `${item.startDate}---${item.createdAt}`)
//         .map((value, key) => ({
//           startDate: removeCreatedAtText(key),
//           status: value,
//         }))
//         .value()
//         .sort((a, b) => {
//           return Date.parse(b.startDate) - Date.parse(a.startDate);
//         });
// };

const groupAnswersByGUID = (
  caseStatusAnswers: CaseStatusFields[] | undefined
): CaseStatusAnswerDisplay[] | undefined => {
  return caseStatusAnswers === undefined
    ? undefined
    : _.chain(caseStatusAnswers)
        .groupBy('groupId')
        .map((value, key) => ({
          startDate: value[0].startDate,
          createdAt: value[0].createdAt,
          status: value,
        }))
        .value()
        .sort((a, b) => {
          return Date.parse(b.startDate) - Date.parse(a.startDate);
        });
};

const removeCreatedAtText = (str: string): string => {
  const [startDate, createdAt] = str.split('---');
  return startDate;
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
    notes: 'this is a note',
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
      },
      {
        option: 'placementType',
        value: 'A3',
        startDate: '2021-07-02',
        createdAt: '2021-07-01T10:54:32Z',
        groupId: 'abcd',
      },
      {
        option: 'legalStatus',
        value: 'C1',
        startDate: '2021-08-02',
        createdAt: '2021-08-01T10:54:32Z',
        groupId: 'efgh',
      },
      {
        option: 'placementType',
        value: 'A3',
        startDate: '2021-08-02',
        createdAt: '2021-08-01T10:54:32Z',
        groupId: 'efgh',
      },

      {
        option: 'legalStatus',
        value: 'C2',
        startDate: '2021-08-02',
        createdAt: '2021-07-30T11:54:32Z',
        groupId: 'ijkl',
      },
      {
        option: 'placementType',
        value: 'K1',
        startDate: '2021-08-02',
        createdAt: '2021-07-30T11:54:32Z',
        groupId: 'ijkl',
      },

      {
        option: 'legalStatus',
        value: 'C2',
        startDate: '2024-10-15',
        createdAt: '2021-10-01T10:54:32Z',
        groupId: 'mnop',
      },
      {
        option: 'placementType',
        value: 'A4',
        startDate: '2024-10-15',
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
    notes: '',
  },
];
