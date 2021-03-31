import Seo from 'components/Layout/Seo/Seo';
import SearchWrapper from 'components/Search/MainSearchWrapper';

const SearchCasesPage = (): React.ReactElement => (
  <main className="lbh-main-wrapper" id="main-content" role="main">
    <Seo title="Search for records" />
    <SearchWrapper
      type="records"
      //@ts-expect-error TODO: fixed when search.jsx is migrated
      columns={[
        'person_id',
        'first_name',
        'officer_email',
        'date_of_event',
        'action',
      ]}
    />
  </main>
);

export default SearchCasesPage;
