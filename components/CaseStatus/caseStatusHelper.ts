import {
  CaseStatus,
  CaseStatusFields,
  ChildProtectionCategoryOptions,
  LACLegalStatusOptions,
  LACPlacementTypeOptions,
  CaseStatusAnswerDisplay,
} from 'types';
import _ from 'lodash';
import { createContext } from 'react';

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

let caseStatusId = 0;
let statefulScheduledCaseStatus = false;

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

  caseStatusId = caseStatuses.id;
  statefulScheduledCaseStatus = scheduledStatus ? true : false;

  console.log('ID', caseStatusId);
  console.log('BOOLEAN', statefulScheduledCaseStatus);

  return {
    currentStatusAnswers: currentStatus,
    scheduledStatusAnswers: scheduledStatus,
    pastStatusAnswers: sortGroupedAnswersByStartDateAndCreatedAt(pastStatus),
  };
};

export const ScheduledCaseStatusContext = createContext({
  scheduledCaseStatusIdContext: caseStatusId,
  scheduledCaseContext: statefulScheduledCaseStatus,
});

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
        }))
        .value()
        .sort((a, b) => {
          return Date.parse(b.startDate) - Date.parse(a.startDate);
        });
};
