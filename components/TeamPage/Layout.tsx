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
    <div className="govuk-breadcrumbs lbh-breadcrumbs lbh-container">
      <ol className="govuk-breadcrumbs__list">
        <li className="govuk-breadcrumbs__list-item">
          <a className="govuk-breadcrumbs__link" href="/teams">
            Teams
          </a>
        </li>
        <li className="govuk-breadcrumbs__list-item">{team.name}</li>
      </ol>
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

        <section
          id="past-day"
          className="govuk-tabs__panel"
          style={{ paddingTop: '0px' }}
        >
          {children}
        </section>
      </div>
    </div>
  );
};
export default TeamLayout;
