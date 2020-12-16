import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import UserContext from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import PersonDetails from 'components/PersonView/PersonDetails';
import Spinner from 'components/Spinner/Spinner';
import { addCase } from 'utils/api/cases';
import { getResident } from 'utils/api/residents';

const FormCasesWrapper = ({ form, title, personId, formNameOverall }) => {
  const [person, setPerson] = useState();
  const [loading, setLoading] = useState(true);
  const { replace } = useRouter();
  const getPerson = async (personId) => {
    try {
      const data = await getResident(personId);
      setPerson(data);
    } catch (e) {
      replace('/');
    }
    setLoading(false);
  };
  useEffect(() => {
    personId ? getPerson(personId) : replace('/');
  }, []);
  const { user } = useContext(UserContext);
  const onFormSubmit = async (formData) => {
    const ref = await addCase({
      mosaicId: person.mosaicId,
      firstName: person.firstName,
      lastName: person.lastName,
      ageContext: person.ageContext,
      workerEmail: user.email,
      caseFormData: JSON.stringify({
        form_name_overall: formNameOverall,
        ...formData,
      }),
    });
    return ref;
  };
  return (
    <>
      <NextSeo title={title} noindex />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <BackButton />
          <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
            {title} for
          </h1>
          <PersonDetails {...person} expandView />
          <FormWizard
            formPath={form.path}
            formSteps={form.steps}
            title={form.title}
            defaultValues={form.defaultValues}
            onFormSubmit={onFormSubmit}
            personId={personId}
          />
        </>
      )}
    </>
  );
};

FormCasesWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  form: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired,
    degaultValues: PropTypes.shape({}),
  }).isRequired,
  personId: PropTypes.string.isRequired,
  formNameOverall: PropTypes.string,
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  return {
    props: {
      query,
    },
  };
};

export default FormCasesWrapper;
