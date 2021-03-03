import TENURETYPES from 'data/tenureTypes';
import SUPPORTREASON from 'data/supportReason';
import PROFESSIONS from 'data/professions';

import { FormStep } from 'components/Form/types';

const steps: FormStep[] = [
  {
    id: 'record-of-conversation-1',
    title: 'Record of Conversation',
    components: [
      <h2 key="prereqs">
        You must have completed a Contact (Adults) and a Conversation 1 form
        before completing this form.
      </h2>,
      <p key="omitconv2">
        A Conversation 2 is required in most circumstances. Please obtain
        manager approval to omit Conversation 2
      </p>,

      {
        component: 'DatePicker',
        name: 'start_date_of_conversation_3',
        label: 'Start Date of Conversation 3',
        width: 10,
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
        width: 10,
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
        component: 'TextArea',
        name: 'list_key_contacts',
        width: 30,
        label: 'List your key contacts',
        hint:
          "(Include 'Name', 'Relationship/Role', 'Address and Contact Details' for each individual that would appear in the Key Contacts table)",
      },
      {
        component: 'TextInput',
        name: 'gp_name',
        width: 30,
        label: 'GP Name',
      },
      {
        component: 'TextInput',
        name: 'gp_practice',
        width: 30,
        label: 'GP Practice',
      },
      {
        component: 'TextInput',
        name: 'gp_address',
        width: 30,
        label: 'GP Address',
      },
      {
        component: 'PhoneInput',
        name: 'gp_phone',
        width: 30,
        label: 'GP Telephone',
      },
      {
        component: 'EmailInput',
        name: 'gp_email',
        width: 30,
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
        width: 30,
        label: 'Preferred method of contact',
      },
      {
        component: 'TextInput',
        name: 'fluency_english',
        width: 30,
        label: 'Fluency in English',
      },
      {
        component: 'TextInput',
        name: 'first_preferred_language',
        width: 30,
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
      <p key="difficulties">
        If you have difficulties in communication, understanding or
        decision-making, you may need support for your involvement in your
        assessment, an advocate to represent you and help you explain your
        views, or a mental capacity assessment.{' '}
      </p>,
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
      <p key="humanrights">
        Local Authorities will remain under a duty to meet needs where failure
        to do so would breach an individual’s human rights under the European
        Convention on Human Rights. These include, for example, the right to
        life under Article 2 of the ECHR, the right to freedom from inhuman and
        degrading treatment under Article 3 and the right to private and family
        life under Article 8.{' '}
      </p>,
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
        width: 30,
        label: 'Are you able to access / use the Internet?',
      },
      {
        component: 'TextInput',
        name: 'specialist_technology',
        width: 30,
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
        width: 30,
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
        width: 30,
        label: 'Number of Visits',
        hint: '(including telephone calls to the person, etc)',
      },
      {
        component: 'Checkbox',
        name: 'visits_conducted',
        label: 'Visits conducted',
        options: ['Telephone', 'Face to face', 'Video link', 'Other'],
      },
      {
        conditionalRender: ({ visits_conducted }) =>
          visits_conducted?.includes('Other'),
        component: 'TextInput',
        name: 'other',
        width: 30,
        label: 'Other',
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
      {
        component: 'Radios',
        name: 'manage_toilet_needs',
        label:
          'Can you "Manage toilet needs" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'details_manage_toilet',
        label: 'Details (Manage toilet needs)',
      },
      {
        component: 'Radios',
        name: 'maintain_personal_hygiene',
        label:
          'Can you "Maintain personal hygiene" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'details_maintain_hygiene',
        label: 'Details (Maintain personal hygiene)',
      },
      {
        component: 'Radios',
        name: 'maintain_personal_hygiene',
        label:
          'Can you "Be appropriately clothed" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'details_appropriate_clothed',
        label: 'Details (Be appropriately clothed)',
      },
      {
        component: 'Radios',
        name: 'maintain_relationships',
        label:
          'Can you "Develop and maintain family or other personal relationships" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'details_maintain_relationships',
        label:
          'Details (Develop and maintain family or other personal relationships)',
      },
      {
        component: 'Radios',
        name: 'use_necessary_facilities',
        label:
          'Can you "Make use of necessary facilities or services in the local community (including public transport and recreational facilities/services)" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'details_necessary_facilities',
        label:
          'Details (Make use of necessary facilities or services in the local community)',
      },
      {
        component: 'Radios',
        name: 'access_work_alone',
        label:
          'Can you "Access and engage in work, training, education or volunteering" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'details_access_work',
        label:
          'Details (Access and engage in work, training, education or volunteering)',
      },
      {
        component: 'Radios',
        name: 'caring_responsibilities',
        label:
          'Can you "Carry out any caring responsibilities for a child" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'details_caring_responsibilities',
        label: 'Details (Carry out any caring responsibilities for a child)',
      },
      {
        component: 'Radios',
        name: 'home_safety_alone',
        label:
          'Can you "Be able to make use of your home safely" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'details_home_safety',
        label: 'Details (Be able to make use of your home safely)',
      },
      {
        component: 'Radios',
        name: 'home_safety_alone',
        label:
          'As a result of being unable to achieve these outcomes is there, or is there likely to be, a significant impact on your wellbeing?',
        options: ['Yes', 'No'],
      },
    ],
  },
  {
    id: 'impact-wellbeing-6',
    title: 'Impact on wellbeing',
    conditionalRender: ({ home_safety_alone }) => home_safety_alone === 'Yes',
    components: [
      <h3
        key="wellbeing_views"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        The impact on your wellbeing should be looked at disregarding any
        support you may already have and should take into account the following
        areas, as well as your (or your representatives) views:{' '}
      </h3>,
      <ul className="govuk-list govuk-error-summary__list" key="ul">
        <li>Personal dignity and being treated with respect</li>
        <li>Physical and mental health and emotional wellbeing</li>
        <li>Protection from abuse and neglect</li>
        <li>Suitability of living accommodation</li>
        <li>Participation in work, education, training or recreation</li>
        <li>Social and economic wellbeing</li>
        <li>Domestic, family and personal relationships</li>
        <li>Your contribution to society</li>
        <li>
          Control over day-to-day life (including over care and support provided
          and the way it is provided)
        </li>
      </ul>,
      {
        component: 'TextArea',
        name: 'details_wellbeing_impact',
        label:
          'Details of the impact on your wellbeing (in the absence of any support you may already have in place)',
      },
    ],
  },
  {
    id: 'informal-carer-7',
    title: 'Informal Carer',
    components: [
      {
        component: 'Radios',
        name: 'carer_support',
        label: 'Do you receive support from a Carer (informal / unpaid)',
        options: ['Yes (Carer)', 'No'],
      },
    ],
  },
  {
    id: 'informal-carer-details-8',
    title: 'Informal Carer Details',
    conditionalRender: ({ carer_support }) => carer_support === 'Yes (Carer)',
    components: [
      {
        component: 'TextInput',
        name: 'carer_mosaic_id',
        width: 30,
        label: 'Carer Mosaic ID',
        hint: '(If known)',
      },
      {
        component: 'TextInput',
        name: 'carer_nhs_number',
        width: 30,
        label: 'Carer NHS Number',
        hint: '(If known)',
      },
      {
        component: 'TextInput',
        name: 'carer_first_name',
        width: 30,
        label: 'Carer First Name',
      },
      {
        component: 'TextInput',
        name: 'carer_last_name',
        width: 30,
        label: 'Carer Last Name',
      },
      {
        component: 'TextInput',
        name: 'relation_to_subject',
        width: 30,
        label: 'Relationship to main subject of assessment',
      },
      {
        component: 'Radios',
        name: 'main_carer',
        label: 'Is this the main carer for the cared-for person?)',
        options: ['Yes', 'No'],
      },
      {
        component: 'Radios',
        name: 'carer_seperate_conversation',
        label:
          'If conversation is completed with an informal / unpaid Carer present, would the Carer like to have a separate conversation?',
        options: ['Yes', 'No'],
      },
      <p key="carer_conversation_form_info">
        If the Carer has requested a separate conversation you should complete a
        separate Carers Assessment form to record this.
      </p>,
      {
        component: 'Radios',
        name: 'carer_seperate_conversation',
        label:
          'If conversation is completed with the Carer present, does the Carer agree this is a joint conversation?',
        options: ['Yes', 'No'],
      },
    ],
  },
  {
    id: 'joint-conversation-with-carer-9',
    title: 'Joint Conversation with Carer',
    conditionalRender: ({ carer_seperate_conversation }) =>
      carer_seperate_conversation === 'Yes',
    components: [
      {
        component: 'Radios',
        name: 'carer_assessed',
        label:
          'Has the carer been assessed as having one or more eligible need?',
        options: ['Yes', 'No'],
      },
      {
        component: 'TextArea',
        name: 'impact_carer_independence',
        label: "Impact of caring on your own Carer's independence",
      },
      <h3
        key="contingency_sub_heading"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Contingency - Thinking Ahead
      </h3>,
      {
        component: 'TextArea',
        name: 'informal_agreements',
        label:
          'What are your informal arrangements when you are unable to provide care?',
      },
      {
        component: 'TextArea',
        name: 'special_requirements',
        label:
          'Does the person that you care for have any special requirements that we should know about?',
      },
      {
        component: 'Radios',
        name: 'carer_provided_information',
        label:
          'Was the Carer provided with Information, Advice and Other Universal Services / Signposting?',
        options: ['Yes', 'No'],
      },
      {
        component: 'Radios',
        name: 'carer_signposted',
        label:
          'If yes, was the Carer signposted to a relevant support service such as the Carers Centre? ',
        options: ['Yes', 'No', 'Not applicable (not signposted)'],
      },
      {
        component: 'Radios',
        name: 'deliver_respite',
        label:
          'Will respite or other forms of carer support be delivered to the cared-for person? ',
        options: ['Yes', 'No'],
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
        width: 30,
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
      <h3
        key="budget_sub_heading"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Budget Spending Plan Guidance
      </h3>,
      <p key="gross_weekly">
        Calculate gross weekly cost of all resources approved (excluding top
        ups). Do not include symbols or commas in the figures entered.
      </p>,
      {
        component: 'Checkbox',
        name: 'desired_outcome_options',
        label: 'Desired outcome options',
        options: [
          { value: '1', text: ' Maintain a habitable home environment' },
          { value: '2', text: 'Manage and maintain nutrition' },
          { value: '3', text: 'Manage toilet needs' },
          { value: '4', text: 'Maintain personal hygiene' },
          { value: '5', text: 'Be appropriately clothed' },
          {
            value: '6',
            text: 'Develop and maintain family or other personal relationships',
          },
          {
            value: '7',
            text:
              'Make use of necessary facilities or services in local community',
          },
          {
            value: '8',
            text:
              'Access and engage in work, training, education or volunteering',
          },
          {
            value: '9',
            text: 'Carry out any caring responsibilities for a child',
          },
          { value: '10', text: 'Be able to make use of your home safely' },
        ],
      },
      {
        component: 'Checkbox',
        name: 'who_responsible',
        label: 'Who by options (Who will be responsible to do this):',
        options: [
          { value: '1', text: 'By myself ' },
          { value: '2', text: 'By family' },
          { value: '3', text: 'carer' },
          { value: '4', text: 'By support from a community group' },
          { value: '5', text: 'By support from a health professional' },
          { value: '6', text: 'By provision of equipment' },
          { value: '7', text: 'Major Adaptation' },
          { value: '8', text: 'By provision of domiciliary care' },
          { value: '9', text: 'By Housing with Care By respite' },
          { value: '10', text: 'By a day service' },
          { value: '11', text: 'By support from housing' },
          {
            value: '12',

            text: 'By support from Children’s services ',
          },
        ],
      },
      {
        component: 'TextArea',
        name: 'budget_desired_outcome',
        width: 30,
        label: 'Budget Spending Plan: Desired Outcome',
        hint: 'Select from options above',
      },
      {
        component: 'TextArea',
        name: 'budget_spending_plan',
        label: 'Budget Spending Plan: How this will be achieved',
      },
      {
        component: 'TextArea',
        name: 'budget_spending_plan_who',
        label: 'Budget Spending Plan: Who by',
      },
      {
        component: 'TextArea',
        name: 'budget_spending_plan_often',
        label: 'Budget Spending Plan: How often',
      },
      {
        component: 'TextArea',
        name: 'budget_spending_plan_cost',
        label: 'Budget Spending Plan: Weekly cost £',
      },
      {
        component: 'TextArea',
        name: 'budget_spending_plan_cost_yearly',
        label: 'Budget Spending Plan: Yearly cost £',
      },
      {
        component: 'DateInput',
        name: 'budget_spending_plan_start_date',
        label: 'Budget Spending Plan:  Start Date',
      },
      {
        component: 'DateInput',
        name: 'budget_spending_plan_end_date',
        label: 'Budget Spending Plan:  End Date',
      },
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
      },
      {
        component: 'Radios',
        name: 'power_of_attorney',
        label: 'Does the identified representative have a Power of Attorney?',
        options: ['Yes', 'No', 'Not applicable'],
      },
      {
        component: 'TextArea',
        name: 'list_details_budget',
        width: 30,
        label: 'List details of those managing my budget',
      },
      {
        component: 'Radios',
        name: 'Financial_assessment_form?',
        label:
          'Has this person been given a copy of the Financial Assessment form?',
        options: ['Yes', 'No'],
        rules: { required: true },
      },
      {
        component: 'TextArea',
        name: 'made_up_budget',
        width: 30,
        label: 'My weekly budget is made up of the following:',
      },
      {
        component: 'TextInput',
        name: 'my_contribution',
        width: 30,
        label: 'My contribution (£/week to be confirmed by finance) ',
      },
      {
        component: 'TextInput',
        name: 'LA_contribution',
        width: 30,
        label:
          'Local Authority contribution (£/week to be confirmed by finance) ',
      },
      {
        component: 'TextInput',
        name: 'other_conttributions',
        width: 30,
        label: 'Other contributions (£/week) ',
      },
      {
        component: 'TextArea',
        name: 'details_budget',
        width: 30,
        label: 'Details (budget)',
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
        options: ['Yes', 'No', 'No longer'],
      },
      {
        component: 'Radios',
        name: 'CareProgrammeApproach',
        label: 'Are you receiving care under the Care Programme Approach',
        options: ['Yes', 'No', 'No longer'],
      },
    ],
  },
  {
    id: 'weeklyTimetable13',
    title: 'Weekly Timetable',
    components: [
      {
        component: 'DatePicker',
        name: 'date_of_timetable',
        label: 'Date of Timetable',
        width: 10,
        hint:
          "Today's date, being the submission date of this Google form  instead of authorised date",
        rules: { required: true },
      },
      {
        component: 'NumberInput',
        name: 'total_weekly_hours',
        width: 10,
        label: 'Total weekly hours (Timetable)',
        hint: '(Use decimal notation for part-hours)',
      },
      {
        component: 'TextInput',
        name: 'other_£',
        width: 30,
        label: 'Other (£/Week)',
      },
      <h3
        key="weekly_table"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        My Weekly Timetable
      </h3>,
      <p key="replaces_a_table">
        Replaces a table - please number each row and use the same number across
        all of the fields below
      </p>,
      {
        component: 'Select',
        name: 'day_options',
        label: 'Day Options',
        options: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
      },
      {
        component: 'TextInput',
        name: 'details_of_weekly_timetable',
        width: 30,
        hint:
          "Please break this down into 'Day','Morning', 'Afternoon', 'Evening', 'Night', 'Estimated Weekly Cost' ",
        label: 'List details of my weekly timetable',
      },
    ],
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
      {
        component: 'Select',
        name: 'other_professionals_involved',
        label: 'Other professionals involved',
        options: PROFESSIONS,
      },
    ],
  },
  {
    id: 'NextActions15',
    title: 'Next actions',
    components: [
      <p key="careact">
        This assessment was conducted in line with the Care Act 2014, and I have
        to the best of my knowledge, gathered as much information and evidence
        as possible, with the adult concerned, and in certain circumstances due
        to Covid related risks, this may have been conducted remotely. With
        their consent, I have spoken with other professionals involved with the
        adult as part of the MDT, as well as family, carers, friends and
        voluntary organisations who know the adult. In this proportionate Care
        Act assessment, I have sought to adhere to the Ethics Framework and the
        ECHR, particularly S 2, 3 and 8
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
        component: 'Radios',
        name: 'associatedReferrals',
        label:
          'Select any of the associated referrals / activities which took place within this conversation',
        options: [
          ' Referral to IIT (Reablement)',
          'Referral to OT (OT equipment or adaptations)',
          'Referral to Sensory Team',
          'Referral for Telecare provision',
          'Provision of Immediate Services',
        ],
      },

      <h3
        key="workflow_title"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        {' '}
        What Next - workflow
      </h3>,
      <p key="what_next">
        If you are not transferring to the Long Term team and the person was
        also not accepted/eligible for reablement then choose Close Case/ No
        Further Action- e.g. provision of Immediate Services and/or Telecare
        falls within No Further Action in this sense after you finish
        Conversation 3.
      </p>,
      {
        component: 'Radios',
        name: 'household_structure',
        label: 'Household Structure',
        options: [
          'Transfer case to Long Term team',
          'Transfer case to IIT (for reablement)',
          'Close Case /No Further Action',
        ],
      },
    ],
  },
  {
    id: 'TransferLongTerm16',
    title: 'Transfer case to Long Term team',
    conditionalRender: ({ household_structure }) =>
      household_structure === 'Transfer case to Long Term team',
    components: [
      <h3
        key="next_review"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Schedule Next Review
      </h3>,
      {
        component: 'DatePicker',
        name: 'next_review',
        label: 'Date of Next Review',
        hint:
          'Please schedule a date in 3, 6 or 12 months time, as required, for the Long Term team to carry out a Review',
        rules: { required: true },
      },
      <h3
        key="please_ensure"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Please ensure you also complete (once approved by Panel):
      </h3>,
      <ul className="govuk-list govuk-error-summary__list" key="ul">
        <li>
          Case Transfer form - Transfer a case to the Long Term Team Provider
        </li>
        <li>copy of Support Plan - Adults - C3 Support Plan</li>
        <li>
          Intranet page{' '}
          https://intranet.hackney.gov.uk/corporate-ict-service/cyberattack-internal-forms/
        </li>
      </ul>,
    ],
  },
  {
    id: 'SequeltoConversation17',
    title: 'Sequel to Conversation 3 (Long Term Team)',
    conditionalRender: ({ household_structure }) =>
      household_structure === 'Transfer case to Long Term team',
    components: [
      <h3
        key="transfer"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        (New client is being transferred to the Long Term team)
      </h3>,
      {
        component: 'Radios',
        name: 'Outcomes_for_Transfer',
        label: 'Outcomes for Transfer to Long Term Team (Sequel)',
        options: [
          'Long Term Support (Nursing Care)',
          'Long Term Support (Residential Care)',
          'Long Term Support (Community)',
          'End of Life (overseen by Long Term team)',
        ],
      },
    ],
  },
  {
    id: 'SequeltoConversation18',
    title: 'Sequel to Conversation 3 (Reablement)',
    conditionalRender: ({ household_structure }) =>
      household_structure === 'Transfer case to IIT (for reablement)',
    components: [
      {
        component: 'Radios',
        name: 'Outcomes for Reablement Referral (Sequel)',
        label: 'Outcomes for Reablement Referral (Sequel)',
        options: ['Short Term Support to Maximise Independence (Reablement)'],
      },
    ],
  },
  {
    id: 'SequeltoConversation19',
    title: 'Sequel to Conversation 3 (NFA / Closure)',
    conditionalRender: ({ household_structure }) =>
      household_structure === 'Close Case /No Further Action',
    components: [
      <p key="nfa">(New client will not receive ongoing services)</p>,
      {
        component: 'Radios',
        name: 'Outcomes for Contact (Sequel)',
        label: 'Outcomes for Contact (Sequel)',
        options: [
          'End of Life (not overseen by Long Term team)',
          'Ongoing Low Level Support (provided with Telecare or Equipment / Adaptations)',
          'Short Term Support (other) (e.g. Immediate Services - Time-limited support; NOT Reablement; )',
          'Universal Services/Signposted to other services',
          'No services provided - Deceased',
          'No services provided - other reason',
        ],
      },
    ],
  },
  {
    id: 'ManagerApproval20',
    title: 'Sequel to Conversation 3 (NFA / Closure)',
    conditionalRender: ({ household_structure }) =>
      household_structure === 'Close Case /No Further Action',
    components: [
      <p key="manager">(New client will not receive ongoing services)</p>,
      {
        component: 'EmailInput',
        name: 'list_key_contacts',
        width: 30,
        label:
          'Email address of your manager (who would normally approve this decision)',
        hint:
          "Who will retrospectively approve this decision? You need to manually forward the 'receipt' copy of this form to them once you receive it",
      },
    ],
  },
];

export default steps;
