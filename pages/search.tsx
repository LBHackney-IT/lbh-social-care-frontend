import Seo from 'components/Layout/Seo/Seo';
import SearchWrapper from 'components/Search/MainSearchWrapper';
import { FeatureContainer } from '../hooks/use-feature-flags';

const SearchResidentPage = (): React.ReactElement => (
  <div>
    <Seo title="Search" />
    <SearchWrapper type="people" />

    <FeatureContainer name="dashboard">
      Imagine the dashboard would be here when the flag is active!
    </FeatureContainer>
  </div>
);

export default SearchResidentPage;
