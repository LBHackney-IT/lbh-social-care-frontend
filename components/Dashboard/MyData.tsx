import { useState } from 'react';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useMyData } from 'utils/api/me';
import cx from 'classnames';
import { getUserType } from 'utils/user';

import styles from './MyData.module.scss';

const MyData = (): React.ReactElement => {
  const [expandView, setExpandView] = useState(false);
  const { data, error } = useMyData();
  if (error) {
    return <ErrorMessage />;
  }
  if (!data) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <div className={cx(styles.header, 'lbh-table-header')}>
        <h2>
          {data.firstName} {data.lastName}
        </h2>
        <div
          className="govuk-link"
          style={{ color: 'white' }}
          role="button"
          onClick={() => setExpandView(!expandView)}
        >
          {expandView ? 'Collapse' : 'Expand'} view
        </div>
      </div>
      {expandView && (
        <dl className={cx(styles.body, 'govuk-grid-row')}>
          <div className="govuk-grid-column-one-half">
            <div>Role: {data.role}</div>
            {data.teams.length > 0 && <div>Team {data.teams}</div>}
          </div>
          <div className="govuk-grid-column-one-half">
            <div>Area: {getUserType(data.auth)} Social Care</div>
            <div>
              Access:{' '}
              {data.auth.hasUnrestrictedPermissions
                ? 'No Restriction'
                : ' Restricted'}{' '}
            </div>
            {data.auth.hasAllocationsPermissions && (
              <div> Permission: Can Allocate</div>
            )}
          </div>
        </dl>
      )}
    </div>
  );
};

export default MyData;
