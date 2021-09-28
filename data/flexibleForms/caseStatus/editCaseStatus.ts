import { Form } from '../forms.types';
import { format } from 'date-fns';
import { CaseStatusMapping } from 'types';

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
          choices: [
            {
              value: 'neglect',
              label: CaseStatusMapping['neglect'],
            },
            {
              value: 'physical_abuse',
              label: CaseStatusMapping['physical_abuse'],
            },
            {
              value: 'emotional_abuse',
              label: CaseStatusMapping['emotional_abuse'],
            },
            {
              value: 'sexual_abuse',
              label: CaseStatusMapping['sexual_abuse'],
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
              label: CaseStatusMapping['V4'],
            },
            {
              value: 'V3',
              label: CaseStatusMapping['V3'],
            },
            {
              value: 'J2',
              label: CaseStatusMapping['J2'],
            },
            {
              value: 'L2',
              label: CaseStatusMapping['L2'],
            },
            {
              value: 'D1',
              label: CaseStatusMapping['D1'],
            },
            {
              value: 'C2',
              label: CaseStatusMapping['C2'],
            },
            {
              value: 'C1',
              label: CaseStatusMapping['C1'],
            },
            {
              value: 'J1',
              label: CaseStatusMapping['J1'],
            },
            {
              value: 'E1',
              label: CaseStatusMapping['E1'],
            },
            {
              value: 'J3',
              label: CaseStatusMapping['J3'],
            },
            {
              value: 'V2',
              label: CaseStatusMapping['V2'],
            },
            {
              value: 'L3',
              label: CaseStatusMapping['L3'],
            },
            {
              value: 'L1',
              label: CaseStatusMapping['L1'],
            },
            {
              value: 'W1',
              label: CaseStatusMapping['W1'],
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
              label: CaseStatusMapping['S1'],
            },
            {
              value: 'T0',
              label: CaseStatusMapping['T0'],
            },
            {
              value: 'R3',
              label: CaseStatusMapping['R3'],
            },
            {
              value: 'U2',
              label: CaseStatusMapping['U2'],
            },
            {
              value: 'U1',
              label: CaseStatusMapping['U1'],
            },
            {
              value: 'U3',
              label: CaseStatusMapping['U3'],
            },
            {
              value: 'K2',
              label: CaseStatusMapping['K2'],
            },
            {
              value: 'P2',
              label: CaseStatusMapping['P2'],
            },
            {
              value: 'R2',
              label: CaseStatusMapping['R2'],
            },
            {
              value: 'Z1',
              label: CaseStatusMapping['Z1'],
            },
          ],
        },
      ],
    },
  ],
};
export default form;
