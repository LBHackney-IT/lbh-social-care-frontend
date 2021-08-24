import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { GetCaseStatus } from 'utils/api/caseStatus';
import { Resident } from 'types';
import styles from './CaseStatusDetails.module.scss';
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
      <div className={styles.container}>
        {caseStatusData.caseStatuses.map((status) => (
          <div key={status.id} className={styles.caseStatusDesign}>
            <div className={styles.casenoteDetails}>
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
