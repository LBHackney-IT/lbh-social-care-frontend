import PropTypes from 'prop-types';
import styles from './AdminNavBar.module.scss';

const AdminNavBar = ({ adminName }) => {
  return (
    <div className={styles.AdminNavBar}>
      <p className="govuk-body">
        <span className="govuk-!-font-weight-bold">Logged in as:</span>{' '}
        {adminName}
      </p>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <a href="/" className="govuk-link">
            Home
          </a>
        </li>
        <li className={styles.navListItem}>
          <a href="/logout" className="govuk-link">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

AdminNavBar.propTypes = {
  adminName: PropTypes.string
};

export default AdminNavBar;
