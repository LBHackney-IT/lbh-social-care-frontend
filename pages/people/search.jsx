import { NextSeo } from 'next-seo';

import BackButton from 'components/Layout/BackButton/BackButton';
import Search from 'components/Search/Search';

const SearchResidentPage = ({ query }) => {
  return (
    <div>
      <NextSeo title="Search" noindex />
      <BackButton />
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
