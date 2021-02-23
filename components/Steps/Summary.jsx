import { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Button from 'components/Button/Button';
import { deleteData } from 'utils/saveData';
import Summary from 'components/Summary/Summary';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import { filterDataOnCondition } from 'utils/steps';
import { sanitiseObject } from 'utils/objects';

const SummaryStep = ({
  formData,
  formSteps,
  formPath,
  onFormSubmit,
  isSummaryCollapsable,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const onSubmit = async () => {
    setIsSubmitting(true);
    setHasError(false);
    try {
      const data = await onFormSubmit(
        filterDataOnCondition(formSteps, sanitiseObject(formData))
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
      <div className="lbh-table-header">
        <h2 className="govuk-fieldset__legend--l gov-weight-lighter ">
          {`Review details`}
        </h2>
      </div>
      <Summary
        formData={formData}
        formPath={formPath}
        formSteps={formSteps}
        canEdit
        isSummaryCollapsable={isSummaryCollapsable}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          wideButton
          className="govuk-button"
          label="Cancel"
          isSecondary
          onClick={() => (window.location = '/')}
        />
        <Button
          wideButton
          className="govuk-button"
          label="Submit"
          onClick={onSubmit}
          disabled={isSubmitting}
        />
      </div>
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
  isSummaryCollapsable: PropTypes.bool,
};

export default SummaryStep;
