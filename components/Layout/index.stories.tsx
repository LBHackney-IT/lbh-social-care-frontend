import { Story } from '@storybook/react';

import Layout, { Props } from './index';
import { UserContext } from 'components/UserContext/UserContext';

export default {
  title: 'Layout',
  component: Layout,
};

const Template: Story<Props> = (args) => (
  <UserContext.Provider
    value={{
      user: {
        name: 'bar',
        hasAdminPermissions: true,
        hasDevPermissions: false,
        hasChildrenPermissions: true,
        hasAdultPermissions: true,
        email: 'foo@bar.com',
        permissionFlag: 'A',
        isAuthorised: true,
      },
    }}
  >
    <Layout {...args} />
  </UserContext.Provider>
);

export const Default = Template.bind({});
