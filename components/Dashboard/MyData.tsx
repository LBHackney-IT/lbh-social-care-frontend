import { useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useMyData } from 'utils/api/me';
import { getUserType } from 'utils/user';
import { Team } from 'types';

import styles from './MyData.module.scss';

const MyData: React.FC = () => {
  const { query, replace, pathname } = useRouter();
  const [expandView, setExpandView] = useState(Boolean(query?.details));
  const { data, error } = useMyData();
  if (error) {
    if (error?.response?.status === 404) {
      return null;
    }
    return (
      <ErrorMessage
        label={
          error.response?.status ? 'An unknown error has occurred.' : undefined
        }
      />
    );
  }
  if (!data) {
    return <Spinner />;
  }
  const onExapandToggle = () => {
    setExpandView(!expandView);
    replace(
      `${pathname}?details=${!expandView}`,
      `${pathname}?details=${!expandView}`,
      { shallow: true, scroll: false }
    );
  };

  const teams =
    data.teams.length > 1
      ? `Teams: ${data.teams.map((team) => team.name).join(', ')}`
      : data.teams.length > 0
      ? `Team: ${data.teams[0].name}`
      : '';
  return (
    <div className={styles.container}>
      <div className={cx(styles.header, 'lbh-table-header')}>
        <h2>
          {data.firstName} {data.lastName}
        </h2>
        <button
          className="govuk-link govuk-link--underline"
          onClick={onExapandToggle}
        >
          {expandView ? 'Collapse' : 'Expand'} view
        </button>
      </div>
      {expandView && (
        <div className={styles.body}>
          <div className="govuk-grid-row">
            <div
              className={cx('govuk-grid-column-one-half', styles.descriptions)}
            >
              <div>Role: {data.role}</div>
              {teams && <div>{teams}</div>}
            </div>
            <div
              className={cx('govuk-grid-column-one-half', styles.descriptions)}
            >
              <div>Area: {getUserType(data.auth)} social care</div>
              <div>
                Access:{' '}
                {data.auth.hasUnrestrictedPermissions
                  ? 'No restriction'
                  : 'Restricted'}
              </div>
              {data.auth.hasAllocationsPermissions && (
                <div>Permission: Can allocate</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyData;
