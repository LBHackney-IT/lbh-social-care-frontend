import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

const Breadcrumbs = ({ label, link, state }) => (
  <li className={cx('govuk-breadcrumbs__list-item')}>
    <Link href={link}>
      <a className={`govuk-breadcrumbs__link ${state}`}>{label}</a>
    </Link>
  </li>
);

Breadcrumbs.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default Breadcrumbs;
