import { Form, Choice } from '../forms.types';
import { format } from 'date-fns';
import { LACPlacementTypeOptions, LACLegalStatusOptions } from 'types';

const lac_legal_status_options: Choice[] = [];
const lac_placement_type_options: Choice[] = [];

Object.keys(LACLegalStatusOptions).map((key) => {
  lac_legal_status_options.push({
    value: key,
    label: LACLegalStatusOptions[key as keyof typeof LACLegalStatusOptions],
  });
});

Object.keys(LACPlacementTypeOptions).map((key) => {
  lac_placement_type_options.push({
    value: key,
    label: LACPlacementTypeOptions[key as keyof typeof LACPlacementTypeOptions],
  });
});

const form: Form = {
  id: 'case-status',
  name: 'Case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,
  canonicalUrl: (socialCareId) => `/people/${socialCareId}/case-status/edit`,

  steps: [
    {
      id: 'caseStatus',
      name: 'Flag a status',
      theme: 'Case status',
      fields: [
        {
          id: 'type',
          question: 'What is the case status you would like to add?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'CIN',
              label: 'Child in need',
            },
            {
              value: 'CP',
              label: 'Child protection',
            },
            {
              value: 'LAC',
              label: 'Looked after child',
            },
          ],
        },
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          conditions: [
            {
              id: 'type',
              value: 'CIN',
            },
          ],
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'notes',
          question: 'Notes',
          conditions: [
            {
              id: 'type',
              value: 'CIN',
            },
          ],
          type: 'textarea',
          required: false,
        },
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          conditions: [
            {
              id: 'type',
              value: 'CP',
            },
          ],
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'category',
          question: 'Category of child protection plan',
          type: 'radios',
          conditions: [
            {
              id: 'type',
              value: 'CP',
            },
          ],
          choices: [
            {
              value: 'C1',
              label: 'Neglect',
            },
            {
              value: 'C2',
              label: 'Physical abuse',
            },
            {
              value: 'C3',
              label: 'Emotional abuse',
            },
            {
              value: 'C4',
              label: 'Sexual abuse',
            },
          ],
          required: true,
        },
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          conditions: [
            {
              id: 'type',
              value: 'LAC',
            },
          ],
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
          isfutureDateValid: false,
        },
        {
          id: 'legalStatus',
          question: "What is the child's legal status?",
          type: 'select',
          conditions: [
            {
              id: 'type',
              value: 'LAC',
            },
          ],
          choices: lac_legal_status_options,
          required: true,
        },
        {
          id: 'placementType',
          question: 'What is the placement type?',
          type: 'select',
          conditions: [
            {
              id: 'type',
              value: 'LAC',
            },
          ],
          choices: lac_placement_type_options,
          required: true,
        },
      ],
    },
  ],
};
export default form;
