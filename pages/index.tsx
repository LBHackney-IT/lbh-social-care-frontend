import Seo from 'components/Layout/Seo/Seo';
import SearchWrapper from 'components/Search/MainSearchWrapper';

const SearchResidentPage = (): React.ReactElement => (
  <main className="lbh-main-wrapper" id="main-content" role="main">
    <Seo title="Search" />
    <SearchWrapper type="people" />
  </main>
);

export default SearchResidentPage;
