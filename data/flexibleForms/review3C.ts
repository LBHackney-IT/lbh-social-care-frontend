import { Form } from './forms.types';

const form: Form = {
  id: 'review-of-care-and-support-plan-3c',
  name: 'Review of Care and Support Plan (3C)',
  steps: [
    {
      id: 'person-details',
      name: 'Person details',
      theme: 'About you',
      fields: [
        {
          id: 'primary-address-tenure-type',
          question: 'Primary address tenure type',
          hint: '',
          type: 'select',
          choices: [
            {
              value: 'owner-occupier-or-shared-ownership-scheme',
              label: 'Owner occupier or shared ownership scheme',
            },
            {
              value:
                'tenant-including-local-authority-arms-length-management-organisations-registered-social-landlord-housing-association',
              label:
                "Tenant (including local authority, arm's length management organisations, registered social landlord, housing association)",
            },
            {
              value: 'tenant--private-landlord',
              label: 'Tenant - private landlord',
            },
            {
              value:
                'settled-mainstream-housing-with-family--friends-including-flatsharing',
              label:
                'Settled mainstream housing with family / friends (including flat-sharing)',
            },
            {
              value:
                'supported-accommodation--supported-lodgings--supported-group-home-ie-accommodation-supported-by-staff-or-resident-care-taker',
              label:
                'Supported accommodation / supported lodgings / supported group home (i.e. accommodation supported by staff or resident care taker)',
            },
            {
              value: 'shared-lives-scheme',
              label: 'Shared Lives scheme',
            },
            {
              value:
                'approved-premises-for-offenders-released-from-prison-or-under-probation-supervision-eg-probation-hostel',
              label:
                'Approved premises for offenders released from prison or under probation supervision (e.g. probation hostel)',
            },
            {
              value:
                'sheltered-housing--extra-care-housing--other-sheltered-housing',
              label:
                'Sheltered housing / extra care housing / other sheltered housing',
            },
            {
              value:
                'mobile-accommodation-for-gypsy--roma-and-traveller-communities',
              label:
                'Mobile accommodation for Gypsy / Roma and Traveller communities',
            },
            {
              value: 'rough-sleeper--squatting',
              label: 'Rough sleeper / squatting',
            },
            {
              value:
                'night-shelter--emergency-hostel--direct-access-hostel-temporary-accommodation-accepting-selfreferrals',
              label:
                'Night shelter / emergency hostel / direct access hostel (temporary accommodation accepting self-referrals)',
            },
            {
              value: 'refuge',
              label: 'Refuge',
            },
            {
              value:
                'placed-in-temporary-accommodation-by-the-council-including-homelessness-resettlement',
              label:
                'Placed in temporary accommodation by the council (including homelessness resettlement)',
            },
            {
              value: 'staying-with-family--friends-as-a-shortterm-guest',
              label: 'Staying with family / friends as a short-term guest',
            },
            {
              value:
                'acute--longterm-healthcare-residential-facility-or-hospital-eg-nhs-independent-general-hospital--clinic-longstay-hospital-specialist-rehabilitation--recovery-hospital',
              label:
                'Acute / long-term healthcare residential facility or hospital (e.g. NHS Independent general hospital / clinic, long-stay hospital, specialist rehabilitation / recovery hospital)',
            },
            {
              value: 'registered-care-home',
              label: 'Registered care home',
            },
            {
              value: 'registered-nursing-home',
              label: 'Registered nursing home',
            },
            {
              value: 'prison--young-offenders-institution--detention-centre',
              label: 'Prison / Young offenders institution / detention centre',
            },
            {
              value: 'other-temporary-accommodation',
              label: 'Other temporary accommodation',
            },
          ],
        },
        {
          id: 'household-structure',
          question: 'Household structure',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'lives-alone',
              label: 'Lives Alone',
            },
            {
              value: 'lives-with-others',
              label: 'Lives with Others',
            },
            {
              value: 'unknown',
              label: 'Unknown',
            },
          ],
        },
      ],
    },
    {
      id: 'communication',
      name: 'Communication',
      theme: 'About you',
      fields: [
        {
          id: 'preferred-method-of-contact',
          question: 'Preferred method of contact',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'face-to-face',
              label: 'Face to face',
            },
            {
              value: 'telephone',
              label: 'Telephone',
            },
            {
              value: 'video-link',
              label: 'Video link',
            },
            {
              value: 'combination-of-the-above',
              label: 'Combination of the above',
            },
          ],
        },
        {
          id: 'fluency-in-english',
          question: 'Fluency in English',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'good-both-written-and-spoken',
              label: 'Good (both written and spoken)',
            },
            {
              value: 'not-fluent',
              label: 'Not fluent',
            },
          ],
        },
        {
          id: 'first--preferred-language',
          question: 'First / preferred language',
          hint: '',
          type: 'text',
        },
        {
          id: 'is-an-interpreter-required',
          question: 'Is an interpreter required?',
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
          id: 'do-you-have-communication-difficulties',
          question: 'Do you have communication difficulties?',
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
          id: 'do-you-have-any-difficulties-understanding-andor-retaining-information',
          question:
            'Do you have any difficulties understanding and/or retaining information?',
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
          id: 'do-you-have-any-difficulties-making-decisions-andor-understanding-their-impact',
          question:
            'Do you have any difficulties making decisions and/or understanding their impact?',
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
          id: 'communication--further-details',
          question: 'Communication - Further Details',
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'primary-support-reason',
      name: 'Primary support reason',
      theme: 'About you',
      fields: [
        {
          id: 'psr-group-',
          question: 'PSR Group ',
          hint: '',
          type: 'select',
          choices: [
            {
              value: 'physical-support--access--mobility-only',
              label: 'Physical Support - Access & mobility only',
            },
            {
              value: 'physical-support--personal-care-and-support',
              label: 'Physical Support - Personal Care and Support',
            },
            {
              value: 'sensory-support--support-for-visual-impairment',
              label: 'Sensory Support - Support for visual impairment',
            },
            {
              value: 'sensory-support--support-for-hearing-impairment',
              label: 'Sensory Support - Support for hearing impairment',
            },
            {
              value: 'sensory-support--support-for-dual-impairment',
              label: 'Sensory Support - Support for dual impairment',
            },
            {
              value: 'support-with-memory--cognition',
              label: 'Support with Memory & Cognition',
            },
            {
              value: 'learning-disability-support',
              label: 'Learning Disability Support',
            },
            {
              value: 'mental-health-support-asc',
              label: 'Mental Health Support (ASC)',
            },
            {
              value: 'mental-health-support-elft',
              label: 'Mental Health Support (ELFT)',
            },
            {
              value: 'social-support--substance-misuse-support',
              label: 'Social Support - Substance misuse support',
            },
            {
              value: 'social-support--asylum-seeker-support',
              label: 'Social Support - Asylum seeker support',
            },
            {
              value: 'social-support--support-for-social-isolationother',
              label: 'Social Support - Support for Social Isolation/Other',
            },
          ],
        },
      ],
    },
    {
      id: 'key-contact',
      name: 'Key contact',
      theme: 'About you',
      fields: [
        {
          id: 'key-contact-1-name',
          question: 'Key Contact 1: Name',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-1-relationship--role',
          question: 'Key Contact 1: Relationship / role',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-1-address',
          question: 'Key Contact 1: Address',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-1-contact-details',
          question: 'Key Contact 1: Contact details',
          hint: '',
          type: 'text',
        },
        {
          id: 'do-you-have-another-key-contact-to-add-second',
          question: 'Do you have another key contact to add? (second)',
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
      ],
    },
    {
      id: 'key-contact-second',
      name: 'Key contact (second)',
      theme: 'About you',
      fields: [
        {
          id: 'key-contact-2-name',
          question: 'Key Contact 2: Name',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-2-relationship--role',
          question: 'Key Contact 2: Relationship / role',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-2-address',
          question: 'Key Contact 2: Address',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-2-contact-details',
          question: 'Key Contact 2: Contact details',
          hint: '',
          type: 'text',
        },
        {
          id: 'do-you-have-another-key-contact-to-add-third',
          question: 'Do you have another key contact to add? (third)',
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
      ],
    },
    {
      id: 'key-contact-third',
      name: 'Key contact (third)',
      theme: 'About you',
      fields: [
        {
          id: 'key-contact-3-name',
          question: 'Key Contact 3: Name',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-3-relationship--role',
          question: 'Key Contact 3: Relationship / role',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-3-address',
          question: 'Key Contact 3: Address',
          hint: '',
          type: 'text',
        },
        {
          id: 'key-contact-3-contact-details',
          question: 'Key Contact 3: Contact details',
          hint: '',
          type: 'text',
        },
      ],
    },
    {
      id: 'gp-details',
      name: 'GP details',
      theme: 'About you',
      fields: [
        {
          id: 'gp-name',
          question: 'GP name',
          hint: '',
          type: 'text',
        },
        {
          id: 'gp-practice',
          question: 'GP practice',
          hint: '',
          type: 'text',
        },
        {
          id: 'gp-address',
          question: 'GP address',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'gp-postcode',
          question: 'GP postcode',
          hint: '',
          type: 'text',
        },
        {
          id: 'gp-telephone',
          question: 'GP telephone',
          hint: '',
          type: 'text',
        },
        {
          id: 'gp-email',
          question: 'GP Email',
          hint: '',
          type: 'text',
        },
      ],
    },
    {
      id: 'my-review',
      name: 'My review',
      theme: 'Reviewing your care',
      fields: [
        {
          id: 'review-type',
          question: 'Review type',
          hint: '',
          type: 'radios',
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
        {
          id: 'reason-for-unplanned-review',
          question: 'Reason for Unplanned review',
          hint: '(If the review was planned please choose "Not Applicable (Review was Planned))',
          type: 'radios',
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
              value: 'change-in-commissioning-arrangements',
              label: 'Change in Commissioning Arrangements',
            },
            {
              value: 'not-applicable-review-was-planned',
              label: 'Not Applicable (Review was planned)',
            },
          ],
        },
        {
          id: 'what-is-the-current-setting-for-the-person--if-the-person-is-in-a-hospital-state-the-most-recent-setting-before-going-to-hospital',
          question:
            'What is the current setting for the person ? (If the person is in a hospital, state the most recent setting before going to hospital)',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'community-for-example-living-at-home-supported-living',
              label:
                'Community (for example, living at home, supported living)',
            },
            {
              value: 'residential-care',
              label: 'Residential Care',
            },
            {
              value: 'nursing-care',
              label: 'Nursing Care',
            },
          ],
        },
        {
          id: 'is-there-an-increase-or-decrease-in-the-services-provided',
          question:
            'Is there an increase or decrease in the services provided?',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'increase',
              label: 'Increase',
            },
            {
              value: 'decrease',
              label: 'Decrease',
            },
            {
              value: 'no-change',
              label: 'No change',
            },
          ],
        },
        {
          id: 'my-or-my-representatives-view-on-how-well-my-care-and-support-has-been-working-since-my-last-assessment-or-review',
          question:
            "My (or my representative's) view on how well my care and support has been working since my last assessment or review",
          hint: '',
          type: 'textarea',
        },
        {
          id: 'my-or-my-representatives-view-on-anything-that-needs-to-change-to-help-me-work-towards-what-i-want-to-achieve',
          question:
            "My (or my representative's) view on anything that needs to change to help me work towards what I want to achieve",
          hint: '',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'about-me',
      name: 'About me',
      theme: 'About you',
      fields: [
        {
          id: 'areas-of-my-life-i-enjoy-most-or-value-including-my-main-interests-and-where-i-can-most-contribute--changes-that-would-improve-my-wellbeing-or-quality-of-life',
          question:
            'Areas of my life I enjoy most or value (including my main interests and where I can most contribute) & changes that would improve my wellbeing or quality of life',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'what-resources-support-was-recommended-and-outcome-workers-recommendations',
          question:
            'What resources, support was recommended and outcome? (workers recommendations)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'next-actions-workers-recommendations',
          question: 'Next actions (workers recommendations)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'is-there-an-increase-or-decrease-to-services-provided',
          question: 'Is there an increase or decrease to services provided?',
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
          id: 'has-a-mental-capacity-assessment-been-completed',
          question: 'Has a Mental Capacity Assessment been completed?',
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
          id: 'if-yes-what-was-the-outcome-of-the-mental-capacity-assessment',
          question:
            'If yes, what was the outcome of the Mental Capacity Assessment?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'if-no-is-a-mental-capacity-assessment-required',
          question: 'If no, is a Mental Capacity Assessment required?',
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
      ],
    },
    {
      id: 'care-act-outcomes-and-eligibility',
      name: 'Care act outcomes and eligibility',
      theme: 'Reviewing your care',
      fields: [
        {
          id: '1--do-you-have-a-condition-as-a-result-of-either-your-physical-mental-sensory-learning-or-cognitive-disabilities-or-illnesses-substance-misuse-or-brain-injury',
          question:
            '1.  Do you have a condition as a result of either your physical, mental, sensory, learning or cognitive disabilities or illnesses, substance misuse or brain injury?',
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
          id: '2-as-a-result-of-your-needs-are-you-unable-to-achieve-two-or-more-of-the-eligible-outcomes-below',
          question:
            '2. As a result of your needs are you unable to achieve two or more of the eligible outcomes below?',
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
          id: 'details-maintain-a-habitable-home-environment',
          question: 'Details (Maintain a habitable home environment)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'can-you-manage-and-maintain-nutrition-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Manage and maintain nutrition" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
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
          id: 'details-manage-and-maintain-nutrition',
          question: 'Details (Manage and maintain nutrition)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'can-you-manage-toilet-needs-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Manage toilet needs" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
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
          id: 'details-manage-toilet-needs',
          question: 'Details (Manage toilet needs)',
          hint: '',
          type: 'textarea',
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
          id: 'details-maintain-personal-hygiene',
          question: 'Details (Maintain personal hygiene)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'can-you-be-appropriately-clothed-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Be appropriately clothed" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
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
          id: 'details-be-appropriately-clothed',
          question: 'Details (Be appropriately clothed)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'can-you-develop-and-maintain-family-or-other-personal-relationships-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Develop and maintain family or other personal relationships" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
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
          id: 'details-develop-and-maintain-family-or-other-personal-relationships',
          question:
            'Details (Develop and maintain family or other personal relationships)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'can-you-make-use-of-necessary-facilities-or-services-in-local-community-including-public-transport-and-recreational-facilitiesservices-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Make use of necessary facilities or services in local community (including public transport and recreational facilities/services)" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
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
          id: 'details-make-use-of-necessary-facilities-or-services-in-local-community',
          question:
            'Details (Make use of necessary facilities or services in local community)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'can-you-access-and-engage-in-work-training-education-or-volunteering-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Access and engage in work, training, education or volunteering" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
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
          id: 'details-access-and-engage-in-work-training-education-or-volunteering',
          question:
            'Details (Access and engage in work, training, education or volunteering)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'can-you-carry-out-any-caring-responsibilities-for-a-child-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Carry out any caring responsibilities for a child" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
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
              value: 'not-applicable',
              label: 'Not applicable',
            },
          ],
        },
        {
          id: 'details-carry-out-any-caring-responsibilities-for-a-child',
          question:
            'Details (Carry out any caring responsibilities for a child)',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'can-you-be-able-to-make-use-of-your-home-safely-alone-within-a-reasonable-time-and-without-significant-pain-distress-anxiety-or-risk-to-yourself-or-others',
          question:
            'Can you "Be able to make use of your home safely" alone within a reasonable time and without significant pain, distress, anxiety, or risk to yourself or others?',
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
          id: 'details-be-able-to-make-use-of-your-home-safely',
          question: 'Details (Be able to make use of your home safely)',
          hint: '',
          type: 'textarea',
        },
        {
          id: '3-as-a-result-of-being-unable-to-achieve-these-outcomes-is-there-or-is-there-likely-to-be-significant-impact-on-your-wellbeing',
          question:
            '3. As a result of being unable to achieve these outcomes is there, or is there likely to be, significant impact on your well-being?',
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
              value: 'not-applicable',
              label: 'Not applicable',
            },
          ],
        },
        {
          id: 'do-you-receive-support-from-a-carer-informal--unpaid-',
          question: 'Do you receive support from a carer? (informal / unpaid) ',
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
      ],
    },
    {
      id: 'personal-budget',
      name: 'Personal budget',
      theme: 'Reviewing your care',
      fields: [
        {
          id: 'date-of-plan-authorised',
          question: 'Date of plan (authorised)',
          hint: '',
          type: 'date',
        },
        {
          id: 'my-weekly-total-hours-decimal',
          question: 'My weekly total hours (decimal)',
          hint: '',
          type: 'text',
        },
        {
          id: 'desired-outcome',
          question: 'Desired outcome',
          hint: '',
          type: 'text',
        },
        {
          id: 'how-will-this-be-achieved',
          question: 'How will this be achieved?',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'who-by',
          question: 'Who by?',
          hint: '',
          type: 'text',
        },
        {
          id: 'how-often',
          question: 'How often?',
          hint: '',
          type: 'text',
        },
        {
          id: 'weekly-cost-',
          question: 'Weekly cost (£)',
          hint: '',
          type: 'text',
        },
        {
          id: 'yearly-cost-',
          question: 'Yearly cost (£)',
          hint: '',
          type: 'text',
        },
        {
          id: 'start-date',
          question: 'Start date',
          hint: '',
          type: 'date',
        },
        {
          id: 'end-date',
          question: 'End date',
          hint: '',
          type: 'date',
        },
        {
          id: 'who-will-manage-my-budget',
          question: 'Who will manage my budget?',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'me',
              label: 'Me',
            },
            {
              value: 'my-representative',
              label: 'My representative',
            },
            {
              value: 'local-authority',
              label: 'Local authority',
            },
            {
              value: 'other-arrangement-eg-mixed',
              label: 'Other arrangement (eg mixed)',
            },
          ],
        },
        {
          id: 'names-of-person-managing-my-budget',
          question: 'Names of person managing my budget',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'contact-details-of-person-managing-my-budget',
          question: 'Contact details of person managing my budget',
          hint: '',
          type: 'textarea',
        },
        {
          id: 'relationship-of-those-managing-my-budget',
          question: 'Relationship of those managing my budget',
          hint: '',
          type: 'text',
        },
        {
          id: 'my-weekly-budget-contribution-to-be-confirmed-by-finance',
          question:
            'My weekly budget contribution (to be confirmed by finance)',
          hint: '',
          type: 'text',
        },
        {
          id: 'local-authority-weekly-budget-contribution-to-be-confirmed-by-finance',
          question:
            'Local authority weekly budget contribution (to be confirmed by finance)',
          hint: '',
          type: 'text',
        },
        {
          id: 'other-weekly-budget-contribution',
          question: 'Other weekly budget contribution',
          hint: '',
          type: 'text',
        },
        {
          id: 'weekly-budget-details',
          question: 'Weekly budget details',
          hint: '',
          type: 'text',
        },
        {
          id: 'has-a-ds1500-form-been-issued',
          question: 'Has a DS1500 form been issued?',
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
              value: 'not-known',
              label: 'Not known',
            },
          ],
        },
        {
          id: 'are-you-entitled-to-section-117-aftercare',
          question: 'Are you entitled to Section 117 aftercare?',
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
              value: 'no-longer',
              label: 'No longer',
            },
          ],
        },
        {
          id: 'are-you-receiving-care-under-the-care-programme-approach',
          question: 'Are you receiving care under the Care Programme Approach?',
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
              value: 'no-longer',
              label: 'No longer',
            },
          ],
        },
      ],
    },
    {
      id: 'weekly-timetable',
      name: 'Weekly timetable',
      theme: 'Reviewing your care',
      fields: [
        {
          id: 'date-of-timetable-authorised',
          question: 'Date of Timetable (authorised)',
          hint: '',
          type: 'date',
        },
        {
          id: 'day-',
          question: 'Day ',
          hint: '',
          type: 'text',
        },
        {
          id: 'morning',
          question: 'Morning',
          hint: '',
          type: 'text',
        },
        {
          id: 'afternoon',
          question: 'Afternoon',
          hint: '',
          type: 'text',
        },
        {
          id: 'evening',
          question: 'Evening',
          hint: '',
          type: 'text',
        },
        {
          id: 'night-',
          question: 'Night ',
          hint: '',
          type: 'text',
        },
        {
          id: 'estimated-weekly-cost',
          question: 'Estimated weekly cost',
          hint: '',
          type: 'text',
        },
      ],
    },
    {
      id: 'completion-details-review-conversation',
      name: 'Completion details (review conversation)',
      theme: 'Next steps',
      fields: [
        {
          id: 'what-next',
          question: 'What Next',
          hint: '',
          type: 'radios',
          choices: [
            {
              value: 'schedule-next-review-provide-date-below-and-sequel',
              label: 'Schedule next review (provide date below, and Sequel)',
            },
            {
              value: 'close-case-no-further-action-provide-sequel-below',
              label: "Close Case /No Further Action (provide 'Sequel' below)",
            },
          ],
        },
      ],
    },
    {
      id: 'schedule-next-review',
      name: 'Schedule Next Review',
      theme: 'Next steps',
      fields: [
        {
          id: 'date-of-next-review',
          question: 'Date of Next Review',
          hint: '',
          type: 'date',
        },
      ],
    },
    {
      id: 'sequel-to-review-conversation',
      name: 'Sequel to Review Conversation',
      theme: 'Next steps',
      fields: [
        {
          id: 'outcomes-for-review-sequel',
          question: 'Outcomes for Review (Sequel)',
          hint: '',
          type: 'radios',
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
                'Change in setting - Move to Residential Care (from Community',
            },
            {
              value: 'short-term-support-to-maximise-independence',
              label: 'Short Term Support to Maximise Independence',
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
            {
              value: 'no-change-in-setting--all-long-term-support-ended',
              label: 'No Change in Setting - ALL Long Term Support Ended',
            },
          ],
        },
      ],
    },
    {
      id: 'manager-approval',
      name: 'Manager approval',
      theme: 'Next steps',
      fields: [
        {
          id: 'email-address-of-your-manager',
          question: 'Email address of your manager',
          hint: "(Who will retrospectively approve this decision. You need to forward the 'receipt' copy of this form to them once you receive it)",
          type: 'text',
        },
      ],
    },
  ],
};

export default form;
