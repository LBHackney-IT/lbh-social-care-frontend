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
        <h2>Case statuses</h2>

        {caseStatusData.caseStatuses.map((status) =>
          status.fields.map((item) => (
            <div key={status.id} className={styles.caseStatusDesign}>
              <div className={styles.caseStatusDetails}>
                <dl>
                  <div className={styles.align}>
                    {status.type && (
                      <>
                        <dt className="govuk-!-margin-right-2">
                          <div className={styles.typeStyling}>
                            {getTypeString(
                              status.type as keyof typeof valueMapping
                            )}{' '}
                          </div>
                        </dt>
                      </>
                    )}

                    {status.startDate && (
                      <>
                        <dt className={styles.date}>Start</dt>
                        <dd>
                          {status.startDate
                            ? new Date(status.startDate).toLocaleDateString(
                                'en-GB'
                              )
                            : new Date(status.endDate).toLocaleDateString(
                                'en-GB'
                              )}{' '}
                        </dd>
                      </>
                    )}

                    {status.endDate && (
                      <>
                        <dt className={styles.date}>End</dt>
                        <dd>
                          {new Date(status.endDate).toLocaleDateString('en-GB')}{' '}
                        </dd>
                      </>
                    )}
                  </div>

                  {item.selectedOption &&
                    item.selectedOption.name &&
                    item.selectedOption.description && (
                      <>
                        <dt className={styles.selectedTitles}>
                          Category of need
                        </dt>
                        <dd>
                          {item.selectedOption.name} -{' '}
                          {item.selectedOption.description}
                        </dd>
                      </>
                    )}

                  {status.notes && (
                    <>
                      <dt className={styles.selectedTitles}> Notes </dt>
                      <dd>{status.notes}</dd>
                    </>
                  )}
                </dl>
              </div>
            </div>
          ))
        )}
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
