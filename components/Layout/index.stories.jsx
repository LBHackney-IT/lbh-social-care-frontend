import Layout from './index';
import { UserContext } from 'components/UserContext/UserContext';

export default {
  title: 'Layout',
  component: Layout,
};

const Template = (args) => (
  <UserContext.Provider
    value={{
      user: { name: 'bar' },
    }}
  >
    <Layout {...args} />
  </UserContext.Provider>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Layout',
};
