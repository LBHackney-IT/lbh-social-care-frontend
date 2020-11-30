import { NextSeo } from 'next-seo';

import BackButton from 'components/Layout/BackButton/BackButton';
import Search from 'components/Search/Search';

const SearchResidentPage = ({ query }) => {
  return (
    <div>
      <NextSeo title="Search" noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l">Person lookup</h1>
      <p className="govuk-body govuk-!-margin-bottom-7">
        Search for resident to see if we have a record for them.
      </p>
      <Search query={query} type="residents" />
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
