import Seo from 'components/Layout/Seo/Seo';
import MyAllocatedCases from 'components/AllocatedCases/MyAllocatedCases';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { useBreadcrumb } from 'contexts/breadcrumbContext';

const MyCasesPage = (): React.ReactElement => {
  useBreadcrumb('example');

  return (
    <div>
      <Seo title="My Work Space" />
      <DashboardWrapper>
        <>
          <p className="govuk-body">People you are working with</p>
          <MyAllocatedCases />
        </>
      </DashboardWrapper>
    </div>
  );
};

export default MyCasesPage;
