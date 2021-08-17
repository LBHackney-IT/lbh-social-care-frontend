import { FormStep } from 'components/Form/types';

const steps: FormStep[] = [
  {
    id: 'case-status',
    title: 'Case status',
    components: [
      {
        name: 'case_status_type',
        label: 'What is the case status you would like to add?',
        component: 'Radios',
        required: false,
        options: [
          {
            value: 'Child in need',
            text: 'Child in need',
          },
          {
            value: 'Child protection',
            text: 'Child protection',
          },
          {
            value: 'Looked after child',
            text: 'Looked after child',
          },
        ],
      },
      {
        name: 'reason for placement?',
        label:
          'What is the latest primary reason for placement? (Primary need code) *',
        component: 'Select',
        required: true,
        conditionalRender: ({ case_status_type }) =>
          case_status_type?.includes('Child in need'),
        options: [
          {
            value: 'N1 - Abuse or neglect',
            text: 'N1 - Abuse or neglect',
          },
          {
            value: 'N2 - Child’s disability',
            text: 'N2 - Child’s disability',
          },
          {
            value: 'N3 - Parental disability or illness',
            text: 'N3 - Parental disability or illness',
          },
          {
            value: 'N4 - Family in acute stress',
            text: 'N4 - Family in acute stress',
          },
          {
            value: 'N5 - Family dysfunction',
            text: 'N5 - Family dysfunction',
          },
          {
            value: 'N6 - Socially unacceptable behaviour',
            text: 'N6 - Socially unacceptable behaviour',
          },
          {
            value: 'N7 - Low income',
            text: 'N7 - Low income',
          },
          {
            value: 'N8 - Absent parenting',
            text: 'N8 - Absent parenting',
          },
          {
            value: 'N9 - Cases other than children in need',
            text: 'N9 - Cases other than children in need',
          },
          {
            value: 'N0 - Not stated',
            text: 'N0 - Not stated',
          },
        ],
      },
      {
        component: 'DatePicker',
        name: 'Start Date',
        label: 'Start Date',
        hint: 'For example, 31 03 1980',
        rules: { required: 'Please provide a valid date.' },
        defaultToday: true,
      },
      {
        component: 'DatePicker',
        name: 'End Date',
        label: 'End Date',
        hint: 'For example, 31 03 1980',
        rules: { required: 'Please provide a valid date.' },
        defaultToday: true,
      },
      {
        name: 'Notes',
        label: 'Notes',
        component: 'TextArea',
        required: false,
      },
    ],
  },
];

export default steps;
