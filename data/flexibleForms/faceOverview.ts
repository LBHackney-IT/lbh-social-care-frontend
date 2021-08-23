import { Form } from './forms.types';

const form: Form = {
  id: 'face-overview-assessment',
  name: 'FACE overview assessment',
  isViewableByAdults: false,
  isViewableByChildrens: false,
  steps: [
    {
      id: 'Supporting you in your assessment',
      name: 'Supporting you in your assessment',
      theme: 'About you',
      intro:
        'If you have difficulties in communication, understanding or decision-making, you may need support for your involvement in your assessment, an advocate to represent you and help you explain your views, or a mental capacity assessment.',
      fields: [
        {
          id: 'Age band',
          question: 'Age band at time of assessment',
          type: 'radios',
          choices: [
            {
              value: '18 to 64',
              label: '18 to 64',
            },
            {
              value: '65 and over',
              label: '65 and over',
            },
          ],
        },
        {
          id: 'British citizen',
          question: 'Are you a British citizen?',
          required: true,
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
          id: 'Preferred language',
          question: 'Preferred language',
          type: 'text',
          className: 'govuk-input--width-20',
        },
        {
          id: 'Interpreter needed?',
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
          id: 'Any of the following??',
          question: 'Do you consider yourself to be any of the following?',
          hint: 'Choose any that apply',
          type: 'checkboxes',
          required: true,
          itemName: 'option',
          choices: [
            {
              value: 'Deaf',
              label: 'Deaf',
            },
            {
              value: 'Blind',
              label: 'Blind',
            },
            {
              value: 'None of these',
              label: 'None of these',
            },
          ],
        },
        {
          id: 'Communication difficulties?',
          question: 'If so, do you have any communication difficulties?',
          type: 'radios',
          required: true,
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
          id: 'Difficulties understanding or relating information',
          question:
            'Do you have any difficulties understanding or relating information?',
          type: 'radios',
          required: true,
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
          id: 'Difficulties making decisions or understanding their impact',
          question:
            'Do you have any difficulties making decisions or understanding their impact?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'Advocate needed?',
          question: 'Do you need an advocate?',
          type: 'radios',
          required: true,
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
          id: 'What would help you communicate more easily during your assessment',
          question:
            'Please provide details of difficulties and what would help you communicate more easily during your assessment)',
          hint: 'For example, a family member or friend present, an independent advocate, specialist communication support',
          type: 'textarea',
        },
        {
          id: 'Other people involved in assessment',
          question: 'Is anyone else involved in your assessment?',
          hint: 'For example, advocate, carer, family, friend, other professionals',
          type: 'repeaterGroup',
          hiddenRepeater: true,
          itemName: 'person',
          subfields: [
            {
              id: 'Name',
              type: 'text',
              question: 'Their name',
              required: true,
            },
            {
              id: 'Relationship or role',
              type: 'text',
              question: 'Relationship or role',
              required: true,
              className: 'govuk-input--width-10',
            },
            {
              id: 'Contact details',
              type: 'textarea',
              question: 'Contact details',
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: 'about you',
      name: 'About you',
      theme: 'About you',
      // intro:
      //   'If appropriate, you may wish to be referred for financial advice and / or maximising your benefits',
      fields: [
        {
          id: 'Your personal family background',
          question: 'What is your personal family background',
          hint: 'Include important recent events or changes in your life',
          type: 'textarea',
        },
        {
          id: 'What areas of your life do you most enjoy or value?',
          question: 'What areas of your life do you most enjoy or value?',
          hint: 'Include your main interests and where you can most contribute',
          type: 'textarea',
        },
        {
          id: 'What changes would most improve your wellbeing or quality of life?',
          question:
            'What changes would most improve your wellbeing or quality of life?',
          type: 'textarea',
        },
        {
          id: "Family, carer(s) or advocate's views",
          question: "Your family, carer(s) or advocate's views",
          type: 'textarea',
        },
        {
          id: 'Any concerns about how others treat you?',
          question: 'Do you have any concerns about how others treat you?',
          hint: 'For example, neglect, abuse, discrimination',
          type: 'radios',
          required: true,
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
          id: 'More details about how others treat you',
          question: 'Provide more details about how others treat you',
          conditions: [
            {
              id: 'Any concerns about how others treat you?',
              value: 'Yes',
            },
          ],
          required: true,
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Recourse to public funds',
      name: 'Recourse to public funds',
      theme: 'About you',
      fields: [
        {
          id: 'Recourse to public funds',
          question: 'Does the person have recourse to public funds?',
          type: 'radios',
          required: true,
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
          id: 'Nationality',
          conditions: [
            {
              id: 'Recourse to public funds',
              value: 'No',
            },
          ],
          question: 'Nationality',
          type: 'text',
          required: true,
          className: 'govuk-input--width-10',
        },
        {
          id: 'National insurance number',
          question: 'National insurance number',
          conditions: [
            {
              id: 'Recourse to public funds',
              value: 'No',
            },
          ],
          hint: 'For example, QQ123456C',
          type: 'text',
          required: true,
          className: 'govuk-input--width-10',
        },
        {
          id: 'Passport number',
          question: 'Passport number',
          conditions: [
            {
              id: 'Recourse to public funds',
              value: 'No',
            },
          ],
          required: true,
          hint: 'For example, 7700225VH',
          type: 'text',
          className: 'govuk-input--width-10',
        },
        {
          id: 'Legal immigration status',
          question: 'What is your legal immigration status?',
          conditions: [
            {
              id: 'Recourse to public funds',
              value: 'No',
            },
          ],
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'Application pending',
              label: 'Application pending',
            },
            {
              value: 'Application refused, appeal pending',
              label: 'Application refused, appeal pending',
            },
            {
              value:
                'Application refused, exhausted appeal rights (so no option to appeal)',
              label:
                'Application refused, exhausted appeal rights (so no option to appeal)',
            },
            {
              value: 'No application filed',
              label: 'No application filed',
            },
            {
              value: 'Indefinite leave to remain',
              label: 'Indefinite leave to remain',
            },
            {
              value: 'EEA national',
              label: 'EEA national',
            },
          ],
        },
        {
          id: 'Legal status start date',
          className: 'govuk-input--width-10',
          conditions: [
            {
              id: 'Recourse to public funds',
              value: 'No',
            },
          ],
          question: 'When did this legal status begin?',
          required: true,
          type: 'date',
        },
        {
          id: 'Legal documents seen?',
          question: 'Legal documents seen?',
          conditions: [
            {
              id: 'Recourse to public funds',
              value: 'No',
            },
          ],
          type: 'radios',
          required: true,
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
          id: 'Date documents seen?',
          conditions: [
            {
              id: 'Recourse to public funds',
              value: 'No',
            },
            {
              id: 'Legal documents seen?',
              value: 'Yes',
            },
          ],
          question: 'Date documents seen?',
          required: true,
          type: 'date',
        },
        {
          id: 'Details of documents seen',
          conditions: [
            {
              id: 'Recourse to public funds',
              value: 'No',
            },
            {
              id: 'Legal documents seen?',
              value: 'Yes',
            },
          ],
          question: 'Which documents were seen?',
          required: true,
          type: 'textarea',
        },
      ],
    },
    {
      id: 'your home and living situation',
      name: 'Your home and living situation',
      intro:
        "This includes the eligibility outcome 'Maintaining a habitable home environment'. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations or telecare.\n\n Based on a typical week.",
      theme: 'Your care needs',
      fields: [
        {
          id: 'are you currently staying in a hospital or other nhs facility',
          question:
            'Are you currently staying in a hospital or other NHS facility?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'Current living situation',
          question: 'What is your current living situation?',
          required: true,
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
        {
          type: 'combobox',
          question: 'Current tenure?',
          required: true,
          id: 'What is your current tenure?',
          choices: [
            {
              value: 'Owner occupier or shared ownership scheme',
              label: 'Owner occupier or shared ownership scheme',
            },
            {
              value:
                "Tenant (including local authority, arm's length management organisations, registered social landlord, housing association)",
              label:
                "Tenant (including local authority, arm's length management organisations, registered social landlord, housing association)",
            },
            {
              value:
                'Settled mainstream housing with family/friends (including flat-sharing)',
              label:
                'Settled mainstream housing with family/friends (including flat-sharing)',
            },
            {
              value:
                'Supported accommodation/supported lodgings/supported group home (i.e. accommodation supported by staff or resident care taker)',
              label:
                'Supported accommodation/supported lodgings/supported group home (i.e. accommodation supported by staff or resident care taker)',
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
              value:
                'Sheltered housing, extra care housing or other sheltered housing',
              label:
                'Sheltered housing, extra care housing or other sheltered housing',
            },
            {
              value:
                'Mobile accommodation for Gypsy, Roma and Traveller communities',
              label:
                'Mobile accommodation for Gypsy, Roma and Traveller communities',
            },
            {
              value: 'Rough sleeper/squatting',
              label: 'Rough sleeper/squatting',
            },
            {
              value:
                'Night shelter, emergency hostel or direct access hostel (temporary accommodation accepting self-referrals)',
              label:
                'Night shelter, emergency hostel or direct access hostel (temporary accommodation accepting self-referrals)',
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
                'Acute/long-term healthcare residential facility or hospital (e.g. NHS Independent general hospital / clinic, long-stay hospital, specialist rehabilitation / recovery hospital)',
              label:
                'Acute/long-term healthcare residential facility or hospital (e.g. NHS Independent general hospital / clinic, long-stay hospital, specialist rehabilitation / recovery hospital)',
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
          id: 'maintaining your home in a sufficiently clean and safe condition your situation',
          question:
            'Maintaining your home in a sufficiently clean and safe condition. Your situation:',
          type: 'textarea',
        },
        {
          id: 'provide details of your needs and what you would like to achieve maintaining your home in a sufficiently clean and safe condition',
          question:
            'Provide details of your needs and what you would like to achieve (maintaining your home in a sufficiently clean and safe condition):',
          type: 'textarea',
        },
        {
          id: 'Can manage own day-to-day paperwork',
          question: 'Are you able to manage your own day-to-day paperwork?',
          hint: 'For example, household bills',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: "Details of your needs and what you'd like to achieve regarding paperwork",
          question:
            "Provide details of your needs and what you'd like to achieve regarding paperwork",
          hint: 'Include details of any Lasting Power of Attorney, Deputy or Appointee.',
          type: 'textarea',
          required: true,
          conditions: [
            {
              id: 'Can manage own day-to-day paperwork',
              value: 'No',
            },
          ],
        },

        {
          id: 'Can manage own finances',
          question: 'Are you able to manage your own finances?',
          required: true,
          hint: 'For example, credit cards or rent',
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'No',
              label: 'No',
            },
          ],
        },
        {
          id: "Details of your needs and what you'd like to achieve regarding finances",
          question:
            "Provide details of your needs and what you'd like to achieve regarding finances",
          hint: 'Include details of any Lasting Power of Attorney, Deputy or Appointee. If appropriate, you may wish to be referred for advice on finances and/or maximising your benefits',
          type: 'textarea',
          required: true,
          conditions: [
            {
              id: 'Can manage own finances',
              value: 'No',
            },
          ],
        },

        {
          id: 'Can access and use the internet',
          question: 'Are you able to access and use the internet?',
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
          id: 'Using specialist technology to  manage at home?',
          question:
            'Are you using specialist technology to help you manage at home?',
          hint: 'For example, telecare',
          type: 'radios',
          required: true,
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
          id: 'Details about technology',
          question: 'Provide details about the technology you use',
          required: true,
          conditions: [
            {
              id: 'Using specialist technology to  manage at home?',
              value: 'Yes',
            },
          ],
          type: 'textarea',
        },
        {
          id: 'Concerns about your current home living situation?',
          question:
            'Do you have any concerns about your current home living situation?',
          hint: 'For example, tenure, access hazards, temperature, need for adaptations, smoke or carbon monoxide alarms',
          type: 'radios',
          required: true,
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
          id: 'Details about your living situation concerns',
          question: 'Provide details about your living situation concerns',
          required: true,
          conditions: [
            {
              id: 'Concerns about your current home living situation?',
              value: 'Yes',
            },
          ],
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Eating healthily and safely',
      name: 'Eating healthily and safely',
      theme: 'Your care needs',
      intro:
        "The assessment is based on a typical week. It includes the eligibility outcome 'managing and maintaining nutrition'. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare.",
      fields: [
        {
          id: 'About eating and drinking in general',
          question: 'About eating and drinking in general',
          type: 'textarea',
        },
        {
          id: 'Shopping for food and essentials',
          question: 'About shopping for food and essentials',
          type: 'textarea',
        },
        {
          id: 'Preparing meals, snacks or drinks',
          question: 'About preparing meals, snacks or drinks',
          type: 'textarea',
        },
        {
          id: 'How often do you need support?',
          question: 'How often do you need support eating healthily & safely?',
          type: 'text',
        },
        {
          id: 'Details',
          question:
            'Provide details of your needs and what you would like to achieve',
          hint: 'For example, shopping, preparing meals, snacks and drinks, eating and drinking',
          type: 'textarea',
        },
        {
          id: 'if you need someone else to feed you are you able to have food and drink by mouth',
          question:
            'If you need someone else to feed you, are you able to have food and drink by mouth?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'if you need someone else to feed you how long does it usually take',
          question:
            'If you need someone else to feed you how long does it usually take?',
          type: 'text',
        },
        {
          id: 'Other dietary or eating difficulties?',
          question:
            'Do you have any other dietary or eating difficulties that put you at risk or require skilled support?',
          required: true,
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
          id: 'Details of difficulties',
          question: 'Provide details of these difficulties',
          type: 'textarea',
          required: true,
          conditions: [
            {
              id: 'Other dietary or eating difficulties?',
              value: 'Yes',
            },
          ],
        },
      ],
    },
    {
      id: 'Your personal care',
      name: 'Your personal care',
      theme: 'Your care needs',
      intro:
        "Includes the eligibility outcomes 'managing toilet needs', 'maintaining personal hygiene' and 'being appropriately clothed'. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare.",
      fields: [
        {
          id: 'About using the toilet and managing continence',
          question: 'About using the toilet and managing continence',
          type: 'textarea',
        },
        {
          id: 'How often do you need support using the toilet?',
          question: 'How often do you need support using the toilet?',
          type: 'text',
        },
        {
          id: 'Kind of support',
          question: 'What kind of support?',
          type: 'textarea',
        },
        {
          id: 'Details of your needs and what you would like to achieve using the toilet managing continence',
          question:
            'Provide details of your needs and what you would like to achieve',
          hint: 'Regarding using the toilet and managing continence',
          type: 'textarea',
        },
        {
          id: 'maintaining personal hygiene eg washing hands face hair nails shave your situation',
          question: 'About maintaining personal hygiene',
          hint: 'For example,  washing hands and face, hair, nails, shaving',
          type: 'textarea',
        },
        {
          id: 'About washing your whole body',
          question: 'About washing your whole body',
          hint: 'For example, bath, shower, strip wash',
          type: 'textarea',
        },
        {
          id: 'How often do you need support managing personal hygiene?',
          question: 'How often do you need support managing personal hygiene?',
          type: 'text',
        },
        {
          id: 'details of your needs and what you would like to achieve maintaining personal hygiene washing whole body',
          question: 'Details of your needs and what you would like to achieve',
          hint: 'For example, maintaining personal hygiene, washing whole body',
          type: 'textarea',
        },
        {
          id: 'About dressing',
          question: 'About dressing',
          type: 'textarea',
        },
        {
          id: 'About undressing',
          question: 'About undressing',
          type: 'textarea',
        },
        {
          id: 'details of your needs and what you would like to achieve dressing and undressing',
          question: 'Details of your needs and what you would like to achieve',
          hint: 'Regarding dressing and undressing',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Your mobility',
      name: 'Your mobility',
      theme: 'Your care needs',
      intro:
        'Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This should be based on a typical week.',
      fields: [
        {
          id: 'moving around your home your situation',
          question: 'Moving around your home.  Your situation:',
          type: 'textarea',
        },
        {
          id: 'transfers your situation',
          question: 'Transfers.  Your situation:',
          type: 'textarea',
        },
        {
          id: 'to what extent does your weight impact on your mobility eg if overweight or underweight frail',
          question:
            'To what extent does your weight impact on your mobility? (e.g. if overweight or underweight / frail)',
          type: 'textarea',
        },
        {
          id: 'is there a risk of harm to others when assisting with your mobility transfers',
          question:
            'Is there a risk of harm to others when assisting with your mobility / transfers?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'provide details of your needs moving around the home transfers',
          question:
            'Provide details of your needs (moving around the home, transfers):',
          type: 'textarea',
        },
        {
          id: 'staying comfortable repositioning your situation',
          question: 'Staying comfortable / repositioning.  Your situation:',
          type: 'textarea',
        },
        {
          id: 'provide details of your needs staying comfortable repositioning',
          question:
            'Provide details of your needs (staying comfortable / repositioning):',
          type: 'textarea',
        },
        {
          id: 'do you require regular support for a skin condition or to prevent one developing your situation',
          question:
            'Do you require regular support for a skin condition or to prevent one developing?  Your situation:',
          type: 'textarea',
        },
        {
          id: 'do you have any pressure ulcers your situation',
          question: 'Do you have any pressure ulcers? Your situation:',
          type: 'textarea',
        },
        {
          id: 'if pressure ulcers are present is treatment currently working',
          question:
            'If pressure ulcer(s) are present, is treatment currently working?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
            {
              value: 'not applicable',
              label: 'Not applicable',
            },
          ],
        },
        {
          id: 'provide details of your needs managing skin conditions',
          question: 'Provide details of your needs (managing skin conditions):',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'social relationships and activities',
      name: 'Social relationships and activities',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcomes: - Developing and maintaining family or other personal relationships - Making use of necessary facilities or services in the local community, including public transport and recreational facilities or services. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'provide details of your needs and what you would like to achieve maintaining relationships that are important to you',
          question:
            'Provide details of your needs and what you would like to achieve (maintaining relationships that are important to you):',
          type: 'textarea',
        },
        {
          id: 'are you able to access the community',
          question: 'Are you able to access the community?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes-independently',
              label: 'Yes, independently',
            },
            {
              value: 'yes-if-accompanied',
              label: 'Yes, if accompanied',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'the support you need to stay safe out in the community',
          question: 'The support you need to stay safe out in the community.',
          type: 'textarea',
        },
        {
          id: 'provide details of your needs staying safe in the community',
          question:
            'Provide details of your needs (staying safe in the community):',
          type: 'textarea',
        },
        {
          id: 'details of your needs and what you would like to achieve socialising contributing to society',
          question:
            'Details of your needs and what you would like to achieve (socialising, contributing to society):',
          type: 'textarea',
        },
        {
          id: 'the support you need to maintain personal relationships and engage in social activities including leisure cultural and spiritual activities',
          question:
            'The support you need to maintain personal relationships and engage in social activities (including leisure, cultural and spiritual activities):',
          type: 'textarea',
        },
        {
          id: 'managing relationships and staying safe in the community how often do you need support',
          question:
            'Managing relationships and Staying safe in the community:  How often do you need support?',
          type: 'text',
        },
      ],
    },
    {
      id: 'work training education and volunteering',
      name: 'Work, training, education and volunteering',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcomes: Accessing and engaging in work, training, education or volunteering. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'current paid employment or voluntary work situation',
          question: 'Current paid employment or voluntary work situation:',
          type: 'textarea',
        },
        {
          id: 'current education or training situation',
          question: 'Current education or training situation:',
          type: 'textarea',
        },
        {
          id: 'what would you like to improve or change about your involvement in work training education or volunteering',
          question:
            'What would you like to improve or change about your involvement in work, training, education or volunteering?',
          hint: ' (Details of your needs and what you would like to achieve (work, training, education or volunteering)',
          type: 'textarea',
        },
        {
          id: 'the support you need to participate in work training education and volunteering',
          question:
            'The support you need to participate in work, training, education and volunteering?',
          type: 'textarea',
        },
        {
          id: 'work training education or volunteering how often do you need support ',
          question:
            'Work, Training Education or Volunteering:  How often do you need support? ',
          type: 'text',
        },
      ],
    },
    {
      id: 'caring for others',
      name: 'Caring for others',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcome: Carrying out any caring responsibilities for a child.Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'Any dependent children?',
          question: 'Do you have any children that are dependent on you?',
          type: 'radios',
          required: true,
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
          id: 'Support needed with parenting/caring?',
          question:
            'Do you need support with your parenting or caring responsibilities?',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'Any dependent children?',
              value: 'Yes',
            },
          ],
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
          id: 'details of your needs and what you would like to achieve caring for children',
          question:
            'Details of your needs and what you would like to achieve (caring for children)',
          type: 'textarea',
          required: true,
          conditions: [
            {
              id: 'Any dependent children?',
              value: 'Yes',
            },
          ],
        },
        {
          id: 'Any other caring responsibilities?',
          question: 'Do you have any other caring responsibilities?',
          required: true,
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
          id: 'details of your needs caring for other adults',
          question: 'Details of your needs (caring for other adults):',
          hint: "If you are providing care or support to other adults, you should be offered a Carer's assessment to discuss your caring role.",
          type: 'textarea',
          conditions: [
            {
              id: 'Any other caring responsibilities?',
              value: 'Yes',
            },
          ],
        },
      ],
    },
    {
      id: 'staying safe at home',
      name: 'Staying safe at home',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcome: Being able to make use of your home safely. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'the support you need to stay safe at home during the day consider risk of falls and or wandering and responding to emergencies',
          question:
            'The support you need to stay safe at home during the day (consider risk of falls and / or wandering, and responding to emergencies):',
          type: 'textarea',
        },
        {
          id: 'the support you need to stay safe at home during the night consider risk of falls and or wandering and responding to emergencies',
          question:
            'The support you need to stay safe at home during the night (consider risk of falls and / or wandering, and responding to emergencies)?',
          type: 'textarea',
        },
        {
          id: 'details of your needs and what you would like to achieve making safe use of your home',
          question:
            'Details of your needs and what you would like to achieve (making safe use of your home):',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'risks',
      name: 'Risks',
      theme: 'Your care needs',
      intro:
        'Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'is there a current risk of falls',
          question: 'Is there a current risk of falls?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'is there a current risk of selfneglect causing deterioration to health or safety',
          question:
            'Is there a current risk of self-neglect causing deterioration to health or safety?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'is there a current risk of self harm to self eg selfinjury',
          question:
            'Is there a current risk of self harm to self (e.g. self injury)?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'is there a current risk of harm or injury to your carer if you have one',
          question:
            'Is there a current risk of harm or injury to your carer, if you have one?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'is there a current risk of harm to others or property',
          question: 'Is there a current risk of harm to others or property?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'details of how risks can be minimised ',
          question: 'Details of how risks can be minimised: ',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'your mental health and wellbeing',
      name: 'Your mental health and wellbeing',
      theme: 'Your care needs',
      intro:
        'Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This should including mental wellbeing issues arising from physical conditions.',
      fields: [
        {
          id: 'Have or have ever suffered from a serious mental health issue?',
          question:
            'Do you or have you ever suffered from a serious mental health issue?',
          required: true,
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
          id: 'Contact with mental health services in the past year?',
          question:
            'Have you had contact with mental health services in the past year?',
          required: true,
          type: 'radios',
          conditions: [
            {
              id: 'Have or have ever suffered from a serious mental health issue?',
              value: 'Yes',
            },
          ],
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
          id: 'Details about the serious mental health issue',
          question: 'Provide details about the serious mental health issue',
          type: 'textarea',
          required: true,
          conditions: [
            {
              id: 'Have or have ever suffered from a serious mental health issue?',
              value: 'Yes',
            },
          ],
        },
        {
          id: 'provide details of your needs emotional wellbeing',
          question: 'Provide details of your needs (emotional wellbeing):',
          type: 'textarea',
        },
        {
          id: 'memory orientation',
          question: 'Memory / orientation:',
          type: 'textarea',
        },
        {
          id: 'planning and decisionmaking',
          question: 'Planning and decision making:',
          type: 'textarea',
        },
        {
          id: 'details of your needs memory orientation planning and decisionmaking',
          question:
            'Details of your needs (memory / orientation, planning and decision making):',
          type: 'textarea',
        },
        {
          id: 'behaviour affecting self or others eg aggression selfharm',
          question:
            'Behaviour affecting self or others (e.g. aggression, self harm)',
          type: 'textarea',
        },
        {
          id: 'impact of your mood or wellbeing on your acceptance of support',
          question:
            'Impact of your mood or wellbeing on your acceptance of support:',
          type: 'textarea',
        },
        {
          id: 'details of your needs behaviour affecting self or others impact of mood wellbeing on acceptance of support',
          question:
            'Details of your needs (behaviour affecting self or others, impact of mood / wellbeing on acceptance of support):',
          type: 'textarea',
        },
        {
          id: 'how effective is the support of others in minimising risks to you or others around you',
          question:
            'How effective is the support of others in minimising risks to you or others around you?',
          type: 'textarea',
        },
        {
          id: 'emotional wellbeing further details',
          question: 'Emotional wellbeing   Further Details:',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'health conditions and disabilities that impact your wellbeing',
      name: 'Health conditions and disabilities that impact your wellbeing',
      theme: 'Your care needs',
      intro:
        'List your disabilities, impairments and health conditions in order of most to least impact on your daily life and wellbeing:',
      fields: [
        {
          id: 'list your disabilities impairments and health conditions in order of most to least impact on your daily life and wellbeing',
          question:
            'List your disabilities, impairments and health conditions in order of most to least impact on your daily life and wellbeing:',
          type: 'textarea',
        },
        {
          id: 'provide details including relevant medical history',
          question: 'Provide details (including relevant medical history):',
          type: 'textarea',
        },
        {
          id: 'how often do your needs significantly change vary due to your conditions',
          question:
            'How often do your needs significantly change / vary due to your condition(s)?',
          type: 'textarea',
        },
        {
          id: 'health conditions further details',
          question: 'Health conditions   Further Details:',
          type: 'textarea',
        },
        {
          id: 'impact of sensory impairment',
          question: 'Impact of sensory impairment:',
          type: 'textarea',
        },
        {
          id: 'details of your needs sensory impairment',
          question: 'Details of your needs (sensory impairment):',
          hint: 'If you have a significant sensory impairment, you may need to be referred for a specialist sensory assessment.',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'your medication and symptoms',
      name: 'Your medication and symptoms',
      theme: 'Your care needs',
      intro:
        'Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical .',
      fields: [
        {
          id: 'Any prescribed medication?',
          question: 'Are you currently taking any prescribed medication?',
          required: true,
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
          id: 'What support do you need with taking or applying medication?',
          question:
            'What support do you need with taking or applying medication?',
          type: 'textarea',
          required: true,
          conditions: [
            {
              id: 'Any prescribed medication?',
              value: 'Yes',
            },
          ],
        },
        {
          id: 'How often do you need support with medication and symptoms?',
          question:
            'How often do you need support with medication and symptoms?',
          type: 'text',
        },
        {
          id: 'details of your needs medication',
          question: 'Details of your needs (medication):',
          type: 'textarea',
        },
        {
          id: 'Does your physical condition or any medication that you are taking cause you pain or distress?',
          question:
            'Does your physical condition or any medication that you are taking cause you pain or distress?',
          type: 'radios',
          required: true,
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
          id: 'Are you getting adequate relief from pain or other distressing physical symptoms?',
          question:
            'Are you getting adequate relief from pain or other distressing physical symptoms?',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'Does your physical condition or any medication that you are taking cause you pain or distress?',
              value: 'Yes',
            },
          ],
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
          id: 'Provide details of your managing pain and distress needs',
          question: 'Provide details of your managing pain and distress needs',
          type: 'textarea',
          required: true,
          conditions: [
            {
              id: 'Does your physical condition or any medication that you are taking cause you pain or distress?',
              value: 'Yes',
            },
          ],
        },
        {
          id: 'Any difficulties with breathing?',
          question: 'Do you have any difficulties with breathing?',
          required: true,
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
          id: 'Do you need equipment to help you breathe?',
          question: 'Do you need equipment to help you breathe?',
          required: true,
          type: 'radios',
          conditions: [
            {
              id: 'Any difficulties with breathing?',
              value: 'Yes',
            },
          ],
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
          id: 'Provide details of your breathing needs',
          required: true,
          question: 'Provide details of your breathing needs',
          type: 'textarea',
          conditions: [
            {
              id: 'Any difficulties with breathing?',
              value: 'Yes',
            },
          ],
        },

        {
          id: 'Any difficulties maintaining consciousness?',
          question: 'Do you have any difficulties maintaining consciousness?',
          hint: 'For example, epilepsy, seizures or blackouts',
          required: true,
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
          id: 'Provide details of your maintaining consciousness needs',
          question: 'Provide details of your maintaining consciousness needs',
          type: 'textarea',
          required: true,
          conditions: [
            {
              id: 'Any difficulties maintaining consciousness?',
              value: 'Yes',
            },
          ],
        },
      ],
    },
    {
      id: 'Ongoing support from family, friends or volunteers',
      name: 'Ongoing support from family, friends or volunteers',
      theme: 'Your care needs',
      intro: 'Based on a typical week.',
      fields: [
        {
          id: 'details of support you currently receive from family friends or volunteers including whats working well and not so well',
          question:
            "Details of support you currently receive from family, friends, or volunteers (including what's working well and not so well):",
          type: 'textarea',
        },
        {
          //add conditional to go to section 20 if answer no
          id: 'will you receive ongoing support from family friends or volunteers',
          question:
            'Will you receive ongoing support from family, friends or volunteers?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
      ],
    },
    {
      id: 'receiving ongoing support',
      name: 'Receiving ongoing support',
      theme: 'Your care needs',
      intro:
        'Detail the ongoing support received from family, friends or volunteers',
      fields: [
        {
          id: 'keeping your home safe and clean',
          question: 'Keeping your home safe and clean:',
          type: 'textarea',
        },
        {
          id: 'managing your paperwork and finances',
          question: 'Managing your paperwork and finances:',
          type: 'textarea',
        },
        {
          id: 'shopping for your food essential items',
          question: 'Shopping for your food / essential items:',
          type: 'textarea',
        },
        {
          type: 'checkboxes',
          question:
            'Preparing your meals / snacks / drinks and helping you to eat and drink:',
          id: 'Preparing your meals / snacks / drinks and helping you to eat and drink:',
          choices: [
            { value: 'Morning', label: 'Morning' },
            { value: 'Daytimes', label: 'Daytimes' },
            { value: 'Evenings', label: 'Evenings' },
          ],
        },
        {
          type: 'checkboxes',
          question:
            'Managing your personal care tasks(using toilet / managing continence, washing, dressing / undressing):',
          id: 'Managing your personal care tasks(using toilet / managing continence, washing, dressing / undressing):',
          choices: [
            { value: 'Morning', label: 'Morning' },
            { value: 'Daytimes', label: 'Daytimes' },
            { value: 'Evenings', label: 'Evenings' },
          ],
        },
        {
          type: 'checkboxes',
          question: 'Supporting your medication:',
          id: 'Supporting your medication:',
          choices: [
            { value: 'Morning', label: 'Morning' },
            { value: 'Daytimes', label: 'Daytimes' },
            { value: 'Evenings', label: 'Evenings' },
          ],
        },

        {
          id: 'social leisure education and spiritual activities',
          question: 'Social, leisure, education and spiritual activities:',
          type: 'textarea',
        },
        {
          id: 'work training education or volunteering',
          question: 'Work, training education or volunteering:',
          type: 'textarea',
        },
        {
          id: 'supporting you during the night',
          question: 'Supporting you during the night:',
          type: 'textarea',
        },
        {
          type: 'checkboxes',
          question: 'Other ongoing support:',
          id: 'Other ongoing support:',
          choices: [
            {
              value: 'Escorting you or providing transport',
              label: 'Escorting you or providing transport',
            },
            {
              value: 'Providing company and emotional support',
              label: 'Providing company and emotional support',
            },
            {
              value: 'Helping you communicate with others',
              label: 'Helping you communicate with others',
            },
            {
              value: 'Helping you care for children',
              label: 'Helping you care for children',
            },
          ],
        },
        {
          id: 'details of all ongoing support to be provided by family friends or volunteers where this is safe and can be sustained',
          question:
            'Details of all ongoing support to be provided by family friends or volunteers (where this is safe and can be sustained):',
          type: 'textarea',
        },
        {
          id: 'are there any people in particular who provide you with a high level of support',
          question:
            'Are there any people in particular who provide you with a high level of support?                                                 ',
          hint: "If 'Yes' your carer(s) should be offered a joint or separate carer's assessment to discuss their caring role(s).",
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
      ],
    },
    {
      id: 'Carer',
      name: 'Carer',
      theme: 'Your care needs',
      fields: [
        {
          id: 'Has carer?',
          question: 'Do you have a carer?',
          type: 'radios',
          required: true,
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
          id: 'assessment is completed with a carer present does the carer agree this was a joint assessment',
          question:
            'If assessment is completed with a carer present, does the carer agree this was a joint assessment? ',
          type: 'radios',
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
          ],
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
            {
              value: 'not applicable',
              label: 'Not applicable',
            },
          ],
        },
        {
          id: 'carer mosaic id ',
          question: "Carer's social care ID",
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
          ],
          hint: 'Also known as a Mosaic ID or emergency ID.',
          type: 'text',
          className: 'govuk-input--width-10',
        },
        {
          id: "Carer's NHS number",
          question: "Carer's NHS number",
          type: 'text',
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
          ],
          className: 'govuk-input--width-10',
        },
        {
          id: "Carer's first name",
          question: "Carer's first name",
          type: 'text',
          required: true,
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
          ],
          className: 'govuk-input--width-20',
        },
        {
          id: "Carer's last name",
          question: "Carer's last name",
          type: 'text',
          required: true,
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
          ],
          className: 'govuk-input--width-20',
        },
        {
          id: 'Information and advice provided to carer?',
          question: 'Has information and advice been provided to the carer?',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
          ],
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
          id: "Impact of caring on your main carer's independence",
          question:
            "What is the impact of caring on your main carer's independence",
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
          ],
          required: true,
          type: 'textarea',
        },
        {
          id: 'Support arrangements in place if your main carer(s) are ill or unavailable?',
          question:
            'Are arrangements in place to support you if your main carer(s) are ill or unavailable?',
          required: true,
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
          ],
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
          id: 'details of impact and arrangements',
          question: 'Details of impact and arrangements:',
          required: true,
          conditions: [
            {
              id: 'Has carer?',
              value: 'Yes',
            },
            {
              id: 'Support arrangements in place if your main carer(s) are ill or unavailable?',
              value: 'Yes',
            },
          ],
          type: 'textarea',
        },
      ],
    },
    {
      id: 'further details',
      name: 'Further details',
      theme: 'Your care needs',
      intro:
        'To be completed by a social care authorised person, where relevant',
      fields: [
        {
          id: 'are full breaks through the year required to sustain the ongoing caring situation',
          question:
            'Are full breaks (through the year) required to sustain the ongoing caring situation?',
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
          type: 'select',
          question: 'Primary support reason',
          required: true,
          id: 'Primary support reason',
          choices: [
            {
              value: 'Physical support - access & mobility only',
              label: 'Physical support - access & mobility only',
            },
            {
              value: 'Physical support - personal care and support',
              label: 'Physical support - personal care and support',
            },
            {
              value: 'Sensory support - support for visual impairment',
              label: 'Sensory support - support for visual impairment',
            },
            {
              value: 'Sensory support - support for hearing impairment',
              label: 'Sensory support - support for hearing impairment',
            },
            {
              value: 'Sensory support - support for dual impairment',
              label: 'Sensory support - support for dual impairment',
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
              value: 'Social support - substance misuse support',
              label: 'Social support - substance misuse support',
            },
            {
              value: 'Social support - asylum seeker support',
              label: 'Social support - asylum seeker support',
            },
            {
              value: 'Social support - support for social isolation/Other',
              label: 'Social support - support for social isolation/Other',
            },
          ],
        },
        {
          id: 'anticipated living situation',
          question: 'Anticipated living situation',
          type: 'textarea',
        },
        {
          id: 'number sharing support in anticipated living situation',
          question: 'Number sharing support in anticipated living situation',
          type: 'text',
          className: 'govuk-input--width-5',
        },
      ],
    },
    {
      id: 'information and advice given',
      name: 'Information and advice given',
      theme: 'Next steps',
      fields: [
        {
          id: 'has information and advice been provided',
          question: 'Has information and advice been provided?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'Information and advice provided about your current needs',
          question:
            'What information and advice has been provided about your current needs?',
          type: 'textarea',
        },
        {
          id: 'Information and advice provided about preventing or delaying needs in the future',
          question:
            'What information and advice has been provided about preventing or delaying needs in the future?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'About the assessor',
      name: 'About the assessor',
      theme: 'Next steps',
      intro: 'This section to be completed by a social care authorised person.',
      fields: [
        {
          id: 'date of contact which led to this assessment',
          question: 'Date of Contact (which led to this assessment)',
          required: true,
          type: 'date',
        },
        {
          id: 'date of assessment',
          question: 'Date of assessment',
          required: true,
          type: 'date',
        },
        {
          id: 'assessors name',
          question: "Assessor's name",
          required: true,
          type: 'text',
        },
        {
          id: 'assessors contact details',
          question: "Assessor's contact details",
          type: 'textarea',
          required: true,
        },
        {
          id: 'is this a supported selfassessment',
          question: 'Is this a supported self assessment?',
          required: true,
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
      id: 'Review',
      name: 'Review',
      theme: 'Next steps',
      fields: [
        {
          id: 'Is this a review?',
          question: 'Is this a review for an existing client?',
          required: true,
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
          id: "Client's current setting",
          question: "What is the client's current setting?",
          hint: 'If the person is in a hospital setting, give the most recent setting before going to hospital',
          type: 'radios',
          conditions: [
            {
              id: 'Is this a review?',
              value: 'Yes',
            },
          ],
          required: true,
          choices: [
            {
              value: 'Community (living at home, supported living)',
              label: 'Community (living at home, supported living)',
            },
            {
              value: 'Nursing care',
              label: 'Nursing care',
            },
            {
              value: 'Residential care',
              label: 'Residential care',
            },
          ],
        },
        {
          id: 'Kind of review',
          question: 'What kind of review?',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'Is this a review?',
              value: 'Yes',
            },
          ],
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
          question: 'What was the reason for this unplanned review?',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'Kind of review',
              value: 'Unplanned',
            },
            {
              id: 'Is this a review?',
              value: 'Yes',
            },
          ],
          choices: [
            {
              value: 'Hospital (planned and unplanned stays)',
              label: 'Hospital (planned and unplanned stays)',
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
              value: 'Something else',
              label: 'Something else',
            },
          ],
        },
      ],
    },
    {
      id: 'summary-of-your-assessment-and-eligibility',
      name: 'Summary of your assessment and eligibility',
      intro:
        'This section to be completed by a social care authorised person. The Local Authority has a duty to work with you and / or your representative(s) to prepare a care and support plan when all of the following statements apply.  1. Your needs arise from or are related to a physical or mental impairment or illness.2. As a result of your needs you are unable to achieve two or more of the eligible outcomes below. 3. As a result of being unable to achieve these outcomes there is or is likely to be, a significant impact on your wellbeing.',
      theme: 'Next steps',
      fields: [
        {
          id: '1--do-you-have-a-condition-as-a-result-of-either-your-physical-mental-sensory-learning-or-cognitive-disabilities-or-illnesses-substance-misuse-or-brain-injury',
          question:
            '1.  Do you have a condition as a result of either your physical, mental, sensory, learning or cognitive disabilities or illnesses, substance misuse or brain injury?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: '2-as-a-result-of-your-needs-are-you-unable-to-achieve-two-or-more-of-the-eligible-outcomes-below',
          question:
            '2. As a result of your needs are you unable to achieve two or more of the eligible outcomes below?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-maintain-a-habitable-home-environment-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Maintain a habitable home environment" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-manage-and-maintain-nutrition-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Manage and maintain nutrition" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-manage-toilet-needs-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Manage toilet needs" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-maintain-personal-hygiene-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Maintain personal hygiene" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-be-appropriately-clothed-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Be appropriately clothed" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-develop-and-maintain-family-or-other-personal-relationships-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Develop and maintain family or other personal relationships" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-make-use-of-necessary-facilities-or-services-in-local-community-including-public-transport-and-recreational-facilitiesservices-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Make use of necessary facilities or services in local community (including public transport and recreational facilities/services)" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-access-and-engage-in-work-training-education-or-volunteering-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Access and engage in work, training, education or volunteering" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'can-you-carry-out-any-caring-responsibilities-for-a-child-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Carry out any caring responsibilities for a child" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'are-you-be-able-to-make-use-of-your-home-safely-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Are you "Be able to make use of your home safely" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
        {
          id: 'Summary of assessment',
          question: 'Summary of assessment',
          type: 'textarea',
        },
        {
          id: '3-as-a-result-of-being-unable-to-achieve-these-outcomes-there-is-or-is-likely-to-be-a-significant-impact-on-your-wellbeing',
          question:
            '3. As a result of being unable to achieve these outcomes there is or is likely to be, a significant impact on your wellbeing.',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            },
          ],
        },
      ],
    },
    {
      id: 'Impact on wellbeing',
      name: 'Impact on wellbeing',
      theme: 'Next steps',
      intro:
        'The impact on your wellbeing should be looked at disregarding any support you may already have and should take into account all assessment areas.',
      fields: [
        {
          id: 'Details of wellbeing impact',
          question: 'Details of the impact on your wellbeing',
          hint: 'Include the views of your representative, if relevant',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Next actions',
      name: 'Next actions',
      theme: 'Next steps',
      intro:
        'This assessment was conducted in line with the Care Act 2014, and I have to the best of my knowledge, gathered as much information and evidence as possible, with the adult concerned, and in certain circumstances due to Covid related risks, this may have been conducted remotely. With their consent, I have spoken with other professionals involved with the adult as part of the MDT, as well as family, carers, friends and voluntary organisations who know the adult. In this proportionate Care Act assessment, I have sought to adhere to the Ethics Framework and the ECHR, particularly S 2 3 and 8.',
      fields: [
        {
          id: 'What next?',
          question: 'What next?',
          type: 'radios',
          required: true,
          hint: 'Reablement and transfers to the long-term team count as support planning, but telecare and provisdion of immediate services do not.',
          choices: [
            {
              value: 'Continue to support planning',
              label: 'Continue to support planning',
            },
            {
              value: 'No further action (close case)',
              label: 'No further action (close case)',
            },
          ],
        },

        {
          id: 'Already receiving social care services?',
          question: 'Does this person already receive social care services?',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'Yes, existing service user',
              label: 'Yes, existing service user',
            },
            {
              value: 'No, new client',
              label: 'No, new client',
            },
          ],
        },

        {
          id: 'Outcome of contact',
          question: 'Outcome of contact',
          required: true,
          conditions: [
            {
              id: 'What next?',
              value: 'Continue to support planning',
            },
            {
              id: 'Already receiving social care services?',
              value: 'No, new client',
            },
          ],
          hint: 'Choose the first which applies',
          type: 'radios',
          choices: [
            {
              value: 'Intend to provide long term nursing care',
              label: 'Intend to provide long term nursing care',
            },
            {
              value: 'Intend to provide long term residential care',
              label: 'Intend to provide long term residential care',
            },
            {
              value: 'Intend to provide long term community support',
              label: 'Intend to provide long term community support',
            },
            {
              value:
                'Intend to provide end of life support, overseen by long-term team',
              label:
                'Intend to provide end of life support, overseen by long-term team',
            },
          ],
        },
        {
          id: 'Outcome of review',
          question: 'Outcome of review',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'What next?',
              value: 'Continue to support planning',
            },
            {
              id: 'Already receiving social care services?',
              value: 'Yes, existing service user',
            },
          ],
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
          ],
        },

        {
          id: 'Outcome of contact',
          question: 'Outcome of contact',
          hint: 'Choose the first which applies',
          type: 'radios',
          required: true,
          conditions: [
            {
              id: 'What next?',
              value: 'No further action (close case)',
            },
            {
              id: 'Already receiving social care services?',
              value: 'Yes, existing service user',
            },
          ],
          choices: [
            {
              value: 'Completely NHS-funded care',
              label: 'Completely NHS-funded care',
            },
            {
              value: 'End of life (not overseen by long term team)',
              label: 'End of life (not overseen by long term team)',
            },
            {
              value:
                'Ongoing low level support (provided with telecare or equipment/asdaptations)',
              label:
                'Ongoing low level support (provided with telecare or equipment/asdaptations)',
            },
            {
              value:
                'Other short term support (e.g. immediate Services - time-limited support, NOT reablement)',
              label:
                'Other short term support (e.g. immediate Services - time-limited support, NOT reablement)',
            },
            {
              value: 'Universal services/signposted to other services',
              label: 'Universal services/signposted to other services',
            },
            {
              value: 'No services provided - deceased',
              label: 'No services provided - deceased',
            },
            {
              value: 'No services provided - other reason',
              label: 'No services provided - other reason',
            },
          ],
        },
        {
          id: 'Outcome of contact',
          question: 'Outcome of contact',
          required: true,
          conditions: [
            {
              id: 'What next?',
              value: 'No further action (close case)',
            },
            {
              id: 'Already receiving social care services?',
              value: 'No, new client',
            },
          ],
          type: 'radios',
          choices: [
            {
              value: 'No change in setting - all long term support ended',
              label: 'No change in setting - all long term support ended',
            },
          ],
        },
      ],
    },
    {
      id: 'agreement',
      name: 'Agreement',
      theme: 'Next steps',
      fields: [
        {
          id: 'Declaration',
          question:
            'I/my supporter is satisfied that I and/or they were involved in this assessment as much as possible and that I/my supporter was able to express what I/they felt should be taken into account.',
          type: 'radios',
          choices: [
            {
              value: 'Agree',
              label: 'Agree',
            },
            {
              value: "Don't agree",
              label: "Don't agree",
            },
          ],
        },
        {
          id: 'Your name or name of your supporter',
          question: 'Your name or name of your supporter',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      id: 'Manager approval',
      name: 'Manager approval',
      theme: 'Next steps',
      fields: [
        {
          id: 'Approver email address',
          question: 'Who will approve this decision?',
          hint: 'For example, the email address of your manager',
          type: 'text',
          required: true,
          className: 'govuk-input--width-20',
        },
      ],
    },
  ],
};

export default form;
