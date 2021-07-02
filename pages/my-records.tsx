import Seo from 'components/Layout/Seo/Seo';
import Search from 'components/Search/Search';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';

const MyCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="My records notes" />
    <DashboardWrapper>
      <>
        <p className="govuk-body">All records you have added</p>
        <Search
          type="records"
          subHeader={<>Filter results by (any combination)</>}
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
      </>
    </DashboardWrapper>
  </div>
);

export default MyCasesPage;
