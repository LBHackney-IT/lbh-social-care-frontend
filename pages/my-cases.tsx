import Seo from 'components/Layout/Seo/Seo';
import Search from 'components/Search/Search';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

const MyCasesPage = (): React.ReactElement => (
  <main className="lbh-main-wrapper" id="main-content" role="main">
    <Seo title="My records notes" />
    <DashboardWrapper>
      <Search
        type="records"
        subHeader="Filter results by (any combination)"
        resultHeader="All records you have added"
        showOnlyMyResults
        columns={[
          'person_id',
          'first_name',
          'formName',
          'date_of_event',
          'action',
        ]}
        ctaText="Filter"
      />
    </DashboardWrapper>
  </main>
);

export default MyCasesPage;
