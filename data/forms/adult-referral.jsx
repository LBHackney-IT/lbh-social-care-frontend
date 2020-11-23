export default {
  title: 'Create New Record',
  path: '/form/adult-referral/',
  steps: [
    {
      id: 'client-details',
      title: 'Client Details',
      components: [
        {
          component: 'DateInput',
          name: 'timestamp',
          label: 'Date of contact',
          rules: { required: true },
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'TextInput',
          name: 'mosaic_id',
          width: '30',
          label: 'Mosaic ID Number',
          hint: 'For example 0123456789',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'nhsNumber',
          width: '30',
          label: 'NHS Number',
          hint: 'For example 0123456789',
        },
        { component: 'TextInput', name: 'title', width: '30', label: 'Title' },
        {
          component: 'TextInput',
          name: 'lastName',
          width: '30',
          label: 'Surname',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'firstName',
          width: '30',
          label: 'First Name',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'otherNames',
          width: '30',
          label: 'Other Names',
        },
        {
          component: 'DateInput',
          name: 'dateOfBirth',
          label: 'Date of Birth',
          hint: 'For example, 31 03 1980',
          rules: { required: true },
        },
        {
          component: 'NationalityList',
          name: 'nationality',
          label: 'Nationality',
          rules: { required: true },
        },
        {
          component: 'Radios',
          name: 'gender',
          label: 'Gender',
          options: ['Female', 'Male', 'Unknown', 'Other'],
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'addressLine1',
          width: '30',
          label: 'Primary Address',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'postCode',
          width: '30',
          label: 'Post Code',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'phone',
          width: '30',
          label: 'Phone Number',
        },
      ],
    },
    {
      id: 'referral-details',
      title: 'Referral Details',
      components: [
        {
          component: 'TextInput',
          name: 'referrerName',
          width: '30',
          label: 'Referrer Name',
        },
        {
          component: 'TextInput',
          name: 'referrerRelationship',
          width: '30',
          label: 'Referrer relationship',
        },
        {
          component: 'TextInput',
          name: 'referrerOrganisation',
          width: '30',
          label: 'Referrer Organisation',
        },
        {
          component: 'TextInput',
          name: 'worker_email',
          width: '30',
          label: 'Referrer Email',
        },
        {
          component: 'TextInput',
          name: 'referrerTelephone',
          width: '30',
          label: 'Referrer Telephone',
        },
        {
          component: 'TextInput',
          name: 'referrerRole',
          width: '30',
          label: 'Referrer Role',
        },
        {
          component: 'DateInput',
          name: 'contactDate',
          label: 'Contact Date',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'Select',
          name: 'contactMethod',
          label: 'Contact Method',
          options: ['Email', 'Phone', 'Mail', 'Face to Face'],
        },
        {
          component: 'Select',
          name: 'contactType',
          label: 'Contact Type',
          options: [
            'Self-referral',
            'Professional referral',
            'Third party referral',
            'Other',
          ],
        },
        {
          component: 'TextInput',
          name: 'otherContact',
          width: '30',
          label: 'Detail if Other',
        },
        {
          component: 'Radios',
          name: 'routeAccess',
          label: 'Route of Access',
          options: [
            'Planned Entry (Transition)',
            'Discharge from Hospital',
            'Diversion from Hospital Services',
            'Self-funder with depleted funds',
            'Self-funder with depleted funds (of which previously provided with 12-week disregard or deferred payment)',
            'Community/Other route',
          ],
        },
        {
          component: 'Radios',
          name: 'presentingIssue',
          label: 'Presenting Issue',
          options: [
            'Information and advice',
            'Hospital discharge',
            'Temporary illness',
            'Simple services',
            'Assessment',
            'Test/Investigations',
          ],
        },
      ],
    },
    {
      id: 'case-notes',
      title: 'Case Notes',
      components: [
        {
          component: 'TextInput',
          name: 'summariseInfo',
          width: '30',
          label: 'Please summarise the information provided by the contact',
        },
        {
          component: 'Radios',
          name: 'subjectAware',
          label: 'Is the subject aware of the contact?',
          options: ['Yes', 'No', 'Not Known'],
        },
        {
          component: 'Radios',
          name: 'adviceOffered',
          label: 'Was information and advice offered?',
        },
        {
          component: 'TextInput',
          name: 'categoryInfo',
          width: '30',
          label: 'a. Information and advice offered (Category)',
        },
        {
          component: 'TextInput',
          name: 'detailInfo',
          width: '30',
          label: 'b. Information and advice offered (Details)',
        },
        {
          component: 'TextInput',
          name: 'referredAgencies',
          width: '30',
          label:
            'Please identify any other agencies that the person making contact has been referred to.',
        },
        <h3 key="text">
          Please note information from this assessment may be shared regardless
          of your consent where there is a 'Vital Interest' i.e. where it is
          critical to prevent serious harm, distress or in life threatening
          situations
        </h3>,
        {
          component: 'Radios',
          name: 'infoShared',
          label:
            'If client has not agreed consent, has information still to be shared?',
          options: ['Yes, under duty of care', 'No'],
        },
        {
          component: 'TextInput',
          name: 'justification',
          width: '30',
          label:
            'Justification for information to be shared outside of client consent',
        },
        {
          component: 'DateInput',
          name: 'dateAgreed',
          label: 'Date Agreed',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'Radios',
          name: 'nextAction',
          label: 'Next Actions',
          options: [
            'Community Care Assessment - Occupational Therapy',
            'No Further Action',
            'Close Case',
          ],
          rules: { required: true },
        },
        {
          component: 'Radios',
          name: 'infoService',
          label: `If 'No Further Action' please pick one of the following`,
          options: [
            'Universal Services/ Signposted to other services',
            'No Services Provided - Deceased',
            'No Services Provided - other reason',
          ],
        },
      ],
    },
  ],
};
