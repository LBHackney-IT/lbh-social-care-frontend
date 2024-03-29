import {
  CaseStatus,
  CaseStatusFields,
  ChildProtectionCategoryOptions,
  LACLegalStatusOptions,
  LACPlacementTypeOptions,
  LACReasonsForEpisodeEndOptions,
  CaseStatusAnswerDisplay,
} from 'types';
import _ from 'lodash';

export enum CaseStatusOptionMapping {
  placementReason = 'Placement reason',
  category = 'Category of child protection plan',
  legalStatus = 'Legal status',
  placementType = 'Placement type',
  episodeReason = 'Reason for episode end',
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
    case 'episodeReason':
      returnString =
        LACReasonsForEpisodeEndOptions[
          caseStatusAnswerValue as keyof typeof LACReasonsForEpisodeEndOptions
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

  let groupedAnswers = groupAnswersByGroupId(caseStatuses.answers);
  let episodeReasonGroup: CaseStatusFields | undefined = undefined;

  if (caseStatuses.type === 'CIN') {
    if (groupedAnswers && groupedAnswers.length > 1) {
      currentStatus = [groupedAnswers[0]];
    } else {
      currentStatus = groupedAnswers;
    }
  } else if (groupedAnswers && groupedAnswers[0]) {
    groupedAnswers.forEach((group) => {
      if (
        group.status.length == 1 &&
        group.status[0].option == 'episodeReason'
      ) {
        if (groupedAnswers) {
          groupedAnswers = groupedAnswers.filter(function (item) {
            return item !== group;
          });
        }
        episodeReasonGroup = group.status[0];
      }
    });
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

    if (episodeReasonGroup && episodeReasonGroup !== undefined) {
      if (scheduledStatus && scheduledStatus.length > 0) {
        scheduledStatus[0].status.push(episodeReasonGroup);
      } else if (currentStatus) {
        currentStatus[0].status.push(episodeReasonGroup);
      }
    }
  }

  return {
    currentStatusAnswers: currentStatus,
    scheduledStatusAnswers: scheduledStatus,
    pastStatusAnswers: pastStatus,
  };
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
          if (a.startDate === b.startDate && a.createdAt && b.createdAt) {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
          }
          return Date.parse(b.startDate) - Date.parse(a.startDate);
        });
};

export const getLatestEndedStatusEndDate = (
  caseStatusIncludingEnded: CaseStatus[] | undefined
): string | undefined => {
  if (caseStatusIncludingEnded) {
    let latestEndDate: string;
    const endedCaseData = caseStatusIncludingEnded.filter(
      (status) => status.endDate
    );
    if (endedCaseData && endedCaseData.length > 0) {
      latestEndDate = endedCaseData[0].endDate;
      endedCaseData.forEach((status) => {
        if (Date.parse(status.endDate) > Date.parse(latestEndDate)) {
          latestEndDate = status.endDate;
        }
      });
      return latestEndDate;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
