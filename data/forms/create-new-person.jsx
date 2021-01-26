// @ts-ignore
import ETHNICITIES from 'data/ethnicities';

export default {
  title: 'Create New Person',
  path: '/form/create-new-person/',
  successMessage: 'New person created',
  steps: [
    {
      id: 'client-details',
      title: 'Client Details',
      components: [
        {
          conditionalRender: ({ user }) => !user.permissionFlag,
          component: 'Radios',
          name: 'ageGroup',
          label: 'Age Group',
          options: [
            { value: 'A', text: 'Adult' },
            { value: 'C', text: 'Child' },
          ],
          rules: { required: true },
        },
        { component: 'TextInput', name: 'title', width: '30', label: 'Title' },
        {
          component: 'TextInput',
          name: 'firstName',
          width: '30',
          label: 'First Name',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'lastName',
          width: '30',
          label: 'Last Name',
          rules: { required: true },
        },
        {
          component: 'Radios',
          name: 'gender',
          label: 'Gender',
          options: [
            { value: 'F', text: 'Female' },
            { value: 'M', text: 'Male' },
            { value: 'U', text: 'Unknown' },
            { value: 'I', text: 'Indeterminate' },
          ],
          rules: { required: true },
        },
        {
          component: 'DateInput',
          name: 'dateOfBirth',
          label: 'Date of Birth',
          hint: 'For example, 31 03 1980',
          rules: { required: true },
        },
        {
          component: 'NumberInput',
          name: 'nhsNumber',
          width: '30',
          label: 'NHS Number',
          hint: 'For example 0123456789',
          rules: { required: true },
        },
        {
          component: 'NationalityList',
          name: 'nationality',
          label: 'Nationality',
          rules: { required: true },
        },
        {
          component: 'Select',
          name: 'macroEthnicity',
          label: 'Ethnicity',
          options: Object.keys(ETHNICITIES),
        },
        {
          component: 'Select',
          name: 'ethnicity',
          label: 'Sub-ethnicity',
          options: ({ macroEthnicity }) => ETHNICITIES[macroEthnicity],
          conditionalRender: ({ macroEthnicity }) => macroEthnicity,
        },

        {
          component: 'AddressLookup',
          name: 'address',
          label: 'Address',
          rules: { required: true },
        },
      ],
    },
  ],
};
