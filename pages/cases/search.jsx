import { NextSeo } from 'next-seo';

import BackButton from 'components/Layout/BackButton/BackButton';
import SearchCases from 'components/Search/SearchCases';

const SearchCasesPage = ({ query }) => {
  return (
    <div>
      <NextSeo title="Find unlinked case notes" noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l">Find unlinked case notes</h1>
      <p className="govuk-body govuk-!-margin-bottom-7">
        Use this search to locate unlinked case notes. Unlinked case notes are
        records not linked to the person view.
      </p>
      <SearchCases query={query} />
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

export default SearchCasesPage;
