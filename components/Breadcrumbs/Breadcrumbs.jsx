import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

const Breadcrumb = ({ label, link, state }) => (
  <li className={cx('govuk-breadcrumbs__list-item')}>
    <Link href={link}>
      <a className={`govuk-breadcrumbs__link ${state}`}>{label}</a>
    </Link>
  </li>
);

Breadcrumb.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const Breadcrumbs = ({ formSteps, formData, formPath, currentStepIndex }) => (
  <div className="govuk-breadcrumbs">
    <ol className="govuk-breadcrumbs__list">
      {formSteps.map((step, index) =>
        step.conditionalRender && !step.conditionalRender(formData) ? null : (
          <Breadcrumb
            key={step.id}
            label={step.title}
            link={`${formPath}${step.id}`}
            state={
              currentStepIndex === index
                ? 'current'
                : currentStepIndex < index && 'completed'
            }
          />
        )
      )}
    </ol>
  </div>
);

Breadcrumbs.propTypes = {
  formSteps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      conditionalRender: PropTypes.func,
    }).isRequired
  ).isRequired,
  formData: PropTypes.shape({}).isRequired,
  formPath: PropTypes.string.isRequired,
  currentStepIndex: PropTypes.number.isRequired,
};

export default Breadcrumbs;
