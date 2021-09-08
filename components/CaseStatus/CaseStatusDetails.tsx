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

  const title = <b> hello </b>;

  return (
    <>
      <div className={styles.container}>
        <h2>Case statuses</h2>

        <ExpandDetails label={title} buttonLabel>
          this is the component content
        </ExpandDetails>

        {caseStatusData.caseStatuses.map((status: CaseStatus) => (
          <div key={status.id} className={styles.caseStatusDesign}>
            <div key={status.id} className={styles.caseStatusDetails}>
              <dl key={status.id}>
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
                      <dd className={styles.date}>
                        {new Date(status.startDate).toLocaleDateString(
                          'en-GB',
                          { day: '2-digit', month: 'short', year: 'numeric' }
                        )}
                      </dd>
                    </>
                  )}

                  {status.endDate && (
                    <>
                      <dt className={styles.date}> - End</dt>
                      <dd className={styles.date}>
                        {new Date(status.endDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                      </dd>
                    </>
                  )}
                </div>

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
