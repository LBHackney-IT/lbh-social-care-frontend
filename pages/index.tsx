import Seo from 'components/Layout/Seo/Seo';
import MyAllocatedCases from 'components/AllocatedCases/MyAllocatedCases';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

const MyCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="My Work Space" />
    <DashboardWrapper>
      <>
        <p className="govuk-body">Clients you are currently managing</p>
        <MyAllocatedCases />
      </>
    </DashboardWrapper>
  </div>
);

// TODO: remove this redirect when dashboard is ready to launch
export const getServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: '/search',
    },
  };
};

export default MyCasesPage;
