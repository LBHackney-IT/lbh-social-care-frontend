import Seo from 'components/Layout/Seo/Seo';
import MyAllocatedCases from 'components/AllocatedCases/MyAllocatedCases';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

const MyCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="My records notes" />
    <DashboardWrapper>
      <>
        <p className="govuk-body">Clients you are currently managing</p>
        <MyAllocatedCases />
      </>
    </DashboardWrapper>
  </div>
);

export default MyCasesPage;
