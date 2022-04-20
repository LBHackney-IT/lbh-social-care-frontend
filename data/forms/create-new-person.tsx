import ETHNICITIES from 'data/ethnicities';
import RELIGIONS from 'data/religions';
import LANGUAGES from 'data/languages';
import ORIENTATION from 'data/orientation';

import { FormStep, Option } from 'components/Form/types';

const dynamicEthnicities: { [key: string]: Option[] } = ETHNICITIES;

const formConfig: FormStep[] = [
  {
    id: 'client-details',
    title: 'Person Details',
    components: [
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
        rules: { required: 'Please enter a first name' },
      },
      {
        component: 'TextInput',
        name: 'lastName',
        width: 20,
        label: 'Last name',
        rules: { required: 'Please enter a last name' },
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
          { value: 'Non-binary', text: 'Non-binary' },
          { value: 'Other', text: 'Other' },
          { value: 'Prefer not to say', text: 'Prefer not to say' },
        ],
        rules: { required: 'Please choose an option from the dropdown' },
      },
      {
        component: 'DateInput',
        name: 'dateOfBirth',
        label: 'Date of birth',
        hint: 'For example, 31 03 1980',
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
        rules: { required: 'Please choose an option from the dropdown' },
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
      <h2 key="subtitle-contact" className="govuk-!-margin-bottom-5">
        Their contact details
      </h2>,
      {
        component: 'AddressLookup',
        name: 'address',
        label: 'Address',
      },
      {
        component: 'ObjectInput',
        name: 'phoneNumbers',
        label: 'Main phone number',
        isInline: true,
        isMulti: true,
        isMultiTrigger: '+ Add additional phone number',
        buttonStyle:
          'lbh-button govuk-button lbh-button--secondary govuk-!-margin-bottom-0',
        summaryInline: true,
        components: [
          {
            component: 'PhoneInput',
            name: 'number',
            hint: 'For example, 07700900123',
            label: 'Phone number',
          },
          {
            component: 'TextInput',
            name: 'type',
            label: 'Note',
            hint: "For example, Mother's mobile, Carer, Key worker",
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
      {
        conditionalRender: ({ user }) => user.hasAdminPermissions,
        component: 'Radios',
        name: 'restricted',
        label: `Does this person's record history need to be restricted?`,
        options: [
          { value: 'Y', text: 'Yes' },
          { value: 'N', text: 'No' },
        ],
        rules: { required: 'Please choose one option.' },
      },
    ],
  },
];

export default formConfig;
