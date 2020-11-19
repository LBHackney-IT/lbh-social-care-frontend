import PropTypes from 'prop-types';

const SummaryList = ({ list }) => (
  <dl className="govuk-summary-list">
    {list &&
      list.map(({ key, title, value, href }) => (
        <div key={key} className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">{title}</dt>
          <dd className="govuk-summary-list__value">{value}</dd>
          {href && (
            <dd className="govuk-summary-list__actions">
              <a className="govuk-link" href="#">
                Change
                <span className="govuk-visually-hidden"> {title}</span>
              </a>
            </dd>
          )}
        </div>
      ))}
  </dl>
);

SummaryList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      href: PropTypes.string,
    }).isRequired
  ),
};

export default SummaryList;
