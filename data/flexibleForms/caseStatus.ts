import { Form } from './forms.types';
import { format } from 'date-fns';

const form: Form = {
  id: 'case-status',
  name: 'Case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,

  steps: [
    {
      id: 'Case status',
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
              value: 'Child in need',
              label: 'Child in need',
            },
            {
              value: 'Child protection',
              label: 'Child protection',
            },
            {
              value: 'Looked after child',
              label: 'Looked after child',
            },
          ],
        },
        {
          id: 'reason for placement?',
          question:
            'What is the latest primary reason for placement? (Primary need code) *',
          type: 'select',
          required: true,
          conditions: [
            {
              id: 'Case Status Type',
              value: 'Child in need',
            },
          ],
          choices: [
            {
              value: 'N1 - Abuse or neglect',
              label: 'N1 - Abuse or neglect',
            },
            {
              value: 'N2 - Child’s disability',
              label: 'N2 - Child’s disability',
            },
            {
              value: 'N3 - Parental disability or illness',
              label: 'N3 - Parental disability or illness',
            },
            {
              value: 'N4 - Family in acute stress',
              label: 'N4 - Family in acute stress',
            },
            {
              value: 'N5 - Family dysfunction',
              label: 'N5 - Family dysfunction',
            },
            {
              value: 'N6 - Socially unacceptable behaviour',
              label: 'N6 - Socially unacceptable behaviour',
            },
            {
              value: 'N7 - Low income',
              label: 'N7 - Low income',
            },
            {
              value: 'N8 - Absent parenting',
              label: 'N8 - Absent parenting',
            },
            {
              value: 'N9 - Cases other than children in need',
              label: 'N9 - Cases other than children in need',
            },
            {
              value: 'N0 - Not stated',
              label: 'N0 - Not stated',
            },
          ],
        },
        {
          id: 'Start Date',
          question: 'Start Date',
          type: 'datetime',
          required: true,
          default: [
            format(new Date(), 'yyyy-MM-dd'),
            format(new Date(), 'HH:00'),
          ],
        },
        {
          id: 'End Date',
          question: 'End Date',
          type: 'datetime',
          required: true,
          default: [
            format(new Date(), 'yyyy-MM-dd'),
            format(new Date(), 'HH:00'),
          ],
        },
        {
          id: 'Notes',
          question: 'Notes',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
};
export default form;
