import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { GetCaseStatus } from 'utils/api/caseStatus';
import { Resident } from 'types';
import styles from './CaseStatusDetails.module.scss';
import cx from 'classnames';

interface Props {
  person: Resident;
}

const CaseStatusDetails = ({ person }: Props): React.ReactElement => {
  const { data: caseStatusData, error } = GetCaseStatus(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!caseStatusData) {
    return <></>;
  }

  return (
    <>
      <div
        className={cx(
          'govuk-error-summary govuk-!-margin-bottom-8',
          styles.container
        )}
        aria-labelledby="case-note-title"
        role="complementary"
        tabIndex={-1}
      >
        {caseStatusData.caseStatuses.map((status) => (
          <div key={status.id} className={styles.container}>
            <div className={styles.casenote}>
              <dl>
                {status.notes && (
                  <>
                    <dt>Notes</dt>
                    <dd>{status.notes}</dd>
                  </>
                )}

                {status.endDate && (
                  <>
                    <dt>End Date</dt>
                    <dd>
                      {new Date(status.endDate).toLocaleDateString('en-GB')}{' '}
                    </dd>
                  </>
                )}

                {status.startDate && (
                  <>
                    <dt>Start Date</dt>
                    <dd>
                      {status.startDate
                        ? new Date(status.startDate).toLocaleDateString('en-GB')
                        : new Date(status.endDate).toLocaleDateString(
                            'en-GB'
                          )}{' '}
                    </dd>
                  </>
                )}

                {status.subType && (
                  <>
                    <dt>Sub Type</dt>
                    <dd>{status.subType}</dd>
                  </>
                )}

                {status.type && (
                  <>
                    <dt>Type</dt>
                    <dd>
                      {getTypeString(status.type as keyof typeof valueMapping)}{' '}
                      -{' '}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const getTypeString = (type: keyof typeof valueMapping): any => {
  return valueMapping[type];
};
const valueMapping = {
  CIN: 'Child in need',
};

export default CaseStatusDetails;
