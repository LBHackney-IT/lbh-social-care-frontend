import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

import { renderOnCondition } from 'utils/steps';

const Breadcrumb = ({ label, link, isCurrentStep }) => (
  <li className="govuk-breadcrumbs__list-item">
    {link ? (
      <Link href={link}>
        <a className="govuk-breadcrumbs__link">{label}</a>
      </Link>
    ) : (
      <span className={cx({ 'govuk-!-font-weight-bold': isCurrentStep })}>
        {label}
      </span>
    )}
  </li>
);

Breadcrumb.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
  isCurrentStep: PropTypes.bool,
};

const Breadcrumbs = ({ steps, data, path, currentStepIndex }) => (
  <div className="govuk-breadcrumbs">
    <ol className="govuk-breadcrumbs__list">
      {steps.map((step, index) =>
        renderOnCondition(
          step,
          data,
          <Breadcrumb
            key={step.id}
            label={step.title}
            link={currentStepIndex > index ? `${path}${step.id}` : null}
            isCurrentStep={currentStepIndex === index}
          />
        )
      )}
    </ol>
  </div>
);

Breadcrumbs.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      conditionalRender: PropTypes.func,
    }).isRequired
  ).isRequired,
  data: PropTypes.shape({}).isRequired,
  path: PropTypes.string.isRequired,
  currentStepIndex: PropTypes.number.isRequired,
};

export default Breadcrumbs;
