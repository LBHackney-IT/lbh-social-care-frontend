import PropTypes from 'prop-types';
import cx from 'classnames';

const ErrorSummary = ({ title, body, links, isRestricted }) => (
  <div
    className={cx('govuk-error-summary', {
      'restricted-summary-box': isRestricted,
    })}
    aria-labelledby="error-summary-title"
    role="alert"
    tabIndex="-1"
    data-module="govuk-error-summary"
  >
    <h2
      className={cx('govuk-error-summary__title', {
        'restricted-summary-title': isRestricted,
      })}
      id="error-summary-title"
    >
      {title}
    </h2>
    <div className="govuk-error-summary__body">
      {body}
      {links && links.length > 0 && (
        <ul className="govuk-list govuk-error-summary__list">
          {links.map(({ href, text }) => (
            <li key={href}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

ErrorSummary.propTypes = {
  title: PropTypes.string,
  body: PropTypes.node,
};

export default ErrorSummary;
