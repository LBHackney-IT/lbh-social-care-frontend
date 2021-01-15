import Layout from './index';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import UserContext from 'components/UserContext/UserContext';

export default {
  title: 'Layout',
  component: Layout,
};

const Template = (args) => (
  <RouterContext.Provider
    value={{
      asPath: 'foo',
    }}
  >
    <UserContext.Provider
      value={{
        user: { name: 'bar' },
      }}
    >
      <Layout {...args} />
    </UserContext.Provider>
  </RouterContext.Provider>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Layout',
};
