import { Form } from './forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'case-status',
  name: 'Case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,
  canonicalUrl: (socialCareId) => `/people/${socialCareId}/case-status/add`,

  steps: [
    {
      id: 'caseStatus',
      name: 'Add case status',
      theme: 'Case status',
      fields: [
        {
          id: 'caseStatusType',
          question: 'What is the case status you would like to add?',
          type: 'radios',
          required: false,
          choices: [
            {
              value: 'CIN',
              label: 'Child in need',
            },
          ],
        },
        {
          id: 'reasonForPlacement',
          question:
            'What is the latest primary reason for placement? (Primary need code)',
          type: 'select',
          required: true,
          conditions: [
            {
              id: 'caseStatusType',
              value: 'CIN',
            },
          ],
        },
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
        },
        {
          id: 'notes',
          question: 'Notes',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
};
export default form;
