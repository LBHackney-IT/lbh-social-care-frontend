import { Story } from '@storybook/react';

import ExpandDetails, { Props } from './ExpandDetails';

export default {
  title: 'ExpandDetails',
  component: ExpandDetails,
};

const Template: Story<Props> = (args) => <ExpandDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Show intructions',
  children: (
    <div>
      foo <strong>bar</strong>
    </div>
  ),
};

export const DefaultOpen = Template.bind({});
DefaultOpen.args = {
  label: 'Show intructions',
  isDefaultOpen: true,
  children: (
    <div>
      foo <strong>bar</strong>
    </div>
  ),
};
