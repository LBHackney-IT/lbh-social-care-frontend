import Seo from 'components/Layout/Seo/Seo';
import SearchWrapper from 'components/Search/MainSearchWrapper';

const SearchCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="Search for record" />
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
  </div>
);

export default SearchCasesPage;
