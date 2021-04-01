import { Story } from '@storybook/react';

import Tabs, { Props } from './Tabs';

export default {
  title: 'Tabs',
  component: Tabs,
};

const Template: Story<Props> = (args) => (
  <div className="js-enabled">
    <Tabs {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'foo',
  tabs: [
    {
      url: '/foo',
      text: 'foo',
    },
    { url: '/bar', text: 'bar' },
  ],
  children: <p>I am the content!</p>,
};
Default.parameters = {
  nextRouter: {
    pathname: '/foo',
  },
};

export const SecondSelected = Template.bind({});
SecondSelected.args = {
  title: 'foo',
  tabs: [
    {
      url: '/foo',
      text: 'foo',
    },
    { url: '/bar', text: 'bar' },
  ],
  children: <p>I am the content!</p>,
};
SecondSelected.parameters = {
  nextRouter: {
    pathname: '/bar',
  },
};
