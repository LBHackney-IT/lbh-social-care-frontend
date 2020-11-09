import FormWizard from 'components/FormWizard/FormWizard';

import CaseNotes from 'components/Steps/case-notes';

const FORM_PATH = '/form/adult-referral/';
const FORM_STEPS = [
  {
    id: 'client-details',
    title: 'Client Details',
    components: [
      {
        component: 'DateInput',
        name: 'dateOfContact',
        label: 'Date of contact',
        rules: { required: true },
        hint: 'For example, 31 03 1980',
      },
      {
        component: 'TextInput',
        name: 'mosaic_id',
        width: '30',
        label: 'Mosaic ID Number',
        hint: 'For example 0123456789',
        rules: { required: true },
      },
      {
        component: 'TextInput',
        name: 'nhsNumber',
        width: '30',
        label: 'NHS Number',
        hint: 'For example 0123456789',
      },
      { component: 'TextInput', name: 'title', width: '30', label: 'Title' },
      {
        component: 'TextInput',
        name: 'lastName',
        width: '30',
        label: 'Surname',
        rules: { required: true },
      },
      {
        component: 'TextInput',
        name: 'firstName',
        width: '30',
        label: 'First Name',
        rules: { required: true },
      },
      {
        component: 'TextInput',
        name: 'otherNames',
        width: '30',
        label: 'Other Names',
      },
      {
        component: 'DateInput',
        name: 'dateOfBirth',
        label: 'Date of Birth',
        hint: 'For example, 31 03 1980',
        rules: { required: true },
      },
      {
        component: 'NationalityList',
        name: 'nationality',
        label: 'Nationality',
        rules: { required: true },
      },
      {
        component: 'Radios',
        name: 'gender',
        label: 'Gender',
        options: ['Female', 'Male', 'Unknown', 'Other'],
        rules: { required: true },
      },
      {
        component: 'TextInput',
        name: 'addressLine1',
        width: '30',
        label: 'Primary Address',
        rules: { required: true },
      },
      {
        component: 'TextInput',
        name: 'postCode',
        width: '30',
        label: 'Post Code',
        rules: { required: true },
      },
      {
        component: 'TextInput',
        name: 'phone',
        width: '30',
        label: 'Phone Number',
      },
    ],
  },
  {
    id: 'referral-details',
    title: 'Referral Details',
    components: [
      {
        component: 'TextInput',
        name: 'referrerName',
        width: '30',
        label: 'Referrer Name',
      },
      {
        component: 'TextInput',
        name: 'referrerRelationship',
        width: '30',
        label: 'Referrer relationship',
      },
      {
        component: 'TextInput',
        name: 'referrerOrganisation',
        width: '30',
        label: 'Referrer Organisation',
      },
      {
        component: 'TextInput',
        name: 'referrerEmail',
        width: '30',
        label: 'Referrer Email',
      },
      {
        component: 'TextInput',
        name: 'referrerTelephone',
        width: '30',
        label: 'Referrer Telephone',
      },
      {
        component: 'TextInput',
        name: 'referrerRole',
        width: '30',
        label: 'Referrer Role',
      },
      {
        component: 'DateInput',
        name: 'contactDate',
        label: 'Contact Date',
        hint: 'For example, 31 03 1980',
      },
      {
        component: 'Select',
        name: 'contactMethod',
        label: 'Contact Method',
        options: ['Email', 'Phone', 'Mail', 'Face to Face'],
      },
      {
        component: 'Select',
        name: 'contactType',
        label: 'Contact Type',
        options: [
          'Self-referral',
          'Professional referral',
          'Third party referral',
          'Other',
        ],
      },
      {
        component: 'TextInput',
        name: 'otherContact',
        width: '30',
        label: 'Detail if Other',
      },
      {
        component: 'Radios',
        name: 'routeAccess',
        label: 'Route of Access',
        options: [
          'Planned Entry (Transition)',
          'Discharge from Hospital',
          'Diversion from Hospital Services',
          'Self-funder with depleted funds',
          'Self-funder with depleted funds (of which previously provided with 12-week disregard or deferred payment)',
          'Community/Other route',
        ],
      },
      {
        component: 'Radios',
        name: 'presentingIssue',
        label: 'Presenting Issue',
        options: ['Female', 'Male', 'Unknown', 'Other'],
      },
      {
        component: 'Radios',
        name: 'presentingIssue',
        label: 'Presenting Issue',
        options: [
          'Information and advice',
          'Hospital discharge',
          'Temporary illness',
          'Simple services',
          'Assessment',
          'Test/Investigations',
        ],
      },
    ],
  },
  { id: 'case-notes', component: CaseNotes, title: 'Case Notes' },
];

const AdultReferral = () => (
  <FormWizard
    formPath={FORM_PATH}
    formSteps={FORM_STEPS}
    title="Create New Record"
  />
);

export default AdultReferral;
