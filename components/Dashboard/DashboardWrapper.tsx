import Tabs from 'components/Tabs/Tabs';

interface Props {
  children: React.ReactChild;
}

const DashboardWrapper = ({ children }: Props): React.ReactElement => (
  <>
    <Tabs
      title="Dashboard"
      tabs={[
        {
          url: '/my-forms',
          text: 'Forms to complete',
        },
        {
          url: '/my-cases',
          text: "Records I've added",
        },
      ]}
    >
      {children}
    </Tabs>
  </>
);

export default DashboardWrapper;
