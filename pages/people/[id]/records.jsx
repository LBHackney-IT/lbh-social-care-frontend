import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import AddForm from 'components/AddForm/AddForm';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';

const CasesPage = () => {
  const { query } = useRouter();
  return (
    <>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a new record for
      </h1>
      <PersonView personId={query.id} expandView={true} nameSize="m">
        {(person) => (
          <>
            <p className="govuk-label govuk-!-margin-top-7 govuk-!-margin-bottom-5">
              Use forms to create a new record for a person
            </p>
            <AddForm person={person} />
          </>
        )}
      </PersonView>
    </>
  );
};

export default CasesPage;
