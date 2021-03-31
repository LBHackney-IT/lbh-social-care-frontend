import ETHNICITIES from 'data/ethnicities';
import RELIGIONS from 'data/religions';
import LANGUAGES from 'data/languages';
import ORIENTATION from 'data/orientation';

import { FormConfig, Option } from 'components/Form/types';

const dynamicEthnicities: { [key: string]: Option[] } = ETHNICITIES;

const formConfig: FormConfig = {
  title: 'Create New Person',
  path: '/people/add/',
  successMessage: 'New person created',
  steps: [
    {
      id: 'client-details',
      title: 'Person details',
      components: [
        <h1 key="form-title" className="lbh-heading-h1">
          Add a new person
        </h1>,
        <p key="subtitle" className="lbh-body">
          Use this form to add a new referral.
        </p>,
        <h3
          key="subtitle-details"
          className="lbh-heading-h2 govuk-!-margin-bottom-5"
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
          width: 10,
          placeHolder: 'Choose one',
          options: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'],
        },
        {
          component: 'TextInput',
          name: 'firstName',
          width: 20,
          label: 'First name',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'lastName',
          width: 20,
          label: 'Last name',
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
          isMultiTrigger: 'Add another name',
          components: [
            {
              component: 'TextInput',
              name: 'firstName',
              label: 'First name',
            },
            {
              component: 'TextInput',
              name: 'lastName',
              label: 'Last name',
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
          label: 'Date of birth',
          hint: 'For example, 31 03 1980',
          rules: { required: true },
        },
        {
          component: 'DateInput',
          name: 'dateOfDeath',
          label: 'Date of death',
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'Select',
          placeHolder: 'Choose one',
          name: 'macroEthnicity',
          label: 'Ethnicity',
          width: 20,
          options: Object.keys(ETHNICITIES),
        },
        {
          component: 'Select',
          placeHolder: 'Choose one',
          name: 'ethnicity',
          label: 'Sub-ethnicity',
          width: 20,
          rules: { required: true },
          options: ({ macroEthnicity }) => dynamicEthnicities[macroEthnicity],
        },
        {
          component: 'Select',
          placeHolder: 'Choose one',
          name: 'firstLanguage',
          label: 'First language',
          width: 20,
          options: LANGUAGES,
        },
        {
          component: 'Select',
          name: 'religion',
          placeHolder: 'Choose one',
          label: 'Religion',
          width: 20,
          options: RELIGIONS,
        },
        {
          component: 'Select',
          name: 'sexualOrientation',
          placeHolder: 'Choose one',
          label: 'Sexual orientation',
          width: 20,
          options: ORIENTATION,
        },
        {
          component: 'NumberInput',
          name: 'nhsNumber',
          width: 10,
          label: 'NHS number',
        },
        <h3 key="subtitle-contact" className="lbh-heading-h2">
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
          isMultiTrigger: 'Add another phone number',
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
          width: 20,
          label: 'Email address',
        },
        {
          component: 'Select',
          name: 'preferredMethodOfContact',
          label: 'Preferred method of contact',
          placeHolder: 'Choose one',
          width: 20,
          options: ['Email', 'Phone', 'Letter', 'Fax', 'Face to face'],
        },
      ],
    },
  ],
};

export default formConfig;
