import { NextSeo } from 'next-seo';
import { useForm } from 'react-hook-form';

import BackButton from 'components/Layout/BackButton/BackButton';
import LinkButton from 'components/LinkButton/LinkButton';
import PersonView from 'components/PersonView/PersonView';
import { Select } from 'components/Form';
import FORM_LIST from 'data/formList';

const CasesPage = ({ query }) => {
  const { register, watch } = useForm();
  const formUrl = watch('formList');
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
        register={register}
        label="Choose a form"
        placeHolder="Choose one"
      />
      <LinkButton label="Load form" route={formUrl} />
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
