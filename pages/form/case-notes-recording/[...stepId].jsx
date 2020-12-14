import { useState, useEffect, useContext } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import UserContext from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import PersonDetails from 'components/PersonView/PersonDetails';
import Spinner from 'components/Spinner/Spinner';
import { addCase } from 'utils/api/cases';
import { getResident } from 'utils/api/residents';
import form from 'data/forms/case-notes-recording';

const CaseNotesRecording = ({ query }) => {
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
    query.id ? getPerson(query.id) : replace('/');
  }, []);
  const { user } = useContext(UserContext);
  const onFormSubmit = async (formData) => {
    const ref = await addCase({
      mosaic_id: person.mosaicId,
      first_name: person.firstName,
      last_name: person.lastName,
      context_flag: person.ageContext,
      worker_email: user.email,
      caseFormData: JSON.stringify(formData),
    });
    return ref;
  };
  return (
    <>
      <NextSeo title="Add a new case not" noindex />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <BackButton />
          <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
            Add a new case note for
          </h1>
          <PersonDetails {...person} expandView />
          <FormWizard
            formPath={form.path}
            formSteps={form.steps}
            title={form.title}
            defaultValues={form.defaultValues}
            onFormSubmit={onFormSubmit}
          />
        </>
      )}
    </>
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

export default CaseNotesRecording;
