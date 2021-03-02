import Seo from 'components/Layout/Seo/Seo';
import Search from 'components/Search/Search';

const SearchResidentPage = (): React.ReactElement => (
  <div>
    <Seo title="Search" />
    <Search type="people" />
  </div>
);

export default SearchResidentPage;
