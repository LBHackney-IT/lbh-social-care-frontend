import Seo from 'components/Layout/Seo/Seo';
import Search from 'components/Search/Search';

const SearchCasesPage = () => (
  <div>
    <Seo title="Find unlinked case notes" />
    <Search type="records" />
  </div>
);

export default SearchCasesPage;
