import { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { Button } from 'components/Form';
import { deleteData } from 'utils/saveData';
import Summary from 'components/Summary/Summary';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import { filterDataOnCondition } from 'utils/steps';

const SummaryStep = ({ formData, formSteps, formPath, onFormSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const onSubmit = async () => {
    setIsSubmitting(true);
    setHasError(false);
    try {
      const data = await onFormSubmit(
        filterDataOnCondition(formSteps, formData)
      );
      deleteData(formPath);
      Router.replace(
        `${formPath}confirmation${data?.ref ? `?ref=${data.ref}` : ''}`
      );
    } catch {
      setHasError(true);
    }
    setIsSubmitting(false);
  };
  if (!formSteps) return null;
  return (
    <div>
      <Summary
        formData={formData}
        formPath={formPath}
        formSteps={formSteps}
        canEdit
      />
      <Button
        className="govuk-button"
        label="Submit"
        onClick={onSubmit}
        disabled={isSubmitting}
      />
      {hasError && (
        <ErrorSummary
          title="Unfortunately there was a problem with your submission."
          body="Please try again."
        />
      )}
    </div>
  );
};

SummaryStep.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  formPath: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default SummaryStep;
