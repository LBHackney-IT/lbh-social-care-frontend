import Seo from 'components/Layout/Seo/Seo';
import MyAllocatedCases from 'components/AllocatedCases/MyAllocatedCases';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

const MyCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="My Work Space" />
    <DashboardWrapper>
      <>
        <h1 className="lbh-heading-h2 govuk-!-margin-bottom-6">Allocations</h1>
        <MyAllocatedCases />
      </>
    </DashboardWrapper>
  </div>
);

export default MyCasesPage;
