import ETHNICITIES from 'data/ethnicities';
import RELIGIONS from 'data/religions';
import LANGUAGES from 'data/languages';
import ORIENTATION from 'data/orientation';

export default {
  title: 'Create New Person',
  path: '/people/add/',
  successMessage: 'New person created',
  steps: [
    {
      id: 'client-details',
      title: 'Person Details',
      components: [
        <h1
          key="form-title"
          className="govuk-fieldset__legend--xl gov-weight-lighter"
        >
          Add a new person
        </h1>,
        <p key="subtitle" className="govuk-body">
          Use this form to add a new referral
        </p>,
        <h3
          key="subtitle-details"
          className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
        >
          Person details
        </h3>,
        {
          conditionalRender: ({ user }) => !user.permissionFlag,
          component: 'Radios',
          name: 'contextFlag',
          label: 'Service',
          options: [
            { value: 'A', text: 'ASC' },
            { value: 'C', text: 'CFS' },
          ],
          rules: { required: true },
        },
        {
          component: 'Select',
          name: 'title',
          label: 'Title',
          width: '10',
          placeHolder: 'Choose one',
          options: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'],
        },
        {
          component: 'TextInput',
          name: 'firstName',
          width: '20',
          label: 'First Name',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'lastName',
          width: '20',
          label: 'Last Name',
          rules: { required: true },
        },
        {
          component: 'ObjectInput',
          name: 'otherNames',
          label: 'Other Names',
          isInline: true,
          isMulti: true,
          summaryInline: true,
          isMultiInit: false,
          isMultiTrigger: '+ Add other names',
          components: [
            {
              component: 'TextInput',
              name: 'firstName',
              label: 'First Name',
            },
            {
              component: 'TextInput',
              name: 'lastName',
              label: 'Last Name',
            },
          ],
        },
        {
          component: 'Select',
          name: 'gender',
          placeHolder: 'Choose one',
          label: 'Gender',
          style: { width: '245px' },
          govGrid: 'half',
          options: [
            { value: 'F', text: 'Female' },
            { value: 'M', text: 'Male' },
            { value: 'U', text: 'Unknown' },
            { value: 'I', text: 'Indeterminate' },
          ],
          rules: { required: true },
        },
        {
          component: 'DateInput',
          name: 'dateOfBirth',
          label: 'Date of Birth',
          hint: 'For example, 31 03 1980',
          rules: { required: true },
        },
        {
          component: 'DateInput',
          name: 'dateOfDeath',
          label: 'Date of Death',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'Select',
          placeHolder: 'Choose one',
          name: 'macroEthnicity',
          label: 'Ethnicity',
          width: '20',
          options: Object.keys(ETHNICITIES),
        },
        {
          component: 'Select',
          placeHolder: 'Choose one',
          name: 'ethnicity',
          label: 'Sub-ethnicity',
          width: '20',
          rules: { required: true },
          options: ({ macroEthnicity }) => ETHNICITIES[macroEthnicity],
        },
        {
          component: 'Select',
          placeHolder: 'Choose one',
          name: 'firstLanguage',
          label: 'First Language',
          width: '20',
          options: LANGUAGES,
        },
        {
          component: 'Select',
          name: 'religion',
          placeHolder: 'Choose one',
          label: 'Religion',
          width: '20',
          options: RELIGIONS,
        },
        {
          component: 'Select',
          name: 'sexualOrientation',
          placeHolder: 'Choose one',
          label: 'Sexual orientation',
          width: '20',
          options: ORIENTATION,
        },
        {
          component: 'NumberInput',
          name: 'nhsNumber',
          width: '10',
          label: 'NHS Number',
        },
        <h3
          key="subtitle-contact"
          className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
        >
          Client contact details
        </h3>,
        {
          component: 'AddressLookup',
          name: 'address',
          label: 'Address',
          rules: { required: true },
        },
        {
          component: 'ObjectInput',
          name: 'phoneNumbers',
          label: 'Main phone number',
          isInline: true,
          isMulti: true,
          isMultiTrigger: '+ Add additional phone number',
          summaryInline: true,
          components: [
            {
              component: 'PhoneInput',
              name: 'number',
              label: 'Phone number',
            },
            {
              component: 'TextInput',
              name: 'type',
              label: 'Phone type',
              placeholder: 'home',
            },
          ],
        },
        {
          component: 'EmailInput',
          name: 'emailAddress',
          width: '20',
          label: 'Email address',
        },
        {
          component: 'Select',
          name: 'preferredMethodOfContact',
          label: 'Preferred method of contact',
          placeHolder: 'Choose one',
          width: '20',
          options: ['Email', 'Phone', 'Letter', 'Fax', 'Face to face'],
        },
      ],
    },
  ],
};
