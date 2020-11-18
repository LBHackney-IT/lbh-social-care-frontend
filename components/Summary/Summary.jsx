import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Button } from 'components/Form';
import SummaryList from 'components/Summary/SummaryList';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';

const MultiValue = (value) => (
  <div key={value}>
    <span>{value}</span>
    <br />
  </div>
);

export const SummarySection = ({
  formData,
  id,
  title,
  components,
  formPath,
}) => {
  const Summary = (
    <SummaryList
      list={components
        .filter(({ name }) => formData[name])
        .map(({ name, label }) => ({
          key: name,
          title: label,
          value: Array.isArray(formData[name])
            ? formData[name]
                .filter(Boolean)
                .map((v) => MultiValue(v.split('/').pop()))
            : typeof formData[name] === 'object'
            ? Object.values(formData[name]).filter(Boolean).map(MultiValue)
            : typeof formData[name] === 'boolean'
            ? JSON.stringify(formData[name])
            : formData[name],
        }))}
    />
  );
  return (
    <div className="govuk-!-margin-bottom-7">
      <h3 className="govuk-heading-m">{title}</h3>
      {Summary}

      <Link href={id} as={`${formPath}${id}`}>
        <a className="govuk-link">Change</a>
      </Link>
    </div>
  );
};

const Summary = ({ formData, formSteps, formPath, onFormSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const onSubmit = async () => {
    setIsSubmitting(true);
    setHasError(false);
    try {
      await onFormSubmit(formData);
    } catch {
      setHasError(true);
    }
    setIsSubmitting(false);
  };
  if (!formSteps) return null;
  return (
    <div>
      {formSteps.map((section) => (
        <SummarySection
          key={section.id}
          formData={formData}
          formPath={formPath}
          {...section}
        />
      ))}
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

Summary.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  formPath: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default Summary;
