import { NextSeo } from 'next-seo';

import Search from 'components/Search/Search';

const SearchResidentPage = () => (
  <div>
    <NextSeo title="Search" noindex />
    <Search type="people" />
  </div>
);

export default SearchResidentPage;
