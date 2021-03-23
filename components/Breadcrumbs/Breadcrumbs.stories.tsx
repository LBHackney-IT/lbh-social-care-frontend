import { Story } from '@storybook/react';
import Breadcrumbs, { BreadcrumbProps } from './Breadcrumbs';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
};

const Template: Story<BreadcrumbProps> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: [
    {
      id: 'first-step',
      title: 'First Step',
      components: [],
    },
    {
      id: 'second-step-not-show',
      title: 'Second Step',
      conditionalRender: ({ hide }) => hide === 'false',
      components: [],
    },
    {
      id: 'second-step',
      title: 'Second Step',
      components: [],
    },
    {
      id: 'third-step',
      title: 'Third Step',
      components: [],
    },
  ],
  path: '/foo/',
  currentStepIndex: 2,
  data: { hide: true },
};
