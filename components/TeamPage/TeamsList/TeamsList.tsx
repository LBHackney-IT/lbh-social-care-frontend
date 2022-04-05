import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useTeams } from 'utils/api/allocatedWorkers';
import Link from 'next/link';
import Spinner from 'components/Spinner/Spinner';

const TeamsList = (): React.ReactElement => {
  const { data: teamData, error } = useTeams({
    ageContext: 'A',
  });

  if (error) {
    return <ErrorMessage label="There was a problem with getting teams." />;
  }
  if (!teamData) {
    return <Spinner />;
  }

  return (
    <>
      <h3>List of teams ({teamData.teams.length})</h3>
      <ul className="lbh-list">
        {teamData.teams.map((elm) => (
          <li key={elm.id} className="lbh-body-s">
            <Link href={`teams/${elm.id}/`}>
              <a data-testid={`teamlink_${elm.id}`}>{elm.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default TeamsList;
