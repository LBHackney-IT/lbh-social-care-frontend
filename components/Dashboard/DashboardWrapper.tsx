import Stack from 'components/Stack/Stack';
import Tabs from 'components/Tabs/Tabs';
import MyData from './MyData';

interface Props {
  children: React.ReactChild;
}

const DashboardWrapper = ({ children }: Props): React.ReactElement => (
  <Stack space={7}>
    <h1 className="govuk-heading-l">My work space</h1>
    <MyData />
    <Tabs
      title="Dashboard"
      tabs={[
        {
          url: '/',
          text: 'Clients allocated',
        },
        {
          url: '/forms-in-progress',
          text: 'Forms to complete',
        },
        {
          url: '/my-records',
          text: "Records I've added",
        },
      ]}
    >
      {children}
    </Tabs>
  </Stack>
);

export default DashboardWrapper;
