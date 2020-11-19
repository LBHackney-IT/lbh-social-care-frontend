import PropTypes from 'prop-types';
import Link from 'next/link';

import SummaryList from 'components/Summary/SummaryList';

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
  canEdit,
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
      {canEdit && (
        <Link
          href={`${formPath}${id}?fromSummary=true`}
          as={`${formPath}${id}?fromSummary=true`}
        >
          <a className="govuk-link">Change</a>
        </Link>
      )}
    </div>
  );
};

const Summary = ({ formData, formSteps, formPath, canEdit }) =>
  formSteps.map((section) => (
    <SummarySection
      key={section.id}
      formData={formData}
      formPath={formPath}
      canEdit={canEdit}
      {...section}
    />
  ));

Summary.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  formPath: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
};

export default Summary;
