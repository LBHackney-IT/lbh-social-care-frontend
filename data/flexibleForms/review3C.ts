import { Form } from './forms.types';

const form: Form = {
  id: 'review-3c',
  name: 'Review of Care and Support Plan (3C)',
  steps: [
    {
      id: 'Living situation',
      name: 'Living situation',
      theme: 'About you',
      fields: [
        {
          id: 'Primary address tenure type',
          question: 'Primary address tenure type',
          type: 'select',
          choices: [
            {
              value: 'Owner/occupier or shared ownership scheme',
              label: 'Owner/occupier or shared ownership scheme',
            },
            {
              value:
                "Tenant (including local authority, arm's length management organisations, registered social landlord, housing association)",
              label:
                "Tenant (including local authority, arm's length management organisations, registered social landlord, housing association)",
            },
            {
              value: 'Tenant of a private landlord',
              label: 'Tenant of a private landlord',
            },
            {
              value:
                'Settled mainstream housing with family/friends (including flat-sharing)',
              label:
                'Settled mainstream housing with family/friends (including flat-sharing)',
            },
            {
              value:
                'Supported accommodation/lodgings/group home (supported by staff or resident care taker)',
              label:
                'Supported accommodation/lodgings/group home (supported by staff or resident care taker)',
            },
            {
              value: 'Shared Lives scheme',
              label: 'Shared Lives scheme',
            },
            {
              value:
                'Approved premises for offenders released from prison or under probation supervision (e.g. probation hostel)',
              label:
                'Approved premises for offenders released from prison or under probation supervision (e.g. probation hostel)',
            },
            {
              value: 'Sheltered, extra care or other sheltered housing',
              label: 'Sheltered, extra care or other sheltered housing',
            },
            {
              value:
                'Mobile accommodation for Gypsy, Roma and Traveller communities',
              label:
                'Mobile accommodation for Gypsy, Roma and Traveller communities',
            },
            {
              value: 'Rough sleeper or squatting',
              label: 'Rough sleeper or squatting',
            },
            {
              value:
                'Night shelter, emergency or direct access hostel (temporary accommodation accepting self-referrals)',
              label:
                'Night shelter, emergency or direct access hostel (temporary accommodation accepting self-referrals)',
            },
            {
              value: 'Refuge',
              label: 'Refuge',
            },
            {
              value:
                'Placed in temporary accommodation by the council (including homelessness resettlement)',
              label:
                'Placed in temporary accommodation by the council (including homelessness resettlement)',
            },
            {
              value: 'Staying with family/friends as a short-term guest',
              label: 'Staying with family/friends as a short-term guest',
            },
            {
              value:
                'Acute or long-term healthcare residential facility or hospital (e.g. NHS independent general hospital/clinic, long-stay hospital, specialist rehabilitation/recovery hospital)',
              label:
                'Acute or long-term healthcare residential facility or hospital (e.g. NHS independent general hospital/clinic, long-stay hospital, specialist rehabilitation/recovery hospital)',
            },
            {
              value: 'Registered care home',
              label: 'Registered care home',
            },
            {
              value: 'Registered nursing home',
              label: 'Registered nursing home',
            },
            {
              value: 'Prison, young offenders institution or detention centre',
              label: 'Prison, young offenders institution or detention centre',
            },
            {
              value: 'Other temporary accommodation',
              label: 'Other temporary accommodation',
            },
          ],
        },
        {
          id: 'Household structure',
          question: 'Household structure',
          type: 'radios',
          choices: [
            {
              value: 'Lives alone',
              label: 'Lives alone',
            },
            {
              value: 'Lives with others',
              label: 'Lives with others',
            },
            {
              value: 'Unknown',
              label: 'Unknown',
            },
          ],
        },
      ],
    },
    {
      id: 'Communication',
      name: 'Communication',
      theme: 'About you',
      fields: [
        {
          id: 'Preferred contact method',
          question: 'Preferred method of contact',
          type: 'radios',
          choices: [
            {
              value: 'Face to face',
              label: 'Face to face',
            },
            {
              value: 'Phone',
              label: 'Phone',
            },
            {
              value: 'Video call',
              label: 'Video call',
            },
            {
              value: 'No preference',
              label: 'No preference',
            },
          ],
        },
        {
          id: 'English fluency',
          question: 'What is your fluency in English?',
          type: 'radios',
          choices: [
            {
              value: 'Good (written and spoken)',
              label: 'Good (written and spoken)',
            },
            {
              value: 'Not fluent',
              label: 'Not fluent',
            },
          ],
        },
        {
          id: 'First or preferred language',
          question: 'What is your first or preferred language?',
          type: 'text',
        },
        {
          id: 'is-an-interpreter-required',
          question: 'Do you need an interpreter?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Communication difficulties',
          question: 'Do you have communication difficulties?',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Difficulties understanding/retaining information',
          question:
            'Do you have any difficulties understanding or retaining information?',

          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Difficulties making decisions and/or understanding their impact',
          question:
            'Do you have any difficulties making decisions and/or understanding their impact?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Details',
          question: 'Anything else?',
          hint: 'Describe any other communication issues not covered above.',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Primary support reason',
      name: 'Primary support reason',
      theme: 'About you',
      fields: [
        {
          id: 'PSR group',
          question: 'PSR group',
          hint: '',
          type: 'select',
          choices: [
            {
              value: 'Physical support - access and mobility only',
              label: 'Physical support - access and mobility only',
            },
            {
              value: 'Physical support - personal care and support',
              label: 'Physical support - personal care and support',
            },
            {
              value: 'Sensory support - visual impairment',
              label: 'Sensory support - visual impairment',
            },
            {
              value: 'Sensory Support - hearing impairment',
              label: 'Sensory Support - hearing impairment',
            },
            {
              value: 'Sensory support - dual impairment',
              label: 'Sensory support - dual impairment',
            },
            {
              value: 'Support with memory and cognition',
              label: 'Support with memory and cognition',
            },
            {
              value: 'Learning disability support',
              label: 'Learning disability support',
            },
            {
              value: 'Mental health support (ASC)',
              label: 'Mental health support (ASC)',
            },
            {
              value: 'Mental health support (ELFT)',
              label: 'Mental health support (ELFT)',
            },
            {
              value: 'Social support - substance misuse',
              label: 'Social support - substance misuse',
            },
            {
              value: 'Social support - asylum seeker',
              label: 'Social support - asylum seeker',
            },
            {
              value: 'Social support - social isolation, or other',
              label: 'Social support - social isolation, or other',
            },
          ],
        },
      ],
    },
    {
      id: 'About me',
      name: 'About me',
      theme: 'About you',
      fields: [
        {
          id: 'Areas of my life you enjoy or value most',
          question:
            'Areas of my life you enjoy or value most, and changes that would improve my wellbeing or quality of life',
          hint: 'Including your main interests and where I can most contribute.',
          type: 'textarea',
        },
        {
          id: 'Resources or support recommended',
          question: 'What resources or support were recommended and outcome?',
          hint: 'Recommended by social worker',
          type: 'repeater',
        },
        {
          id: 'Next actions',
          question: 'Next actions',
          hint: 'Recommended by social worker',
          type: 'textarea',
        },
        {
          id: 'Increase or decrease to services provided',
          question: 'Is there an increase or decrease to services provided?',
          type: 'radios',
          choices: [
            {
              value: 'Increase',
              label: 'Increase',
            },
            {
              value: 'Decrease',
              label: 'Decrease',
            },
            {
              value: 'No change',
              label: 'No change',
            },
          ],
        },
        {
          id: 'Mental capacity assessment completed?',
          question: 'Has a mental capacity assessment been completed?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Mental capacity assessment outcome',
          question: 'What was the outcome of the Mental Capacity Assessment?',
          condition: {
            id: 'Mental capacity assessment completed?',
            value: 'Yes',
          },
          type: 'textarea',
        },
        {
          id: 'Mental capacity assessment required?',
          question: 'Is a mental capacity assessment required?',
          type: 'radios',
          condition: {
            id: 'Mental capacity assessment completed?',
            value: 'No',
          },
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
      ],
    },
    {
      id: 'Key contacts',
      name: 'Key contacts',
      theme: 'About you',
      fields: [
        {
          id: 'Key contacts',
          question: 'Who are your key contacts?',
          type: 'repeaterGroup',
          itemName: 'contact',
          subfields: [
            {
              id: 'Name',
              question: 'Name',
              type: 'text',
            },
            {
              id: 'Relationship or role',
              question: 'Relationship or role',
              type: 'text',
            },
            {
              id: 'Address',
              question: 'Address',
              type: 'text',
            },
            {
              id: 'Contact details',
              question: 'Contact details',
              hint: 'An email address or phone number',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      id: 'GP details',
      name: 'GP details',
      theme: 'About you',
      fields: [
        {
          id: 'Name',
          question: 'Name',
          type: 'text',
        },
        {
          id: 'Practice name',
          question: 'Practice name',
          hint: 'For example, Cedar Brook Practice',
          type: 'text',
        },
        {
          id: 'Address',
          question: 'Practice address',
          type: 'textarea',
        },
        {
          id: 'Postal code',
          question: 'Practice postal code',
          hint: 'For example, E8 1DY',
          type: 'text',
        },
        {
          id: 'Phone',
          question: 'Phone number',
          type: 'text',
        },
        {
          id: 'Email',
          question: 'Email',
          type: 'text',
        },
      ],
    },
    {
      id: 'My review',
      name: 'My review',
      theme: 'Reviewing your care',
      fields: [
        {
          id: 'Review type',
          question: 'What kind of review is this?',
          type: 'radios',
          choices: [
            {
              value: 'Planned',
              label: 'Planned',
            },
            {
              value: 'Unplanned',
              label: 'Unplanned',
            },
          ],
        },
        {
          id: 'Reason for unplanned review',
          question: 'Why is this review needed?',
          condition: {
            id: 'Review type',
            value: 'Unplanned',
          },
          type: 'radios',
          choices: [
            {
              value: 'Planned or unplanned hospital episode',
              label: 'Planned or unplanned hospital episode',
            },
            {
              value: 'Carer related',
              label: 'Carer related',
            },
            {
              value: 'Safeguarding concern',
              label: 'Safeguarding concern',
            },
            {
              value: 'Provider failure',
              label: 'Provider failure',
            },
            {
              value: 'Change in commissioning arrangements',
              label: 'Change in commissioning arrangements',
            },
            {
              value: 'Another reason',
              label: 'Another reason',
            },
          ],
        },
        {
          id: 'Current setting',
          question: 'What is the current setting for the person?',
          hint: 'If the person is in a hospital, give the most recent setting before going to hospital.',
          type: 'radios',
          choices: [
            {
              value: 'Community',
              label: 'Community (eg. living at home, supported living)',
            },
            {
              value: 'Residential care',
              label: 'Residential care',
            },
            {
              value: 'Nursing care',
              label: 'Nursing care',
            },
          ],
        },
        {
          id: 'Increase or decrease in the services provided?',
          question:
            'Is there an increase or decrease in the services provided?',
          type: 'radios',
          choices: [
            {
              value: 'Increase',
              label: 'Increase',
            },
            {
              value: 'Decrease',
              label: 'Decrease',
            },
            {
              value: 'No change',
              label: 'No change',
            },
          ],
        },
        {
          id: "My (or my representative's) view on how well my care and support has been working since my last assessment or review",
          question:
            'How well has your care and support has been working since the last assessment or review?',
          type: 'textarea',
          hint: 'The opinion of you or your representative.',
        },
        {
          id: 'my-or-my-representatives-view-on-anything-that-needs-to-change-to-help-me-work-towards-what-i-want-to-achieve',
          question:
            'Does anything need to change to help me work towards what I want to achieve?',
          type: 'textarea',
          hint: 'The opinion of you or your representative.',
        },
      ],
    },
    {
      id: 'Care act outcomes and eligibility',
      name: 'Care act outcomes and eligibility',
      theme: 'Reviewing your care',
      fields: [
        {
          id: '1. Do you have a condition as a result of either your physical, mental, sensory, learning or cognitive disabilities or illnesses, substance misuse or brain injury?',
          question:
            '1. Do you have a condition as a result of either your physical, mental, sensory, learning or cognitive disabilities or illnesses, substance misuse or brain injury?',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: '2. As a result of your needs are you unable to achieve two or more of the eligible outcomes below?',
          question:
            '2. As a result of your needs are you unable to achieve two or more of the eligible outcomes below?',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Can you "maintain a habitable home environment" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "maintain a habitable home environment" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Habitable home environment details',
          question: 'Details',
          condition: {
            id: 'Can you "maintain a habitable home environment" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
          type: 'textarea',
        },
        {
          id: 'Can you "manage and maintain nutrition" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "manage and maintain nutrition" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Nutrition details',
          question: 'Details',
          type: 'textarea',
          condition: {
            id: 'Can you "manage and maintain nutrition" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
        },
        {
          id: 'Can you "manage toilet needs" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "manage toilet needs" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Toilet needs details',
          question: 'Details',
          type: 'textarea',
          condition: {
            id: 'Can you "manage toilet needs" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
        },
        {
          id: 'Can you "maintain personal hygiene" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "maintain personal hygiene" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Personal hygiene details',
          question: 'Details',
          condition: {
            id: 'Can you "maintain personal hygiene" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
          type: 'textarea',
        },
        {
          id: 'Can you "be appropriately clothed" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "be appropriately clothed" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Appropriately clothed details',
          question: 'Details',
          condition: {
            id: 'Can you "be appropriately clothed" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
          type: 'textarea',
        },
        {
          id: 'Can you "develop and maintain family or other personal relationships" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "develop and maintain family or other personal relationships" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Family and relationships details',
          question: 'Details',
          type: 'textarea',
          condition: {
            id: 'Can you "develop and maintain family or other personal relationships" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
        },
        {
          id: 'Can you "make use of necessary facilities or services in local community (including public transport and recreational facilities/services)" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "make use of necessary facilities or services in local community (including public transport and recreational facilities/services)" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Community details',
          question: 'Detail',
          type: 'textarea',
          condition: {
            id: 'Can you "make use of necessary facilities or services in local community (including public transport and recreational facilities/services)" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
        },
        {
          id: 'Can you "access and engage in work, training, education or volunteering" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "access and engage in work, training, education or volunteering" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Work, training, education or volunteering details',
          question: 'Details',
          type: 'textarea',
          condition: {
            id: 'Can you "access and engage in work, training, education or volunteering" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
        },
        {
          id: 'Can you "carry out any caring responsibilities for a child" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "carry out any caring responsibilities for a child" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
            {
              value: 'Not applicable',
              label: 'Not applicable',
            },
          ],
        },
        {
          id: 'Childcare details',
          question: 'Details',
          condition: {
            id: 'Can you "carry out any caring responsibilities for a child" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
          type: 'textarea',
        },
        {
          id: 'Can you "be able to make use of your home safely" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          question:
            'Can you "be able to make use of your home safely" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: 'Safe home details',
          question: 'Details',
          type: 'textarea',
          condition: {
            id: 'Can you "be able to make use of your home safely" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            value: 'No',
          },
        },
        {
          id: '3. As a result of being unable to achieve these outcomes is there, or is there likely to be, significant impact on your well-being?',
          question:
            '3. As a result of being unable to achieve these outcomes is there, or is there likely to be, significant impact on your well-being?',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
            {
              value: 'not-applicable',
              label: 'Not applicable',
            },
          ],
        },
        {
          id: 'Support from informal or unpaid carer',
          question: 'Do you get support from an informal or unpaid carer?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
      ],
    },
    {
      id: 'Personal budget',
      name: 'Personal budget',
      theme: 'Reviewing your care',
      fields: [
        {
          id: 'Authorisation date',
          question: 'When was this plan authorised?',
          type: 'date',
        },
        {
          id: 'Weekly total hours',
          question: 'Weekly total hours',
          type: 'text',
        },
        {
          id: 'Desired outcome',
          question: 'What is your desired outcome?',
          type: 'text',
        },
        {
          id: 'How will this be achieved?',
          question: 'How will this be achieved?',
          type: 'textarea',
        },
        {
          id: 'Who by?',
          question: 'Who by?',
          type: 'text',
        },
        {
          id: 'How often?',
          question: 'How often?',
          hint: '',
          type: 'text',
        },
        {
          id: 'Weekly cost',
          question: 'Weekly cost',
          hint: 'In pounds (£)',
          type: 'text',
        },
        {
          id: 'Yearly cost',
          question: 'Yearly cost',
          hint: 'In pounds (£)',
          type: 'text',
        },
        {
          id: 'Start date',
          question: 'When should this budget start?',
          type: 'date',
        },
        {
          id: 'End date',
          question: 'When should this budget end?',
          type: 'date',
        },
        {
          id: 'Managed by',
          question: 'Who will manage my budget?',
          type: 'radios',
          choices: [
            {
              value: 'Me',
              label: 'Me',
            },
            {
              value: 'My representative(s)',
              label: 'My representative(s)',
            },
            {
              value: 'Local authority',
              label: 'Local authority',
            },
            {
              value: 'Other arrangement',
              label: 'Other arrangement (eg. mixed)',
            },
          ],
        },
        {
          id: 'Representatives',
          question: 'About your representative(s)',
          type: 'repeaterGroup',
          condition: {
            id: 'Managed by',
            value: 'My representative',
          },
          subfields: [
            {
              id: 'Name',
              question: 'Name',
              type: 'text',
            },
            {
              id: 'Contact details',
              question: 'Contact details',
              hint: 'Email address or phone number',
              type: 'text',
            },
            {
              id: 'Relationship',
              question: 'Relationship with them',
              type: 'text',
            },
          ],
        },

        {
          id: "Resident's weekly budget contribution",
          question: 'Your weekly budget contribution',
          hint: 'Must be confirmed by finance',
          type: 'text',
        },
        {
          id: "Local authority's weekly budget contribution",
          question: "Local authority's weekly budget contribution",
          hint: 'Must be confirmed by finance',
          type: 'text',
        },
        {
          id: 'Weekly budget contribution from other sources',
          question: 'Weekly budget contribution from other sources',
          type: 'text',
        },

        {
          id: 'Weekly budget details',
          question: 'Weekly budget details',
          type: 'text',
        },

        {
          id: 'DS1500 form issued?',
          question: 'Has a DS1500 form been issued?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
            {
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'Entitled to section 117 aftercare?',
          question: 'Are you entitled to section 117 aftercare?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
            {
              value: 'No longer',
              label: 'No longer',
            },
          ],
        },
        {
          id: 'Receiving care under the Care Programme Approach?',
          question: 'Are you receiving care under the Care Programme Approach?',
          type: 'radios',
          choices: [
            {
              value: 'Yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
            {
              value: 'No longer',
              label: 'No longer',
            },
          ],
        },
      ],
    },
    {
      id: 'Timetable',
      name: 'Weekly timetable',
      theme: 'Reviewing your care',
      fields: [
        {
          id: 'Authorisation date',
          question: 'Date timetable was authorised',
          type: 'date',
        },
        {
          id: 'Day',
          question: 'Day',
          type: 'text',
        },
        {
          id: 'Morning',
          question: 'Morning',
          type: 'text',
        },
        {
          id: 'Afternoon',
          question: 'Afternoon',
          type: 'text',
        },
        {
          id: 'Evening',
          question: 'Evening',
          type: 'text',
        },
        {
          id: 'Night',
          question: 'Night',
          type: 'text',
        },
        {
          id: 'Estimated weekly cost',
          question: 'Estimated weekly cost',
          type: 'text',
        },
      ],
    },
    {
      id: 'Completion details',
      name: 'Completion details',
      theme: 'Next steps',
      fields: [
        {
          id: 'What next?',
          question: 'What next?',
          type: 'radios',
          choices: [
            {
              value: 'Schedule next review',
              label: 'Schedule next review',
            },
            {
              value: 'Close case (no further action)',
              label: 'Close case (no further action)',
            },
          ],
        },

        {
          id: 'Next review date',
          question: 'Date of next review',
          type: 'date',
          condition: {
            id: 'What next?',
            value: 'Schedule next review',
          },
        },

        {
          id: 'Outcomes for review',
          question: 'Outcomes for review',
          type: 'radios',
          choices: [
            {
              value:
                'Change in setting - move to nursing care (from community)',
              label:
                'Change in setting - move to nursing care (from community)',
            },
            {
              value:
                'Change in setting - move to residential care (from community)',
              label:
                'Change in setting - move to residential care (from community)',
            },
            {
              value: 'Short term support to maximise independence',
              label: 'Short term support to maximise independence',
            },
            {
              value:
                'No change in setting - level of long-term support increased',
              label:
                'No change in setting - level of long-term support increased',
            },
            {
              value: 'No change in setting - no change in long term support',
              label: 'No change in setting - no change in long term support',
            },
            {
              value:
                'No change in setting - level of long-term support decreased',
              label:
                'No change in setting - level of long-term support decreased',
            },
            {
              value:
                'No change in setting - ALL long-term support temporarily suspended',
              label:
                'No change in setting - ALL long-term support temporarily suspended',
            },
            {
              value: 'No change in setting - ALL long term support ended',
              label: 'No change in setting - ALL long term support ended',
            },
          ],
        },
      ],
    },

    {
      id: 'Manager approval',
      name: 'Manager approval',
      theme: 'Next steps',
      fields: [
        {
          id: "Manager's email address",
          question: 'Who will approve this review?',
          hint: 'Provide the email address of a social care manager',
          type: 'text',
        },
      ],
    },
  ],
};

export default form;
