import { useContext } from 'react';

import UserContext from 'components/UserContext/UserContext';

import styles from './AdminNavBar.module.scss';

const AdminNavBar = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return null;
  }
  return (
    <div className={styles.AdminNavBar}>
      <p className="govuk-body">
        <span className="govuk-!-font-weight-bold">Logged in as:</span>{' '}
        {user.name}
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

export default AdminNavBar;
