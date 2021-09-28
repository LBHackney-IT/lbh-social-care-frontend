import { Form } from '../forms.types';
import { format } from 'date-fns';
import { LookedAfterChildOptions } from 'types';

const form: Form = {
  id: 'case-status-edit',
  name: 'Edit/end case status',
  groupRecordable: false,
  isViewableByAdults: false,
  isViewableByChildrens: true,

  steps: [
    {
      id: 'endCaseStatus',
      name: 'End a status',
      theme: 'Case status',
      fields: [
        {
          id: 'endDate',
          question: 'End Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
        },
      ],
    },
    {
      id: 'endLACCaseStatus',
      name: 'End a status',
      theme: 'Case status',
      fields: [
        {
          id: 'endDate',
          question: 'End Date',
          type: 'date',
          required: true,
          className: 'govuk-input--width-10',
          default: format(new Date(), 'yyyy-MM-dd'),
        },
        {
          id: 'episodeReason',
          question: 'What is the reason for the episode ending?',
          type: 'select',
          required: true,
          choices: [
            {
              value: 'X1',
              label: LookedAfterChildOptions['X1'],
            },
            {
              value: 'E11',
              label: LookedAfterChildOptions['E11'],
            },
            {
              value: 'E12',
              label: LookedAfterChildOptions['E12'],
            },
            {
              value: 'E2',
              label: LookedAfterChildOptions['E2'],
            },
            {
              value: 'E3',
              label: LookedAfterChildOptions['E3'],
            },
            {
              value: 'E4A',
              label: LookedAfterChildOptions['E4A'],
            },
            {
              value: 'E4B',
              label: LookedAfterChildOptions['E4B'],
            },
            {
              value: 'E13',
              label: LookedAfterChildOptions['E13'],
            },
            {
              value: 'E41',
              label: LookedAfterChildOptions['E41'],
            },
            {
              value: 'E45',
              label: LookedAfterChildOptions['E45'],
            },
            {
              value: 'E46',
              label: LookedAfterChildOptions['E46'],
            },
            {
              value: 'E47',
              label: LookedAfterChildOptions['E47'],
            },
            {
              value: 'E48',
              label: LookedAfterChildOptions['E48'],
            },
            {
              value: 'E5',
              label: LookedAfterChildOptions['E5'],
            },
            {
              value: 'E6',
              label: LookedAfterChildOptions['E6'],
            },
            {
              value: 'E7',
              label: LookedAfterChildOptions['E7'],
            },
            {
              value: 'E9',
              label: LookedAfterChildOptions['E9'],
            },
            {
              value: 'E15',
              label: LookedAfterChildOptions['E15'],
            },
            {
              value: 'E16',
              label: LookedAfterChildOptions['E16'],
            },
            {
              value: 'E17',
              label: LookedAfterChildOptions['E17'],
            },
            {
              value: 'E8',
              label: LookedAfterChildOptions['E8'],
            },
          ],
        },
      ],
    },
  ],
};
export default form;
