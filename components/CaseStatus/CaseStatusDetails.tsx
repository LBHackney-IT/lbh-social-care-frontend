import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { GetCaseStatus } from 'utils/api/caseStatus';
import { Resident, CaseStatusFields, CaseStatus } from 'types';
import styles from './CaseStatusDetails.module.scss';
import ExpandDetails from 'components/ExpandDetails/ExpandDetails';

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

        {caseStatusData.caseStatuses.map((status: CaseStatus) => {
          const title = (
            <div className={styles.align}>
              {status.type && (
                <>
                  <dt className="govuk-!-margin-right-2">
                    <div className={styles.typeStyling}>
                      <span>
                        {getTypeString(
                          status.type as keyof typeof valueMapping
                        )}{' '}
                      </span>

                      {status.startDate && (
                        <span className={styles.dateElement}>
                          Start:{' '}
                          {new Date(status.startDate).toLocaleDateString(
                            'en-GB',
                            { day: '2-digit', month: 'short', year: 'numeric' }
                          )}
                        </span>
                      )}

                      {status.endDate && (
                        <span className={styles.dateElement}>
                          End:{' '}
                          {new Date(status.endDate).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}{' '}
                        </span>
                      )}
                    </div>
                  </dt>
                </>
              )}
            </div>
          );

          return (
            <div key={status.id} className={styles.caseStatusDesign}>
              <ExpandDetails label={title} buttonLabel>
                <div key={status.id} className={styles.caseStatusDetails}>
                  <dl key={status.id}>
                    {status.fields.map(
                      (field: CaseStatusFields) =>
                        field.selectedOption &&
                        field.selectedOption.name &&
                        field.selectedOption.description && (
                          <div key={field.selectedOption.name}>
                            <dt className={styles.selectedTitles}>
                              Category of need
                            </dt>
                            <dd>
                              {field.selectedOption.name} -{' '}
                              {field.selectedOption.description}
                            </dd>
                          </div>
                        )
                    )}

                    {status.notes && (
                      <>
                        <dt className={styles.selectedTitles}> Notes </dt>
                        <dd>{status.notes}</dd>
                      </>
                    )}
                  </dl>
                </div>
              </ExpandDetails>
            </div>
          );
        })}
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
