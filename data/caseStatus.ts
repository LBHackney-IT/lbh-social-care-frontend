import {
  CaseStatus,
  CaseStatusFields,
  ChildProtectionCategoryOptions,
  LACLegalStatusOptions,
  LACPlacementTypeOptions,
  CaseStatusAnswerDisplay,
} from 'types';
import _ from 'lodash';
import { normaliseDateNoMilliseconds } from 'utils/date';

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
  let currentStatus: CaseStatusFields[] | undefined;
  let scheduledStatus: CaseStatusFields[] | undefined;
  let pastStatus: CaseStatusFields[] | undefined;

  if (caseStatuses.type !== 'LAC') {
    if (caseStatuses.answers.length === 0) {
      currentStatus = undefined;
    } else {
      currentStatus = caseStatuses.answers;
    }
  } else {
    scheduledStatus = caseStatuses.answers.filter(
      (answer) => new Date(answer.startDate) > new Date()
    );
    pastStatus = caseStatuses.answers.filter(
      (answer) => new Date(answer.startDate) <= new Date()
    );
    if (pastStatus.length > 0) {
      let tempCurrentStatus = pastStatus[0];
      pastStatus.forEach((status) => {
        if (status.createdAt > tempCurrentStatus.createdAt) {
          tempCurrentStatus = status;
        }
      });

      let currentStatusIndex = -1;
      do {
        currentStatusIndex = pastStatus.findIndex(
          (i) =>
            normaliseDateNoMilliseconds(i.createdAt) ===
              normaliseDateNoMilliseconds(tempCurrentStatus.createdAt) &&
            i.startDate === tempCurrentStatus.startDate
        );
        if (currentStatusIndex >= 0) {
          if (currentStatus === undefined) {
            currentStatus = [];
          }
          currentStatus.push(pastStatus[currentStatusIndex]);
          pastStatus.splice(currentStatusIndex, 1);
        }
      } while (currentStatusIndex >= 0);
    }
  }

  return {
    currentStatusAnswers:
      groupAnswersByCreatedAtStartDateAndCreatedBy(currentStatus),
    scheduledStatusAnswers:
      groupAnswersByCreatedAtStartDateAndCreatedBy(scheduledStatus),
    pastStatusAnswers: groupAnswersByCreatedAtStartDateAndCreatedBy(pastStatus),
  };
};

const groupAnswersByCreatedAtStartDateAndCreatedBy = (
  caseStatusAnswers: CaseStatusFields[] | undefined
): CaseStatusAnswerDisplay[] | undefined => {
  return caseStatusAnswers === undefined
    ? undefined
    : _.chain(caseStatusAnswers)
        .groupBy((item) => `${item.startDate}---${item.createdAt}`)
        .map((value, key) => ({
          startDate: removeCreatedAtText(key),
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
