import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import {
  Resident,
  CaseStatusFields,
  CaseStatus,
  CaseStatusMapping,
} from 'types';
import styles from './CaseStatusDetails.module.scss';
import Link from 'next/link';
import ExpandDetails from 'components/ExpandDetails/ExpandDetails';

interface Props {
  person: Resident;
}

const CaseStatusDetails = ({ person }: Props): React.ReactElement => {
  const { data: caseStatuses, error } = useCaseStatuses(person.id);
  const valueMapping = new CaseStatusMapping();

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!caseStatuses) {
    return <></>;
  }
  return (
    <>
      <div>
        <h2 style={{ fontSize: '24px' }}>Case statuses</h2>

        {caseStatuses.map((status: CaseStatus) => {
          const title = (
            <div className={styles.align}>
              {status.type && (
                <>
                  <dt className="govuk-!-margin-right-2">
                    <div className={styles.typeStyling}>
                      <span>{valueMapping[status.type]}</span>

                      {status.startDate && (
                        <span
                          data-testid="start_date"
                          className={styles.dateElement}
                        >
                          Start:{' '}
                          {new Date(status.startDate).toLocaleDateString(
                            'en-GB',
                            { day: '2-digit', month: 'short', year: 'numeric' }
                          )}
                        </span>
                      )}

                      {status.endDate && (
                        <span
                          data-testid="end_date"
                          className={styles.dateElement}
                        >
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
                      <Link
                        href={{
                          pathname: `/people/${person.id}/case-status/${status.id}/edit/`,
                          query: { type: status.type },
                        }}
                      >
                        <a data-testid="edit_button">edit</a>
                      </Link>
                    </div>
                  </dt>
                </>
              )}
            </div>
          );

          return (
            <div key={status.id} className={styles.caseStatusDesign}>
              <ExpandDetails label={title}>
                <div key={status.id}>
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
                            <dd className={styles.selectedValue}>
                              {field.selectedOption.name} -{' '}
                              {field.selectedOption.description}
                            </dd>
                          </div>
                        )
                    )}

                    {status.notes && (
                      <>
                        <dt className={styles.selectedTitles}> Notes </dt>
                        <dd className={styles.selectedValue}>{status.notes}</dd>
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
export default CaseStatusDetails;
