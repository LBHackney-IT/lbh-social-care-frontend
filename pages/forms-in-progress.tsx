import Seo from 'components/Layout/Seo/Seo';
import SavedForms from 'components/SaveFormData/SaveFormData';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

const MyFormsPage = (): React.ReactElement => (
  <div>
    <Seo title="My Forms" />
    <DashboardWrapper>
      <>
        <p className="govuk-body">
          Forms that have been started and are not complete
        </p>
        <SavedForms />
      </>
    </DashboardWrapper>
  </div>
);

export default MyFormsPage;
