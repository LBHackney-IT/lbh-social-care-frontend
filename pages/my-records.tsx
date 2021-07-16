import Seo from 'components/Layout/Seo/Seo';
import Search from 'components/Search/Search';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import Tabs from 'components/Tabs/Tabs';

const MyCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="My records notes" />
    <DashboardWrapper>
      <>
        <h1 className="govuk-!-margin-bottom-8">Submissions</h1>

        <Tabs
          title="foo"
          tabs={[
            {
              url: '/forms-in-progress',
              text: 'Unfinished',
            },
            {
              url: '/my-records',
              text: 'Submitted',
            },
          ]}
        >
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
        </Tabs>
      </>
    </DashboardWrapper>
  </div>
);

export default MyCasesPage;
