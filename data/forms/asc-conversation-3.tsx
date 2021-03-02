import TENURETYPES from 'data/tenureTypes';
import SUPPORTREASON from 'data/supportReason';

const steps = [
  {
    id: 'Conversation3',
    title: '/form/conversation-3/',
    components: [
      {
        id: 'record-of-conversation-1',
        title: 'Record of Conversation',
        components: [
          {
            component: 'DatePicker',
            name: 'start_date_of_conversation_3',
            label: 'Start Date of Conversation 3',
            rules: { required: true },
          },
          <h3
            key="person details"
            className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
          >
            Person Details
          </h3>,
          {
            component: 'NumberInput',
            name: 'emergency_id',
            label: 'Emergency ID (ASC)',
            width: '10',
            hint:
              '(Find or create an emergency ID number for this person in the list of numbers provided to your team, and enter it here)',
          },
          {
            component: 'Select',
            name: 'primary_address_tenure_type',
            label: 'Primary Address Tenure Type',
            options: TENURETYPES,
          },
          {
            component: 'Radios',
            name: 'household_structure',
            label: 'Household Structure',
            options: ['Lives alone', 'Lives with Others', 'Unknown'],
          },
          <h3
            key="key contacts"
            className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
          >
            Key Contacts
          </h3>,
          {
            component: 'TextInput',
            name: 'list_key_contacts',
            width: '30',
            label: 'List your key contacts',
            hint:
              "(Include 'Name', 'Relationship/Role', 'Address and Contact Details' for each individual that would appear in the Key Contacts table)",
          },
          {
            component: 'TextInput',
            name: 'gp_name',
            width: '30',
            label: 'GP Name',
          },
          {
            component: 'TextInput',
            name: 'gp_practice',
            width: '30',
            label: 'GP Practice',
          },
          {
            component: 'TextInput',
            name: 'gp_address',
            width: '30',
            label: 'GP Address',
          },
          {
            component: 'PhoneInput',
            name: 'gp_phone',
            width: '30',
            label: 'GP Telephone',
          },
          {
            component: 'EmailInput',
            name: 'gp_email',
            width: '30',
            label: 'GP Email',
          },
          {
            component: 'Radios',
            name: 'person_assessed',
            label:
              'Has this person been assessed by Hackney adult social care before?',
            options: ['Yes', 'No', 'Not known'],
            rules: { required: true },
          },
          <h3
            key="support reasons"
            className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
          >
            Support Reasons
          </h3>,
          {
            component: 'Select',
            name: 'primary_support_reason',
            label: 'Primary Support Reason',
            options: SUPPORTREASON,
          },
        ],
      },
      {
        id: 'communication-2',
        title: 'Communication',
        components: [
          {
            component: 'TextInput',
            name: 'preferred_contact',
            width: '30',
            label: 'Preferred method of contact',
          },
          {
            component: 'TextInput',
            name: 'fluency_english',
            width: '30',
            label: 'Fluency in English',
          },
          {
            component: 'TextInput',
            name: 'first_preferred_language',
            width: '30',
            label: 'First/preferred language',
          },
          {
            component: 'Radios',
            name: 'interpreter_required',
            label: 'Interpreter required?',
            options: ['Yes', 'No'],
          },
          {
            component: 'Radios',
            name: 'communication_difficulties',
            label: 'Do you have communication difficulties?',
            options: ['Yes', 'No'],
          },
          {
            component: 'Radios',
            name: 'understanding_difficulties',
            label:
              'Do you have any difficulties with understanding and/or retaining information?',
            options: ['Yes', 'No'],
          },
          {
            component: 'Radios',
            name: 'decision_impact_diffiulties',
            label:
              'Do you have any difficulties making decisions and/or understanding their impact?',
            options: ['Yes', 'No'],
          },
          {
            component: 'TextArea',
            name: 'communication_further_details',
            label: 'Further Details (Communication)',
          },
        ],
      },
      {
        id: 'supporting-assessment-3',
        title: 'Supporting you in your assessment',
        components: [
          {
            component: 'TextArea',
            name: 'assessment_help',
            label:
              'Please provide details of difficulties and what would help you communicate more easily during your assessment (e.g. a family member or friend present, an independent advocate, specialist communication support)',
          },
          {
            component: 'TextArea',
            name: 'assessment_help',
            label:
              'Please list other people involved in your assessment (e.g. advocate, carer, family, friend, other professionals) Provide details including names, roles/relationship and contact details.',
          },
        ],
      },
      {
        id: 'about-you-4',
        title: 'About You',
        components: [
          {
            component: 'Radios',
            name: 'decline_support',
            label:
              'Did the client choose to decline any further Social Services support?',
            hint:
              '(Has the client stated that they do not wish further assessment or services from Hackney Adults Social Care at this point)',
            options: ['Yes', 'No'],
          },
          {
            component: 'TextArea',
            name: 'about_you',
            label: 'About you',
          },
          {
            component: 'TextInput',
            name: 'internet_access',
            width: '30',
            label: 'Are you able to access / use the Internet?',
          },
          {
            component: 'TextInput',
            name: 'specialist_technology',
            width: '30',
            label:
              'Are you using specialist technology to help you manage at home (e.g. telecare)',
          },
          <h3
            key="workers recommendation"
            className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
          >
            Workers recommendations
          </h3>,
          {
            component: 'TextArea',
            name: 'worker_resource_recommendation',
            label: 'What resources, support was recommended and outcome',
          },
          {
            component: 'TextInput',
            name: 'next_actions',
            width: '30',
            label: 'Next actions',
          },
          {
            component: 'Radios',
            name: 'prevent_admission',
            label: 'Did your input prevent admission to hospital',
            options: ['Yes', 'No'],
          },
          {
            component: 'TextInput',
            name: 'number_of_visits',
            width: '30',
            label: 'Number of Visits',
            hint: '(including telephone calls to the person, etc)',
          },
          {
            component: 'Checkbox',
            name: 'visits_conducted',
            label: 'Visits conducted',
            options: ['Telephone', 'Face to face', 'Video link'],
          },
        ],
      },
      {
        id: 'care-act-outcomes-and-eligibility-5',
        title: 'Care Act Outcomes and Eligibility',
        components: [
          {
            component: 'Radios',
            name: 'medical_condition',
            label:
              'Do you have a condition as a result of either your physical, mental, sensory, learning or cognitive disabilities or illnesses, substance misuse or brain injury?',
            options: ['Yes', 'No'],
          },
          {
            component: 'Radios',
            name: 'medical_eligible_outcome',
            label:
              'As a result of your needs are you unable to achieve two or more of the eligible outcomes below',
            options: ['Yes', 'No'],
          },
          {
            component: 'Radios',
            name: 'maintain_home_environment',
            label:
              'Can you "Maintain a habitable home environment" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            options: ['Yes', 'No'],
          },
          {
            component: 'TextArea',
            name: 'details_home_envrionment',
            label: 'Details (Maintain a habitable home environment)',
          },
          {
            component: 'Radios',
            name: 'maintain_nutrition_alone',
            label:
              'Can you "Manage and maintain nutrition" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            options: ['Yes', 'No'],
          },
          {
            component: 'TextArea',
            name: 'details_manage_nutrition',
            label: 'Details (Manage and maintain nutrition)',
          },
        ],
      },
      {
        id: 'personal-budget10',
        title: 'My Personal Budget',
        components: [
          {
            component: 'TextInput',
            name: 'total_weekly_hours',
            width: '30',
            label: 'My total weekly hours (Budget)',
            hint: 'Use decimal notation for part-hours',
          },
          {
            component: 'DateInput',
            name: 'date_of_plan',
            label: 'Date of Plan',
            hint:
              'Submission date of this Google form - instead of authorised date',
          },
          //find out what is needed here
        ],
      },
      {
        id: 'managing-my-budget11',
        title: 'Managing my budget',
        components: [
          {
            component: 'Radios',
            name: 'manage_my_budget',
            label: 'Who will manage my budget?',
            options: [
              'Me via a Direct Payment',
              'My representative - via Direct Payment',
              'Local Authority',
              'Other arrangement (e.g. mixed)',
            ],
            //find out what is needed here
          },
        ],
      },
      {
        id: 'special_funding_arrangements12',
        title: 'Special funding arrangements',
        components: [
          {
            component: 'Radios',
            name: 'DS1500',
            label: 'Has a DS1500 form been issued?',
            options: ['Yes', 'No', 'Not known'],
          },
          {
            component: 'Radios',
            name: 'Section117aftercare',
            label: 'Are you entitled to Section 117 aftercare?',
            options: ['Yes', 'No', 'Not longer'],
          },
          {
            component: 'Radios',
            name: 'CareProgrammeApproach',
            label: 'Are you receiving care under the Care Programme Approach',
            options: ['Yes', 'No', 'Not longer'],
          },
        ],
      },
      {
        id: '13',
        title: '',
        components: [{}],
        //find out what is needed here
      },
      {
        id: 'Completedby14',
        title: 'Completed by',
        components: [
          {
            component: 'DateInput',
            name: 'completed_date_3',
            label: 'Completed date (Conversation 3)',
            rules: { required: true },
          },
          //find out what is needed here
        ],
      },
      {
        id: 'NextActions15',
        title: 'Next actions',
        components: [
          <p key="careact">
            This assessment was conducted in line with the Care Act 2014, and I
            have to the best of my knowledge, gathered as much information and
            evidence as possible, with the adult concerned, and in certain
            circumstances due to Covid related risks, this may have been
            conducted remotely. With their consent, I have spoken with other
            professionals involved with the adult as part of the MDT, as well as
            family, carers, friends and voluntary organisations who know the
            adult. In this proportionate Care Act assessment, I have sought to
            adhere to the Ethics Framework and the ECHR, particularly S 2, 3 and
            8
          </p>,
          {
            component: 'Radios',
            name: 'SafeguardingConcern?',
            label: 'Will this Conversation lead to a Safeguarding Concern?',
            options: ['Yes', 'No'],
          },
          <p key="completeAsc">
            If yes, please ensure you complete an Adults - Safeguarding Adult
            Concern form
          </p>,
          {
            component: 'Checkbox',
          },
          //add appropriate checkboxes here
          {
            component: 'Radios',
            name: 'SafeguardingConcern?',
            label: 'What Next - workflow',
            options: ['Yes', 'No'],
          },

          //add logic to send user to appropriate section
        ],
      },
      {
        id: 'TransferLongTerm15',
        title: 'Transfer case to Long Term team',
        components: [{}],
      },
    ],
  },
];

export default steps;
