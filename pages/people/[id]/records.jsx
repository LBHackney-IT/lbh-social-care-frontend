import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import BackButton from 'components/Layout/BackButton/BackButton';
import LinkButton from 'components/LinkButton/LinkButton';
import PersonView from 'components/PersonView/PersonView';
import { Select } from 'components/Form';
import FORM_LIST from 'data/formList';

const CasesPage = () => {
  const [url, setUrl] = useState();
  const { query } = useRouter();
  return (
    <div>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a new record for
      </h1>
      <PersonView personId={query.id} expandView={true} nameSize="m" />
      <p className="govuk-label govuk-!-margin-top-7 govuk-!-margin-bottom-5">
        Use forms to create a new record for a person
      </p>
      <Select
        name="formList"
        options={FORM_LIST}
        label="Choose a form"
        placeHolder="Choose one"
        onChange={(value) => setUrl(value)}
      />
      <LinkButton
        label="Load form"
        route={url}
        internalQuery={`?id=${query.id}`}
      />
    </div>
  );
};

export default CasesPage;
