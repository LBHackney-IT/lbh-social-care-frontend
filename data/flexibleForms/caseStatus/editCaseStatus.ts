import { Form, Choice } from '../forms.types';
import { format } from 'date-fns';
import {
  LACLegalStatusOptions,
  LACPlacementTypeOptions,
  ChildProtectionCategoryOptions,
} from 'types';

const cp_options: Choice[] = [];
const lac_legal_status_options: Choice[] = [];
const lac_placement_reason_options: Choice[] = [];

Object.keys(ChildProtectionCategoryOptions).map((key) => {
  cp_options.push({
    value: key,
    label:
      ChildProtectionCategoryOptions[
        key as keyof typeof ChildProtectionCategoryOptions
      ],
  });
});
Object.keys(LACPlacementTypeOptions).map((key) => {
  lac_placement_reason_options.push({
    value: key,
    label: LACPlacementTypeOptions[key as keyof typeof LACPlacementTypeOptions],
  });
});
Object.keys(LACLegalStatusOptions).map((key) => {
  lac_legal_status_options.push({
    value: key,
    label: LACLegalStatusOptions[key as keyof typeof LACLegalStatusOptions],
  });
});

const form: Form = {
  id: 'case-status-edit',
  name: 'Edit/end case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,

  steps: [
    {
      id: 'editCINCaseStatus',
      name: 'Edit a status',
      theme: 'Case status',
      fields: [
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'notes',
          question: 'Notes',
          type: 'textarea',
          required: false,
        },
      ],
    },
    {
      id: 'editCPCaseStatus',
      name: 'Edit a status',
      theme: 'Case status',
      fields: [
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'category',
          question: 'Category of child protection plan',
          required: true,
          type: 'radios',
          default: 'C1',
          choices: cp_options,
        },
      ],
    },
    {
      id: 'editLACCaseStatus',
      name: 'Edit a status',
      theme: 'Case status',
      fields: [
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'legalStatus',
          question: "What is the child's legal status?",
          type: 'select',
          choices: lac_legal_status_options,
          required: false,
        },
        {
          id: 'placementReason',
          question: "What is the child's placement reason?",
          type: 'select',
          choices: lac_placement_reason_options,
        },
      ],
    },
  ],
};
export default form;
