import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import { useAuth } from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import PersonDetails from 'components/PersonView/PersonDetails';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { addCase } from 'utils/api/cases';
import { getResident } from 'utils/api/residents';

const FormCasesWrapper = ({ form, title, personId, formNameOverall }) => {
  const [id] = useState(personId);
  const { replace } = useRouter();
  useEffect(() => {
    !personId && replace('/');
  }, [personId, replace]);
  const { data: person, error } = getResident(id);
  const { user } = useAuth();
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
  if (error) {
    return <ErrorMessage />;
  }
  if (!person) {
    return <Spinner />;
  }
  return (
    <>
      <NextSeo title={title} noindex />
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
          personDetails={{ ...person }}
          includesDetails={true}
          hideBackButton={true}
        />
      </>
    </>
  );
};

FormCasesWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  form: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired,
    defaultValues: PropTypes.shape({}),
  }).isRequired,
  personId: PropTypes.string.isRequired,
  includeDetails: PropTypes.bool,
  formNameOverall: PropTypes.string,
};

export default FormCasesWrapper;
