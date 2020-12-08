import { NextSeo } from 'next-seo';

import Cases from 'components/Cases/Cases';
import BackButton from 'components/Layout/BackButton/BackButton';
import LinkButton from 'components/LinkButton/LinkButton';
import PersonView from 'components/PersonView/PersonView';

const CasesPage = ({ query }) => {
  return (
    <div>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <PersonView personId={query.id} />
      <div className="govuk-record-header">
        <div>
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-record-title">
            RECORDS HISTORY
          </h3>
          <p className="govuk-label  govuk-!-margin-top-0">
            Linked files are read only
          </p>
        </div>
        <LinkButton label="Add a new record" route={`/record/${query.id}`} />
      </div>
      <hr className="govuk-divider" />
      <Cases {...query} />
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

export default CasesPage;
