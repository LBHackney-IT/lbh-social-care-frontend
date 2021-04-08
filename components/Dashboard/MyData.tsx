import { useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useMyData } from 'utils/api/me';
import { getUserType } from 'utils/user';
import { Team } from 'types';

import styles from './MyData.module.scss';

const MyData = (): React.ReactElement => {
  const { query, replace, pathname } = useRouter();
  const [expandView, setExpandView] = useState(Boolean(query?.details));
  const { data, error } = useMyData();
  if (error) {
    return <ErrorMessage />;
  }
  if (!data) {
    return <Spinner />;
  }
  const onExapandToggle = () => {
    setExpandView(!expandView);
    replace(
      `${pathname}?details=${expandView}`,
      `${pathname}?details=${expandView}`,
      { shallow: true, scroll: false }
    );
  };
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
              {data.teams.length > 0 && (
                <div>Team: {data.teams.map(({ name }: Team) => name)}</div>
              )}
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
