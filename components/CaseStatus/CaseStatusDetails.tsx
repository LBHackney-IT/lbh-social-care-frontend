import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Resident, CaseStatus, CaseStatusMapping } from 'types';
import styles from './CaseStatusDetails.module.scss';
import Link from 'next/link';
import s from 'stylesheets/Section.module.scss';
import CaseStatusDetailsTable from './CaseStatusDetailsTable';
import {
  caseStatusesTest,
  LACcaseStatusesTest,
  sortCaseStatusAnswers,
} from '../../data/caseStatus';

interface Props {
  person: Resident;
}

const CaseStatusDetails = ({ person }: Props): React.ReactElement => {
  // const { data: caseStatuses, error } = useCaseStatuses(person.id);

  const caseStatuses = caseStatusesTest.concat(LACcaseStatusesTest);
  const error = undefined;

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!caseStatuses || caseStatuses?.length === 0) {
    return <></>;
  }
  return (
    <>
      {caseStatuses.map((status: CaseStatus) => {
        const {
          currentStatusAnswers,
          scheduledStatusAnswers,
          pastStatusAnswers,
        } = sortCaseStatusAnswers(status);
        console.log(status.type, status);
        console.log('current', currentStatusAnswers);
        console.log('scheduled', scheduledStatusAnswers);
        console.log('past', pastStatusAnswers);
        pastStatusAnswers?.map((status, index) => {
          status.endDate =
            index === 0
              ? currentStatusAnswers?.[0].startDate
              : pastStatusAnswers[index - 1]?.startDate;
        });
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

              {status.type === 'CIN' && (
                <CaseStatusDetailsTable
                  status={status}
                  answers={currentStatusAnswers}
                />
              )}

              {currentStatusAnswers && currentStatusAnswers.length > 0 && (
                <CaseStatusDetailsTable
                  status={status}
                  answers={currentStatusAnswers}
                />
              )}

              {scheduledStatusAnswers && scheduledStatusAnswers.length > 0 && (
                <CaseStatusDetailsTable
                  tableName="Scheduled changes"
                  styleType={styles.scheduledStatusFont}
                  status={status}
                  answers={scheduledStatusAnswers}
                />
              )}

              {pastStatusAnswers && pastStatusAnswers.length > 0 && (
                <CaseStatusDetailsTable
                  tableName="Previous version"
                  styleType={styles.previousStatusFont}
                  status={status}
                  answers={pastStatusAnswers}
                  // groupedAnswers={pastStatusAnswersGrouped}
                />
              )}
            </section>
          </div>
        );
      })}
    </>
  );
};
export default CaseStatusDetails;
