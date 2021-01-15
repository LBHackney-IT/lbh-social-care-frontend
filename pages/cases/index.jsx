import { NextSeo } from 'next-seo';

import Search from 'components/Search/Search';

const SearchCasesPage = () => {
  return (
    <div>
      <NextSeo title="Find unlinked case notes" noindex />
      <Search type="records" />
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default SearchCasesPage;
