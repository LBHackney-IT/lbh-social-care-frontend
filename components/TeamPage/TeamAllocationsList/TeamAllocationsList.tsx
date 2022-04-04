import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useAllocationsByTeam } from 'utils/api/allocatedWorkers';

interface TeamMemberProps {
  teamId: number;
  type: string;
}

const TeamAllocationsList = ({
  teamId,
  type,
}: TeamMemberProps): React.ReactElement => {
  const { data: allocatedTeamData, error } = useAllocationsByTeam(teamId, {
    team_allocation_status: type,
    status: 'open',
  });

  if (!allocatedTeamData) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage label="There was a problem with team allocations." />;
  }

  return (
    <>
      <ul className="lbh-list">
        {allocatedTeamData.allocations.map((elm) => (
          <li key={elm.id} className="lbh-body-s">
            {elm.ragRating}
          </li>
        ))}
      </ul>
    </>
  );
};
export default TeamAllocationsList;
