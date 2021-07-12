import { Form } from './forms.types';

const form: Form = {
  id: 'Safeguarding adult manager decision on concern',
  name: 'Safeguarding adult manager decision on concern',
  isViewableByAdults: false,
  isViewableByChildrens: false,
  steps: [
    {
      intro:
        'The following section is to be completed by the appropriate Safeguarding Adult Manager (SAM) who has the responsibility to determine whether the safeguarding concern is to be addressed in line with the Care Act and safeguarding adult procedures.',
      id: 'communication',
      name: 'Communication',
      theme: 'About the person',
      fields: [
        {
          id: 'Preferred method of communication',
          question: 'Preferred method of communication',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Preferred language',
          question: 'Preferred language',
          className: 'govuk-input--width-20',
          hint: '',
          type: 'text',
        },
        {
          id: 'Interpreter required?',
          question: 'Interpreter required?',
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
          id: 'Is communication support required?',
          question: 'Is communication support required?',
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
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'Further details on communication support',
          question: 'Further details on communication support',
          hint: '',
          type: 'text',
        },
        {
          id: 'Is the adult at risk already known to the local authority?',
          question:
            'Is the adult at risk already known to the local authority?',
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
              value: 'Not certain',
              label: 'Not certain',
            },
          ],
        },
        {
          id: 'Is the adult at risk currently receiving long term services?',
          question:
            'Is the adult at risk currently receiving long term services?',
          required: true,
          hint: '',
          type: 'radios',
          condition: {
            id: 'Is the adult at risk already known to the local authority?',
            value: 'Yes',
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
            {
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'Is the adult at risk currently receiving short term services?',
          question:
            'Is the adult at risk currently receiving short term services?',
          required: true,
          hint: '',
          type: 'radios',
          condition: {
            id: 'Is the adult at risk already known to the local authority?',
            value: 'Yes',
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
            {
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
      ],
    },
    {
      id: 'Primary support reason',
      name: 'Primary support reason',
      theme: 'About the person',
      fields: [
        {
          id: 'PSR group',
          question: 'PSR group',
          type: 'select',
          choices: [
            {
              value: 'Physical Support - Access & mobility only',
              label: 'Physical Support - Access & mobility only',
            },
            {
              value: 'Physical Support - Personal care and support',
              label: 'Physical Support - Personal care and support',
            },
            {
              value: 'Sensory Support - Support for visual impairment',
              label: 'Sensory Support - Support for visual impairment',
            },
            {
              value: 'Sensory Support - Support for hearing impairment',
              label: 'Sensory Support - Support for hearing impairment',
            },
            {
              value: 'Sensory Support - Support for dual impairment',
              label: 'Sensory Support - Support for dual impairment',
            },
            {
              value: 'Support with Memory & Cognition',
              label: 'Support with Memory & Cognition',
            },
            {
              value: 'Learning Disability Support',
              label: 'Learning Disability Support',
            },
            {
              value: 'Mental Health Support (ASC)',
              label: 'Mental Health Support (ASC)',
            },
            {
              value: 'Mental Health Support (ELFT)',
              label: 'Mental Health Support (ELFT)',
            },
            {
              value: 'Social Support - Substance misuse support',
              label: 'Social Support - Substance misuse support',
            },
            {
              value: 'Social Support - Asylum seeker support',
              label: 'Social Support - Asylum seeker support',
            },
            {
              value: 'Social Support - Support for Social Isolation/Other',
              label: 'Social Support - Support for Social Isolation/Other',
            },
          ],
        },
      ],
    },
    {
      id: 'Health conditions',
      name: 'Health conditions',
      theme: 'About the person',
      fields: [
        {
          id: 'Health condition question',
          question: 'Health conditions',
          hint: "(Two SAC mandatory collection options listed, or else choose 'Neither...'. But if you wish to report other items in the full SAC (voluntary) collection you may use 'Other' and enter manually)",
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'Asperger’s Syndrome/High Functioning Autism',
              label: 'Asperger’s Syndrome/High Functioning Autism',
            },
            {
              value:
                'Autism (excluding Asperger’s Syndrome/High Functioning Autism)',
              label:
                'Autism (excluding Asperger’s Syndrome/High Functioning Autism)',
            },
            {
              value: 'Neither of the above was reported',
              label: 'Neither of the above was reported',
            },
          ],
        },
      ],
    },
    {
      id: 'Concerns',
      name: 'Concerns',
      theme: 'About the person',
      fields: [
        {
          id: 'Does the adult at risk have any previous safeguarding concerns?',
          question:
            'Does the adult at risk have any previous safeguarding concerns?',
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
              value: 'Not certain',
              label: 'Not certain',
            },
          ],
        },
        {
          id: 'Please state if relevant to this concern (previous concerns for adult at risk)',
          question:
            'If yes, please state if relevant to this concern (previous concerns for adult at risk)',
          hint: '',
          type: 'textarea',
          condition: {
            id: 'Does the adult at risk have any previous safeguarding concerns?',
            value: 'Yes',
          },
        },
        {
          id: 'Does the alleged person who caused harm have any previous safeguarding concerns?',
          question:
            'Does the alleged person who caused harm have any previous safeguarding concerns?',
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
              value: 'Not certain',
              label: 'Not certain',
            },
          ],
        },
        {
          id: 'Please state if relevant to this concern (previous concerns for person who caused harm)',
          question:
            'If yes, please state if relevant to this concern (previous concerns for person who caused harm)',
          hint: '',
          type: 'textarea',
          condition: {
            id: 'Does the alleged person who caused harm have any previous safeguarding concerns?',
            value: 'Yes',
          },
        },
        {
          id: 'Is the person alleged to have caused the harm also an adult at risk?',
          question:
            'Is the person alleged to have caused the harm also an adult at risk?',
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
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
      ],
    },
    {
      id: 'Mental capacity',
      name: 'Mental capacity',
      theme: 'About the person',
      fields: [
        {
          id: 'Has a mental capacity act assessment taken place?',
          question: 'Has a mental capacity act assessment taken place?',
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
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'Has a mental capacity act assessment found the adult at risk to be lacking capacity?',
          question:
            'Has a mental capacity act assessment found the adult at risk to be lacking capacity?',
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
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'Is there already an advocate/IMCA (Independent Mental Capacity Advocate) in place?',
          question:
            'Is there already an advocate/IMCA (Independent Mental Capacity Advocate) in place?',
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
              value: 'Advocate not needed/requested',
              label: 'Advocate not needed/requested',
            },
            {
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'Has advocacy been offered as a result of this concern?',
          question: 'Has advocacy been offered as a result of this concern?',
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
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'Advocate name',
          question: 'Advocate name',
          hint: '',
          type: 'text',
          condition: {
            id: 'Has advocacy been offered as a result of this concern?',
            value: 'Yes',
          },
        },
        {
          id: 'Advocate relationship',
          question: 'Advocate relationship',
          className: 'govuk-input--width-20',
          hint: '',
          type: 'text',
          condition: {
            id: 'Has advocacy been offered as a result of this concern?',
            value: 'Yes',
          },
        },
        {
          id: 'Advocate address',
          question: 'Advocate address',
          hint: '',
          type: 'textarea',
          condition: {
            id: 'Has advocacy been offered as a result of this concern?',
            value: 'Yes',
          },
        },
        {
          id: 'Advocate telephone number',
          question: 'Advocate telephone number',
          className: 'govuk-input--width-20',
          hint: '',
          type: 'text',
          condition: {
            id: 'Has advocacy been offered as a result of this concern?',
            value: 'Yes',
          },
        },
        {
          id: 'Advocate email address',
          question: 'Advocate email address',
          hint: '',
          type: 'text',
          className: 'govuk-input--width-20',
          condition: {
            id: 'Has advocacy been offered as a result of this concern?',
            value: 'Yes',
          },
        },
      ],
    },
    {
      id: 'Decision on the concern',
      name: 'Decision on the concern',
      theme: 'Decision',
      fields: [
        {
          id: 'Date of decision',
          question: 'Date of decision ',
          hint: 'On the safeguarding adults concern',
          required: true,
          className: 'govuk-input--width-10',
          type: 'date',
        },
        {
          id: 'Date of concern',
          question: 'Date of concern',
          hint: 'To which this decison relates',
          required: true,
          className: 'govuk-input--width-10',
          type: 'date',
        },
        {
          id: 'Meets three key S42 enquiry criteria?',
          question:
            'Does the adult at risk meet the three key S42 enquiry criteria?',
          required: true,
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
          id: 'Why does this case not meet the S42 criteria?',
          question: 'Why does this case not meet the S42 criteria?',
          required: true,
          hint: 'Choose all the reasons which apply',
          type: 'checkboxes',
          condition: {
            id: 'Meets three key S42 enquiry criteria?',
            value: 'No',
          },
          choices: [
            {
              value: 'The adult does not have needs for care AND support',
              label: 'The adult does not have needs for care AND support',
            },
            {
              value:
                'The adult is not experiencing, nor is at risk of, abuse or neglect',
              label:
                'The adult is not experiencing, nor is at risk of, abuse or neglect',
            },
            {
              value:
                'The adult is able to protect themself against the abuse or neglect or the risk of it.',
              label:
                'The adult is able to protect themself against the abuse or neglect or the risk of it.',
            },
          ],
        },
        {
          id: 'Will a safeguarding enquiry still go ahead?',
          question: 'Will a safeguarding enquiry still go ahead?',
          hint: '',
          type: 'radios',
          condition: {
            id: 'Meets three key S42 enquiry criteria?',
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
        {
          id: 'If this concern will not progress to a Section 42 enquiry it will be dealt with as',
          question:
            'If this concern will not progress to a Section 42 enquiry it will be dealt with as',
          hint: "(Choose whichever will apply - but 'No action to be taken' should be the only selection if chosen)",
          required: true,
          type: 'checkboxes',
          condition: [
            {
              id: 'Meets three key S42 enquiry criteria?',
              value: 'No',
            },
            {
              id: 'Will a safeguarding enquiry still go ahead?',
              value: 'No',
            },
          ],
          choices: [
            {
              value: 'No action to be taken (sole selection)',
              label: 'No action to be taken (sole selection)',
            },
            {
              value: 'Advice and guidance',
              label: 'Advice and guidance',
            },
            {
              value: 'Care Act assessment',
              label: 'Care Act assessment',
            },
            {
              value: 'ASC case management',
              label: 'ASC case management',
            },
            {
              value: 'ASC review',
              label: 'ASC review',
            },
            {
              value: 'Passed to other Hackney Council service',
              label: 'Passed to other Hackney Council service',
            },
            {
              value: 'Signposted to external agency',
              label: 'Signposted to external agency',
            },
            {
              value: 'Passed to another local authority',
              label: 'Passed to another local authority',
            },
          ],
        },
        {
          id: 'Agency or local authority name',
          question: 'Agency or local authority name',
          type: 'text',
          condition: [
            {
              id: 'Meets three key S42 enquiry criteria?',
              value: 'No',
            },
            {
              id: 'Will a safeguarding enquiry still go ahead?',
              value: 'No',
            },
          ],
        },
      ],
    },
    {
      id: 'Risks and allegations',
      name: 'Case details (risks) table',
      theme: 'Risks and allegations',
      fields: [
        {
          id: 'Primary allegation: Source of Risk ',
          question: 'Primary allegation: Source of Risk ',
          required: true,
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Social Care Support or Service Provider - public sector',
              label: 'Social Care Support or Service Provider - public sector',
            },
            {
              value: 'Social Care Support or Service Provider - private sector',
              label: 'Social Care Support or Service Provider - private sector',
            },
            {
              value:
                'Social Care Support or Service Provider - voluntary (voluntary /community organisations, charities etc.)',
              label:
                'Social Care Support or Service Provider - voluntary (voluntary /community organisations, charities etc.)',
            },
            {
              value: 'Known to Individual - Self',
              label: 'Known to Individual - Self',
            },
            {
              value: 'Known to Individual - Relative/family/carer',
              label: 'Known to Individual - Relative/family/carer',
            },
            {
              value: 'Known to Individual - Individual - known but not related',
              label: 'Known to Individual - Individual - known but not related',
            },
            {
              value: 'Known to Individual - Primary health care',
              label: 'Known to Individual - Primary health care',
            },
            {
              value: 'Known to Individual - Secondary health care',
              label: 'Known to Individual - Secondary health care',
            },
            {
              value: 'Known to Individual - Community health care',
              label: 'Known to Individual - Community health care',
            },
            {
              value:
                'Known to Individual - Social care staff - care management and assessment',
              label:
                'Known to Individual - Social care staff - care management and assessment',
            },
            {
              value: 'Known to Individual - Police',
              label: 'Known to Individual - Police',
            },
            {
              value: 'Known to Individual - Regulator',
              label: 'Known to Individual - Regulator',
            },
            {
              value: 'Known to Individual - Other public sector',
              label: 'Known to Individual - Other public sector',
            },
            {
              value: 'Known to Individual - Other private sector',
              label: 'Known to Individual - Other private sector',
            },
            {
              value: 'Known to Individual - Other voluntary',
              label: 'Known to Individual - Other voluntary',
            },
            {
              value: 'Unknown to Individual - Individual - unknown/stranger',
              label: 'Unknown to Individual - Individual - unknown/stranger',
            },
            {
              value: 'Unknown to Individual - Primary health care',
              label: 'Unknown to Individual - Primary health care',
            },
            {
              value: 'Unknown to Individual - Secondary health care',
              label: 'Unknown to Individual - Secondary health care',
            },
            {
              value: 'Unknown to Individual - Community health care',
              label: 'Unknown to Individual - Community health care',
            },
            {
              value:
                'Unknown to Individual - Social care staff - care management and assessment',
              label:
                'Unknown to Individual - Social care staff - care management and assessment',
            },
            {
              value: 'Unknown to Individual - Police',
              label: 'Unknown to Individual - Police',
            },
            {
              value: 'Unknown to Individual - Regulator',
              label: 'Unknown to Individual - Regulator',
            },
            {
              value: 'Unknown to Individual - Other public sector',
              label: 'Unknown to Individual - Other public sector',
            },
            {
              value: 'Unknown to Individual - Other private sector',
              label: 'Unknown to Individual - Other private sector',
            },
            {
              value: 'Unknown to Individual - Other voluntary',
              label: 'Unknown to Individual - Other voluntary',
            },
          ],
        },
        {
          id: 'Primary allegation: Type of Risk',
          question: 'Primary allegation: Type of Risk',
          required: true,
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Physical',
              label: 'Physical',
            },
            {
              value: 'Sexual',
              label: 'Sexual',
            },
            {
              value: 'Psychological',
              label: 'Psychological',
            },
            {
              value: 'Financial and Material',
              label: 'Financial and Material',
            },
            {
              value: 'Discriminatory',
              label: 'Discriminatory',
            },
            {
              value: 'Organisational',
              label: 'Organisational',
            },
            {
              value: 'Neglect and Omission',
              label: 'Neglect and Omission',
            },
            {
              value: 'Domestic Abuse',
              label: 'Domestic Abuse',
            },
            {
              value: 'Sexual Exploitation',
              label: 'Sexual Exploitation',
            },
            {
              value: 'Modern Slavery',
              label: 'Modern Slavery',
            },
            {
              value: 'Self-Neglect',
              label: 'Self-Neglect',
            },
          ],
        },
        {
          id: 'Primary allegation: Location',
          question: 'Primary allegation: Location',
          required: true,
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Own Home',
              label: 'Own Home',
            },
            {
              value: 'In the community (excluding community services)',
              label: 'In the community (excluding community services)',
            },
            {
              value: 'Community Service',
              label: 'Community Service',
            },
            {
              value: 'Care Home - residential',
              label: 'Care Home - residential',
            },
            {
              value: 'Care Home - nursing',
              label: 'Care Home - nursing',
            },
            {
              value: 'Hospital - Acute',
              label: 'Hospital - Acute',
            },
            {
              value: 'Hospital - Mental Health',
              label: 'Hospital - Mental Health',
            },
            {
              value: 'Hospital - Community',
              label: 'Hospital - Community',
            },
          ],
        },
        {
          id: 'Primary allegation: Risk Assessment Outcomes',
          question: 'Primary allegation: Risk Assessment Outcomes',
          required: true,
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Risk identified and action taken (Choose Outcome below)',
              label: 'Risk identified and action taken (Choose Outcome below)',
            },
            {
              value:
                'Risk identified and no action taken (Choose Outcome below)',
              label:
                'Risk identified and no action taken (Choose Outcome below)',
            },
            {
              value:
                'Risk - Assessment inconclusive and action taken (Select N/A below)',
              label:
                'Risk - Assessment inconclusive and action taken (Select N/A below)',
            },
            {
              value:
                'Risk - Assessment inconclusive and no action taken (Select N/A below)',
              label:
                'Risk - Assessment inconclusive and no action taken (Select N/A below)',
            },
            {
              value: 'No risk identified and action taken (Select N/A below)',
              label: 'No risk identified and action taken (Select N/A below)',
            },
            {
              value:
                'No risk identified and no action taken (Select N/A below)',
              label:
                'No risk identified and no action taken (Select N/A below)',
            },
            {
              value:
                "Enquiry ceased at individual's request and no action taken",
              label:
                "Enquiry ceased at individual's request and no action taken",
            },
          ],
        },
        {
          id: 'Primary allegation: Risk Outcomes',
          question: 'Primary allegation: Risk Outcomes',
          hint: "(If you chose one of the first two 'Risk identified...' options above then please select the Risk Outcome (first 3 rows). Otherwise select 'Not applicable...')",
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'Risk Remained',
              label: 'Risk Remained',
            },
            {
              value: 'Risk Reduced',
              label: 'Risk Reduced',
            },
            {
              value: 'Risk Removed',
              label: 'Risk Removed',
            },
            {
              value: 'Not applicable - no risk identified',
              label: 'Not applicable - no risk identified',
            },
          ],
        },
        {
          id: 'Second allegation: Source of Risk ',
          question: 'Second allegation: Source of Risk ',
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Social Care Support or Service Provider - public sector',
              label: 'Social Care Support or Service Provider - public sector',
            },
            {
              value: 'Social Care Support or Service Provider - private sector',
              label: 'Social Care Support or Service Provider - private sector',
            },
            {
              value:
                'Social Care Support or Service Provider - voluntary (voluntary/community organisations, charities etc.)',
              label:
                'Social Care Support or Service Provider - voluntary (voluntary/community organisations, charities etc.)',
            },
            {
              value: 'Known to Individual - Self',
              label: 'Known to Individual - Self',
            },
            {
              value: 'Known to Individual - Relative/family/carer',
              label: 'Known to Individual - Relative/family/carer',
            },
            {
              value: 'Known to Individual - Individual - known but not related',
              label: 'Known to Individual - Individual - known but not related',
            },
            {
              value: 'Known to Individual - Primary health care',
              label: 'Known to Individual - Primary health care',
            },
            {
              value: 'Known to Individual - Secondary health care',
              label: 'Known to Individual - Secondary health care',
            },
            {
              value: 'Known to Individual - Community health care',
              label: 'Known to Individual - Community health care',
            },
            {
              value:
                'Known to Individual - Social care staff - care management and assessment',
              label:
                'Known to Individual - Social care staff - care management and assessment',
            },
            {
              value: 'Known to Individual - Police',
              label: 'Known to Individual - Police',
            },
            {
              value: 'Known to Individual - Regulator',
              label: 'Known to Individual - Regulator',
            },
            {
              value: 'Known to Individual - Other public sector',
              label: 'Known to Individual - Other public sector',
            },
            {
              value: 'Known to Individual - Other private sector',
              label: 'Known to Individual - Other private sector',
            },
            {
              value: 'Known to Individual - Other voluntary',
              label: 'Known to Individual - Other voluntary',
            },
            {
              value: 'Unknown to Individual - Individual - unknown/stranger',
              label: 'Unknown to Individual - Individual - unknown/stranger',
            },
            {
              value: 'Unknown to Individual - Primary health care',
              label: 'Unknown to Individual - Primary health care',
            },
            {
              value: 'Unknown to Individual - Secondary health care',
              label: 'Unknown to Individual - Secondary health care',
            },
            {
              value: 'Unknown to Individual - Community health care',
              label: 'Unknown to Individual - Community health care',
            },
            {
              value:
                'Unknown to Individual - Social care staff - care management and assessment',
              label:
                'Unknown to Individual - Social care staff - care management and assessment',
            },
            {
              value: 'Unknown to Individual - Police',
              label: 'Unknown to Individual - Police',
            },
            {
              value: 'Unknown to Individual - Regulator',
              label: 'Unknown to Individual - Regulator',
            },
            {
              value: 'Unknown to Individual - Other public sector',
              label: 'Unknown to Individual - Other public sector',
            },
            {
              value: 'Unknown to Individual - Other private sector',
              label: 'Unknown to Individual - Other private sector',
            },
            {
              value: 'Unknown to Individual - Other voluntary',
              label: 'Unknown to Individual - Other voluntary',
            },
          ],
        },
        {
          id: 'Second allegation: Type of Risk',
          question: 'Second allegation: Type of Risk',
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Physical',
              label: 'Physical',
            },
            {
              value: 'Sexual',
              label: 'Sexual',
            },
            {
              value: 'Psychological',
              label: 'Psychological',
            },
            {
              value: 'Financial and Material',
              label: 'Financial and Material',
            },
            {
              value: 'Discriminatory',
              label: 'Discriminatory',
            },
            {
              value: 'Organisational',
              label: 'Organisational',
            },
            {
              value: 'Neglect and Omission',
              label: 'Neglect and Omission',
            },
            {
              value: 'Domestic Abuse',
              label: 'Domestic Abuse',
            },
            {
              value: 'Sexual Exploitation',
              label: 'Sexual Exploitation',
            },
            {
              value: 'Modern Slavery',
              label: 'Modern Slavery',
            },
            {
              value: 'Self-Neglect',
              label: 'Self-Neglect',
            },
          ],
        },
        {
          id: 'Second allegation: Location',
          question: 'Second allegation: Location',
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Own Home',
              label: 'Own Home',
            },
            {
              value: 'In the community (excluding community services)',
              label: 'In the community (excluding community services)',
            },
            {
              value: 'Community Service',
              label: 'Community Service',
            },
            {
              value: 'Care Home - residential',
              label: 'Care Home - residential',
            },
            {
              value: 'Care Home - nursing',
              label: 'Care Home - nursing',
            },
            {
              value: 'Hospital - Acute',
              label: 'Hospital - Acute',
            },
            {
              value: 'Hospital - Mental Health',
              label: 'Hospital - Mental Health',
            },
            {
              value: 'Hospital - Community',
              label: 'Hospital - Community',
            },
          ],
        },
        {
          id: 'Second allegation: Risk Assessment Outcomes',
          question: 'Second allegation: Risk Assessment Outcomes',
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Risk identified and action taken (Choose Outcome below)',
              label: 'Risk identified and action taken (Choose Outcome below)',
            },
            {
              value:
                'Risk identified and no action taken (Choose Outcome below)',
              label:
                'Risk identified and no action taken (Choose Outcome below)',
            },
            {
              value:
                'Risk - Assessment inconclusive and action taken (Select N/A below)',
              label:
                'Risk - Assessment inconclusive and action taken (Select N/A below)',
            },
            {
              value:
                'Risk - Assessment inconclusive and no action taken (Select N/A below)',
              label:
                'Risk - Assessment inconclusive and no action taken (Select N/A below)',
            },
            {
              value: 'No risk identified and action taken (Select N/A below)',
              label: 'No risk identified and action taken (Select N/A below)',
            },
            {
              value:
                'No risk identified and no action taken (Select N/A below)',
              label:
                'No risk identified and no action taken (Select N/A below)',
            },
            {
              value:
                "Enquiry ceased at individual's request and no action taken",
              label:
                "Enquiry ceased at individual's request and no action taken",
            },
          ],
        },
        {
          id: 'Second allegation: Risk Outcomes',
          question: 'Second allegation: Risk Outcomes',
          hint: "(If you chose one of the first two 'Risk identified...' options above then please select the Risk Outcome (first 3 options). Otherwise select 'Not applicable...')",
          type: 'radios',
          choices: [
            {
              value: 'Risk Remained',
              label: 'Risk Remained',
            },
            {
              value: 'Risk Reduced',
              label: 'Risk Reduced',
            },
            {
              value: 'Risk Removed',
              label: 'Risk Removed',
            },
            {
              value: 'Not applicable - no risk identified',
              label: 'Not applicable - no risk identified',
            },
          ],
        },
        {
          id: 'Third allegation: Source of Risk ',
          question: 'Third allegation: Source of Risk ',
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Social Care Support or Service Provider - public sector',
              label: 'Social Care Support or Service Provider - public sector',
            },
            {
              value: 'Social Care Support or Service Provider - private sector',
              label: 'Social Care Support or Service Provider - private sector',
            },
            {
              value:
                'Social Care Support or Service Provider - voluntary (voluntary/community organisations, charities etc.)',
              label:
                'Social Care Support or Service Provider - voluntary (voluntary/community organisations, charities etc.)',
            },
            {
              value: 'Known to Individual - Self',
              label: 'Known to Individual - Self',
            },
            {
              value: 'Known to Individual - Relative/family/carer',
              label: 'Known to Individual - Relative/family/carer',
            },
            {
              value: 'Known to Individual - Individual - known but not related',
              label: 'Known to Individual - Individual - known but not related',
            },
            {
              value: 'Known to Individual - Primary health care',
              label: 'Known to Individual - Primary health care',
            },
            {
              value: 'Known to Individual - Secondary health care',
              label: 'Known to Individual - Secondary health care',
            },
            {
              value: 'Known to Individual - Community health care',
              label: 'Known to Individual - Community health care',
            },
            {
              value:
                'Known to Individual - Social care staff - care management and assessment',
              label:
                'Known to Individual - Social care staff - care management and assessment',
            },
            {
              value: 'Known to Individual - Police',
              label: 'Known to Individual - Police',
            },
            {
              value: 'Known to Individual - Regulator',
              label: 'Known to Individual - Regulator',
            },
            {
              value: 'Known to Individual - Other public sector',
              label: 'Known to Individual - Other public sector',
            },
            {
              value: 'Known to Individual - Other private sector',
              label: 'Known to Individual - Other private sector',
            },
            {
              value: 'Known to Individual - Other voluntary',
              label: 'Known to Individual - Other voluntary',
            },
            {
              value: 'Unknown to Individual - Individual - unknown / stranger',
              label: 'Unknown to Individual - Individual - unknown / stranger',
            },
            {
              value: 'Unknown to Individual - Primary health care',
              label: 'Unknown to Individual - Primary health care',
            },
            {
              value: 'Unknown to Individual - Secondary health care',
              label: 'Unknown to Individual - Secondary health care',
            },
            {
              value: 'Unknown to Individual - Community health care',
              label: 'Unknown to Individual - Community health care',
            },
            {
              value:
                'Unknown to Individual - Social care staff - care management and assessment',
              label:
                'Unknown to Individual - Social care staff - care management and assessment',
            },
            {
              value: 'Unknown to Individual - Police',
              label: 'Unknown to Individual - Police',
            },
            {
              value: 'Unknown to Individual - Regulator',
              label: 'Unknown to Individual - Regulator',
            },
            {
              value: 'Unknown to Individual - Other public sector',
              label: 'Unknown to Individual - Other public sector',
            },
            {
              value: 'Unknown to Individual - Other private sector',
              label: 'Unknown to Individual - Other private sector',
            },
            {
              value: 'Unknown to Individual - Other voluntary',
              label: 'Unknown to Individual - Other voluntary',
            },
          ],
        },
        {
          id: 'Third allegation: Type of Risk',
          question: 'Third allegation: Type of Risk',
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Physical',
              label: 'Physical',
            },
            {
              value: 'Sexual',
              label: 'Sexual',
            },
            {
              value: 'Psychological',
              label: 'Psychological',
            },
            {
              value: 'Financial and Material',
              label: 'Financial and Material',
            },
            {
              value: 'Discriminatory',
              label: 'Discriminatory',
            },
            {
              value: 'Organisational',
              label: 'Organisational',
            },
            {
              value: 'Neglect and Omission',
              label: 'Neglect and Omission',
            },
            {
              value: 'Domestic Abuse',
              label: 'Domestic Abuse',
            },
            {
              value: 'Sexual Exploitation',
              label: 'Sexual Exploitation',
            },
            {
              value: 'Modern Slavery',
              label: 'Modern Slavery',
            },
            {
              value: 'Self-Neglect',
              label: 'Self-Neglect',
            },
          ],
        },
        {
          id: 'Third allegation: Location',
          question: 'Third allegation: Location',
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Own Home',
              label: 'Own Home',
            },
            {
              value: 'In the community (excluding community services)',
              label: 'In the community (excluding community services)',
            },
            {
              value: 'Community Service',
              label: 'Community Service',
            },
            {
              value: 'Care Home - residential',
              label: 'Care Home - residential',
            },
            {
              value: 'Care Home - nursing',
              label: 'Care Home - nursing',
            },
            {
              value: 'Hospital - Acute',
              label: 'Hospital - Acute',
            },
            {
              value: 'Hospital - Mental Health',
              label: 'Hospital - Mental Health',
            },
            {
              value: 'Hospital - Community',
              label: 'Hospital - Community',
            },
          ],
        },
        {
          id: 'Third allegation: Risk Assessment Outcomes',
          question: 'Third allegation: Risk Assessment Outcomes',
          hint: '',
          type: 'combobox',
          choices: [
            {
              value: 'Risk identified and action taken (Choose Outcome below)',
              label: 'Risk identified and action taken (Choose Outcome below)',
            },
            {
              value:
                'Risk identified and no action taken (Choose Outcome below)',
              label:
                'Risk identified and no action taken (Choose Outcome below)',
            },
            {
              value:
                'Risk - Assessment inconclusive and action taken (Select N/A below)',
              label:
                'Risk - Assessment inconclusive and action taken (Select N/A below)',
            },
            {
              value:
                'Risk - Assessment inconclusive and no action taken (Select N/A below)',
              label:
                'Risk - Assessment inconclusive and no action taken (Select N/A below)',
            },
            {
              value: 'No risk identified and action taken (Select N/A below)',
              label: 'No risk identified and action taken (Select N/A below)',
            },
            {
              value:
                'No risk identified and no action taken (Select N/A below)',
              label:
                'No risk identified and no action taken (Select N/A below)',
            },
            {
              value:
                "Enquiry ceased at individual's request and no action taken",
              label:
                "Enquiry ceased at individual's request and no action taken",
            },
          ],
        },
        {
          id: 'Third allegation: Risk Outcomes',
          question: 'Third allegation: Risk Outcomes',
          hint: "(If you chose one of the first two 'Risk identified...' options above then please select the Risk Outcome (first 3 options). Otherwise select 'Not applicable...')",
          type: 'radios',
          choices: [
            {
              value: 'Risk Remained',
              label: 'Risk Remained',
            },
            {
              value: 'Risk Reduced',
              label: 'Risk Reduced',
            },
            {
              value: 'Risk Removed',
              label: 'Risk Removed',
            },
            {
              value: 'Not applicable - no risk identified',
              label: 'Not applicable - no risk identified',
            },
          ],
        },
        {
          id: 'Further allegations (Risks Table)',
          question: 'Further allegations (Risks Table)',
          hint: 'If there are more than three allegations then please add those further allegations as free text here. Include Source of Risk, Type of Risk, Location, Risk Assessment Outcomes and Risk Outcomes in respect of each additional allegation',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Service provider allegations',
      name: 'Service provider allegations',
      theme: 'Risks and allegations',
      fields: [
        {
          id: 'Does the Concern include allegation(s) made against a service provider or their worker(s)?',
          question:
            'Does the Concern include allegation(s) made against a service provider or their worker(s)?',
          required: true,
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
          id: 'Primary Service Provider Name',
          question: 'Primary Service Provider Name',
          required: true,
          hint: '',
          type: 'text',
          condition: {
            id: 'Does the Concern include allegation(s) made against a service provider or their worker(s)?',
            value: 'Yes',
          },
        },
        {
          id: 'Primary Service Provider Address',
          question: 'Primary Service Provider Address',
          required: true,
          hint: '',
          type: 'text',
          condition: {
            id: 'Does the Concern include allegation(s) made against a service provider or their worker(s)?',
            value: 'Yes',
          },
        },
        {
          id: 'Secondary Service Provider Details',
          question: 'Secondary Service Provider Details',
          hint: '(If there is more than one service provider to consider please give details of other organisations here)',
          type: 'textarea',
          condition: {
            id: 'Does the Concern include allegation(s) made against a service provider or their worker(s)?',
            value: 'Yes',
          },
        },
      ],
    },
    {
      id: 'Feedback to referrer',
      name: 'Feedback to referrer',
      theme: 'Feedback and next steps',
      fields: [
        {
          id: 'Have you provided information on the outcome of this safeguarding referral to the referrer?',
          question:
            'Have you provided information on the outcome of this safeguarding referral to the referrer?',
          required: true,
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
          id: 'If yes, please give details (feedback to referrer)',
          question: 'If yes, please give details (feedback to referrer)',
          hint: '',
          type: 'textarea',
          condition: {
            id: 'Have you provided information on the outcome of this safeguarding referral to the referrer?',
            value: 'Yes',
          },
        },
        {
          id: 'If no, why not? (feedback to referrer)',
          question: 'If no, why not? (feedback to referrer)',
          hint: '',
          type: 'textarea',
          condition: {
            id: 'Have you provided information on the outcome of this safeguarding referral to the referrer?',
            value: 'No',
          },
        },
      ],
    },
    {
      id: 'Consideration of Safeguarding Adults Review (SAR)',
      name: 'Consideration of Safeguarding Adults Review (SAR)',
      theme: 'Feedback and next steps',
      fields: [
        {
          id: 'Is this case going to be referred to the Safeguarding Adult Board?',
          question:
            'Is this case going to be referred to the Safeguarding Adult Board?',
          required: true,
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
          id: 'Name of worker who will complete SAR form',
          question: 'Name of worker who will complete SAR form',
          hint: '',
          type: 'text',
          condition: {
            id: 'Is this case going to be referred to the Safeguarding Adult Board?',
            value: 'Yes',
          },
        },
      ],
    },
    {
      id: 'Completion details (SAM Decision)',
      name: 'Completion details (SAM Decision)',
      theme: 'Feedback and next steps',
      fields: [
        {
          id: 'Next Actions',
          question: 'Next Actions',
          required: true,
          hint: '',
          type: 'radios',
          choices: [
            {
              value:
                '(ELFT only) Safeguarding Conclusion form - following Enquiry',
              label:
                '(ELFT only) Safeguarding Conclusion form - following Enquiry',
            },
            {
              value: '(ELFT only) Safeguarding Conclusion form - no enquiry',
              label: '(ELFT only) Safeguarding Conclusion form - no enquiry',
            },
            {
              value: 'Safeguarding Adult Enquiry Discussion Meeting',
              label: 'Safeguarding Adult Enquiry Discussion Meeting',
            },
            {
              value: 'Safeguarding Adult Conclusion',
              label: 'Safeguarding Adult Conclusion',
            },
          ],
        },
        {
          id: 'Email address of worker responsible for next episode',
          question: 'Email address of worker responsible for next episode',
          required: true,
          type: 'text',
        },
      ],
    },
  ],
};

export default form;
