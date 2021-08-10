import { FormStep } from 'components/Form/types';

const formSteps: FormStep[] = [
  {
    id: 'case-status',
    title: 'Case status',
    components: [
      <h2
        key="case-status"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Add case status
      </h2>,
      {
        name: 'Case Status Type',
        label: 'What is the case status you would like to add?',
        component: 'Radios',
        required: false,
        options: ['Child in need', 'Child protection', 'Looked after child'],
      },
      {
        name: 'reasonForPlacement?',
        label:
          'What is the latest primary reason for placement? (Primary need code) *',
        component: 'Select',
        required: true,
        options: [
          'N1 - Abuse or neglect',
          'N2 - Child’s disability',
          'N3 - Parental disability or illness',
          'N4 - Family in acute stress',
          'N5 - Family dysfunction',
          'N6 - Socially unacceptable behaviour',
          'N7 - Low income',
          'N8 - Absent parenting',
          'N9 - Cases other than children in need',
          'N0 - Not stated',
        ],
      },
      {
        name: 'startDate',
        label: 'Start Date',
        component: 'DatePicker',
        required: true,
      },

      {
        name: 'endDate',
        label: 'End Date',
        component: 'DatePicker',
        required: true,
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

export default formSteps;
