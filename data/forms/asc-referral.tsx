import { FormStep } from 'components/Form/types';

const ROUTES = [
  'Planned Entry (Transition)',
  'Discharge from Hospital',
  'District Nurse',
  'Diversion from Hospital Services',
  'Self-funder with depleted funds',
  'Self-funder with depleted funds (of which previously provided with 12-week disregard or deferred payment)',
  'Community/Other route',
];

const ISSUES = [
  'Information and advice',
  'Hospital discharge',
  'Temporary illness',
  'Simple services',
  'Assessment',
  'Test/Investigations',
];

const TYPES = [
  'Self-referral',
  'Primary health',
  'Secondary health',
  'Family/ friends/ neighbour',
  'LA housing dept/ housing association',
  'Internal',
  'Other department of own or other LA',
  'Legal agency',
];

const steps: FormStep[] = [
  {
    id: 'referral-details-1',
    title: 'Referral details',
    components: [
      <p key="subtitle" className="govuk-body">
        Use this form to add referral details, perform assessment and next
        steps.
      </p>,
      <h3
        key="subtitle-1"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Referral information
      </h3>,
      {
        component: 'DateInput',
        name: 'dateReferred',
        label: 'Date referred',
        rules: { required: true },
      },
      {
        component: 'Select',
        name: 'contactMethod',
        label: 'Contact method',
        width: 20,
        placeHolder: 'Choose one',
        options: ['Email', 'Phone', 'Letter', 'Fax', 'Face to face'],
      },
      {
        component: 'Select',
        name: 'contactType',
        label: 'Contact type',
        width: 20,
        placeHolder: 'Choose one',
        options: TYPES,
        rules: { required: true },
      },
      <h3
        key="subtitle-2"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Referrer information
      </h3>,
      {
        component: 'TextInput',
        name: 'referrerName',
        width: 20,
        label: 'Referrer Name',
      },
      {
        component: 'TextInput',
        name: 'referrerRelationship',
        width: 20,
        label: 'Referrer relationship (to subject of Contact)',
      },
      {
        component: 'TextInput',
        name: 'organisation',
        width: 20,
        label: 'Referrer Organisation',
      },
      {
        component: 'AddressLookup',
        name: 'address',
        label: 'Address',
      },
      {
        component: 'EmailInput',
        name: 'emailAddress',
        width: 20,
        label: 'Referrer Email address',
      },
      {
        component: 'TextInput',
        name: 'telephone',
        width: 20,
        label: 'Referrer Telephone',
      },
      {
        component: 'TextInput',
        name: 'role',
        width: 20,
        label: 'Referrer role',
      },
      {
        component: 'Select',
        placeHolder: 'Choose one',
        name: 'route',
        width: 20,
        label: 'Route of Access',
        options: ROUTES,
        rules: { required: true },
      },
      {
        component: 'Select',
        placeHolder: 'Choose one',
        name: 'issues',
        label: 'Presenting Issue',
        options: ISSUES,
      },
    ],
  },
  {
    id: 'Assessment-2',
    title: 'Assessment details',
    components: [
      {
        component: 'TextArea',
        name: 'summary',
        label: 'Please summarise the information provided by the contact',
      },
      {
        component: 'Radios',
        name: 'awareOfContact',
        label: 'Is the subject aware of the contact?',
        options: ['Yes', 'No', 'Unknown'],
      },
      {
        component: 'Radios',
        name: 'adviceOffered',
        label: 'Was information and advice offered?',
        options: ['Yes', 'No'],
      },
    ],
  },
  {
    id: 'Assessment-3',
    title: 'Next steps',
    conditionalRender: ({ adviceOffered }) => adviceOffered === 'Yes',
    components: [
      {
        component: 'TextArea',
        name: 'detailsOfAdvice',
        label: 'Details of information and advice offered',
      },
      {
        component: 'TextArea',
        name: 'otherAgencies',
        label:
          'Please identify any other agencies that the person making contact has been referred to.',
      },
      <h3
        key="subtitle-3"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Consent
      </h3>,
      {
        component: 'Radios',
        name: 'consent',
        label:
          'I agree that this assessment may be shared as needed to support my care. I understand that any personal information could be shared on the basis that it is - Necessary for the purpose for which it is being shared - Shared only with those who have a need for it - Shared securely and in a timely way - Not kept for longer than necessary for the original purpose.',
        options: ['Yes', 'No', 'Unable to consent'],
        rules: { required: true },
      },
      <p key="consent-text" className="govuk-body govuk-!-margin-top-6">
        {`Please note information from this assessment may be shared regardless of
        your consent where there is a 'Vital Interest' i.e. where it is critical
        to prevent serious harm, distress or in life threatening situations`}
      </p>,
      {
        component: 'Radios',
        name: 'infoShared',
        label:
          'If client has not agreed consent, has information still to be shared?',
        options: ['No', 'Yes under duty of care'],
      },
      {
        component: 'TextArea',
        name: 'justification',
        label:
          'Justification for information to be shared outside of client consent',
      },
      {
        component: 'DateInput',
        name: 'DateAgreed',
        label: 'Date Agreed',
      },
      {
        component: 'Radios',
        name: 'safeguarding',
        label: 'Will this Contact lead to a Safeguarding Concern?',
        options: ['No', 'Yes'],
        rules: { required: true },
      },
      {
        conditionalRender: ({ safeguarding }) => safeguarding === 'Yes',
        component: 'Radios',
        name: 'whatNext',
        label: 'What next? ',
        rules: { required: true },
        options: [
          `Close Case /No Further Action`,
          'Proceed to further case activities',
        ],
      },
      {
        conditionalRender: ({ whatNext }) =>
          whatNext === 'Proceed to further case activities',
        component: 'Radios',
        name: 'nextActions',
        rules: { required: true },
        label:
          'Next actions (choose each of the actions which will happen directly).',
        options: [
          'Care Act Assessment',
          'Occupational Therapy',
          'Close Case',
          'No Further Action',
        ],
      },
      {
        conditionalRender: ({ nextActions }) =>
          nextActions === 'No Further Action',
        rules: { required: true },
        component: 'Radios',
        name: 'noAction',
        label: `If 'No Further Action' please pick one of the following`,
        options: [
          'Universal Services/ Signposted to other services',
          'No Services Provided - Deceased',
          'No Services Provided - other reason',
        ],
      },
    ],
  },
];

export default steps;
