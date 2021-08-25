import { Form } from './forms.types';
const choices = [
  {
    value: 'CIN - Child in Need',
    label: 'CIN - Child in Need',
  },
  {
    value: 'CP - Child Protection',
    label: 'CP - Child Protection',
  },
  {
    value: 'LAC - Looked After Child',
    label: 'LAC - Looked After Child',
  },
];

const form: Form = {
  id: 'case-status',
  name: 'Flag a case status',
  isViewableByChildrens: true,
  isViewableByAdults: false,
  approvable: false,
  panelApprovable: false,
  steps: [
    {
      id: 'case status types',
      name: 'What is the case status you would like to add?',
      theme: 'flag case status',
      fields: [
        {
          id: 'flag case status',
          type: 'radios',
          question: 'Child protection',
          choices,
          required: true,
        },
      ],
    },
  ],
};
//   {
//     name: 'reason for placement?',
//     label:
//       'What is the latest primary reason for placement? (Primary need code) *',
//     component: 'Select',
//     required: true,
//     conditionalRender: ({ case_status_type }) =>
//       case_status_type?.includes('Child in need'),
//     options: [
//       {
//         value: 'N1 - Abuse or neglect',
//         text: 'N1 - Abuse or neglect',
//       },
//       {
//         value: 'N2 - Child’s disability',
//         text: 'N2 - Child’s disability',
//       },
//       {
//         value: 'N3 - Parental disability or illness',
//         text: 'N3 - Parental disability or illness',
//       },
//       {
//         value: 'N4 - Family in acute stress',
//         text: 'N4 - Family in acute stress',
//       },
//       {
//         value: 'N5 - Family dysfunction',
//         text: 'N5 - Family dysfunction',
//       },
//       {
//         value: 'N6 - Socially unacceptable behaviour',
//         text: 'N6 - Socially unacceptable behaviour',
//       },
//       {
//         value: 'N7 - Low income',
//         text: 'N7 - Low income',
//       },
//       {
//         value: 'N8 - Absent parenting',
//         text: 'N8 - Absent parenting',
//       },
//       {
//         value: 'N9 - Cases other than children in need',
//         text: 'N9 - Cases other than children in need',
//       },
//       {
//         value: 'N0 - Not stated',
//         text: 'N0 - Not stated',
//       },
//     ],
//   },
//   {
//     component: 'DatePicker',
//     name: 'Start Date',
//     label: 'Start Date',
//     hint: 'For example, 31 03 1980',
//     rules: { required: 'Please provide a valid date.' },
//     defaultToday: true,
//   },
//   {
//     component: 'DatePicker',
//     name: 'End Date',
//     label: 'End Date',
//     hint: 'For example, 31 03 1980',
//     rules: { required: 'Please provide a valid date.' },
//     defaultToday: true,
//   },
//   {
//     name: 'Notes',
//     label: 'Notes',
//     component: 'TextArea',
//     required: false,
//   },

export default form;
