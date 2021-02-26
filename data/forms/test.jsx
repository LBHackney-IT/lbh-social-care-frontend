const MULTI_SELECT = {
  foo: [
    {
      value: '1',
      text: 'FOO',
    },
    {
      value: '2',
      text: 'Foo',
    },
    {
      value: '3',
      text: 'foo',
    },
  ],
  bar: [
    {
      value: 'a',
      text: 'BAR',
    },
    {
      value: 'b',
      text: 'Bar',
    },
    {
      value: 'c',
      text: 'bar',
    },
  ],
};

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
        <h3 key="subtitle">I am an html title</h3>,
        {
          conditionalRender: (data) => data.show_next_input === 'Y',
          component: 'TextInput',
          name: 'conditional_text',
          width: '30',
          label: 'I am the conditional field',
        },
        {
          component: 'Checkbox',
          name: 'multi_checkbox',
          label: 'This is a multi checkbox',
          options: [
            { value: '1', text: 'Foo' },
            { value: '2', text: 'Bar' },
            { value: '3', text: 'Foobar' },
          ],
        },
        {
          component: 'Checkbox',
          name: 'show_next_step',
          label: 'Show next step',
        },
        {
          component: 'Checkbox',
          name: 'show_multi_select_step',
          label: 'Show multi-select step',
        },
        {
          component: 'Checkbox',
          name: 'show_object_step',
          label: 'Show object step',
        },
        {
          component: 'Checkbox',
          name: 'show_address_step',
          label: 'Show Address Lookup step',
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
          component: 'TextInput',
          name: 'title_object',
          width: '30',
          label: 'Title',
          isMulti: true,
          isMultiInit: false,
          isMultiTrigger: 'Add a title',
        },
        {
          component: 'ObjectInput',
          name: 'phone_number',
          label: 'Phone Number',
          isInline: true,
          isMulti: true,
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
      id: 'address-step',
      title: 'Address Lookup Step',
      conditionalRender: ({ show_address_step }) => show_address_step === true,
      components: [
        {
          component: 'AddressLookup',
          name: 'address',
          label: 'Address',
        },
      ],
    },
    {
      id: 'multi-select-step',
      title: 'Multi Select Step',
      conditionalRender: ({ show_multi_select_step }) =>
        show_multi_select_step === true,
      components: [
        {
          component: 'Select',
          name: 'first_select',
          label: 'First multi select',
          options: Object.keys(MULTI_SELECT),
        },
        {
          component: 'Select',
          name: 'multi_select',
          label: 'Second multi select',
          options: ({ first_select } = {}) => MULTI_SELECT[first_select],
        },
      ],
    },
    {
      id: 'multi-step',
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
