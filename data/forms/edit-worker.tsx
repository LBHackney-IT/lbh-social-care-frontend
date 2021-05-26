import { FormStep, Option } from 'components/Form/types';

import { ASCRoles, CSFRoles } from 'data/roles';

const formSteps: FormStep[] = [
  {
    id: 'worker-details',
    title: 'Worker Details',
    components: [
      <h2
        key="subtitle-details"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Worker details
      </h2>,
      {
        component: 'TextInput',
        name: 'firstName',
        width: 20,
        label: 'First Name',
        rules: { required: 'Please add a first name.' },
      },
      {
        component: 'TextInput',
        name: 'lastName',
        width: 20,
        label: 'Last Name',
        rules: { required: 'Please add a last name.' },
      },
      {
        component: 'Radios',
        name: 'contextFlag',
        label: 'Which main service is the worker in?',
        options: [
          { value: 'A', text: 'ASC' },
          { value: 'C', text: 'CFS' },
        ],
        rules: { required: true },
      },
      {
        component: 'Select',
        placeHolder: 'Choose one',
        name: 'team',
        label: 'Team',
        width: 20,
        rules: { required: true },
        options: ({ teams, contextFlag }: any) => teams && teams[contextFlag],
      },
      {
        conditionalRender: ({ contextFlag }) => contextFlag,
        component: 'Autocomplete',
        placeholder: 'Select a role',
        name: 'role',
        label: 'Role',
        width: 20,
        rules: { required: true },
        options: ({ contextFlag }) =>
          (contextFlag === 'A' ? ASCRoles : CSFRoles) as Option[],
      },
      {
        component: 'DateInput',
        name: 'dateStart',
        label: 'Date Started',
        rules: { required: 'Please add a valid date.' },
      },
    ],
  },
];

export default formSteps;
