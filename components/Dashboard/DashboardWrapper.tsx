import Tabs from 'components/Tabs/Tabs';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactChild;
}

const DashboardWrapper = ({ children }: Props): React.ReactElement => {
  const { pathname } = useRouter();
  return (
    <>
      <Tabs
        title="Dashboard"
        tabs={[
          {
            url: '/my-forms',
            text: 'Forms to complete',
            isSelected: pathname === '/my-forms',
          },
          {
            url: '/my-cases',
            text: "Records I've added",
            isSelected: pathname === '/my-cases',
          },
        ]}
      >
        {children}
      </Tabs>
    </>
  );
};

export default DashboardWrapper;
