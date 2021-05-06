import Seo from 'components/Layout/Seo/Seo';
import SearchWrapper from 'components/Search/MainSearchWrapper';

const SearchResidentPage = (): React.ReactElement => (
  <div>
    <Seo title="Search" />
    <SearchWrapper type="people" />
  </div>
);

export default SearchResidentPage;
