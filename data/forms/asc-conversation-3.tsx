export default {
  title: 'Conversation3',
  path: '/form/conversation-3/',
  steps: [
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
  ],
};
