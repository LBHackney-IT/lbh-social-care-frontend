import Summary from './Summary';

export default {
  title: 'Summary',
  component: Summary,
};

const Template = (args) => <Summary {...args} />;

export const Default = Template.bind({});
Default.args = {
  formData: {
    foo: '123',
    bar: 'asd',
    asd: '',
    qwe: 'yo',
    foobar: 'asd',
    textarea_verbose:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    textarea_succinct: 'asd\nasd',
  },
  formPath: '/form/foo/',
  formSteps: [
    {
      id: 'first-step',
      title: 'First Step',
      components: [
        { component: 'TextInput', label: 'I am foo component', name: 'foo' },
        { component: 'TextInput', label: 'I am bar component', name: 'bar' },
        { component: 'TextInput', label: 'I am asd component', name: 'asd' },
      ],
    },
    {
      id: 'second-step',
      title: 'Second Step',
      components: [
        {
          component: 'TextInput',
          label: 'I am foobar component',
          name: 'foobar',
        },
      ],
    },
    {
      id: 'third-step',
      title: 'TextArea Step',
      components: [
        {
          component: 'TextArea',
          label: 'I am a verbose textarea',
          name: 'textarea_verbose',
        },
        {
          component: 'TextArea',
          label: 'I am a succinct textarea',
          name: 'textarea_succinct',
        },
      ],
    },
  ],
  onFormSubmit: () => alert('submit'),
};
