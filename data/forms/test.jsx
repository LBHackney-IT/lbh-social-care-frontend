export default {
  title: 'Test Form',
  path: '/form/test/',
  successMessage: 'Test Recap',
  steps: [
    {
      id: 'first-step',
      title: 'First Step',
      components: [
        {
          component: 'Radios',
          name: 'show_next_input',
          label: 'Show next input',
          options: [
            { value: 'Y', text: 'Yes' },
            { value: 'N', text: 'No' },
          ],
          rules: { required: true },
        },
        {
          conditionalRender: (data) => data.show_next_input === 'Y',
          component: 'TextInput',
          name: 'conditional_text',
          width: '30',
          label: 'I am the conditional field',
        },
        {
          component: 'Checkbox',
          name: 'show_next_step',
          width: '30',
          label: 'Show next step',
        },
        {
          component: 'Checkbox',
          name: 'show_object_step',
          width: '30',
          label: 'Show object step',
        },
      ],
    },
    {
      id: 'condition-step',
      title: 'Conditional Step',
      conditionalRender: ({ show_next_step }) => show_next_step === true,
      components: [
        {
          component: 'TextInput',
          name: 'title_2',
          width: '30',
          label: 'Title',
        },
      ],
    },
    {
      id: 'object-step',
      title: 'Object Step',
      conditionalRender: ({ show_object_step }) => show_object_step === true,
      components: [
        {
          component: 'ObjectInput',
          name: 'phone_number',
          label: 'Phone Number',
          isInline: true,
          summaryInline: true,
          components: [
            {
              component: 'PhoneInput',
              name: 'phoneNumber',
              label: 'Phone number',
              rules: { required: true },
            },
            {
              component: 'TextInput',
              name: 'phoneType',
              label: 'Phone type',
            },
          ],
        },
      ],
    },
    {
      id: 'last-step',
      title: 'Multi Step',
      isMulti: true,
      components: [
        {
          component: 'TextInput',
          name: 'title_3',
          width: '30',
          label: 'Title',
        },
      ],
    },
  ],
};
