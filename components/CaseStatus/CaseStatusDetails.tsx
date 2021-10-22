import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatus, CaseStatusMapping } from 'types';
import styles from './CaseStatusDetails.module.scss';
import Link from 'next/link';
import s from 'stylesheets/Section.module.scss';
import CaseStatusDetailsTable from './CaseStatusDetailsTable';
import { sortCaseStatusAnswers } from './caseStatusHelper';

interface Props {
  person: Resident;
}

const CaseStatusDetails = ({ person }: Props): React.ReactElement => {
  const { data, error } = useCaseStatuses(person.id);

  // const data = caseStatusesTest.concat(LACcaseStatusesTest);
  // const error = undefined;

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!data || data?.length === 0) {
    return <></>;
  }
  return (
    <>
      {data.map((status: CaseStatus) => {
        const {
          currentStatusAnswers,
          scheduledStatusAnswers,
          pastStatusAnswers,
        } = sortCaseStatusAnswers(status);
        return (
          <div
            key={`${status.id} ${status.type}`}
            className={styles.caseStatusDesign}
            data-testid="case_status_details"
          >
            <section className="govuk-!-margin-bottom-8">
              <div className={s.heading}>
                <h2 className="govuk-!-margin-top-3">
                  {CaseStatusMapping[status.type]}
                </h2>
                <Link
                  href={{
                    pathname: `/people/${person.id}/case-status/${status.id}/edit/`,
                    query: { type: status.type },
                  }}
                >
                  Edit / End
                </Link>
              </div>

              {(!currentStatusAnswers ||
                currentStatusAnswers === undefined ||
                currentStatusAnswers.length <= 0) &&
                (!scheduledStatusAnswers ||
                  scheduledStatusAnswers === undefined ||
                  scheduledStatusAnswers.length <= 0) && (
                  <CaseStatusDetailsTable status={status} answers={undefined} />
                )}

              {currentStatusAnswers &&
                currentStatusAnswers.length > 0 &&
                currentStatusAnswers.map((currentStatusDateGroup) => (
                  <CaseStatusDetailsTable
                    key={`Current status - ${currentStatusDateGroup.startDate}`}
                    status={status}
                    answers={currentStatusDateGroup}
                  />
                ))}

              {scheduledStatusAnswers &&
                scheduledStatusAnswers.length > 0 &&
                scheduledStatusAnswers.map((scheduledStatusDateGroup) => (
                  <CaseStatusDetailsTable
                    key={`Scheduled status - ${scheduledStatusDateGroup.startDate}`}
                    tableName="Scheduled changes"
                    styleType={styles.scheduledStatusFont}
                    status={status}
                    answers={scheduledStatusDateGroup}
                  />
                ))}

              {pastStatusAnswers &&
                pastStatusAnswers.length > 0 &&
                pastStatusAnswers.map((previousStatusDateGroup) => (
                  <CaseStatusDetailsTable
                    key={`Previous version - ${previousStatusDateGroup.startDate} - ${previousStatusDateGroup.status[0].groupId}`}
                    tableName="Previous version"
                    styleType={styles.previousStatusFont}
                    status={status}
                    answers={previousStatusDateGroup}
                  />
                ))}
            </section>
          </div>
        );
      })}
    </>
  );
};
export default CaseStatusDetails;
