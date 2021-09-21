import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatus, CaseStatusMapping } from 'types';
import Tip from 'components/Tip/Tip';

interface Props {
  person: Resident;
}

const CaseStatusView = ({ person }: Props): React.ReactElement => {
  const { data: caseStatusData, error } = useCaseStatuses(person.id);

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
      {groupByType(caseStatusData.caseStatuses).map((status) => (
        <Tip
          key={status}
          interactive={true}
          content={
            <>
              <p className="lbh-body-xs">{valueMapping[status]}</p>
              <p className="lbh-body-xs">{}</p> {/*how to put end date in?*/}
              <a
                href={`http://dev.hackney.gov.uk:3000/people/${person.id}/details`}
              >
                View details
              </a>
            </>
          }
        >
          <span
            className="govuk-tag lbh-tag lbh-tag--yellow govuk-!-margin-right-1 govuk-!-margin-top-2"
            key={status}
          >
            {valueMapping[status]}
          </span>
        </Tip>
      ))}
    </>
  );
};

const valueMapping = new CaseStatusMapping();

function groupByType(
  allCasesStatues: CaseStatus[]
): (keyof typeof valueMapping)[] {
  return Array.from(new Set(allCasesStatues.map((el) => el.type)));
}

export default CaseStatusView;
