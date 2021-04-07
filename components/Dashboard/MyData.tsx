import { useState } from 'react';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useMyData } from 'utils/api/me';

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
      <div className={styles.header}>
        <h2 className="govuk-fieldset__legend--m govuk-custom-text-color">
          {data.firstName} {data.lastName}
        </h2>
        <div
          className="govuk-link"
          role="button"
          onClick={() => setExpandView(!expandView)}
        >
          {expandView ? 'Collapse' : 'Expand'} view
        </div>
      </div>
      {expandView && (
        <>
          <dl className="govuk-summary-list">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Role</dt>
              <dd className="govuk-summary-list__value">{data.role}</dd>
            </div>
          </dl>
        </>
      )}
    </div>
  );
};

export default MyData;
