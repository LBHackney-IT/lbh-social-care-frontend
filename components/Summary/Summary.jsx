import { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SummaryList from 'components/Summary/SummaryList';
import { filterStepsOnCondition, filterDataOnCondition } from 'utils/steps';
import { formatData, getSectionObject } from 'utils/summary';
import { setValues } from 'utils/objects';

import styles from './Summary.module.scss';

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
  additionalMetadata: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      type: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

export const SummarySection = ({
  formData,
  id,
  title,
  components,
  formPath,
  canEdit,
  collapsedSection,
  toggleCollapsed,
  isSummaryCollapsable,
  additionalMetadata,
}) => {
  const isCollapsed = collapsedSection[id];

  return (
    <div className="govuk-!-margin-bottom-7">
      <div className="lbh-table-header">
        <div className={styles.sectionTitle}>
          <h3 className="govuk-heading-m govuk-custom-text-color govuk-!-margin-bottom-0">
            {title.toUpperCase()}
          </h3>
          {canEdit && (
            <Link
              href={`${formPath}${id}?fromSummary=true`}
              as={`${formPath}${id}?fromSummary=true`}
            >
              <a className="govuk-link">Edit</a>
            </Link>
          )}
        </div>
        {isSummaryCollapsable && (
          <button
            className="govuk-link govuk-link--underline"
            onClick={(e) => {
              e.preventDefault();
              toggleCollapsed(id);
            }}
          >
            {isCollapsed ? 'Expand view' : 'Collapse view'}
          </button>
        )}
      </div>
      <hr className="govuk-divider" />
      {!isCollapsed && (
        <SummaryList
          list={[
            ...components
              .filter(({ name }) => formData[name])
              .map((data) => formatData(data, formData)),
            ...(additionalMetadata || []),
          ]}
        />
      )}
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
  collapsedSection: PropTypes.object.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  isSummaryCollapsable: PropTypes.bool,
  additionalMetadata: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      type: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

const Summary = ({
  formData,
  formSteps,
  formPath,
  canEdit,
  isSummaryCollapsable,
  additionalMetadata,
}) => {
  const [collapsedSection, setCollapsedSection] = useState(
    getSectionObject(formSteps, formData, false)
  );
  const hasCollapsed = Object.values(collapsedSection).find(Boolean);
  return (
    <>
      {isSummaryCollapsable && (
        <div className={styles.summaryControls}>
          <button
            className={cx(
              'govuk-link',
              'govuk-link--underline',
              'govuk-!-font-weight-bold'
            )}
            onClick={(e) => {
              e.preventDefault();
              setCollapsedSection(setValues(collapsedSection, !hasCollapsed));
            }}
          >
            {hasCollapsed ? 'Expand all' : 'Collapse all'}
          </button>
        </div>
      )}
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
          isSummaryCollapsable,
          ...section,
          additionalMetadata,
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
  additionalMetadata: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      type: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

export default Summary;
