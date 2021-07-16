import Seo from 'components/Layout/Seo/Seo';
import MyAllocatedCases from 'components/AllocatedCases/MyAllocatedCases';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

const MyCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="Allocations" />
    <DashboardWrapper>
      <>
        <h1 className="govuk-!-margin-bottom-8">Allocations</h1>
        <MyAllocatedCases />
      </>
    </DashboardWrapper>
  </div>
);

export default MyCasesPage;
