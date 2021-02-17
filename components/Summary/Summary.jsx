import PropTypes from 'prop-types';
import Link from 'next/link';

import SummaryList from 'components/Summary/SummaryList';
import { filterStepsOnCondition, filterDataOnCondition } from 'utils/steps';
import { formatData } from 'utils/summary';

const SummaryMultiSection = ({
  formData,
  id,
  title,
  canEdit,
  formPath,
  ...props
}) => (
  <>
    {formData[id].map((data, key) => (
      <SummarySection
        {...props}
        canEdit={canEdit}
        formData={data}
        formPath={formPath}
        title={`${title} - ${key + 1}`}
        key={`${id}/${key}`}
        id={`${id}/${key + 1}`}
      />
    ))}
    {canEdit && (
      <p className="govuk-!-margin-bottom-7">
        <Link
          href={`${formPath}${id}/${formData[id].length + 1}?fromSummary=true`}
          as={`${formPath}${id}/${formData[id].length + 1}?fromSummary=true`}
        >
          <a className="govuk-link">Add Another {title}</a>
        </Link>
      </p>
    )}
  </>
);

SummaryMultiSection.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  formPath: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
};

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
        .map((data) => formatData(data, formData))}
    />
  );
  return (
    <div className="govuk-!-margin-bottom-7">
      <div className="lbh-table-header">
        <h3 className="govuk-heading-m govuk-custom-text-color govuk-!-margin-bottom-0">
          {title.toUpperCase()}
        </h3>
        {canEdit && (
          <Link
            href={`${formPath}${id}?fromSummary=true`}
            as={`${formPath}${id}?fromSummary=true`}
          >
            <a className="govuk-link">Edit details</a>
          </Link>
        )}
      </div>
      <hr className="govuk-divider" />
      {Summary}
    </div>
  );
};

SummarySection.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
  formPath: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
};

const Summary = ({ formData, formSteps, formPath, canEdit }) =>
  filterStepsOnCondition(formSteps, formData).map((section) => {
    const props = {
      key: section.id,
      formData: filterDataOnCondition(formSteps, formData),
      formPath: formPath,
      canEdit: canEdit,
      ...section,
    };
    return section.isMulti ? (
      <SummaryMultiSection {...props} />
    ) : (
      <SummarySection {...props} />
    );
  });

Summary.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  formPath: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
};

export default Summary;
