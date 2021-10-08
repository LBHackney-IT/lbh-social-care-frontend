import {
  ChildProtectionCategoryOptions,
  LACLegalStatusOptions,
  LACPlacementTypeOptions,
} from 'types';

export enum CaseStatusFieldMapping {
  placementReason = 'Placement reason',
  category = 'Category of child protection plan',
  legalStatus = 'Legal status',
  placementType = 'Placement type',
}

export const CaseStatusSelectOptionLookup = (
  selectedOptionName: string,
  selectedOptionDescription: string,
  caseStatusField: string
): string => {
  let returnString = '';
  switch (caseStatusField) {
    case 'category':
      returnString =
        ChildProtectionCategoryOptions[
          selectedOptionName as keyof typeof ChildProtectionCategoryOptions
        ];
      break;
    case 'legalStatus':
      returnString =
        LACLegalStatusOptions[
          selectedOptionName as keyof typeof LACLegalStatusOptions
        ];
      break;
    case 'placementType':
      returnString =
        LACPlacementTypeOptions[
          selectedOptionName as keyof typeof LACPlacementTypeOptions
        ];
      break;
  }
  return returnString
    ? returnString
    : `${selectedOptionName}: ${selectedOptionDescription}`;
};
