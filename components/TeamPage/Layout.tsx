import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Team } from 'types';
import {
  useTeamWorkers,
  useAllocationsByTeam,
} from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

interface NavLinkProps {
  href: string;
  children: React.ReactChild;
}

interface Props {
  team: Team;
  children: React.ReactChild;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const router = useRouter();

  return (
    <li
      className={classNames(
        'govuk-tabs__list-item',
        router.asPath === href && 'govuk-tabs__list-item--selected'
      )}
    >
      <Link href={href} replace={true} scroll={false}>
        <a className="govuk-tabs__tab" data-testid={`navlink_content_${href}`}>
          {children}
        </a>
      </Link>
    </li>
  );
};

const TeamLayout = ({ team, children }: Props): React.ReactElement => {
  const { data: users, error } = useTeamWorkers(team?.id);

  const { data: allocatedTeamData, error: allocatedError } =
    useAllocationsByTeam(team.id, {
      team_allocation_status: 'allocated',
      status: 'open',
    });
  const { data: unallocatedTeamData, error: unallocatedError } =
    useAllocationsByTeam(team.id, {
      team_allocation_status: 'unallocated',
      status: 'open',
    });

  if (!users || !allocatedTeamData || !unallocatedTeamData) {
    return <Spinner />;
  }

  if (error || allocatedError || unallocatedError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <p className="govuk-caption-s">Team</p>
      <h1 className="govuk-!-margin-top-1">{team.name}</h1>

      <div className="govuk-tabs lbh-tabs govuk-!-margin-top-8">
        <ul className="govuk-tabs__list">
          <NavLink href={`/teams/${team.id}`}>
            <>Waiting list ({unallocatedTeamData?.allocations.length})</>
          </NavLink>
          <NavLink href={`/teams/${team.id}/active`}>
            <>Active cases ({allocatedTeamData?.allocations.length})</>
          </NavLink>
          <NavLink href={`/teams/${team.id}/members`}>
            <>Team members {users?.length && `(${users.length})`} </>
          </NavLink>
        </ul>

        <section className="govuk-tabs__panel" id="past-day">
          {children}
        </section>
      </div>
    </>
  );
};
export default TeamLayout;
