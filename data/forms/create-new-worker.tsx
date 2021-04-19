import { FormConfig, Option } from 'components/Form/types';

import { ASCRoles, CSFRoles } from 'data/roles';

const formConfig: FormConfig = {
  title: 'Create New Worker',
  path: '/workers/add/',
  successMessage: 'New worker created',
  steps: [
    {
      id: 'worker-details',
      title: 'Worker Details',
      components: [
        <h3
          key="subtitle-details"
          className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
        >
          Worker details
        </h3>,
        {
          component: 'EmailInput',
          name: 'emailAddress',
          width: 20,
          label: 'Email address',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'firstName',
          width: 20,
          label: 'First Name',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'lastName',
          width: 20,
          label: 'Last Name',
          rules: { required: true },
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
          rules: { required: true },
        },
      ],
    },
  ],
};

export default formConfig;
