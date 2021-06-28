import { Form } from './forms.types';

const form: Form = {
  id: 'face-overview-assessment-social-care',
  name: 'FACE Overview Assessment (Social Care)',
  steps: [
    {
      id: 'introduction',
      name: 'Introduction',
      theme: 'About you',
      fields: [
        {
          id: 'age-band-at-time-of-assessment',
          question: 'Age band at time of assessment',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: '18-to-64',
              label: '18 to 64',
            },
            {
              value: '65-and-over',
              label: '65 and over',
            },
          ],
        },
        {
          id: 'i-am-a-british-citizen',
          question: 'I am a British citizen',
          hint: '',
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
              value: 'not-known',
              label: 'Not known',
            },
          ],
        },
      ],
    },
    {
      //add conditional
      id: 'recourse-to-public-funds',
      name: 'Recourse to Public Funds',
      theme: 'Public funds',
      fields: [
        {
          id: 'Recourse to public funds',
          question: 'Does the person have recourse to public funds?',
          hint: '',
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
            {
              value: 'not-known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'nationality',
          condition: {
            id: 'Recourse to public funds',
            value: 'no',
          },
          question: 'Nationality',
          hint: '',
          type: 'text',
          required: true,
        },
        {
          id: 'national-insurance-number',
          question: 'National Insurance Number',
          condition: {
            id: 'Recourse to public funds',
            value: 'no',
          },
          hint: 'Please use the correct format: two prefix letters, six digits and one suffix letter. An example is QQ123456C.',
          type: 'text',
          required: true,
        },
        {
          id: 'passport-number',
          question: 'Passport number',
          condition: {
            id: 'Recourse to public funds',
            value: 'no',
          },
          required: true,
          hint: 'Please check the correct format is used for passport number (e.g. a UK passport has a nine digit number)',
          type: 'text',
        },
        {
          id: 'legal status immigration',
          question: 'Legal status - immigration',
          condition: {
            id: 'Recourse to public funds',
            value: 'no',
          },
          hint: '',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'application-pending',
              label: 'Application pending',
            },
            {
              value: 'application-refusedappeal-pending',
              label: 'Application refused - appeal pending?',
            },
            {
              value:
                'application-refused--exhausted-appeal-rights-so-no-option-to-appeal',
              label:
                'Application refused - exhausted appeal rights (so no option to appeal)',
            },
            {
              value: 'no-application-filed',
              label: 'No application filed',
            },
            {
              value: 'indefinite-leave-to-remain',
              label: 'Indefinite Leave to Remain',
            },
            {
              value: 'eea-national',
              label: 'EEA National',
            },
          ],
        },
        {
          id: 'start-date-of-legal-status',
          condition: {
            id: 'Recourse to public funds',
            value: 'no',
          },
          question: 'Start date of legal status',
          hint: '',
          required: true,
          type: 'date',
        },
        {
          id: 'legal-documents-seen',
          question: 'Legal documents seen?',
          condition: {
            id: 'Recourse to public funds',
            value: 'no',
          },
          hint: '',
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
          id: 'date-documents-seen',
          condition: {
            id: 'Recourse to public funds',
            value: 'no',
          },
          question: 'Date documents seen?',
          required: true,
          hint: '',
          type: 'date',
        },
        {
          id: 'details-of-documents-seen',
          condition: {
            id: 'Recourse to public funds',
            value: 'no',
          },
          question: 'Details of documents seen',
          required: true,
          hint: '',
          type: 'textarea',
        },
      ],
    },

    {
      id: 'Supporting you in your assessment',
      name: 'Supporting you in your assessment',
      theme: 'About you',
      intro:
        'If you have difficulties in communication, understanding or decision-making, you may need support for your involvement in your assessment, an advocate to represent you and help you explain your views, or a mental capacity assessment.',
      fields: [
        {
          id: 'preferred-language',
          question: 'Preferred language',
          hint: '',
          type: 'text',
        },
        {
          id: 'Do you need an interpreter',
          question: 'Do you need an interpreter?',
          hint: '',
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
          id: 'Do you consider yourself to be any of the following',
          question: 'Do you consider yourself to be any of the following?',
          hint: '',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'deaf',
              label: 'Deaf',
            },
            {
              value: 'blind',
              label: 'Blind',
            },
            {
              value: 'deaf blind',
              label: 'Deaf blind',
            },
            {
              value: 'not applicable',
              label: 'Not applicable',
            },
          ],
        },
        {
          id: 'if so do you have any communication difficulties',
          question: 'If so, do you have any communication difficulties?',
          hint: '',
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
          id: 'Do you have any difficulties with understanding and or relating information',
          question:
            'Do you have any difficulties with understanding and/or relating information?',
          hint: '',
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
          id: 'Do you have any difficulties making decision and or understanding their impact',
          question:
            'Do you have any difficulties making decision and/or understanding their impact?',
          hint: '',
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
          id: 'Do you require an advocate',
          question: 'Do you require an advocate?',
          hint: '',
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
          id: 'What would help you communicate more easily during your assessment',
          question:
            'Please provide details of difficulties and what would help you communicate more easily during your assessment (e.g. a family member or friend present, an independent advocate, specialist communication support)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Other people involved in your assessment',
          question:
            'Please list other people involved in your assessment (e.g. advocate, carer, family, friend, other professionals) Provide details including names, roles/relationship and contact details.',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'about you',
      name: 'About you',
      theme: 'About you',
      intro:
        'If appropriate, you may wish to be referred for financial advice and/or maximising your benefits.',
      fields: [
        {
          id: 'your personal family background include important recent events or changes in your life',
          question:
            'Your personal family background? (Include important recent events or changes in your life.)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'what areas of your life do you most enjoy or value include your main interests and where you can most contribute',
          question:
            'What areas of your life do you most enjoy or value? (Include your main interests and where you can most contribute.)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'what changes would most improve your wellbeing or quality of life',
          question:
            'What changes would most improve your wellbeing or quality of life?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'your family carers or advocates views',
          question: 'Your family, carer(s) or advocate’s views',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'do you have any concerns about how others treat you eg neglect abuse discrimination',
          question:
            'Do you have any concerns about how others treat you? (e.g. neglect, abuse, discrimination)',
          hint: '',
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
          id: 'if yes provide more details about how others treat you',
          question: 'If ‘Yes’, provide more details about how others treat you',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'your home and living situation',
      name: 'Your home and living situation',
      intro:
        'Includes the eligibility outcome: maintaining a habitable home environment. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations or telecare. Based on a typical week.',
      theme: 'About you',
      fields: [
        {
          id: 'are you currently staying in a hospital or other nhs facility',
          question:
            'Are you currently staying in a hospital or other NHS facility?',
          hint: '',
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
          id: 'what is your current living situation',
          question: 'What is your current living situation?',
          hint: '',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'lives-alone',
              label: 'Lives alone',
            },
            {
              value: 'lives-with-others',
              label: 'Lives with others',
            },
            {
              value: 'unknown',
              label: 'Unknown',
            },
          ],
        },
        {
          type: 'checkboxes',
          question: 'What is your current tenure?',
          required: true,
          id: 'What is your current tenure?',
          choices: [
            {
              value: 'Owner occupier or shared ownership scheme',
              label: 'Owner occupier or shared ownership scheme',
            },
            {
              value:
                'Tenant (including local authority, arm’s length management organisations, registered social landlord, housing association)',
              label:
                'Tenant (including local authority, arm’s length management organisations, registered social landlord, housing association)',
            },
            {
              value:
                'Settled mainstream housing with family or friends (including flat-sharing)',
              label:
                'Settled mainstream housing with family or friends (including flat-sharing)',
            },
            {
              value:
                'Supported accommodation / supported lodgings / supported group home (i.e. accommodation supported by staff or resident care taker)',
              label:
                'Supported accommodation / supported lodgings / supported group home (i.e. accommodation supported by staff or resident care taker)',
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
                'Sheltered housing / extra care housing / other sheltered housing',
              label:
                'Sheltered housing / extra care housing / other sheltered housing',
            },
            {
              value:
                'Mobile accommodation for Gypsy/Roma and Traveller communities',
              label:
                'Mobile accommodation for Gypsy/Roma and Traveller communities',
            },
            {
              value: 'Rough sleeper or squatting',
              label: 'Rough sleeper or squatting',
            },
            {
              value:
                'Night shelter / emergency hostel / direct access hostel (temporary accommodation accepting self-referrals)',
              label:
                'Night shelter / emergency hostel / direct access hostel (temporary accommodation accepting self-referrals)',
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
              value: 'Staying with family or friends as a short-term guest',
              label: 'Staying with family or friends as a short-term guest',
            },
            {
              value:
                'Acute / long-term healthcare residential facility or hospital (e.g. NHS independent general hospital / clinic, long-stay hospital, specialist rehabilitation / recovery hospital)',
              label:
                'Acute / long-term healthcare residential facility or hospital (e.g. NHS independent general hospital / clinic, long-stay hospital, specialist rehabilitation / recovery hospital)',
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
              value: 'Prison / young offenders institution / detention centre',
              label: 'Prison / young offenders institution / detention centre',
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
          hint: '',
          type: 'textarea',
        },
        {
          id: 'provide details of your needs and what you would like to achieve maintaining your home in a sufficiently clean and safe condition',
          question:
            'Provide details of your needs and what you would like to achieve (maintaining your home in a sufficiently clean and safe condition):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'are you able to manage your own daytoday paperwork',
          question: 'Are you able to manage your own day-to-day paperwork?',
          hint: '',
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
          id: 'are you able to manage your own finances',
          question: 'Are you able to manage your own finances?',
          required: true,
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value:
                'no, please-include-details-of-any-lasting-power-of-attorney-deputy-or-appointee-below',
              label:
                'No - Please include details of any Lasting Power of Attorney, Deputy or Appointee below',
            },
          ],
        },
        {
          id: 'provide-details-of-your-needs-and-what-you-would-like-to-achieve-managing-paperwork-managing-finances',
          condition: {
            id: 'are you able to manage your own finances',
            value:
              'no, please-include-details-of-any-lasting-power-of-attorney-deputy-or-appointee-below',
          },
          question:
            'Provide details of your needs and what you would like to achieve (managing paperwork, managing finances):',
          hint: 'Please include details of any Lasting Power of Attorney, Deputy or Appointee. If appropriate, you may wish to be referred for financial advice and/or maximising your benefits',
          type: 'textarea',
        },
        {
          id: 'are-you-able-to-accessuse-the-internet',
          question: 'Are you able to access and use the Internet?',
          hint: '',
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
          id: 'are you using specialist technology to help you manage at home eg telecare',
          question:
            'Are you using specialist technology to help you manage at home? (e.g. telecare)',
          hint: '',
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
          id: 'further-details-using-technology',
          question: 'Further details: using technology',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'do you have any concerns about your current home living situation eg tenure access hazards temperature need for adaptations smoke carbon monoxide alarms',
          question:
            'Do you have any concerns about your current home living situation? (e.g. tenure, access or hazards, temperature, need for adaptations, smoke or carbon monoxide alarms)',
          hint: '',
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
          id: 'further details current living situation',
          question: 'Further details (current living situation)',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'eating healthily and safely',
      name: 'Eating healthily and safely',
      theme: 'Your care needs',
      intro:
        'The assessment is based on a typical week. It includes the eligibility outcome: Managing and maintaining nutrition. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare.',
      fields: [
        {
          id: 'shopping for food essentials your situation',
          question: 'Shopping for food and essentials. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'preparing meals snacks drinks your situation',
          question: 'Preparing meals, snacks, or drinks. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'eating healthily safely how often do you need support',
          question:
            'Eating healthily and safely: how often do you need support?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'eating and drinking--your-situation',
          question: 'Eating and drinking. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'provide details of your needs and what you would like to achieve shopping preparing meals snacks drinks eating and drinking',
          question:
            'Provide details of your needs and what you would like to achieve (shopping, preparing meals, snacks, or drinks, eating and drinking):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'if you need someone else to feed you are you able to have food and drink by mouth',
          question:
            'If you need someone else to feed you, are you able to have food and drink by mouth?',
          hint: '',
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
          hint: '',
          type: 'textarea',
        },
        {
          id: 'do you have any dietary or eating difficulties that put you at risk or require skilled support',
          question:
            'Do you have any dietary or eating difficulties that put you at risk or require skilled support?',
          hint: '',
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
          id: 'further details dietary or eating difficulties',
          question: 'Further Details (Dietary or eating difficulties)',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'your personal care',
      name: 'Your personal Care',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcomes such as managing toilet needs, maintaining personal hygiene, and being appropriately clothed. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare.',
      fields: [
        {
          id: 'using the toilet managing continence your situation',
          question: 'Using the toilet and managing continence. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'using the toilet how often do you need support',
          question: 'Using the toilet: how often do you need support?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'using the toilet nature of the support',
          question: 'Using the toilet: nature of the support:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'please provide details of your needs and what you would like to achieve using the toilet managing continence',
          question:
            'Please provide details of your needs and what you would like to achieve (using the toilet and managing continence):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'maintaining personal hygiene eg washing hands face hair nails shave your situation',
          question:
            'Maintaining personal hygiene (e.g. washing your hands, face, hair, nails, and shaving). Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'washing whole body eg bath shower strip wash your situation',
          question:
            'Washing whole body (e.g. bath, shower, strip wash). Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'managing personal hygiene how often do you need support ',
          question:
            'Managing personal hygiene: how often do you need support? ',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'details of your needs and what you would like to achieve maintaining personal hygiene washing whole body',
          question:
            'Details of your needs and what you would like to achieve (maintaining personal hygiene, washing whole body):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'dressing your situation',
          question: 'Dressing. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'undressing your situation',
          question: 'Undressing. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'details of your needs and what you would like to achieve dressing and undressing',
          question:
            'Details of your needs and what you would like to achieve (dressing and undressing):',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'your mobility',
      name: 'Your mobility',
      theme: 'Your care needs',
      intro:
        'Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This should be based on a typical week.',
      fields: [
        {
          id: 'moving around your home your situation',
          question: 'Moving around your home. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'transfers your situation',
          question: 'Transfers. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'to what extent does your weight impact on your mobility eg if overweight or underweight frail',
          question:
            'To what extent does your weight impact on your mobility? (e.g. if overweight, underweight or frail)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'is there a risk of harm to others when assisting with your mobility transfers',
          question:
            'Is there a risk of harm to others when assisting with your mobility or transfers?',
          hint: '',
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
          hint: '',
          type: 'textarea',
        },
        {
          id: 'staying comfortable repositioning your situation',
          question: 'Staying comfortable and repositioning. Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'provide details of your needs staying comfortable repositioning',
          question:
            'Provide details of your needs (staying comfortable and repositioning):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'do you require regular support for a skin condition or to prevent one developing your situation',
          question:
            'Do you require regular support for a skin condition or to prevent one developing? Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'do you have any pressure ulcers your situation',
          question: 'Do you have any pressure ulcers? Your situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'if pressure ulcers are present is treatment currently working',
          question:
            'If pressure ulcer(s) are present, is treatment currently working?',
          hint: '',
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
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'social relationships and activities',
      name: 'Social relationships and activities',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcomes such as developing and maintaining family or other personal relationships; making use of necessary facilities or services in the local community, including public transport and recreational facilities or services. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'provide details of your needs and what you would like to achieve maintaining relationships that are important to you',
          question:
            'Provide details of your needs and what you would like to achieve (maintaining relationships that are important to you):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'are you able to access the community',
          question: 'Are you able to access the community?',
          hint: '',
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
          hint: '',
          type: 'textarea',
        },
        {
          id: 'provide details of your needs staying safe in the community',
          question:
            'Provide details of your needs (staying safe in the community):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'details of your needs and what you would like to achieve socialising contributing to society',
          question:
            'Details of your needs and what you would like to achieve (socialising, contributing to society):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'the support you need to maintain personal relationships and engage in social activities including leisure cultural and spiritual activities',
          question:
            'The support you need to maintain personal relationships and engage in social activities (including leisure, cultural and spiritual activities):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'managing relationships and staying safe in the community how often do you need support',
          question:
            'Managing relationships and Staying safe in the community:  How often do you need support?',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'work training education and volunteering',
      name: 'Work, training, education and volunteering',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcomes of accessing and engaging in work, training, education or volunteering. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'current paid employment or voluntary work situation',
          question: 'Current paid employment or voluntary work situation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'current education or training situation',
          question: 'Current education or training situation:',
          hint: '',
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
          hint: '',
          type: 'textarea',
        },
        {
          id: 'work training education or volunteering how often do you need support ',
          question:
            'Work, training education or volunteering: how often do you need support? ',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'caring for others',
      name: 'Caring for others',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcome of carrying out any caring responsibilities for a child. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'do you have any children that are dependent on you',
          question: 'Do you have any children that are dependent on you?',
          hint: '',
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
          id: 'if yes do you need support with your parentingcaring responsibilities',
          question:
            'If "Yes" do you need support with your parenting/caring responsibilities?',
          hint: '',
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
              value: 'na',
              label: 'N/A',
            },
          ],
        },
        {
          id: 'details of your needs and what you would like to achieve caring for children',
          question:
            'Details of your needs and what you would like to achieve (caring for children)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'do you have any other caring responsibilities',
          question: 'Do you have any other caring responsibilities?',
          hint: '',
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
          id: 'details of your needs caring for other adults',
          question: 'Details of your needs (caring for other adults):',
          hint: "If you are providing care or support to other adults, you should be offered a Carer's assessment to discuss your caring role.",
          type: 'textarea',
        },
      ],
    },
    {
      id: 'staying safe at home',
      name: 'Staying safe at home',
      theme: 'Your care needs',
      intro:
        'Includes the eligibility outcome of being able to make use of your home safely. Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'the support you need to stay safe at home during the day consider risk of falls and or wandering and responding to emergencies',
          question:
            'The support you need to stay safe at home during the day (consider risk of falls and/or wandering, and responding to emergencies):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'the support you need to stay safe at home during the night consider risk of falls and or wandering and responding to emergencies',
          question:
            'The support you need to stay safe at home during the night (consider risk of falls and/or wandering, and responding to emergencies)?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'details of your needs and what you would like to achieve making safe use of your home',
          question:
            'Details of your needs and what you would like to achieve (making safe use of your home):',
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          id: 'do you or have you ever suffered from a serious mental health issue',
          question:
            'Do you or have you ever suffered from a serious mental health issue?',
          hint: '',
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
          id: 'have you had contact with mental health services in the past year',
          question:
            'Have you had contact with mental health services in the past year?',
          hint: '',
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
          id: 'mental health further details',
          question: 'Further details about your mental health:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'provide details of your needs emotional wellbeing',
          question: 'Provide details of your needs (emotional wellbeing):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'memory orientation',
          question: 'Memory/orientation:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'planning and decisionmaking',
          question: 'Planning and decision making:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'details of your needs memory orientation planning and decisionmaking',
          question:
            'Details of your needs (memory/orientation, planning and decision making):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'behaviour affecting self or others eg aggression selfharm',
          question:
            'Behaviour affecting self or others (e.g. aggression, self harm)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'impact of your mood or wellbeing on your acceptance of support',
          question:
            'Impact of your mood or wellbeing on your acceptance of support:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'details of your needs behaviour affecting self or others impact of mood wellbeing on acceptance of support',
          question:
            'Details of your needs (behaviour affecting self or others, impact of mood or wellbeing on acceptance of support):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'how effective is the support of others in minimising risks to you or others around you',
          question:
            'How effective is the support of others in minimising risks to you or others around you?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'emotional wellbeing further details',
          question: 'Further details about your emotional wellbeing:',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'health conditions and disabilities that impact your wellbeing',
      name: 'Health conditions and disabilities that impact your wellbeing',
      theme: 'Your care needs',
      fields: [
        {
          id: 'list your disabilities impairments and health conditions in order of most to least impact on your daily life and wellbeing',
          question:
            'List your disabilities, impairments and health conditions in order of most to least impact on your daily life and wellbeing:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'provide details including relevant medical history',
          question: 'Provide details (including relevant medical history):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'how often do your needs significantly change vary due to your conditions',
          question:
            'How often do your needs significantly change/vary due to your condition(s)?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'health conditions further details',
          question: 'Further details about your health conditions:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'impact of sensory impairment',
          question: 'Impact of sensory impairment:',
          hint: '',
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
        'Answer as if there is no support currently in place, but do consider the effect of existing equipment, adaptations, or telecare. This is based on a typical week.',
      fields: [
        {
          id: 'are you currently taking any prescribed medication',
          question: 'Are you currently taking any prescribed medication?',
          required: true,
          hint: '',
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
          id: ' what support do you need with taking or applying medication',
          question:
            'What support do you need with taking or applying medication?',
          condition: {
            id: 'are you currently taking any prescribed medication',
            value: 'yes',
          },
          hint: '',
          type: 'textarea',
        },
        {
          id: 'medication symptoms how often do you need support',
          question: 'Medication and symptoms: how often do you need support?',
          hint: '',
          condition: {
            id: 'are you currently taking any prescribed medication',
            value: 'yes',
          },
          type: 'textarea',
        },
        {
          id: 'details of your needs medication',
          question: 'Details of your needs (medication):',
          hint: '',
          condition: {
            id: 'are you currently taking any prescribed medication',
            value: 'yes',
          },
          type: 'textarea',
        },
        {
          id: 'does your physical condition or any medication that you are taking cause you pain or distress',
          question:
            'Does your physical condition or any medication that you are taking cause you pain or distress?',
          hint: '',
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
          id: 'are you getting adequate relief from pain or other distressing physical symptoms',
          question:
            'Are you getting adequate relief from pain or other distressing physical symptoms?',
          hint: '',
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
          id: 'details of your needs managing distress pain from health conditions',
          question:
            'Details of your needs (managing distress or pain from health conditions):',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'do you have any difficulties with breathing',
          question: 'Do you have any difficulties with breathing?',
          hint: '',
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
          id: 'do you need equipment to help you breathe',
          question: 'Do you need equipment to help you breathe?',
          hint: '',
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
          id: 'details of your needs breathing',
          type: 'textarea',
          question: 'Details of your needs (breathing):',
          hint: '',
          condition: {
            id: 'do you need equipment to help you breathe',
            value: 'yes',
          },
        },
        {
          id: 'difficulties maintaining consciousness',
          question:
            'Do you have any difficulties maintaining consciousness? (e.g. due to epilepsy, seizures or blackouts)',
          hint: '',
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
          id: 'details of your needs maintaining consciousness',
          question: 'Details of your needs (maintaining consciousness):',
          condition: {
            id: 'difficulties maintaining consciousness',
            value: 'yes',
          },
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'support you will receive on an ongoing basis from family friends volunteers',
      name: 'Current ongoing support from family, friends or volunteers',
      theme: 'Your care needs',
      intro: 'This is based on a typical week.',
      fields: [
        {
          id: 'details of support you currently receive from family friends or volunteers including whats working well and not so well',
          question:
            "Details of support you currently receive from family, friends, or volunteers (including what's working well and not so well):",
          hint: '',
          type: 'textarea',
        },
        {
          //add conditional to go to section 20 if answer no
          id: 'will you receive ongoing support from family friends or volunteers',
          question:
            'Will you receive ongoing support from family, friends or volunteers?',
          hint: '',
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
        'Detail the ongoing support to be provided by family, friends or volunteers (where this is safe and can be sustained)',
      fields: [
        {
          id: 'keeping your home safe and clean',
          question: 'Keeping your home safe and clean:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'managing your paperwork and finances',
          question: 'Managing your paperwork and finances:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'shopping for your food essential items',
          question: 'Shopping for your food or essential items:',
          hint: '',
          type: 'textarea',
        },
        {
          type: 'checkboxes',
          question:
            'Preparing your meals, snacks, or drinks and helping you to eat and drink:',
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
            'Managing your personal care tasks (using toilet and managing continence, washing, dressing and undressing):',
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
          hint: '',
          type: 'textarea',
        },
        {
          id: 'work training education or volunteering',
          question: 'Work, training education or volunteering:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'supporting you during the night',
          question: 'Supporting you during the night:',
          hint: '',
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
      id: 'carer-details',
      name: 'Carer details',
      theme: 'Your care needs',
      fields: [
        {
          id: 'do you have a carer',
          question: 'Do you have a carer?',
          hint: '',
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
          id: 'assessment is completed with a carer present does the carer agree this was a joint assessment',
          question:
            'If assessment is completed with a carer present, does the carer agree this was a joint assessment? ',
          hint: '',
          type: 'radios',
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
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
          question: 'Carer Mosaic ID ',
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
          hint: "Please enter Mosaic ID below if it is known. If Mosaic ID is NOT known (or if one has nevertheless been created) then please enter an 'Emergency ID (ASC)'",
          type: 'text',
        },
        {
          id: 'carer emergency id asc',
          question: 'Carer Emergency ID (ASC)',
          hint: '(Find or create an emergency ID number for this person in the list of numbers provided to your team, and enter it here)',
          type: 'text',
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
        },
        {
          id: 'carer nhs number',
          question: 'Carer NHS Number',
          hint: '(if known)',
          type: 'text',
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
        },
        {
          id: 'carer first name',
          question: 'Carer first name',
          hint: '',
          type: 'text',
          required: true,
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
        },
        {
          id: 'carer last name',
          question: 'Carer last name',
          hint: '',
          type: 'text',
          required: true,
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
        },
        {
          id: 'information and advice provided to carer',
          question: 'Information and advice provided to carer?',
          hint: '',
          type: 'radios',
          required: true,
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
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
          id: 'impact of caring on your main carers independence',
          question: "Impact of caring on your main carer's independence",
          hint: '',
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
          required: true,
          type: 'textarea',
        },
        {
          id: 'are arrangements in place to support you if your main carers are ill or unavailable',
          question:
            'Are arrangements in place to support you if your main carer(s) are ill or unavailable?',
          hint: '',
          required: true,
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
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
          id: 'details of impact and arrangements',
          question: 'Details of impact and arrangements:',
          required: true,
          condition: {
            id: 'do you have a carer',
            value: 'yes',
          },
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'further details',
      name: 'Further details',
      theme: 'Your care needs',
      intro:
        'To be completed by a social care authorised person, where relevant.',
      fields: [
        {
          id: 'are full breaks through the year required to sustain the ongoing caring situation',
          question:
            'Are full breaks (through the year) required to sustain the ongoing caring situation?',
          hint: '',
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
              value: 'na',
              label: 'N/A',
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
              value: 'Mental Health Support (ASC)',
              label: 'Mental Health Support (ASC)',
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
              value: 'Social support - support for social isolation (other)',
              label: 'Social support - support for social isolation (other)',
            },
          ],
        },
        {
          id: 'anticipated living situation',
          question: 'Anticipated living situation',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'number sharing support in anticipated living situation',
          question: 'Number sharing support in anticipated living situation',
          hint: '',
          type: 'text',
        },
      ],
    },
    {
      id: 'information and advice',
      name: 'Information and advice',
      theme: 'Next steps',
      fields: [
        {
          id: 'has information and advice been provided',
          question: 'Has information and advice been provided?',
          hint: '',
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
          id: 'information and advice about your current needs',
          question: 'Information and advice about your current needs:',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'information and advice about preventing or delaying the development of needs in the future',
          question:
            'Information and advice about preventing or delaying the development of needs in the future:',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'record of completion',
      name: 'Record of completion',
      theme: 'Next steps',
      intro: 'This section to be completed by a social care authorised person.',
      fields: [
        {
          id: 'date of contact which led to this assessment',
          question: 'Date of contact (which led to this assessment)',
          hint: '',
          required: true,
          type: 'date',
        },
        {
          id: 'date of assessment',
          question: 'Date of assessment',
          hint: '',
          required: true,
          type: 'date',
        },
        {
          id: 'assessors name',
          question: "Assessor's name",
          required: true,
          hint: '',
          type: 'text',
        },
        {
          id: 'assessors contact details',
          question: "Assessor's contact details",
          hint: '',
          type: 'textarea',
          required: true,
        },
        {
          id: 'is this a supported selfassessment',
          question: 'Is this a supported self assessment?',
          hint: '',
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
          id: 'is this person in receipt of services',
          question: 'Is this person in receipt of services?',
          hint: '',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'yes existing service user',
              label: 'Yes – existing service user',
            },
            {
              value: 'no new client',
              label: 'No – new client',
            },
          ],
        },
      ],
    },
    {
      id: 'review existing client',
      name: 'Review (Existing Client)',
      theme: 'Next steps',
      fields: [
        {
          id: 'what is the current setting for the person',
          question: 'What is the current setting for the person?',
          hint: 'If the person is in a hospital setting please state the most recent setting before going to hospital',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'community-eg-living-at-home-supported-living',
              label: 'Community (e.g. living at home, supported living)',
            },
            {
              value: 'nursing-care',
              label: 'Nursing Care',
            },
            {
              value: 'residential-care',
              label: 'Residential Care',
            },
          ],
        },
        {
          id: 'if this was a reassementreview is it',
          question: 'If this was a Reassement/Review, is it?',
          hint: '',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'planned',
              label: 'Planned',
            },
            {
              value: 'unplanned',
              label: 'Unplanned',
            },
          ],
        },
      ],
    },
    {
      id: 'unplanned-review',
      name: 'Unplanned Review',
      theme: 'Next steps',
      fields: [
        {
          id: 'reason-for-unplanned-review',
          question: 'Reason for Unplanned Review',
          hint: '',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'hospital-planned-and-unplanned-episodes',
              label: 'Hospital (Planned and Unplanned episodes)',
            },
            {
              value: 'carer-related',
              label: 'Carer related',
            },
            {
              value: 'safeguarding-concern',
              label: 'Safeguarding Concern',
            },
            {
              value: 'other-reason',
              label: 'Other Reason',
            },
            {
              value: 'provider-failure',
              label: 'Provider Failure',
            },
            {
              value: 'not-applicable',
              label: 'Not Applicable',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          hint: '',
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
          id: 'summary-of-assessment',
          question: 'Summary of Assessment',
          hint: '',
          type: 'textarea',
        },
        {
          id: '3-as-a-result-of-being-unable-to-achieve-these-outcomes-there-is-or-is-likely-to-be-a-significant-impact-on-your-wellbeing',
          question:
            '3. As a result of being unable to achieve these outcomes there is or is likely to be, a significant impact on your wellbeing.',
          hint: '',
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
      id: 'impact-on-wellbeing',
      name: 'Impact on Wellbeing',
      theme: 'Next steps',
      intro:
        "The impact on your wellbeing should be looked at disregarding any support you may already have and should take into account the following areas, as well as your (or your representative's) views: - Personal dignity and being treated with respect - Physical and mental health and emotional wellbeing - Protection from abuse and neglect - Suitability of living accommodation - Participation in work, education, training or recreation - Social and economic wellbeing - Domestic, family and personal relationships - Your contribution to society - Control over day-to-day life (including over care and support provided and the way it is provided).",
      fields: [
        {
          id: 'details-of-the-impact-on-your-wellbeing-in-the-absence-of-any-support-you-may-already-have-inplace',
          question:
            'Details of the impact on your wellbeing (in the absence of any support you may already have inplace):',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'next-actions-care-act-assessmentreview',
      name: 'Next Actions (Care Act Assessment/Review)',
      theme: 'Next steps',
      intro:
        'This assessment was conducted in line with the Care Act 2014, and I have to the best of my knowledge, gathered as much information and evidence as possible, with the adult concerned, and in certain circumstances due to Covid related risks, this may have been conducted remotely. With their consent, I have spoken with other professionals involved with the adult as part of the MDT, as well as family, carers, friends and voluntary organisations who know the adult. In this proportionate Care Act assessment, I have sought to adhere to the Ethics Framework and the ECHR, particularly S 2 3 and 8.',
      fields: [
        {
          id: 'what next workflow assessed',
          question: 'What Next - workflow (Assessed)',
          hint: "(if you are not transferring to the Long Term team and the person was also not accepted / eligible for reablement then choose 'Close Case / No Further Action' - e.g. provision of Immediate Services and / or Telecare falls within 'No Further Action' in this sense after the assessment is completed",
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'proceed to support planning',
              label: 'Proceed to Support Planning',
            },
            {
              value: 'no further-action close case',
              label: 'No Further Action / Close Case',
            },
          ],
        },
      ],
    },
    {
      id: 'proceed-to-support-planning',
      name: 'Proceed to Support Planning',
      theme: 'Next steps',
      fields: [
        {
          id: 'new or existing client at the time of the contact',
          question:
            'Was this a new or existing client at the time of the Contact',
          hint: '',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'new',
              label: 'New',
            },
            {
              value: 'existing',
              label: 'Existing',
            },
          ],
        },
        {
          id: 'outcomes-to-contact-sequel',
          question: 'Outcomes to Contact (Sequel)',
          condition: {
            id: 'new or existing client at the time of the contact',
            value: 'new',
          },
          hint: '(Choose the first which applies)',
          type: 'radios',
          choices: [
            {
              value: 'intention-to-provide--long-term-support-nursing-care',
              label: 'Intention to provide - Long Term Support (Nursing Care)',
            },
            {
              value: 'intention-to-provide--long-term-support-residential-care',
              label:
                'Intention to provide - Long Term Support (Residential Care)',
            },
            {
              value: 'intention-to-provide--long-term-support-community',
              label: 'Intention to provide - Long Term Support (Community)',
            },
            {
              value:
                'intention-to-provide--end-of-life-overseen-by-long-term-team',
              label:
                'Intention to provide - End of Life (overseen by Long Term team)',
            },
          ],
        },
        {
          id: 'outcomes-to-review-sequel',
          question: 'Outcomes to Review (Sequel)',
          hint: '',
          type: 'radios',
          condition: {
            id: 'new or existing client at the time of the contact',
            value: 'existing',
          },
          choices: [
            {
              value: 'change-in-setting--move-to-nursing-care-from-community',
              label:
                'Change in setting - Move to Nursing Care (from Community)',
            },
            {
              value:
                'change-in-setting--move-to-residential-care-from-community',
              label:
                'Change in setting - Move to Residential Care (from Community)',
            },
            {
              value:
                'no-change-in-setting--level-of-longterm-support-increased',
              label:
                'No Change in Setting - Level of Long-Term Support Increased',
            },
            {
              value: 'no-change-in-setting--no-change-in-long-term-support',
              label: 'No Change in Setting - No Change in Long Term Support',
            },
            {
              value:
                'no-change-in-setting--level-of-longterm-support-decreased',
              label:
                'No Change in Setting - Level of Long-Term Support Decreased',
            },
            {
              value:
                'no-change-in-setting--all-longterm-support-temporarily-suspended',
              label:
                'No Change in Setting - ALL Long-Term Support Temporarily Suspended',
            },
          ],
        },
      ],
    },
    {
      id: 'no-further-action--close-case',
      name: 'No Further Action / Close Case',
      theme: 'Next steps',
      fields: [
        {
          id: 'new or existing client at the time of the contact',
          question:
            'Was this a new or existing client (at the time of the Contact)',
          hint: '',
          type: 'radios',
          required: true,
          choices: [
            {
              value: 'new',
              label: 'New',
            },
            {
              value: 'existing',
              label: 'Existing',
            },
          ],
        },
        {
          id: 'outcomes-for-contact-sequel',
          question: 'Outcomes for Contact (Sequel)',
          hint: '(Choose the first which applies)',
          type: 'radios',
          condition: {
            id: 'new or existing client at the time of the contact',
            value: 'new',
          },
          required: true,
          choices: [
            {
              value: '100-nhs-funded-care',
              label: '100% NHS Funded Care',
            },
            {
              value: 'end-of-life-not-overseen-by-long-term-team',
              label: 'End of Life (not overseen by Long Term team)',
            },
            {
              value:
                'ongoing-low-level-support-provided-with-telecare-or-equipment--adaptations',
              label:
                'Ongoing Low Level Support (provided with Telecare or Equipment / Adaptations)',
            },
            {
              value:
                'short-term-support-other-eg-immediate-services--timelimited-support-not-reablement-',
              label:
                'Short Term Support (other) (e.g. Immediate Services - Time-limited support; NOT Reablement; )',
            },
            {
              value: 'universal-servicessignposted-to-other-services',
              label: 'Universal Services/Signposted to other services',
            },
            {
              value: 'no-services-provided--deceased',
              label: 'No services provided - Deceased',
            },
            {
              value: 'no-services-provided--other-reason-please-state-below',
              label: 'No services provided - other reason (please state below)',
            },
          ],
        },
        {
          id: 'outcomes-for-review-sequel',
          question: 'Outcomes for Review (Sequel)',
          required: true,
          condition: {
            id: 'new or existing client at the time of the contact',
            value: 'existing',
          },
          hint: 'Existing client not transferring back to Long Term team. Notify Brokerage to End Services',
          type: 'radios',
          choices: [
            {
              value: 'no-change-in-setting--all-long-term-support-ended',
              label: 'No Change in Setting - All Long Term Support Ended',
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
          id: 'i my supporter is satisfied that i and or she was involved in this assessment as much as possible and that i my supporter was able to express what i she felt should betaken into account',
          question:
            'I / my supporter is satisfied that I and / or s(he) was involved in this assessment as much as possible and that I / my supporter was able to express what I / s(he) felt should betaken into account:',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'agree',
              label: 'Agree',
            },
            {
              value: 'dont agree',
              label: "Don't Agree",
            },
          ],
        },
        {
          id: 'your name or name of your supporter where relevant',
          question: 'Your name (or name of your supporter where relevant)',
          hint: '',
          type: 'text',
          required: true,
        },
        {
          id: 'date',
          question: 'Date',
          hint: '',
          required: true,
          type: 'date',
        },
      ],
    },
    {
      id: 'manager-approval',
      name: 'Manager Approval',
      theme: 'Next steps',
      fields: [
        {
          id: 'email-address-of-your-manager-who-would-normally-approve-this-decision',
          question:
            'Email address of your manager (who would normally approve this decision)',
          hint: "Who will retrospectively approve this decision? You need to manually forward the 'receipt' copy of this form to them once you receive it",
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

export default form;
