import { Form } from './forms.types';

const formData: Form[] = [
  {
    id: 'conversation-3',
    name: 'Conversation 3',
    steps: [
      {
        id: 'first-step',
        name: 'Basic details',
        theme: 'You and your needs',
        fields: [
          {
            id: 'start-date-of-conversation-3',
            question: 'Start date of Conversation 3',
            hint: '',
            type: 'date',
          },
          {
            id: 'mosaic-id',
            question: 'Mosaic ID',
            hint: '(if known)',
            type: 'text',
          },
          {
            id: 'emergency-id-(asc)',
            question: 'Emergency ID (ASC)',
            hint:
              '(Find or create an emergency ID number for this person in the list of numbers provided to your team, and enter it here)',
            type: 'text',
          },
          {
            id: 'nhs-number',
            question: 'NHS Number',
            hint: '(if known)',
            type: 'text',
          },
          { id: 'title', question: 'Title', hint: '', type: 'text' },
          {
            id: 'first-name',
            question: 'First name',
            hint: '',
            type: 'text',
          },
          {
            id: 'last-name',
            question: 'Last name',
            hint: '',
            type: 'text',
          },
          {
            id: 'person-other-names-(aliases)',
            question: 'Person Other Names (Aliases)',
            hint: '',
            type: 'text',
          },
          {
            id: 'gender',
            question: 'Gender',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'not-known', label: 'Not Known' },
            ],
          },
          {
            id: 'date-of-birth',
            question: 'Date of birth',
            hint: '',
            type: 'date',
          },
          {
            id: 'address-line-1',
            question: 'Address Line 1',
            hint: '(Primary Address)',
            type: 'text',
          },
          {
            id: 'address-line-2',
            question: 'Address Line 2',
            hint: '(Primary Address)',
            type: 'text',
          },
          {
            id: 'address-line-3',
            question: 'Address Line 3',
            hint: '(Primary Address)',
            type: 'text',
          },
          {
            id: 'postcode',
            question: 'Postcode',
            hint: '(Primary Address)',
            type: 'text',
          },
          {
            id: 'contact-number',
            question: 'Contact number',
            hint: '',
            type: 'textarea',
          },
          {
            id: 'person-email-address',
            question: 'Person Email address',
            hint: '',
            type: 'text',
          },
          {
            id: 'household-structure',
            question: 'Household Structure',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'lives-alone', label: 'Lives alone' },
              { value: 'lives-with-others', label: 'Lives with Others' },
              { value: 'unknown', label: 'Unknown' },
            ],
          },
          {
            id: 'list-your-key-contacts:',
            question: 'List your key contacts:',
            hint:
              "(Include 'Name', 'Relationship/Role', 'Address and Contact Details' for each individual that would appear in the Key Contacts table)",
            type: 'textarea',
          },
          { id: 'gp-name', question: 'GP Name', hint: '', type: 'text' },
          {
            id: 'gp-practice',
            question: 'GP Practice',
            hint: '',
            type: 'textarea',
          },
          {
            id: 'gp-address',
            question: 'GP Address',
            hint: '',
            type: 'textarea',
          },
          {
            id: 'gp-telephone',
            question: 'GP Telephone',
            hint: '',
            type: 'text',
          },
          {
            id: 'gp-email',
            question: 'GP Email',
            hint: '',
            type: 'text',
          },
          {
            id:
              'has-this-person-been-assessed-by-hackney-adult-social-care-before',
            question:
              'Has this person been assessed by Hackney adult social care before?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'not-known', label: 'Not known' },
            ],
          },
        ],
      },
      {
        id: 'communication',
        name: 'Communication',
        theme: 'You and your needs',
        fields: [
          {
            id: 'preferred-method-of-contact',
            question: 'Preferred method of contact',
            hint: '(e.g. Telephone, Face to face or Video link)',
            type: 'text',
          },
          {
            id: 'fluency-in-english',
            question: 'Fluency in English',
            hint: '',
            type: 'text',
          },
          {
            id: 'firstpreferred-language',
            question: 'First/preferred language',
            hint: '',
            type: 'text',
          },
          {
            id: 'interpreter-required',
            question: 'Interpreter required?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'do-you-have-communication-difficulties',
            question: 'Do you have communication difficulties?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'do-you-have-any-difficulties-with-understanding-andor-retaining-information',
            question:
              'Do you have any difficulties with understanding and/or retaining information?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'do-you-have-any-difficulties-making-decisions-andor-understanding-their-impact',
            question:
              'Do you have any difficulties making decisions and/or understanding their impact?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'further-details-(communication)',
            question: 'Further Details (Communication)',
            hint: '',
            type: 'textarea',
          },
        ],
      },
      {
        id: 'supporting-you-in-your-assessment',
        name: 'Supporting you in your assessment',
        theme: 'You and your needs',
        fields: [
          {
            id:
              'please-provide-details-of-difficulties-and-what-would-help-you-communicate-more-easily-during-your-assessment-(e.g.-a-family-member-or-friend-present-an-independent-advocate-specialist-communication-support)',
            question:
              'Please provide details of difficulties and what would help you communicate more easily during your assessment (e.g. a family member or friend present, an independent advocate, specialist communication support)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'please-list-other-people-involved-in-your-assessment-(e.g.-advocate-carer-family-friend-other-professionals)-provide-details-including-names-rolesrelationship-and-contact-details.',
            question:
              'Please list other people involved in your assessment (e.g. advocate, carer, family, friend, other professionals) Provide details including names, roles/relationship and contact details.',
            hint: '',
            type: 'textarea',
          },
        ],
      },
      {
        id: 'about-you',
        name: 'About You',
        theme: 'You and your needs',
        fields: [
          {
            id:
              'did-the-client-choose-to-decline-any-further-social-services-support',
            question:
              'Did the client choose to decline any further Social Services support?',
            hint:
              '(Has the client stated that they do not wish further assessment or services from Hackney Adults Social Care at this point)',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'about-you',
            question: 'About you',
            hint: '',
            type: 'textarea',
          },
          {
            id: 'are-you-able-to-access-use-the-internet',
            question: 'Are you able to access / use the Internet?',
            hint: '',
            type: 'text',
          },
          {
            id:
              'are-you-using-specialist-technology-to-help-you-manage-at-home-(e.g.-telecare)',
            question:
              'Are you using specialist technology to help you manage at home (e.g. telecare)',
            hint: '',
            type: 'text',
          },
          {
            id: 'what-resources-support-was-recommended-and-outcome',
            question: 'What resources, support was recommended and outcome',
            hint: '',
            type: 'textarea',
          },
          {
            id: 'next-actions',
            question: 'Next actions',
            hint: '',
            type: 'textarea',
          },
          {
            id: 'did-your-input-prevent-admission-to-hospital',
            question: 'Did your input prevent admission to hospital',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'number-of-visits',
            question: 'Number of Visits',
            hint: '(including telephone calls to the person, etc)',
            type: 'text',
          },
        ],
      },
      {
        id: 'care-act-outcomes-and-eligibility',
        name: 'Care Act Outcomes and Eligibility',
        theme: 'You and your needs',
        fields: [
          {
            id:
              '1.-do-you-have-a-condition-as-a-result-of-either-your-physical-mental-sensory-learning-or-cognitive-disabilities-or-illnesses-substance-misuse-or-brain-injury',
            question:
              '1.  Do you have a condition as a result of either your physical, mental, sensory, learning or cognitive disabilities or illnesses, substance misuse or brain injury?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              '2.-as-a-result-of-your-needs-are-you-unable-to-achieve-two-or-more-of-the-eligible-outcomes-below',
            question:
              '2.  As a result of your needs are you unable to achieve two or more of the eligible outcomes below',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'can-you-"maintain-a-habitable-home-environment"-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Maintain a habitable home environment" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'details-(maintain-a-habitable-home-environment)',
            question: 'Details (Maintain a habitable home environment)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"manage-and-maintain-nutrition"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Manage and maintain nutrition" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'details-(manage-and-maintain-nutrition)',
            question: 'Details (Manage and maintain nutrition)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"manage-toilet-needs"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Manage toilet needs" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'details-(manage-toilet-needs)',
            question: 'Details (Manage toilet needs)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"maintain-personal-hygiene"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Maintain personal hygiene" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'details-(maintain-personal-hygiene)',
            question: 'Details (Maintain personal hygiene)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"be-appropriately-clothed"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Be appropriately clothed" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'details-(be-appropriately-clothed)',
            question: 'Details (Be appropriately clothed)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"develop-and-maintain-family-or-other-personal-relationships"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Develop and maintain family or other personal relationships" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'details-(develop-and-maintain-family-or-other-personal-relationships)',
            question:
              'Details (Develop and maintain family or other personal relationships)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"make-use-of-necessary-facilities-or-services-in-the-local-community-(including-public-transport-and-recreational-facilitiesservices)"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Make use of necessary facilities or services in the local community (including public transport and recreational facilities/services)" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'details-(make-use-of-necessary-facilities-or-services-in-the-local-community)',
            question:
              'Details (Make use of necessary facilities or services in the local community)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"access-and-engage-in-work-training-education-or-volunteering"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Access and engage in work, training, education or volunteering" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'details-(access-and-engage-in-work-training-education-or-volunteering)',
            question:
              'Details (Access and engage in work, training, education or volunteering)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"carry-out-any-caring-responsibilities-for-a-child"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Carry out any caring responsibilities for a child" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'details-(carry-out-any-caring-responsibilities-for-a-child)',
            question:
              'Details (Carry out any caring responsibilities for a child)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'can-you-"be-able-to-make-use-of-your-home-safely"-alone-within-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
            question:
              'Can you "Be able to make use of your home safely" alone within within a reasonable time and without significant pain, distress, anxiety or risk to yourself or others?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'details-(be-able-to-make-use-of-your-home-safely)',
            question: 'Details (Be able to make use of your home safely)',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              '3.-as-a-result-of-being-unable-to-achieve-these-outcomes-is-there-or-is-there-likely-to-be-a-significant-impact-on-your-wellbeing',
            question:
              '3.  As a result of being unable to achieve these outcomes is there, or is there likely to be, a significant impact on your wellbeing?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
        ],
      },
      {
        id: 'impact-on-wellbeing',
        name: 'Impact on wellbeing',
        theme: 'You and your needs',
        fields: [
          {
            id:
              'details-of-the-impact-on-your-wellbeing-(in-the-absence-of-any-support-you-may-already-have-in-place)',
            question:
              'Details of the impact on your wellbeing (in the absence of any support you may already have in place)',
            hint: '',
            type: 'textarea',
          },
        ],
      },
      {
        id: 'informal-carer',
        name: 'Informal Carer',
        theme: 'People who care for you',
        fields: [
          {
            id: 'do-you-receive-support-from-a-carer-(informal-unpaid)',
            question: 'Do you receive support from a Carer (informal / unpaid)',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes-(carer)', label: 'Yes (Carer)' },
              { value: 'no-carer', label: 'No carer' },
            ],
          },
        ],
      },
      {
        id: 'informal-carer-details',
        name: 'Informal Carer Details',
        theme: 'People who care for you',
        fields: [
          {
            id: 'carer-mosaic-id',
            question: 'Carer Mosaic ID',
            hint: '(if known)',
            type: 'text',
          },
          {
            id: 'carer-emergency-id-(asc)',
            question: 'Carer Emergency ID (ASC)',
            hint:
              '(Find or create an emergency ID number for this person in the list of numbers provided to your team, and enter it here)',
            type: 'text',
          },
          {
            id: 'carer-nhs-number',
            question: 'Carer NHS Number',
            hint: '(if known)',
            type: 'text',
          },
          {
            id: 'carer-first-name',
            question: 'Carer First Name',
            hint: '',
            type: 'text',
          },
          {
            id: 'carer-last-name',
            question: 'Carer Last Name',
            hint: '',
            type: 'text',
          },
          {
            id: 'relationship-to-main-subject-of-assessment',
            question: 'Relationship to main subject of assessment',
            hint: '',
            type: 'textarea',
          },
          {
            id: 'is-this-the-main-carer-for-the-cared-for-person',
            question: 'Is this the main carer for the cared-for person?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'if-conversation-is-completed-with-an-informal-unpaid-carer-present-would-the-carer-like-to-have-a-separate-conversation',
            question:
              'If conversation is completed with an informal / unpaid Carer present, would the Carer like to have a separate conversation? ',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'if-conversation-is-completed-with-the-carer-present-does-the-carer-agree-this-is-a-joint-conversation',
            question:
              'If conversation is completed with the Carer present, does the Carer agree this is a joint conversation?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
        ],
      },
      {
        id: 'joint-conversation-with-carer',
        name: 'Joint Conversation with Carer',
        theme: 'People who care for you',
        fields: [
          {
            id:
              'has-the-carer-been-assessed-as-having-one-or-more-eligible-need',
            question:
              'Has the carer been assessed as having one or more eligible need?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: "impact-of-caring-on-your-own-carer's-independence",
            question: "Impact of caring on your own Carer's independence",
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'what-are-your-informal-arrangements-when-you-are-unable-to-provide-care',
            question:
              'What are your informal arrangements when you are unable to provide care?',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'does-the-person-that-you-care-for-have-any-special-requirements-that-we-should-know-about',
            question:
              'Does the person that you care for have any special requirements that we should know about?',
            hint: '',
            type: 'textarea',
          },
          {
            id:
              'was-the-carer-provided-with-information-advice-and-other-universal-services-signposting',
            question:
              'Was the Carer provided with Information, Advice and Other Universal Services / Signposting?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id:
              'if-yes-was-the-carer-signposted-to-a-relevant-support-service-such-as-the-carers-centre',
            question:
              'If yes, was the Carer signposted to a relevant support service such as the Carers Centre? ',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              {
                value: 'not-applicable-(not-signposted)',
                label: 'Not applicable (not signposted)',
              },
            ],
          },
          {
            id:
              'will-respite-or-other-forms-of-carer-support-be-delivered-to-the-cared-for-person',
            question:
              'Will respite or other forms of carer support be delivered to the cared-for person? ',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
        ],
      },
      {
        id: 'my-personal-budget',
        name: 'My personal budget',
        theme: 'Your budget',
        fields: [
          {
            id: 'my-total-weekly-hours-(budget)',
            question: 'My total weekly hours',
            hint: 'Use decimals for part-hours',
            type: 'text',
          },
          {
            id: 'date-of-plan-(budget)',
            question: 'Date of plan',
            hint: "Today's date, rather than the authorised date",
            type: 'date',
          },
          {
            id: 'weekly-budget',
            question: 'Budget spending plan',
            type: 'repeaterGroup',
            itemName: 'budget item',
            subfields: [
              {
                id: 'budget-spending-plan:-desired-outcome',
                question: 'Desired outcome',
                type: 'select',
                choices: [
                  {
                    value: 'Maintain a habitable home environment',
                    label: 'Maintain a habitable home environment',
                  },
                  {
                    value: 'Manage and maintain nutrition',
                    label: 'Manage and maintain nutrition',
                  },
                  {
                    value: 'Manage toilet needs',
                    label: 'Manage toilet needs',
                  },
                  {
                    value: 'Maintain personal hygiene',
                    label: 'Maintain personal hygiene',
                  },
                  {
                    value: 'Be appropriately clothed',
                    label: 'Be appropriately clothed',
                  },
                  {
                    value:
                      'Develop and maintain family or other personal relationships',
                    label:
                      'Develop and maintain family or other personal relationships',
                  },
                  {
                    value:
                      'Make use of necessary facilities or services in local community',
                    label:
                      'Make use of necessary facilities or services in local community',
                  },
                  {
                    value:
                      'Access and engage in work, training, education or volunteering',
                    label:
                      'Access and engage in work, training, education or volunteering',
                  },
                  {
                    value: 'Carry out any caring responsibilities for a child',
                    label: 'Carry out any caring responsibilities for a child',
                  },
                  {
                    value: 'Be able to make use of your home safely',
                    label: 'Be able to make use of your home safely',
                  },
                ],
              },
              {
                id: 'budget-spending-plan:-how-this-will-be-achieved',
                question: 'How this will be achieved?',
                hint: '',
                type: 'textarea',
              },
              {
                id: 'budget-spending-plan:-who-by',
                question: 'Who by?',
                type: 'select',
                choices: [
                  { value: 'By myself', label: 'By myself' },
                  {
                    value: 'By family / friend / carer',
                    label: 'By family / friend / carer',
                  },
                  {
                    value: 'By support from a community group',
                    label: 'By support from a community group',
                  },
                  {
                    value: 'By support from a health professional',
                    label: 'By support from a health professional',
                  },
                  {
                    value: 'By provision of equipment',
                    label: 'By provision of equipment',
                  },
                  { value: 'Major Adaptation', label: 'Major Adaptation' },
                  {
                    value: 'By provision of domiciliary care',
                    label: 'By provision of domiciliary care',
                  },
                  {
                    value: 'By provision of Direct Payment',
                    label: 'By provision of Direct Payment',
                  },
                  {
                    value: 'By Housing with Care',
                    label: 'By Housing with Care',
                  },
                  { value: 'By respite', label: 'By respite' },
                  { value: 'By a day service', label: 'By a day service' },
                  {
                    value: 'By support from housing',
                    label: 'By support from housing',
                  },
                  {
                    value: 'By support from Children’s services',
                    label: 'By support from Children’s services',
                  },
                ],
              },
              {
                id: 'budget-spending-plan:-how-often',
                question: 'How often?',
                hint: '',
                type: 'text',
              },
              {
                id: 'budget-spending-plan:-weekly-cost-pound',
                question: 'Weekly cost (£)',
                hint: '',
                type: 'text',
              },
              {
                id: 'budget-spending-plan:-yearly-cost-pound',
                question: 'Yearly cost (£)',
                hint: '',
                type: 'text',
              },
              {
                id: 'budget-spending-plan:-start-date',
                question: 'Start date',
                hint: '',
                type: 'date',
              },
              {
                id: 'budget-spending-plan:-end-date',
                question: 'End date',
                hint: '',
                type: 'date',
              },
            ],
          },
        ],
      },
      {
        id: 'managing-my-budget',
        name: 'Managing my budget',
        theme: 'Your budget',
        fields: [
          {
            id: 'who-will-manage-my-budget',
            question: 'Who will manage my budget?',
            hint: '',
            type: 'radios',
            choices: [
              {
                value: 'me-via-a-direct-payment',
                label: 'Me via a Direct Payment',
              },
              {
                value: 'my-representative-via-direct-payment',
                label: 'My representative - via Direct Payment',
              },
              { value: 'local-authority', label: 'Local Authority' },
              {
                value: 'other-arrangement-(e.g.-mixed)',
                label: 'Other arrangement (e.g. mixed)',
              },
            ],
          },
          {
            id: 'does-the-identified-representative-have-a-power-of-attorney',
            question:
              'Does the identified representative have a Power of Attorney?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'not-applicable', label: 'Not applicable' },
            ],
          },
          {
            id: 'list-details-of-those-managing-my-budget',
            question: 'List details of those managing my budget',
            hint:
              "Include 'Name and address', 'Contact Number' and 'Relationship' for each row (individual / organisation)",
            type: 'textarea',
          },
          {
            id:
              'has-this-person-been-given-a-copy-of-the-financial-assessment-form',
            question:
              'Has this person been given a copy of the Financial Assessment form?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'my-contribution-(poundweek-to-be-confirmed-by-finance)',
            question: 'My contribution (£/week to be confirmed by finance) ',
            hint: '',
            type: 'text',
          },
          {
            id:
              'local-authority-contribution-(poundweek-to-be-confirmed-by-finance)',
            question:
              'Local Authority contribution (£/week to be confirmed by finance)',
            hint: '',
            type: 'text',
          },
          {
            id: 'other-contributions-(poundweek)',
            question: 'Other contributions (£/week) ',
            hint: '',
            type: 'text',
          },
          {
            id: 'details-(budget)',
            question: 'Details (budget)',
            hint: '',
            type: 'textarea',
          },
        ],
      },
      {
        id: 'special-funding-arrangements',
        name: 'Special funding arrangements ',
        theme: 'Your budget',
        fields: [
          {
            id: 'has-a-ds1500-form-been-issued',
            question: 'Has a DS1500 form been issued?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'not-known', label: 'Not known' },
            ],
          },
          {
            id: 'are-you-entitled-to-section-117-aftercare',
            question: 'Are you entitled to Section 117 aftercare?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'no-longer', label: 'No longer' },
            ],
          },
          {
            id: 'are-you-receiving-care-under-the-care-programme-approach',
            question:
              'Are you receiving care under the Care Programme Approach?',
            hint: '',
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'no-longer', label: 'No longer' },
            ],
          },
        ],
      },
      {
        id: 'weekly-timetable',
        name: 'Weekly Timetable',
        theme: 'Your budget',
        fields: [
          {
            id: 'date-of-timetable',
            question: 'Date of Timetable',
            hint:
              "(Today's date, being the submission date of this Google form - instead of authorised date)",
            type: 'date',
          },
          {
            id: 'total-weekly-hours-(timetable)',
            question: 'Total weekly hours (Timetable)',
            hint: '(Use decimal notation for part-hours)',
            type: 'text',
          },
          {
            id: 'other-(poundweek)',
            question: 'Other (£/Week)',
            hint: '',
            type: 'text',
          },
          {
            id: 'list-details-of-my-weekly-timetable',
            question: 'List details of my weekly timetable',
            hint:
              "Please break this down into 'Day', 'Morning', 'Afternoon', 'Evening', 'Night' and 'Estimated Weekly Cost'",
            type: 'textarea',
          },
        ],
      },
      {
        id: 'completed-by',
        name: 'Completed by',
        theme: 'Next steps and approval',
        fields: [
          {
            id: 'completed-date-(conversation-3)',
            question: 'Completed date (Conversation 3)',
            hint: '',
            type: 'date',
          },
          {
            id: 'workers-name',
            question: 'Workers name',
            hint: '',
            type: 'text',
          },
          {
            id: 'workers-team',
            question: 'Workers team',
            hint: '',
            type: 'text',
          },
          {
            id: 'managers-name',
            question: 'Managers Name ',
            hint: '',
            type: 'text',
          },
        ],
      },
      {
        id: 'next-actions',
        name: 'Next Actions',
        theme: 'Next steps and approval',
        fields: [
          {
            id: 'will-this-conversation-lead-to-a-safeguarding-concern',
            question: 'Will this Conversation lead to a Safeguarding Concern?',
            hint:
              "If yes, please ensure you complete an 'Adults - Safeguarding Adult Concern' form",
            type: 'radios',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
          {
            id: 'what-next-workflow',
            question: 'What Next - workflow',
            hint:
              "(if you are not transferring to the Long Term team and the person was also not accepted / eligible for reablement then choose 'Close Case / No Further Action' - e.g. provision of Immediate Services and / or Telecare falls within 'No Further Action' in this sense after you finish Conversation 3)",
            type: 'radios',
            choices: [
              {
                value: 'transfer-case-to-long-term-team',
                label: 'Transfer case to Long Term team',
              },
              {
                value: 'transfer-case-to-iit-(for-reablement)',
                label: 'Transfer case to IIT (for reablement)',
              },
              {
                value: 'close-case-no-further-action',
                label: 'Close Case /No Further Action',
              },
            ],
          },
        ],
      },
      {
        id: 'transfer-case-to-long-term-team',
        name: 'Transfer case to Long Term team',
        theme: 'Next steps and approval',
        fields: [
          {
            id: 'date-of-next-review',
            question: 'Date of Next Review',
            hint:
              'Please schedule a date in 3, 6 or 12 months time, as required, for the Long Term team to carry out a Review',
            type: 'date',
          },
        ],
      },
      {
        id: 'sequel-to-conversation-3-(long-term-team)',
        name: 'Sequel to Conversation 3 (Long Term Team)',
        theme: 'Next steps and approval',
        fields: [
          {
            id: 'outcomes-for-transfer-to-long-term-team-(sequel)',
            question: 'Outcomes for Transfer to Long Term Team (Sequel)',
            hint: '(Choose the first which applies)',
            type: 'radios',
            choices: [
              {
                value: 'long-term-support-(nursing-care)',
                label: 'Long Term Support (Nursing Care)',
              },
              {
                value: 'long-term-support-(residential-care)',
                label: 'Long Term Support (Residential Care)',
              },
              {
                value: 'long-term-support-(community)',
                label: 'Long Term Support (Community)',
              },
              { value: 'option-4', label: 'Option 4' },
              {
                value: 'end-of-life-(overseen-by-long-term-team)',
                label: 'End of Life (overseen by Long Term team)',
              },
            ],
          },
        ],
      },
      {
        id: 'sequel-to-conversation-3-(reablement)',
        name: 'Sequel to Conversation 3 (Reablement)',
        theme: 'Next steps and approval',
        fields: [
          {
            id: 'outcomes-for-reablement-referral-(sequel)',
            question: 'Outcomes for Reablement Referral (Sequel)',
            hint: '(Only one applies in this case - please select)',
            type: 'radios',
            choices: [
              {
                value:
                  'short-term-support-to-maximise-independence-(reablement)',
                label:
                  'Short Term Support to Maximise Independence (Reablement)',
              },
            ],
          },
        ],
      },
      {
        id: 'sequel-to-conversation-3-(nfa-clo,sure)',
        name: 'Sequel to Conversation 3 (NFA / Closure)',
        theme: 'Next steps and approval',
        fields: [
          {
            id: 'outcomes-for-contact-(sequel)',
            question: 'Outcomes for Contact (Sequel)',
            hint: '(Choose the first which applies)',
            type: 'radios',
            choices: [
              {
                value: 'end-of-life-(not-overseen-by-long-term-team)',
                label: 'End of Life (not overseen by Long Term team)',
              },
              {
                value:
                  'ongoing-low-level-support-(provided-with-telecare-or-equipment-adaptations)',
                label:
                  'Ongoing Low Level Support (provided with Telecare or Equipment / Adaptations)',
              },
              {
                value:
                  'short-term-support-(other)-(e.g.-immediate-services-time-limited-support-not-reablement-)',
                label:
                  'Short Term Support (other) (e.g. Immediate Services - Time-limited support; NOT Reablement; )',
              },
              {
                value: 'universal-servicessignposted-to-other-services',
                label: 'Universal Services/Signposted to other services',
              },
              {
                value: 'no-services-provided-deceased',
                label: 'No services provided - Deceased',
              },
              {
                value: 'no-services-provided-other-reason',
                label: 'No services provided - other reason',
              },
            ],
          },
        ],
      },
      {
        id: 'manager-approval',
        name: 'Manager approval',
        theme: 'Next steps and approval',
        fields: [
          {
            id:
              'email-address-of-your-manager-(who-would-normally-approve-this-decision)',
            question:
              'Email address of your manager (who would normally approve this decision)',
            hint:
              "(Who will retrospectively approve this decision? You need to manually forward the 'receipt' copy of this form to them once you receive it)",
            type: 'text',
          },
        ],
      },
    ],
  },

  {
    id: 'imported-google-form',
    name: 'Imported Google Form',
    steps: [
      {
        id: 'first-step',
        name: 'First step',
        fields: [
          {
            id: 'first-name',
            question: 'First Name ',
            hint: '',
            type: 'text',
          },
          {
            id: 'surname',
            question: 'Surname',
            hint: '',
            type: 'text',
          },
          {
            id: 'date-of-birth',
            question: 'Date of Birth',
            hint: '',
            type: 'date',
          },
          {
            id: 'address-line-1',
            question: 'Address Line 1 ',
            hint: '',
            type: 'text',
          },
          {
            id: 'address-line-2',
            question: 'Address Line 2 ',
            hint: '',
            type: 'text',
          },
          {
            id: 'post-code',
            question: 'Post Code ',
            hint: '',
            type: 'text',
          },
          {
            id: 'contact-number',
            question: 'Contact number',
            hint: '',
            type: 'text',
          },
          {
            id: 'person-unique-id-type',
            question: 'Person Unique ID Type',
            hint: '(Choose the first that you know)',
            type: 'radios',
            choices: [
              {
                value: 'mosaic-id',
                label: 'Mosaic ID',
              },
              {
                value: 'emergency-id',
                label: 'Emergency ID',
              },
            ],
          },
          {
            id: 'person-unique-id',
            question: 'Person Unique ID',
            hint: '',
            type: 'text',
          },
        ],
      },
      {
        id: 'hidden-section-form-identifiers',
        name: 'hidden-section-form-identifiers',
        fields: [
          {
            id: 'reports-unique-id',
            question: 'Reports Unique ID',
            hint:
              "(Generate at submission to concatenate the number onto either 'MOS', 'TMP' or 'NHS' to provide something Unique for reporting)",
            type: 'text',
          },
          {
            id: 'mosaic-person-reference',
            question: 'Mosaic Person Reference ',
            hint: '',
            type: 'text',
          },
          {
            id: 'emergency-id-number',
            question: 'Emergency ID number',
            hint: '',
            type: 'text',
          },
          {
            id: 'original-timestamp-form',
            question: 'Original Timestamp - Form',
            hint: '',
            type: 'date',
          },
          {
            id: 'original-submitter-form',
            question: 'Original Submitter - Form',
            hint: '',
            type: 'text',
          },
          {
            id: 'original-edit_url-form',
            question: 'Original Edit_URL - Form',
            hint: '',
            type: 'text',
          },
          {
            id: 'previous-timestamp-form',
            question: 'Previous Timestamp - Form',
            hint: '',
            type: 'date',
          },
          {
            id: 'previous-submitter-form',
            question: 'Previous Submitter -  Form',
            hint: '',
            type: 'text',
          },
          {
            id: 'workflow-identifier',
            question: 'Workflow Identifier',
            hint: '',
            type: 'text',
          },
          {
            id: 'form-title-previous-form',
            question: 'Form Title - Previous Form',
            hint: '',
            type: 'text',
          },
          {
            id: 'original-timestamp-workflow',
            question: 'Original Timestamp - Workflow',
            hint: '',
            type: 'date',
          },
          {
            id: 'original-submitter-workflow',
            question: 'Original Submitter - Workflow',
            hint: '',
            type: 'text',
          },
          {
            id: 'original-edit_url-workflow',
            question: 'Original Edit_URL - Workflow',
            hint: '',
            type: 'text',
          },
        ],
      },
      {
        id: 'case-note-details',
        name: 'case-note-details',
        fields: [
          {
            id: "if-'other'-please-provide-case-note-type",
            question: "If 'Other', please provide case note type ",
            hint: '',
            type: 'text',
          },
          {
            id: 'date-of-event',
            question: 'Date of Event ',
            hint: '',
            type: 'date',
          },
          {
            id: 'case-note-description-(please-write-case-notes-here)',
            question: 'Case Note Description (please write case notes here)',
            hint: '',
            type: 'textarea',
          },
        ],
      },
    ],
  },

  {
    id: 'case-note',
    name: 'Case note',
    steps: [
      {
        id: 'case-note',
        name: 'New case note',
        fields: [
          {
            id: 'type',
            question: 'What kind of note is this?',
            type: 'radios',
            required: true,
            choices: [
              {
                value: 'visit',
                label: 'Visit',
              },
              {
                value: 'correspondence',
                label: 'Correspondence',
              },
              {
                value: 'something-else',
                label: 'Something else',
              },
            ],
          },
          {
            id: 'correspondence-type',
            question: 'What kind of correspondence?',
            type: 'radios',
            required: true,
            condition: {
              id: 'type',
              value: 'correspondence',
            },
            choices: [
              {
                value: 'phone-call',
                label: 'Phone call',
              },
              {
                value: 'email-letter-text-message',
                label: 'Email, letter or text message',
              },
            ],
          },
          {
            id: 'visit-type',
            question: 'What kind of visit?',
            type: 'radios',
            required: true,
            condition: {
              id: 'type',
              value: 'visit',
            },
            choices: [
              {
                value: 'home',
                label: 'Home visit',
              },
              {
                value: 'office',
                label: 'Office visit',
              },
              {
                value: 'no-reply',
                label: 'No reply to home visit',
              },
            ],
          },
          {
            id: 'what-happened',
            question: 'What happened?',
            type: 'textarea',
            required: true,
          },
          {
            id: 'actions',
            question: 'Actions',
            type: 'repeaterGroup',
            hint: 'eg. Dave to contact landlord',
            itemName: 'action',
            subfields: [
              {
                id: 'text',
                question: 'What needs to be done?',
                type: 'text',
              },
              {
                id: 'assignee',
                question: 'Assigned to',
                type: 'text',
                className: 'govuk-input--width-10',
              },
              {
                id: 'due',
                question: 'Due',
                type: 'text',
                className: 'govuk-input--width-10',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'assessment',
    name: 'Social care assessment',
    steps: [
      {
        id: 'foo',
        name: 'Example section',
        theme: 'You and your needs',
        fields: [
          {
            id: 'name',
            question: 'Name',
            type: 'text',
            required: true,
          },

          {
            id: 'date',
            question: 'Date',
            type: 'date',
            required: true,
          },
          {
            id: 'repeater-example',
            question: 'Example repeater question',
            type: 'repeater',
            hint: 'Example hint',
            required: true,
          },
          {
            id: 'key-contacts',
            question: 'Key contacts',
            type: 'repeaterGroup',
            itemName: 'contact',
            required: true,
            subfields: [
              {
                id: 'name',
                question: 'Name',
                type: 'text',
                required: true,
                hint: '',
                error: '',
                choices: [],
              },

              {
                id: 'date',
                question: 'Date',
                type: 'date',
                required: true,
                className: 'govuk-input--width-10',
              },
              {
                id: 'name2',
                question: 'Name2',
                type: 'repeater',
                required: true,
                hint: '',
                error: '',
              },
              {
                id: 'relationship-role',
                question: 'Relationship or role',
                type: 'textarea',
                required: true,
                hint: '',
                error: '',
                choices: [],
              },
              {
                id: 'address',
                question: 'Address',
                type: 'radios',
                required: true,
                hint: '',
                error: '',
                choices: [
                  {
                    label: 'Choice one',
                    value: 'choice-one',
                  },
                  {
                    label: 'Choice two',
                    value: 'choice-two',
                  },
                ],
              },
              {
                id: 'bar',
                question: 'Bar',
                type: 'checkboxes',
                required: true,
                hint: '',
                error: '',
                choices: [
                  {
                    label: 'Choice one',
                    value: 'choice-oneo',
                  },
                  {
                    label: 'Choice two',
                    value: 'choice-two',
                  },
                ],
              },
              {
                id: 'su',
                question: 'Su',
                type: 'select',
                required: true,
                hint: '',
                error: '',
                choices: [
                  {
                    label: 'Choice one',
                    value: 'choice-oneo',
                  },
                  {
                    label: 'Choice two',
                    value: 'choice-two',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'bar',
        name: 'Example section 2',
        theme: 'More stuff',
        fields: [
          {
            id: 'example question',
            question: "What's your favourite colour?",
            type: 'select',
            required: false,
            choices: [
              {
                value: 'red',
                label: 'Red',
              },
              {
                value: 'green',
                label: 'Green',
              },
            ],
          },
        ],
      },
      {
        id: 'your-medication-and-symptoms',
        name: 'Your medication and symptoms',
        theme: 'You and your needs',
        fields: [
          {
            id: 'prescribed-medications',
            question: 'Are you taking any prescribed medications?',
            hint: 'For example, XYZ',
            type: 'radios',
            className: 'govuk-radios--inline',
            required: true,
            choices: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
          },
          {
            id: 'medications',
            question: 'Which medications?',
            error: 'This is a custom error message',
            type: 'textarea',
            required: true,
            condition: {
              id: 'prescribed-medications',
              value: 'true',
            },
          },
          {
            id: 'support-taking-or-using-medicatons',
            question: 'Do you need support taking or using medication?',
            type: 'text',
            required: true,
            prefill: 'firstName',
          },
          {
            id: 'pain-or-distress',
            question:
              'Does your physical condition or any medication that you are taking cause you pain or distress?',
            type: 'radios',
            className: 'govuk-radios--inline',
            required: true,
            choices: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
          },
          {
            id: 'adequate-pain-relief',
            question:
              'Are you getting adequate relief from pain or other distressing physical symptoms?',
            type: 'radios',
            className: 'govuk-radios--inline',
            required: true,
            choices: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
          },
          {
            id: 'difficulty-breathing',
            question: 'Do you have difficulty breathing?',
            type: 'radios',
            className: 'govuk-radios--inline',
            required: true,
            choices: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'example',
    name: 'Another example',
    steps: [
      {
        id: 'bar',
        name: 'Bar',
        theme: 'More stuff',
        fields: [
          {
            id: 'example question',
            question: "What's your favourite colour?",
            type: 'select',
            required: false,
            choices: [
              {
                value: 'red',
                label: 'Red',
              },
              {
                value: 'green',
                label: 'Green',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'conversation-1',
    name: 'Conversation 1',
    steps: [
      {
        id: 'about-you',
        name: 'About you',
        theme: 'You and your home',
        fields: [
          {
            id: 'first-name',
            question: 'First name',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'last-name',
            question: 'Last name',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'title',
            question: 'Title',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'person-other-name',
            question: 'Person other name',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'gender',
            question: 'Gender',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'date-of-birth',
            question: 'Date of birth',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'social-care-id-aka-person-id-mosaic-id',
            question: 'Social care ID [aka Person ID / Mosaic ID]',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'nhs-number',
            question: 'NHS number',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'address-line-1-2-3-4-postcode',
            question: 'Address [line 1 / 2 / 3 / 4 / Postcode]',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'phone-number-can-be-multiple-with-type-options',
            question: 'Phone number [can be multiple with type options]',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'person-type-asc-for-cfs',
            question: 'Person type [ASC for CFS]',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
        ],
      },
      {
        id: 'about-your-home',
        name: 'About your home',
        theme: 'You and your home',
        fields: [
          {
            id: 'primary-address-tenure-type',
            question: 'Primary address tenure type',
            type: 'combobox',
            required: false,
            hint: '',
            error: '',
            choices: [
              {
                value:
                  'acute-long-term-healthcare-residential-facility-or-hospital-(eg-nhs-independent-general-hospital-clinic',
                label:
                  'Acute / long-term healthcare residential facility or hospital (eg NHS independent general hospital / clinic',
              },
              { value: 'long-stay-hospital', label: ' long-stay hospital' },
              {
                value:
                  'approved-premises-for-offenders-released-from-prison-or-under-probation-supervision-(eg-probation-hostel)',
                label:
                  '\nApproved premises for offenders released from prison or under probation supervision (eg probation hostel)',
              },
              {
                value:
                  'mobile-accommodation-for-gypsy-roma-and-traveller-communities',
                label:
                  '\nMobile accommodation for Gypsy / Roma and Traveller communities',
              },
              {
                value:
                  'night-shelter-emergency-hostel-direct-access-hostel-(temporary-accommodation-accepting-self-referrals)',
                label:
                  '\nNight shelter / emergency hostel / direct access hostel (temporary accommodation accepting self-referrals)',
              },
              {
                value: 'other-temporary-accommodation',
                label: '\nOther temporary accommodation',
              },
              {
                value: 'owner-occupier-or-shared-ownership-scheme',
                label: '\nOwner occupier or shared ownership scheme',
              },
              {
                value:
                  'placed-in-temporary-accommodation-by-the-council-(including-homelessness-resettlement)',
                label:
                  '\nPlaced in temporary accommodation by the council (including homelessness resettlement)',
              },
              {
                value: 'prison-young-offenders-institution-detention-centre',
                label:
                  '\nPrison / young offenders institution / detention centre',
              },
              { value: 'refuge', label: '\nRefuge' },
              {
                value: 'registered-care-home',
                label: '\nRegistered care home',
              },
              {
                value: 'registered-nursing-home',
                label: '\nRegistered nursing home',
              },
              {
                value: 'rough-sleeper-squatting',
                label: '\nRough sleeper  / squatting',
              },
              {
                value:
                  'settled-mainstream-housing-with-family-friends-(including-flat-sharing)',
                label:
                  '\nSettled mainstream housing with family / friends (including flat sharing)',
              },
              { value: 'shared-lives-scheme', label: '\nShared lives scheme' },
              {
                value:
                  'sheltered-housing-extra-care-housing-other-sheltered-housing',
                label:
                  '\nSheltered housing / extra care housing / other sheltered housing',
              },
              {
                value: 'staying-with-family-friends-as-a-short-term-guest',
                label: '\nStaying with family / friends as a short-term guest',
              },
              {
                value:
                  'supported-accommodation-supported-lodgings-supported-group-home-(ie-accommodation-supported-by-staff-or-resident-care',
                label:
                  '\nSupported accommodation / supported lodgings / supported group home (ie accommodation supported by staff or resident care',
              },
              {
                value: 'tenant-(including-local-authority',
                label: '\nTenant (including local authority',
              },
              {
                value: 'arms-length-management-organisations',
                label: ' arms length management organisations',
              },
              {
                value: 'registered-social-landlord',
                label: ' registered social landlord',
              },
              { value: 'housing-association)', label: ' housing association)' },
              {
                value: 'tenant-private-landlord',
                label: '\nTenant - private landlord',
              },
            ],
          },
          {
            id: 'household-structure',
            question: 'Household structure',
            type: 'radios',
            required: false,
            hint: '',
            error: '',
            choices: [
              { value: 'lives-alone', label: 'Lives alone' },
              { value: 'lives-with-others', label: ' Lives with others' },
              { value: 'unknown', label: ' Unknown' },
            ],
          },
        ],
      },
      {
        id: 'your-key-contacts',
        name: 'Your key contacts',
        theme: 'You and your home',
        fields: [
          {
            id: 'key-contacts',
            question: 'Key contacts',
            type: 'repeaterGroup',
            itemName: 'contact',
            required: true,
            subfields: [
              {
                id: 'name',
                question: 'Name',
                type: 'text',
                required: true,
                hint: '',
                error: '',
                choices: [],
              },
              {
                id: 'relationship-role',
                question: 'Relationship or role',
                type: 'text',
                required: true,
                hint: '',
                error: '',
                choices: [],
              },
              {
                id: 'address',
                question: 'Address',
                type: 'text',
                required: true,
                hint: '',
                error: '',
                choices: [],
              },
              {
                id: 'phone-number',
                question: 'Phone number and phone type',
                type: 'text',
                required: true,
                hint: '',
                error: '',
                choices: [],
              },
              {
                id: 'email',
                question: 'Email',
                type: 'text',
                required: true,
                hint: '',
                error: '',
                choices: [],
              },
            ],
          },
        ],
      },
      {
        id: 'your-communication-needs',
        name: 'Your communication needs',
        theme: 'You and your home',
        fields: [
          {
            id: 'fluency-in-english',
            question: 'Fluency in English',
            type: 'radios',
            required: false,
            hint: '',
            error: '',
            choices: [
              {
                value: 'good-both-writtent-and-spoken',
                label: 'Good both writtent and spoken',
              },
              { value: 'not-fluent', label: ' Not fluent' },
            ],
          },
          {
            id: 'first-preferred-language',
            question: 'First / preferred language',
            type: 'text',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
          {
            id: 'interpreter-required',
            question: 'Interpreter required',
            type: 'radios',
            required: false,
            hint: '',
            error: '',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: ' No' },
            ],
          },
          {
            id: 'do-you-have-communication-difficulties',
            question: 'Do you have communication difficulties?',
            type: 'radios',
            required: false,
            hint: '',
            error: '',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: ' No' },
            ],
          },
          {
            id:
              'do-you-have-any-difficulties-with-understanding-andor-retaining-information',
            question:
              'Do you have any difficulties with understanding and/or retaining information?',
            type: 'radios',
            required: false,
            hint: '',
            error: '',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: ' No' },
            ],
          },
          {
            id:
              'do-you-have-any-difficulties-making-decisions-andor-understanding-their-impact',
            question:
              'Do you have any difficulties making decisions and/or understanding their impact?',
            type: 'radios',
            required: false,
            hint: '',
            error: '',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: ' No' },
            ],
          },
          {
            id: 'further-details',
            question: 'Further details',
            type: 'textarea',
            required: false,
            hint: '',
            error: '',
            choices: [],
          },
        ],
      },
      {
        id: 'about-your-needs',
        name: 'About your needs',
        theme: 'Your needs and assessment',
        fields: [
          {
            id:
              'your-interests-and-what-would-improve-your-wellbeing-or-quality-of-life.',
            question:
              'Your interests and what would improve your wellbeing or quality of life.',
            type: 'textarea',
            required: false,
            hint:
              'Areas of my life I enjoy most or value (including my main interests and where I can most contribute) and changes that would improve my wellbeing or quality of life.',
            error: '',
            choices: [],
          },
        ],
      },
      {
        id: "worker's-assessment",
        name: "Worker's assessment",
        theme: 'Your needs and assessment',
        fields: [
          {
            id: "worker's-recommendation",
            question: "Worker's recommendation",
            type: 'textarea',
            required: false,
            hint: 'What resources, support was recommended and outcome.',
            error: '',
            choices: [],
          },
          {
            id: 'next-actions',
            question: 'Next actions',
            type: 'checkboxes',
            required: false,
            hint: '',
            error: '',
            choices: [
              {
                value: 'community-care-assessment-occupational-therapy',
                label: 'Community Care Assessment - Occupational Therapy',
              },
              { value: 'no-further-action', label: ' No further action' },
              { value: 'case-closed', label: ' Case closed' },
            ],
          },
          {
            id: 'initial-contact-assessment',
            question: 'Initial contact assessment',
            type: 'radios',
            required: false,
            hint: '',
            error: '',
            choices: [
              {
                value: 'long-term-community-support',
                label: 'Long term community support',
              },
              {
                value: 'short-term-community-support',
                label: ' Short term community support',
              },
              { value: 'universal-service', label: ' Universal service' },
              { value: 'no-support-provided', label: ' No support provided' },
            ],
          },
        ],
      },
      {
        id: 'carer-details',
        name: 'Carer details',
        theme: 'Your needs and assessment',
        fields: [
          {
            id: 'do-you-receive-support-from-a-carer-(informal-unpaid)',
            question:
              'Do you receive support from a Carer? (informal / unpaid)',
            type: 'radios',
            required: false,
            hint: '',
            error: '',
            choices: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: ' No' },
            ],
          },
        ],
      },
      {
        id: 'completed-by',
        name: 'Completed by',
        theme: 'Professionals involved',
        fields: [
          {
            id: 'are-you-the-lead-conversation-officer',
            question: 'Are you the lead conversation officer?',
            type: 'select',
            required: false,
            hint:
              "Please use 'Find lead worker' below to select the 'Lead conversation officer'. If you are the lead officer then do this working as yourself (i.e. NOT whilst Acting for someone else).\nAlternatively you may Act for the lead officer then 'Find' them below and tick to sign on their behalf.",
            error: '',
            choices: [
              { value: 'yes', label: 'Yes' },
              {
                value: 'no-acting-for-someone-else',
                label: ' No - acting for someone else',
              },
            ],
          },
          {
            id: 'other-professionals-involved',
            question: 'Other professionals involved',
            type: 'checkboxes',
            required: false,
            hint: '',
            error: '',
            choices: [
              { value: 'gp', label: 'GP' },
              { value: 'modern-matron', label: ' Modern matron' },
              { value: 'district-nurse', label: ' District nurse' },
              {
                value: 'secondary-health-(hospital)',
                label: ' Secondary health (hospital)',
              },
              {
                value: 'secondary-health-(acrt)',
                label: ' Secondary health (ACRT)',
              },
              { value: 'occupational-therapy', label: ' Occupational therapy' },
              { value: 'social-worker', label: ' Social worker' },
              { value: 'sensory', label: ' Sensory' },
              {
                value: 'speech-and-language-therapist',
                label: ' Speech and language therapist',
              },
              {
                value: 'alcohol-and-drug-services',
                label: ' Alcohol and drug services',
              },
              { value: 'childrens-services', label: ' Childrens services' },
              {
                value: 'mental-health-services',
                label: ' Mental health services',
              },
              { value: 'lbh-housing-services', label: ' LBH housing services' },
              {
                value: 'non-lbh-housing-services',
                label: ' Non-LBH housing services',
              },
              {
                value: 'voluntary-and-community-sector',
                label: ' Voluntary and community sector',
              },
              { value: 'other', label: ' Other' },
            ],
          },
        ],
      },
    ],
  },
];

export default formData;
