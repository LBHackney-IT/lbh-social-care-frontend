import { AllocationData, Resident } from 'types';

interface Props {
  resident: Resident;
  allocations: AllocationData;
}

const CaseOpennessTag = ({
  resident,
  allocations,
}: Props): React.ReactElement => {
  if (allocations?.allocations?.length > 0)
    return (
      <li className="govuk-tag lbh-tag lbh-tag--blue">Open active case</li>
    );

  if (resident.allocatedTeam)
    return <li className="govuk-tag lbh-tag lbh-tag--blue">Open case</li>;

  return <li className="govuk-tag lbh-tag lbh-tag--grey">Closed case</li>;
};

export default CaseOpennessTag;
