import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatusMapping, CaseStatus } from 'types';
import Tip from 'components/Tip/Tip';
import { format } from 'date-fns';
import Styles from 'components/CaseStatus/CaseStatusView.module.scss';

interface Props {
  person: Resident;
}

const CaseStatusView = ({ person }: Props): React.ReactElement => {
  const { data: caseStatuses, error } = useCaseStatuses(person.id);

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
      <div className={Styles.align}>
        {caseStatuses.map((caseStatus) => (
          <Tip
            key={caseStatus.id}
            interactive={true}
            delay={100}
            content={
              <>
                <p className={`lbh-body-xs ${Styles.popupTitle}`}>
                  {caseStatus.type}
                </p>
                <p className="lbh-body-xs">{`Start date: ${format(
                  new Date(caseStatus.startDate),
                  'dd MMM yyyy'
                )}`}</p>
                <a
                  href={`http://dev.hackney.gov.uk:3000/people/${person.id}/details`}
                >
                  View details
                </a>
              </>
            }
          >
            <span className={`${Styles.statusTag}`}>{caseStatus.type}</span>
          </Tip>
        ))}
      </div>
      {/* {groupByType(caseStatuses).map((status) => (
        <span
          className="govuk-tag lbh-tag lbh-tag--yellow govuk-!-margin-right-1 govuk-!-margin-top-2"
          key={status}
        >
          {CaseStatusMapping[status]}
        </span>
      ))} */}
    </>
  );
};

// const valueMapping = new CaseStatusMapping();

function groupByType(
  allCasesStatues: CaseStatus[]
): (keyof typeof CaseStatusMapping)[] {
  return Array.from(new Set(allCasesStatues.map((el) => el.type)));
}

export default CaseStatusView;
