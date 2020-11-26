export default {
  title: 'FAST referral form',
  path: '/form/child-referral/',
  steps: [
    {
      id: 'client-details',
      title: 'Client Details',
      components: [
        {
          component: 'EmailInput',
          name: 'worker_email',
          width: '30',
          label: 'Email address',
          hint: 'Valid email address',
          rules: { required: true },
          type: 'tel',
        },
        {
          component: 'Radios',
          name: 'businessSupport',
          label:
            'Are you a member of FAST Business Support at Hackney Council?',
          options: ['Yes', 'No'],
          rules: { required: true },
        },
      ],
    },
    {
      id: 'aboutFASTBuisnessSupport',
      title: 'About FAST Business Support team member',
      conditionalRender: ({ businessSupport }) => businessSupport === 'Yes',
      components: [
        {
          component: 'TextInput',
          name: 'business_support_name',
          width: '30',
          label:
            'As a member of FAST Business Support, please provide YOUR full name (not that of the referrer).',
        },
      ],
    },
    {
      id: 'aboutYourself',
      title: 'About yourself',
      components: [
        {
          component: 'TextInput',
          name: 'full_name',
          width: '30',
          label: 'Your full name',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'referrer_relationship',
          width: '30',
          label: 'Role / relationship to the child or family: ',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'position_agency',
          width: '30',
          label: 'Position / agency (if relevant): ',
        },
        {
          component: 'PhoneInput',
          name: 'referrer_telephone',
          width: '30',
          label: 'Telephone Number',
          rules: { required: true },
        },
      ],
    },
    {
      id: 'childReffered',
      title: 'Child being referred',
      isMulti: true,
      components: [
        {
          component: 'TextInput',
          name: 'first_name',
          width: '30',
          label: "Child's first name ",
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'last_name',
          width: '30',
          label: "Child's last name ",
          rules: { required: true },
        },
        {
          component: 'DateInput',
          name: 'date_of_birth',
          label: "Child's date of birth or EDD for unborns ",
          hint: 'For example, 31 03 1980',
          rules: { required: true },
        },
        {
          component: 'Radios',
          name: 'gender',
          label:
            'Gender - Which of the following describes how the child thinks of themself?',
          options: ['Female', 'Male', 'Not known', 'Other'],
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'ethnicity',
          width: '30',
          label: 'Ethnicity ',
        },
        {
          component: 'TextInput',
          name: 'language',
          width: '30',
          label: 'Language ',
        },
        {
          component: 'TextInput',
          name: 'school',
          width: '30',
          label: 'School ',
        },
        {
          component: 'TextInput',
          name: 'address_1',
          width: '30',
          label: 'Home address line 1',
        },
        {
          component: 'TextInput',
          name: 'address_2',
          width: '30',
          label: 'Home address line 2',
        },
        {
          component: 'TextInput',
          name: 'address_3',
          width: '30',
          label: 'Home address line 3',
        },
        {
          component: 'TextInput',
          name: 'post_code',
          width: '30',
          label: 'Postcode',
          rules: { required: true },
        },
      ],
    },
    {
      id: 'motherQuestion',
      title: "Mother's details",
      components: [
        {
          component: 'Radios',
          name: 'mother_details',
          label: "Do you have the details of the child(ren)'s mother?",
          options: ['Yes', 'No'],
          rules: { required: true },
        },
      ],
    },
    {
      id: 'motherDetails',
      title: "Mother's full details",
      conditionalRender: ({ mother_details }) => mother_details === 'Yes',
      components: [
        {
          component: 'TextInput',
          name: 'mother_fullname',
          width: '30',
          label: "Mother's full name ",
        },
        {
          component: 'DateInput',
          name: 'mothers_DOB',
          label: "Mother's date of birth",
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'PhoneInput',
          name: 'mother_telephone',
          width: '30',
          label: "Mother's telephone number:",
        },
        {
          component: 'EmailInput',
          name: 'mother_email',
          width: '30',
          label: "Mother's email",
        },
        {
          component: 'TextInput',
          name: 'mother_address_1',
          width: '30',
          label: "Mother's address line 1",
        },
        {
          component: 'TextInput',
          name: 'mother_address_2',
          width: '30',
          label: "Mother's address line 2",
        },
        {
          component: 'TextInput',
          name: 'mother_address_3',
          width: '30',
          label: "Mother's address line  3",
        },
        {
          component: 'TextInput',
          name: 'mother_post_code',
          width: '30',
          label: "Mother's postcode",
        },
      ],
    },
    {
      id: 'fatherQuestion',
      title: "Father's details",
      components: [
        {
          component: 'Radios',
          name: 'father_details',
          label: "Do you have the details of the child(ren)'s father?",
          options: ['Yes', 'No'],
          rules: { required: true },
        },
      ],
    },
    {
      id: 'fatherDetails',
      title: "Father's full details",
      conditionalRender: ({ father_details }) => father_details === 'Yes',
      components: [
        {
          component: 'TextInput',
          name: 'father_fullname',
          width: '30',
          label: "Father's full name ",
        },
        {
          component: 'DateInput',
          name: 'Fathers_DOB',
          label: "Father's date of birth",
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'PhoneInput',
          name: 'father_telephone',
          width: '30',
          label: "Father's telephone number:",
        },
        {
          component: 'EmailInput',
          name: 'father_email',
          width: '30',
          label: "Father's email",
        },
        {
          component: 'TextInput',
          name: 'father_address_1',
          width: '30',
          label: "Father's address line",
        },
        {
          component: 'TextInput',
          name: 'father_address_2',
          width: '30',
          label: "Father's address line",
        },
        {
          component: 'TextInput',
          name: 'father_address_3',
          width: '30',
          label: "Father's address line",
        },
        {
          component: 'TextInput',
          name: 'father_post_code',
          width: '30',
          label: "Father's postcode",
        },
      ],
    },
    {
      id: 'additionalFamilyMembersQuestion',
      title: 'Additional Family Members Details',
      components: [
        {
          component: 'Radios',
          name: 'family_details',
          label: "Do you have the details of any additional family member's ?",
          options: ['Yes', 'No'],
          rules: { required: true },
        },
      ],
    },
    {
      id: 'additionalFamilyMembersDetails',
      title: 'Additional Family Members Full Details',
      isMulti: true,
      conditionalRender: ({ family_details }) => family_details === 'Yes',
      components: [
        <h3 key="text1" className="govuk-body">
          Details of wider family network
        </h3>,
        {
          component: 'TextInput',
          name: 'wider_family_fullname',
          width: '30',
          label: 'Name of individual ',
          rules: { required: true },
        },
        {
          component: 'DateInput',
          name: 'wider_family__DOB',
          label: 'Individual date of birth',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'TextInput',
          name: 'wider_family_relationship',
          width: '30',
          label:
            'Role/relationship (specify which child or family member) - individual ',
        },
        {
          component: 'PhoneInput',
          name: 'wider_family_telephone',
          width: '30',
          label: 'Telephone number',
        },
        {
          component: 'EmailInput',
          name: 'wider_family_email',
          width: '30',
          label: 'Email address',
        },
        {
          component: 'TextInput',
          name: 'wider_family_address_1',
          width: '30',
          label: 'Address line 1',
        },
        {
          component: 'TextInput',
          name: 'wider_family_address_2',
          width: '30',
          label: 'Address line 2',
        },
        {
          component: 'TextInput',
          name: 'wider_family_address_3',
          width: '30',
          label: 'Address line 3',
        },
        {
          component: 'TextInput',
          name: 'wider_family_postcode_1',
          width: '30',
          label: 'Postcode',
        },
      ],
    },
    {
      id: 'professionalsOrAgenciesQuestion',
      title: 'Professionals or agencies',
      components: [
        {
          component: 'Radios',
          name: 'professionals_details',
          label:
            'Do you have any details of any other professionals or agencies working with the family: ?',
          options: ['Yes', 'No'],
          rules: { required: true },
        },
      ],
    },
    {
      id: 'professionalsOrAgenciesDetails',
      title: 'Professionals or agencies details',
      isMulti: true,
      conditionalRender: ({ professionals_details }) =>
        professionals_details === 'Yes',
      components: [
        <h3 key="text2" className="govuk-body">
          Details of any other professionals or agencies working with the
          family:
        </h3>,
        <p key="text3" className="govuk-body">
          (eg GP, health visitor, other professionals working with the
          household)
        </p>,
        {
          component: 'TextInput',
          name: 'professional_name',
          width: '30',
          label: 'Name of professional',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'professional_relationship',
          width: '30',
          label:
            'Relationship of the professional to the child and family - professional',
        },

        {
          component: 'PhoneInput',
          name: 'professional_telephone',
          width: '30',
          label: 'Telephone number ',
        },
        {
          component: 'EmailInput',
          name: 'professional_email',
          width: '30',
          label: 'Email address',
        },
        {
          component: 'TextInput',
          name: 'professional_address',
          width: '30',
          label: 'Address line 1',
        },
        {
          component: 'TextInput',
          name: 'professional_address_2',
          width: '30',
          label: 'Address line 2',
        },
        {
          component: 'TextInput',
          name: 'professional_address_3',
          width: '30',
          label: 'Address line 3',
        },
        {
          component: 'TextInput',
          name: 'professional_postcode_1',
          width: '30',
          label: 'Postcode',
        },
        {
          component: 'Radios',
          name: 'professional_consent',
          label:
            'Professional: Has the person with parental responsibility consented for Hackney to make contact with this person or agency?',
          options: ['Yes', 'No'],
          rules: { required: true },
        },
      ],
    },
    {
      id: 'requestForSupport',
      title: 'Request For Support',
      components: [
        <h3 key="text4" className="govuk-body">
          Hackney Child Wellbeing Framework
        </h3>,
        <p key="text5" className="govuk-body">
          Please consult the
          <a href="https://tinyurl.com/yxzq446e" target="_blank">
            {' '}
            Hackney Child Wellbeing Framework{' '}
          </a>
          (opens in new tab) for guidance around levels of intervention. The
          Council Family Support Services in Hackney are either delivered via
          multi-agency teams (MAT) at local Children’s Centres (primarily for
          under 5s) or through the Family Support Service within Children and
          Families Services. Young Hackney delivers a range of universal and
          targeted support services for children aged 6+.
        </p>,
        {
          component: 'Radios',
          name: 'childSupport',
          label: 'What support do you think the child(ren) would benefit from?',
          options: [
            'A safeguarding response from Children’s Social Care',
            'Early Help: Family Support at an early intervention level',
            'Early Help: Targeted Youth Support',
          ],
          rules: { required: true },
        },
      ],
    },

    {
      id: 'consent',
      title: 'Consent',
      components: [
        {
          component: 'Radios',
          name: 'consentSupport',
          label:
            'Have you spoken to the child(ren)’s parents/carers about contacting FAST to request additional support for their child and/or family?',
          options: ['Yes', 'No'],
          rules: { required: true },
        },
        <p key="text6" className="govuk-body">
          Please note, parental consent is always required for families to be
          referred to an early help intervention.{' '}
        </p>,

        {
          component: 'Radios',
          name: 'additionalSupport',
          label: 'Are the parents/carers open to additional support?',
          options: ['Yes', 'No'],
          rules: { required: true },
        },
        <p key="text7" className="govuk-body">
          Please note, referrers are always expected to discuss their requests
          for support from Children and Families Services with parents/carers
          prior to making contact with FAST, unless the referrer is concerned
          that doing so would present an immediate risk to a child’s safety.
        </p>,
        {
          component: 'TextInput',
          name: 'reasonNoSupport',
          width: '30',
          label:
            'Briefly record the reasons why the parents/carers are not open to additional support. ',
        },
      ],
    },
    {
      id: 'referralDetails',
      title: 'Referral Details',
      components: [
        {
          component: 'TextInput',
          name: 'referralReason',
          width: '30',
          label:
            'Why is a referral being made?  Please include what you know and may be worried about in terms of the child(ren)’s day to day experiences. ',
        },
        <p key="text8" className="govuk-body">
          If you are concerned about a location or peer group, please detail
          concerns for all children and be specific about dates, times and
          locations. If the concerns require a discussion at the Extra- Familial
          Risk Panel (EFRP) , FAST will forward this referral to the EFRP on
          your behalf.{' '}
        </p>,
        {
          component: 'TextInput',
          name: 'Your Involvemnt',
          width: '30',
          label:
            'Please outline your involvement with the child/family/peer group and any support you have offered them. ',
        },
        <p key="text9" className="govuk-body">
          If a Child & Family Assessment or other assessment document has been
          completed by your agency, please attach a copy alongside this referral
        </p>,
        {
          component: 'TextInput',
          name: 'Early Support',
          width: '30',
          label:
            'What additional support do you think the child(ren) and family would benefit from, at either an early help or a statutory level? ',
        },
        <p key="text10" className="govuk-body">
          Please be as clear as possible about what you feel needs to change for
          you to be less concerned about the children.
        </p>,
      ],
    },
    {
      id: 'thank_you',
      title: 'Thank you',
      components: [
        <p key="text11" className="govuk-body">
          You will be informed about the outcome of your referral when a
          decision has been made about the most appropriate next steps for a
          child and family. We aim - wherever possible - to make decisions about
          safeguarding concerns within 3 working days. If you require an update
          on the progress of your referral or should your concerns escalate at
          any time and you feel an urgent response is required, please contact
          FAST on 020 8356 5500.
        </p>,
      ],
    },
  ],
};
