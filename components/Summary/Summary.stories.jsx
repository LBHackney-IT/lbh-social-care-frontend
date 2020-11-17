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
  ],
  onFormSubmit: () => alert('submit'),
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  onFormSubmit: {
    action: 'error',
  },
};
