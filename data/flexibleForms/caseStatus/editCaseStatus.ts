import { Form } from '../forms.types';
import { format } from 'date-fns';
import { LookedAfterChildOptions, ChildProtectionCategoryOptions } from 'types';

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
          choices: [
            {
              value: 'C1',
              label: ChildProtectionCategoryOptions['C1'],
            },
            {
              value: 'C2',
              label: ChildProtectionCategoryOptions['C2'],
            },
            {
              value: 'C3',
              label: ChildProtectionCategoryOptions['C3'],
            },
            {
              value: 'C4',
              label: ChildProtectionCategoryOptions['C4'],
            },
          ],
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
          choices: [
            {
              value: 'V4',
              label: LookedAfterChildOptions['V4'],
            },
            {
              value: 'V3',
              label: LookedAfterChildOptions['V3'],
            },
            {
              value: 'J2',
              label: LookedAfterChildOptions['J2'],
            },
            {
              value: 'L2',
              label: LookedAfterChildOptions['L2'],
            },
            {
              value: 'D1',
              label: LookedAfterChildOptions['D1'],
            },
            {
              value: 'C2',
              label: LookedAfterChildOptions['C2'],
            },
            {
              value: 'C1',
              label: LookedAfterChildOptions['C1'],
            },
            {
              value: 'J1',
              label: LookedAfterChildOptions['J1'],
            },
            {
              value: 'E1',
              label: LookedAfterChildOptions['E1'],
            },
            {
              value: 'J3',
              label: LookedAfterChildOptions['J3'],
            },
            {
              value: 'V2',
              label: LookedAfterChildOptions['V2'],
            },
            {
              value: 'L3',
              label: LookedAfterChildOptions['L3'],
            },
            {
              value: 'L1',
              label: LookedAfterChildOptions['L1'],
            },
            {
              value: 'W1',
              label: LookedAfterChildOptions['W1'],
            },
          ],
          required: false,
        },
        {
          id: 'placementReason',
          question: "What is the child's placement reason?",
          type: 'select',
          choices: [
            {
              value: 'S1',
              label: LookedAfterChildOptions['S1'],
            },
            {
              value: 'T0',
              label: LookedAfterChildOptions['T0'],
            },
            {
              value: 'R3',
              label: LookedAfterChildOptions['R3'],
            },
            {
              value: 'U2',
              label: LookedAfterChildOptions['U2'],
            },
            {
              value: 'U1',
              label: LookedAfterChildOptions['U1'],
            },
            {
              value: 'U3',
              label: LookedAfterChildOptions['U3'],
            },
            {
              value: 'K2',
              label: LookedAfterChildOptions['K2'],
            },
            {
              value: 'P2',
              label: LookedAfterChildOptions['P2'],
            },
            {
              value: 'R2',
              label: LookedAfterChildOptions['R2'],
            },
            {
              value: 'Z1',
              label: LookedAfterChildOptions['Z1'],
            },
          ],
        },
      ],
    },
  ],
};
export default form;
