import { FormStep } from 'components/Form/types';

const PROFESSIONALS = [
  'GP',
  'Modern Matron',
  'District Nurse',
  'Secondary Health (Hospital)',
  'Secondary Health (ACRT)',
  'OT',
  'Social Worker',
  'Sensory',
  'Speech and Language Therapist',
  'Alcohol and Drug Services',
  'Children Services',
  'Mental Health Services',
  'LBH Housing Services',
  'Non-LBH Housing Services',
  'Voluntary and community sector',
  'Other',
];

const steps: FormStep[] = [
  {
    id: 'case-notes-recording',
    title: 'Case notes recording',
    components: [
      {
        component: 'TextInput',
        name: 'address_tenure_type',
        width: 30,
        label: 'Primary address tenure type',
      },
      {
        component: 'TextInput',
        name: 'address_household_structure',
        width: 30,
        label: 'Household Structure',
      },
      <h3
        key="key contacts"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Your Key Contacts
      </h3>,
      {
        component: 'TextInput',
        name: 'contact_name',
        width: 30,
        label: 'Contact Name',
      },
      {
        component: 'TextInput',
        name: 'contact_relationship',
        width: 30,
        label: 'Contact Relationship/Role',
      },
      {
        component: 'AddressLookup',
        name: 'contact_address',
        label: 'Contact Address',
      },
      {
        component: 'ObjectInput',
        name: 'contact_phoneNumbers',
        label: 'Contact Phone number',
        isInline: true,
        isMulti: true,
        isMultiTrigger: '+ Add additional phone number',
        summaryInline: true,
        components: [
          {
            component: 'PhoneInput',
            name: 'number',
            label: 'Phone number',
          },
          {
            component: 'TextInput',
            name: 'type',
            label: 'Phone type',
            placeholder: 'home',
          },
        ],
      },
      {
        component: 'EmailInput',
        name: 'contact_emailAddress',
        width: 20,
        label: 'Contact Email address',
      },
      <h3
        key="communication"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Communication
      </h3>,
      {
        component: 'Radios',
        name: 'fluent_in_english',
        label: 'Fluency In English',
        options: [
          { value: 'Y', text: 'Good both written and spoken' },
          { value: 'N', text: 'Not fluent' },
        ],
      },
      {
        component: 'TextInput',
        name: 'preferred_language',
        width: 30,
        label: 'First/Preferred Language',
      },
      {
        component: 'Radios',
        name: 'interpreter_required',
        label: 'Interpreter Required',
        isRadiosInline: true,
      },
      {
        component: 'Radios',
        name: 'communication_difficulties',
        label: 'Do you have communication difficulties?',
        isRadiosInline: true,
      },
      {
        component: 'Radios',
        name: 'understanding_difficulties',
        label:
          'Do you have any difficulties with understanding and/or retaining information?',
        isRadiosInline: true,
      },
      {
        component: 'Radios',
        name: 'decisions_difficulties',
        label:
          'Do you have any difficulties making decisions and/or understanding their impact?',
        isRadiosInline: true,
      },
      {
        component: 'TextArea',
        name: 'further_details',
        label: 'Further Details',
      },
      <h3
        key="about you"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        About You
      </h3>,
      {
        component: 'TextArea',
        name: 'about_me',
        label: 'About Me',
        hint:
          'Areas of my life I enjoy most or value (including my main interests and where I can most contribute) & Changes that would improve my wellbeing or quality of life',
      },
      {
        component: 'TextArea',
        name: 'workers_reccomendations',
        label: 'Workers recommendations',
        hint: 'What resources, support was recommended and outcome',
      },
      {
        component: 'Checkbox',
        name: 'next_actions',
        label: 'Next Actions',
        options: [
          'Community Care Assessment - Occupational Therapy',
          'No Further Action',
          'Close Case',
        ],
      },
      {
        component: 'Radios',
        name: 'initial_assessment',
        label: 'Initial Contact Assessment',
        options: [
          'Long Term Community Support',
          'Short Term Community Support',
          'Universal Service',
          'No Support Provided',
        ],
      },
      <h3
        key="carer details"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Carer Details
      </h3>,
      {
        component: 'Radios',
        name: 'recevied_support_from_carer',
        label: 'Do you receive support from a Carer? (informal / unpaid)',
        isRadiosInline: true,
      },
      <h3
        key="completed by"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Completed By
      </h3>,
      <div key="subsection">
        <div className="govuk-body govuk-!-font-weight-bold">
          Current session login details
        </div>
        <div>
          Please use &#39;Find Lead Worker&#39; below to select the &#39;Lead
          Conversation Officer&#39;. If you are the Lead Officer then do this
          working as yourself (i.e. NOT whilst Acting For someone else).
        </div>
        <div>
          Alternatively you may Act For the Lead Officer then &#39;Find&#39;
          them below and tick to sign on their behalf.
        </div>
      </div>,
      {
        component: 'TextInput',
        name: 'statement',
        hint:
          'As this Is G-form version of C1 please state whether you are the "Lead Conversation Officer". And if not please state "Acting For someone else"',
      },
      {
        component: 'Checkbox',
        name: 'professional_involved',
        label: 'Other professionals involved',
        options: PROFESSIONALS,
      },
      {
        component: 'TextInput',
        name: 'other_form_name_details',
        width: 30,
        label: "Details if 'Other'",
        conditionalRender: ({ professional_involved }) =>
          professional_involved === 'Other',
      },
    ],
  },
];

export default steps;
