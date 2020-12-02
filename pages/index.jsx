import { NextSeo } from 'next-seo';

import Search from 'components/Search/Search';

const SearchResidentPage = ({ query }) => {
  return (
    <div>
      <NextSeo title="Search" noindex />
      <Search query={query} type="people" />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  return {
    props: {
      query,
    },
  };
};

export default SearchResidentPage;
