import { Form } from './forms.types';

const form: Form = {
  id: 'safeguarding-adult-concern-form',
  name: 'Safeguarding Adult Concern Form',
  isViewableByAdults: false,
  isViewableByChildrens: false,
  steps: [
    {
      intro:
        "This form should be completed to report any sign of suspected abuse or neglect that is reported to you. Safeguarding concerns can include cases of sexual exploitation, modern slavery, domestic abuse and self-neglect. If this is an external referral then it should be passed to: The Safeguarding Adults Team, Telephone: 020 83565782, Email: adultprotection@hackney.gov.uk. WHERE A CRIMINAL ACT MAY HAVE BEEN COMMITTED THE POLICE SHOULD BE NOTIFIED IMMEDIATELY. THE ONLY EXCEPTION TO THIS IS IF THE ADULT AT RISK OBJECTS AND HAS CAPACITY TO MAKE THIS DECISION. IN THIS CASE SPEAK TO YOUR SAM OR THE SAFEGUARDING ADULTS TEAM FOR ADVICE AS TO THE LEVEL OF RISK AND WHETHER IT IS APPROPRIATE TO OVERRULE THE PERSON'S WISHES.",
      id: 'first-step',
      name: 'First step',
      theme: 'About you',
      fields: [
        {
          id: 'Preferred method of communication',
          question: 'Preferred method of communication',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Preferred language ',
          question: 'Preferred language ',
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
              value: 'Not Known',
              label: 'Not Known',
            },
          ],
        },
        {
          id: 'Further details on Communication Support',
          question: 'Further details on Communication Support',
          hint: '',
          type: 'text',
        },
        {
          id: 'Primary Support Reason',
          question: 'Primary Support Reason',
          hint: '',
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
        {
          id: 'Health Conditions',
          question: 'Health Conditions',
          hint: "(Two SAC mandatory collection options listed, or else choose 'Neither...'. But if you wish to report other items in the full SAC (voluntary) collection you may use 'Other' and enter manually)",
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'Asperger’s Syndrome/ High Functioning Autism',
              label: 'Asperger’s Syndrome/ High Functioning Autism',
            },
            {
              value:
                'Autism (excluding Asperger’s Syndrome / High Functioning Autism)',
              label:
                'Autism (excluding Asperger’s Syndrome / High Functioning Autism)',
            },
            {
              value: 'Neither of the above was reported',
              label: 'Neither of the above was reported',
            },
          ],
        },
        {
          id: 'Recourse to Public Funds',
          question: 'Recourse to Public Funds',
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
              value: 'Not Known',
              label: 'Not Known',
            },
          ],
        },
        {
          id: 'Further Information',
          question: 'Further Information',
          hint: '(if NO recourse to public funds)',
          type: 'text',
        },
      ],
    },
    {
      id: 'GP Details',
      name: 'GP Details',
      theme: 'About you',
      fields: [
        {
          id: 'GP Name',
          question: 'GP Name',
          hint: '',
          type: 'text',
        },
        {
          id: 'GP Practice',
          question: 'GP Practice',
          hint: '',
          type: 'text',
        },
        {
          id: 'GP Address',
          question: 'GP Address',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'GP Telephone',
          question: 'GP Telephone',
          hint: '',
          type: 'text',
        },
        {
          id: 'Is the GP aware of this concern?',
          question: 'Is the GP aware of this concern?',
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
      id: 'Next of Kin Details',
      name: 'Next of Kin Details',
      theme: 'About you',
      fields: [
        {
          id: 'Is there a known next of kin?',
          question: 'Is there a known next of kin?',
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
          id: 'Next of kin relationship',
          question: 'Next of kin relationship',
          hint: '',
          type: 'text',
        },
        {
          id: 'Next of kin name',
          question: 'Next of kin name',
          hint: '',
          type: 'text',
        },
        {
          id: 'Next of kin address',
          question: 'Next of kin address',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Next of kin telephone (Home)',
          question: 'Next of kin telephone (Home)',
          hint: '',
          type: 'text',
        },
        {
          id: 'Next of kin telephone (Mobile)',
          question: 'Next of kin telephone (Mobile)',
          hint: '',
          type: 'text',
        },
      ],
    },
    {
      id: 'Main Carer details',
      name: 'Main Carer details',
      theme: 'About you',
      fields: [
        {
          id: 'Is there a main carer?',
          question: 'Is there a main carer?',
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
          id: 'Carer name',
          question: 'Carer name',
          hint: '',
          type: 'text',
        },
        {
          id: 'Carer relationship',
          question: 'Carer relationship',
          hint: '',
          type: 'text',
        },
        {
          id: 'Carer address',
          question: 'Carer address',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Carer telephone number',
          question: 'Carer telephone number',
          hint: '',
          type: 'text',
        },
      ],
    },
    {
      id: 'Mental Capacity',
      name: 'Mental Capacity',
      theme: 'Mental Capacity',
      fields: [
        {
          id: 'Has a mental capacity act assessment taken place in relation to this concern?',
          required: true,
          question:
            'Has a mental capacity act assessment taken place in relation to this concern?',
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
          id: 'Has a mental capacity act assessment, in relation to this concern found the adult at risk to be lacking capacity?',
          required: true,
          question:
            'Has a mental capacity act assessment, in relation to this concern found the adult at risk to be lacking capacity?',
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
          id: 'Does the adult at risk have the mental capacity to consent to this referral?',
          question:
            'Does the adult at risk have the mental capacity to consent to this referral?',
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
          id: 'Has the adult at risk given consent for this referral and for information to be shared?',
          question:
            'Has the adult at risk given consent for this referral and for information to be shared?',
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
          id: 'If no consent then give details',
          question: 'If no consent then give details',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Is there already an advocate / IMCA (Independent Mental Capacity Advocate) in place?',
          required: true,
          question:
            'Is there already an advocate / IMCA (Independent Mental Capacity Advocate) in place?',
          hint: '(If yes, provide details below)',
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
              value: 'Advocate not needed / requested',
              label: 'Advocate not needed / requested',
            },
            {
              value: 'Not known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'If "no", has advocacy / IMCA been offered as a result of this concern?',
          question:
            'If "no", has advocacy / IMCA been offered as a result of this concern?',
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
        },
        {
          id: 'Advocate relationship',
          question: 'Advocate relationship',
          hint: '',
          type: 'text',
        },
        {
          id: 'Advocate address',
          question: 'Advocate address',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Advocate telephone number',
          question: 'Advocate telephone number',
          hint: '',
          type: 'text',
        },
        {
          id: 'Advocate email address',
          question: 'Advocate email address',
          hint: '',
          type: 'text',
        },
      ],
    },
    {
      id: 'Referral details',
      name: 'Referral details',
      theme: 'Referral details',
      fields: [
        {
          id: 'Date of referral',
          question: 'Date of referral',
          required: true,
          hint: '',
          type: 'date',
        },
        {
          id: 'Source of referral',
          question: 'Source of referral',
          required: true,
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'Self',
              label: 'Self',
            },
            {
              value: 'Friend / family / neighbour',
              label: 'Friend / family / neighbour',
            },
            {
              value: 'Voluntary Sector',
              label: 'Voluntary Sector',
            },
            {
              value: 'Hospital',
              label: 'Hospital',
            },
            {
              value: 'Health Professional',
              label: 'Health Professional',
            },
            {
              value: 'Non-LBH Housing Services',
              label: 'Non-LBH Housing Services',
            },
            {
              value: 'Council Service',
              label: 'Council Service',
            },
            {
              value: 'Home Care Provider',
              label: 'Home Care Provider',
            },
            {
              value: 'Care Home Provider',
              label: 'Care Home Provider',
            },
            {
              value: 'Other Commissioned Service',
              label: 'Other Commissioned Service',
            },
            {
              value: 'Police',
              label: 'Police',
            },
            {
              value: 'Ambulance Service',
              label: 'Ambulance Service',
            },
            {
              value: 'Fire Brigade',
              label: 'Fire Brigade',
            },
          ],
        },
      ],
    },
    {
      id: 'Hospital referral',
      name: 'Hospital referral',
      theme: 'Referral details',
      fields: [
        {
          id: 'Detailed Source of Referral (Hospital)',
          question: 'Detailed Source of Referral (Hospital)',
          hint: '',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'Acute',
              label: 'Acute',
            },
            {
              value: 'Psychiatric / mental health',
              label: 'Psychiatric / mental health',
            },
            {
              value: 'Community',
              label: 'Community',
            },
          ],
        },
        {
          id: 'Date of hospital referral',
          question: 'Date of hospital referral',
          hint: '',
          type: 'date',
        },
        {
          id: 'Date of Incident',
          question: 'Date of Incident',
          hint: '',
          type: 'date',
        },
        {
          id: 'Has an incident reference number been provided? (e)g. Datix No.)',
          required: true,
          question:
            'Has an incident reference number been provided? (e.g. Datix No.)',
          hint: '(If yes, provide below)',
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
          id: 'Enter Hospital Reference Code (e)g. Datix No.)',
          question: 'Enter Hospital Reference Code (e.g. Datix No.)',
          hint: 'Enter a reference number, if and only if you stated one was provided.  (Enter in full including initial letter - e.g. W90001)',
          type: 'text',
        },
      ],
    },
    {
      id: 'Health professional referral',
      intro:
        'In the case of referral from Health professional please give further details',
      name: 'Health professional referral',
      theme: 'Referral details',
      fields: [
        {
          id: 'Detailed source of referral (Health professional)',
          required: true,
          question: 'Detailed source of referral (Health professional)',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'GP / GP Practice Manager',
              label: 'GP / GP Practice Manager',
            },
            {
              value: 'District Nurse',
              label: 'District Nurse',
            },
            {
              value: 'Health Visitor',
              label: 'Health Visitor',
            },
            {
              value: 'Tissue Viability Nurse',
              label: 'Tissue Viability Nurse',
            },
            {
              value: 'Pharmacist',
              label: 'Pharmacist',
            },
          ],
        },
        {
          id: 'Date of health professional referral',
          question: 'Date of health professional referral',
          hint: '',
          type: 'date',
        },
        {
          id: '1) Date of Incident',
          question: '1. Date of Incident',
          hint: '',
          type: 'date',
        },
        {
          id: 'Health provider internal reference number, if given',
          question: 'Health provider internal reference number, if given',
          hint: 'Enter a reference number, if and only if one was provided.  (Enter in full including any initial letter - e.g. W90001)',
          type: 'text',
        },
      ],
    },
    {
      id: 'Council service referral',
      intro:
        'In the case of referral from Council Service please give further details',
      name: 'Council service referral',
      theme: 'Referral details',
      fields: [
        {
          id: 'Council Service',
          question: 'Council Service',
          hint: '',
          required: true,
          type: 'radios',
          choices: [
            {
              value: 'Social Services',
              label: 'Social Services',
            },
            {
              value: 'Domestic Abuse Intervention Service (DAIS)',
              label: 'Domestic Abuse Intervention Service (DAIS)',
            },
            {
              value: 'LBH Housing Services',
              label: 'LBH Housing Services',
            },
            {
              value: 'Quality Assurance Officer',
              label: 'Quality Assurance Officer',
            },
            {
              value: 'Trading Standards',
              label: 'Trading Standards',
            },
            {
              value: 'Housing with Care',
              label: 'Housing with Care',
            },
            {
              value: 'Day Centre',
              label: 'Day Centre',
            },
          ],
        },
        {
          id: '2) Date of Incident',
          question: '2. Date of Incident',
          hint: '',
          type: 'date',
        },
      ],
    },
    {
      id: 'Police referral',
      name: 'Police referral',
      theme: 'Referral details',
      fields: [
        {
          id: 'incident reported to the police',
          question: 'Has the incident been reported to the police?',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'Yes, Metropolitan Police.',
              label: 'Yes, Metropolitan Police.',
            },
            {
              value: 'Nothing reported',
              label: 'Nothing reported',
            },
          ],
        },
        {
          id: 'Date of Police referral',
          question: 'Date of Police referral',
          condition: {
            id: 'incident reported to the police',
            value: 'Yes, Metropolitan Police.',
          },
          hint: '',
          type: 'date',
        },
        {
          id: '3) Date of Incident',
          question: '3. Date of Incident',
          hint: '',
          condition: {
            id: 'incident reported to the police',
            value: 'Yes, Metropolitan Police.',
          },
          type: 'date',
        },
        {
          id: 'Has an incident reference number been provided? (e)g. Merlin No.)',
          question:
            'Has an incident reference number been provided? (e.g. Merlin No.)',
          condition: {
            id: 'incident reported to the police',
            value: 'Yes, Metropolitan Police.',
          },
          required: true,
          hint: '(If yes, provide below)',
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
          id: 'Enter Police Reference Code (e)g. Merlin No.)',
          question: 'Enter Police Reference Code (e.g. Merlin No.)',
          condition: {
            id: 'incident reported to the police',
            value: 'Yes, Metropolitan Police.',
          },
          hint: 'Enter a reference number, if and only if you stated one was provided.  (Enter in full - e.g. 20PAC123456)',
          type: 'text',
        },
      ],
    },
    {
      id: 'Referrer Details',
      name: 'Referrer Details',
      theme: 'Referral details',
      fields: [
        {
          id: 'Referrer name',
          question: 'Referrer name',
          hint: '',
          type: 'text',
        },
        {
          id: 'Referrer relationship',
          question: 'Referrer relationship',
          hint: '',
          type: 'text',
        },
        {
          id: 'Referrer organisation',
          question: 'Referrer organisation',
          hint: '',
          type: 'text',
        },
        {
          id: 'Referrer address',
          question: 'Referrer address',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Referrer telephone number',
          question: 'Referrer telephone number',
          hint: '',
          type: 'text',
        },
        {
          id: 'Referrer postcode',
          question: 'Referrer postcode',
          hint: '',
          type: 'text',
        },
        {
          id: 'Referrer email address',
          question: 'Referrer email address',
          hint: '',
          type: 'text',
        },
        {
          id: 'Referrer role',
          question: 'Referrer role',
          hint: '',
          type: 'text',
        },
      ],
    },
    {
      id: 'Adult at risk',
      name: 'Adult at risk',
      theme: 'Referral details',
      intro:
        'Please indicate if the person at risk was receiving either short term services, long term services or both at the time of the Safeguarding incident. A long term service is a service like home care, residential care, nursing care, day care etc. It is a service delivered in order to support a client’s daily life and which will be in place for a long time, sometimes even for the lifetime of the service user. However, for Safeguarding recording purposes we don’t include equipment in this definition. A short term service is a service like reablement at home. It is a service where the client is expected to be discharged from the service after being supported to a point where they can care for themselves independently.',
      fields: [
        {
          id: 'Is the adult at risk now deceased?',
          question: 'Is the adult at risk now deceased?',
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
          id: 'Date of death',
          question: 'Date of death',
          hint: '',
          condition: {
            id: 'Is the adult at risk now deceased?',
            value: 'Yes',
          },
          type: 'date',
        },
        {
          id: 'Is the adult at risk in a placement?',
          question: 'Is the adult at risk in a placement?',
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
          id: 'Provide placement details and Local authority',
          question: 'If yes, Placement details and Local authority',
          condition: {
            id: 'Is the adult at risk in a placement?',
            value: 'Yes',
          },
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Funded by',
          question: 'Funded by',
          hint: '',
          condition: {
            id: 'Is the adult at risk in a placement?',
            value: 'Yes',
          },
          type: 'text',
        },
        {
          id: 'Is the adult at risk a self -funder in any way?',
          question: 'Is the adult at risk a self -funder in any way?',
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
          id: 'If yes, please specify',
          question: 'Please specify details of self funding.',
          hint: '',
          type: 'text',
          condition: {
            id: 'Is the adult at risk a self -funder in any way',
            value: 'Yes',
          },
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
              value: 'Unable to ascertain at this stage',
              label: 'Unable to ascertain at this stage',
            },
          ],
        },
        {
          id: 'Is the adult at risk currently receiving long term services?',
          question:
            'Is the adult at risk currently receiving long term services?',
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
          id: 'Is the adult at risk currently receiving short term services?',
          question:
            'Is the adult at risk currently receiving short term services?',
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
      id: 'Details of the safeguarding concern',
      name: 'Details of the safeguarding concern',
      theme: 'Details of safeguarding concern',
      intro:
        'You can choose pick-list selections equivalent to three rows of the Risks / Allegations table. (The first is mandatory). If there would be more than three rows please describe the remainder in the subsequent text box',
      fields: [
        {
          id: 'Source of Risk ',
          question: 'Source of Risk - Primary allegation',
          hint: 'Select options for Source of Risk, Type of Risk and Location in respect of the main (or only) allegation',
          required: true,
          type: 'radios',
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
              value: 'Known to Individual - Relative / family / carer',
              label: 'Known to Individual - Relative / family / carer',
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
          id: 'Type of Risk',
          question: 'Type of Risk',
          hint: '',
          required: true,
          type: 'radios',
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
          id: 'Location',
          question: 'Location',
          hint: '',
          required: true,
          type: 'radios',
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
          id: 'Source of Risk (second allegation)',
          question: 'Source of Risk (second allegation)',
          hint: 'Select options for (ALL OF) Source of Risk, Type of Risk and Location in respect of the second allegation, if there is one',
          type: 'radios',
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
              value: 'Known to Individual - Relative / family / carer',
              label: 'Known to Individual - Relative / family / carer',
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
          id: 'Type of Risk (second allegation)',
          question: 'Type of Risk (second allegation)',
          hint: '',
          type: 'radios',
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
          id: 'Location (second allegation)',
          question: 'Location (second allegation)',
          hint: '',
          type: 'radios',
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
          id: 'Source of Risk (third allegation)',
          question: 'Source of Risk (third allegation)',
          hint: '',
          type: 'radios',
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
              value: 'Known to Individual - Relative / family / carer',
              label: 'Known to Individual - Relative / family / carer',
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
          id: 'Type of Risk (third allegation)',
          question: 'Type of Risk (third allegation)',
          hint: '',
          type: 'radios',
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
          id: 'Location (third allegation)',
          question: 'Location (third allegation)',
          hint: '',
          type: 'radios',
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
          id: 'Further Allegations',
          question: 'Further Allegations',
          hint: 'If there are more than three allegations then please add those further allegations as free text here. Include Source of Risk, Type of Risk and Location in respect of each',
          type: 'textarea',
        },
        {
          id: 'Suspected abuse or neglect details, including date and reported by and who to',
          question:
            'Suspected abuse or neglect details, including date and reported by and who to',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'What is the view of the person at risk about the Concern?',
          question: 'What is the view of the person at risk about the Concern?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'What are the individuals desired outcomes?',
          question: 'What are the individuals desired outcomes?',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Others at risk',
      name: 'Others at risk',
      theme: 'Others at risk',
      fields: [
        {
          id: 'Any other adult(s) at risk in the household?',
          question: 'Any other adult(s) at risk in the household?',
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
          id: 'Other adult(s) at risk in the household',
          question: 'Other adult(s) at risk in the household',
          condition: {
            id: 'Any other adult(s) at risk in the household?',
            value: 'Yes',
          },
          hint: "Please give details of both 'Name' and 'Relationship' in each case",
          type: 'textarea',
        },
        {
          id: 'Any children at risk in the household?',
          question: 'Any children at risk in the household?',
          hint: 'Guidance. If yes – please ensure you contact childrens and young person services',
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
          id: 'Children at risk in the household',
          question: 'Children at risk in the household',
          condition: {
            id: 'Any children at risk in the household?',
            value: 'Yes',
          },
          hint: "Please give details of 'Name', 'Relationship' and if a 'Separate Concern' has been raised in each case",
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Information about person(s) alleged to be causing harm ',
      name: 'Information about person(s) alleged to be causing harm ',
      theme: 'Information about person(s) alleged to be causing harm',
      intro:
        "You can enter answers for two people below. If there are more than two people please describe the remainder in the subsequent text box - 'Additional people alleged to be causing harm.",
      fields: [
        {
          id: 'Alleged person 1 name',
          question: 'Alleged person 1 name',
          hint: '',
          type: 'text',
        },
        {
          id: 'Alleged person 1 relationship',
          question: 'Alleged person 1 relationship',
          hint: '',
          type: 'text',
        },
        {
          id: 'Alleged person 1 Date of Birth',
          question: 'Alleged person 1 Date of Birth',
          hint: '',
          type: 'date',
        },
        {
          id: 'Alleged person 1 address',
          question: 'Alleged person 1 address',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Alleged person 1 telephone number (All)',
          question: 'Alleged person 1 telephone number (All)',
          hint: '',
          type: 'text',
        },
        {
          id: 'Alleged person 1 Email address',
          question: 'Alleged person 1 Email address',
          hint: '',
          type: 'text',
        },
        {
          id: 'Alleged person 1 : Was alleged person causing harm living with the adult at risk at the time of the abuse?',
          question:
            'Alleged person 1 : Was alleged person causing harm living with the adult at risk at the time of the abuse?',
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
          id: 'Alleged person 1 : Are they still living with the adult at risk?',
          question:
            'Alleged person 1 : Are they still living with the adult at risk?',
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
          id: 'Alleged person 1: Is the person alleged to be causing harm aware of the concern?',
          question:
            'Alleged person 1: Is the person alleged to be causing harm aware of the concern?',
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
          id: 'Alleged person 1: Details of awareness',
          question: 'Alleged person 1: Details of awareness',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Alleged person 1: Is the person alleged to have caused the harm also an adult at risk?',
          question:
            'Alleged person 1: Is the person alleged to have caused the harm also an adult at risk?',
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
          id: "Alleged person 1 : If yes, are the person's actions linked to a possible service failure? i)e. staff ratios",
          question:
            "Alleged person 1 : If yes, are the person's actions linked to a possible service failure? i.e. staff ratios",
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
          id: 'Alleged person 2 name',
          question: 'Alleged person 2 name',
          hint: '',
          type: 'text',
        },
        {
          id: 'Alleged person 2 relationship',
          question: 'Alleged person 2 relationship',
          hint: '',
          type: 'text',
        },
        {
          id: 'Alleged person 2 Date of Birth',
          question: 'Alleged person 2 Date of Birth',
          hint: '',
          type: 'date',
        },
        {
          id: 'Alleged person 2 address',
          question: 'Alleged person 2 address',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Alleged person 2 telephone number (All)',
          question: 'Alleged person 2 telephone number (All)',
          hint: '',
          type: 'text',
        },
        {
          id: 'Alleged person 2 email address',
          question: 'Alleged person 2 email address',
          hint: '',
          type: 'text',
        },
        {
          id: 'Alleged person 2: Was alleged person causing harm living with the adult at risk at the time of the abuse?',
          question:
            'Alleged person 2: Was alleged person causing harm living with the adult at risk at the time of the abuse?',
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
          id: 'Alleged person 2: Are they still living with the adult at risk?',
          question:
            'Alleged person 2: Are they still living with the adult at risk?',
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
          id: 'Alleged person 2: Is the person alleged to be causing harm aware of the concern?',
          question:
            'Alleged person 2: Is the person alleged to be causing harm aware of the concern?',
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
          id: 'Alleged person 2: Details of awareness',
          question: 'Alleged person 2: Details of awareness',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'Alleged person 2: Is the person alleged to have caused the harm also an adult at risk?',
          question:
            'Alleged person 2: Is the person alleged to have caused the harm also an adult at risk?',
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
          id: "Alleged person 2: If yes, are the person's actions linked to a possible service failure? i)e. staff ratios",
          question:
            "Alleged person 2: If yes, are the person's actions linked to a possible service failure? i.e. staff ratios",
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
          id: 'Additional people alleged to be causing harm',
          question: 'Additional people alleged to be causing harm',
          hint: '(If there are more than two people, please summarise the details for the questions above for the third and further persons)',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'Completion Details (Safeguarding Concern)',
      name: 'Completion Details (Safeguarding Concern)',
      theme: 'Next actions',
      fields: [
        {
          id: 'Next Actions',
          question: 'Next Actions',
          required: true,
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'Safeguarding Adults Manager Decision',
              label: 'Safeguarding Adults Manager Decision',
            },
          ],
        },
        {
          id: 'Email address of SAM',
          question: 'Email address of SAM',
          hint: "(Who will review this Concern and complete a SAM Decision? You need to forward the 'receipt' copy of this form to them once you receive it)",
          required: true,
          type: 'text',
        },
      ],
    },
  ],
};

export default form;
