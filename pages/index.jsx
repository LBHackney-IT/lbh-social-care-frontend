import { NextSeo } from 'next-seo';

import Search from 'components/Search/Search';

const SearchResidentPage = () => {
  return (
    <div>
      <NextSeo title="Search" noindex />
      <Search type="people" />
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default SearchResidentPage;
