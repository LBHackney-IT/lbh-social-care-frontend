import Seo from 'components/Layout/Seo/Seo';
import SavedForms from 'components/SaveFormData/SaveFormData';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

const MyFormsPage = (): React.ReactElement => (
  <main className="lbh-main-wrapper" id="main-content" role="main">
    <Seo title="My saved forms" />
    <DashboardWrapper>
      <>
        <p className="lbh-body">
          Forms that have been started and are not complete
        </p>
        <SavedForms />
      </>
    </DashboardWrapper>
  </main>
);

export default MyFormsPage;
