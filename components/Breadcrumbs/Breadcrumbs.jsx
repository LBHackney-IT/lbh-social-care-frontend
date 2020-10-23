import PropTypes from 'prop-types';
import cx from 'classnames';

const Breadcrumbs = ({ label, link, state }) => (
  <li className={cx('govuk-breadcrumbs__list-item')}>
    <a className={`govuk-breadcrumbs__link ${state}`} href={link}>
      {label}
    </a>
  </li>
);

Breadcrumbs.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default Breadcrumbs;
