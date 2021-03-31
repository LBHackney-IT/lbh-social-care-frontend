import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Collapsible from 'components/Collapsible/Collapsible';
import SummaryList from 'components/Summary/SummaryList';
import { filterStepsOnCondition, filterDataOnCondition } from 'utils/steps';
import { formatData, getSectionObject } from 'utils/summary';

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
          <a className="govuk-button lbh-button lbh-button--secondary lbh-button--add">
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4.5293"
                y="11"
                width="11"
                height="1.94118"
                transform="rotate(-90 4.5293 11)"
                fill="#00664F"
              />
              <rect y="4.52942" width="11" height="1.94118" fill="#00664F" />
            </svg>
            Add another {title}
          </a>
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
  collapsedSection,
  // isSummaryCollapsable,
}) => {
  const Summary = (
    <SummaryList
      list={components
        .filter(({ name }) => formData[name])
        .map((data) => formatData(data, formData))}
    />
  );
  const isCollapsed = collapsedSection[id];
  return (
    <Collapsible
      headline={
        <>
          {title}
          {canEdit && (
            <Link
              href={`${formPath}${id}?fromSummary=true`}
              as={`${formPath}${id}?fromSummary=true`}
            >
              <a className="lbh-body lbh-link govuk-!-margin-left-3">Edit</a>
            </Link>
          )}
        </>
      }
      initiallyClosed={isCollapsed}
    >
      {Summary}
    </Collapsible>
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
  collapsedSection: PropTypes.object.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  isSummaryCollapsable: PropTypes.bool,
};

const Summary = ({
  formData,
  formSteps,
  formPath,
  canEdit,
  // isSummaryCollapsable,
}) => {
  const [collapsedSection, setCollapsedSection] = useState(
    getSectionObject(formSteps, formData, false)
  );

  // const hasCollapsed = Object.values(collapsedSection).find(Boolean);
  return (
    <>
      {filterStepsOnCondition(formSteps, formData).map((section) => {
        const props = {
          key: section.id,
          formData: filterDataOnCondition(formSteps, formData),
          formPath: formPath,
          canEdit: canEdit,
          collapsedSection,
          toggleCollapsed: (id) =>
            setCollapsedSection({
              ...collapsedSection,
              [id]: !collapsedSection[id],
            }),
          // isSummaryCollapsable,
          ...section,
        };
        return section.isMulti ? (
          <SummaryMultiSection {...props} />
        ) : (
          <SummarySection {...props} />
        );
      })}
    </>
  );
};

Summary.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.array.isRequired,
  formPath: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
  isSummaryCollapsable: PropTypes.bool,
};

export default Summary;
