import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatus, CaseStatusMapping, User } from 'types';
import styles from './CaseStatusDetails.module.scss';
import Link from 'next/link';
import s from 'stylesheets/Section.module.scss';
import CaseStatusDetailsTable from './CaseStatusDetailsTable';
import { sortCaseStatusAnswers } from './caseStatusHelper';
import { useAuth } from 'components/UserContext/UserContext';

interface Props {
  person: Resident;
}

const CaseStatusDetails = ({ person }: Props): React.ReactElement => {
  const { data, error } = useCaseStatuses(person.id);
  const { user } = useAuth() as { user: User };

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

        const isScheduledCaseStatus = scheduledStatusAnswers ? 1 : 0;

        let pastStatusStartDate;
        let currentStatusStartDate;

        if (
          pastStatusAnswers &&
          pastStatusAnswers.length > 0 &&
          pastStatusAnswers[0].startDate
        ) {
          pastStatusStartDate = pastStatusAnswers[0].startDate;
        }

        if (
          currentStatusAnswers &&
          currentStatusAnswers.length > 0 &&
          currentStatusAnswers[0].startDate
        ) {
          currentStatusStartDate = currentStatusAnswers[0].startDate;
        }

        const editLink = (
          <Link
            href={{
              pathname: `/people/${person.id}/case-status/${status.id}/edit/`,
              query: {
                type: status.type,
                isScheduledCaseStatus: isScheduledCaseStatus,
                currentCaseStatusStartDate: currentStatusStartDate,
                pastCaseStatusStartDate: pastStatusStartDate,
              },
            }}
          >
            <a>Edit / End</a>
          </Link>
        );

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
                {status.type == 'CIN' ||
                (status.type == 'CP' && user.isInSafeguardingReviewing) ||
                (status.type == 'LAC' && user.isInPlacementManagementUnit)
                  ? editLink
                  : null}
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
                    scheduledStatus={scheduledStatusAnswers}
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
                    currentStatus={currentStatusAnswers}
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
