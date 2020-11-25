import Breadcrumbs from './Breadcrumbs';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
};

const Template = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: [
    {
      id: 'first-step',
      title: 'First Step',
    },
    {
      id: 'second-step-not-show',
      title: 'Second Step',
      conditionalRender: ({ hide }) => hide === 'false',
    },
    {
      id: 'second-step',
      title: 'Second Step',
    },
    {
      id: 'third-step',
      title: 'Third Step',
    },
  ],
  path: '/foo/',
  currentStepIndex: 2,
  data: { hide: true },
};
