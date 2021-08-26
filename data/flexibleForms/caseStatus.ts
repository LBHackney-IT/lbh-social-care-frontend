import { Form } from './forms.types';
import { format } from 'date-fns';
import { GetFormValues } from 'utils/api/caseStatus';

const { data: { fields: caseStatuses } = {} } = GetFormValues('CIN');

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
          id: 'Case Status Type',
          question: 'What is the case status you would like to add?',
          type: 'radios',
          required: false,
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
          id: 'reasonForPlacement',
          question:
            'What is the latest primary reason for placement? (Primary need code) *',
          type: 'select',
          required: true,
          conditions: [
            {
              id: 'caseStatusType',
              value: 'Child in need',
            },
          ],
          choices: [
            {
              value: 'N1',
              label: 'N1 - Abuse or neglect',
            },
            {
              value: 'N2',
              label: 'N2 - Child’s disability',
            },
            {
              value: 'N3',
              label: 'N3 - Parental disability or illness',
            },
            {
              value: 'N4',
              label: 'N4 - Family in acute stress',
            },
            {
              value: 'N5',
              label: 'N5 - Family dysfunction',
            },
            {
              value: 'N6',
              label: 'N6 - Socially unacceptable behaviour',
            },
            {
              value: 'N7',
              label: 'N7 - Low income',
            },
            {
              value: 'N8',
              label: 'N8 - Absent parenting',
            },
            {
              value: 'N9',
              label: 'N9 - Cases other than children in need',
            },
            {
              value: 'N0',
              label: 'N0 - Not stated',
            },
          ],
        },
        {
          id: 'startDate',
          question: 'Start Date',
          type: 'datetime',
          required: true,
          default: [
            format(new Date(), 'yyyy-MM-dd'),
            format(new Date(), 'HH:00'),
          ],
        },
        {
          id: 'endDate',
          question: 'End Date',
          type: 'datetime',
          required: true,
          default: [
            format(new Date(), 'yyyy-MM-dd'),
            format(new Date(), 'HH:00'),
          ],
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
