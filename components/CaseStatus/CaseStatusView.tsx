import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { GetCaseStatus } from 'utils/api/caseStatus';
import { Resident, CaseStatus } from 'types';

interface Props {
  person: Resident;
}

const CaseStatusView = ({ person }: Props): React.ReactElement => {
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

function groupByType(
  allCasesStatues: CaseStatus[]
): (keyof typeof valueMapping)[] {
  return Array.from(new Set(allCasesStatues.map((el) => el.type)));
}

const valueMapping = {
  CIN: 'Child in need',
  CP: 'Child protection',
  LAC: 'Looked after child',
};

export default CaseStatusView;
