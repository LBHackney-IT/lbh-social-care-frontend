import { Form } from '../forms.types';
import { format } from 'date-fns';
import { ChildProtectionCategoryOptions } from 'types';

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
          required: true,
        },
      ],
    },
  ],
};
export default form;
