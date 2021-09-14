import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatus, CaseStatusMapping } from 'types';

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
        <span
          className="govuk-tag lbh-tag lbh-tag--yellow govuk-!-margin-right-1 govuk-!-margin-top-2"
          key={status}
        >
          {valueMapping[status]}
        </span>
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
