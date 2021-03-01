import { NextSeo } from 'next-seo';

import Search from 'components/Search/Search';

const SearchCasesPage = (): React.ReactElement => (
  <div>
    <NextSeo title="Find unlinked case notes" noindex />
    <Search type="records" />
  </div>
);

export default SearchCasesPage;
