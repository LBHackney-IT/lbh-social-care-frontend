import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Team } from 'types';
import { useTeamWorkers } from 'utils/api/allocatedWorkers';

interface NavLinkProps {
  href: string;
  children: React.ReactChild;
}

interface Props {
  team?: Team;
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
  const { data: users } = useTeamWorkers(team?.id);

  return (
    <>
      <p className="govuk-caption-s">Team</p>
      <h1 className="govuk-!-margin-top-1">{team?.name || 'Unknown team'}</h1>

      {team && (
        <div className="govuk-tabs lbh-tabs govuk-!-margin-top-8">
          <ul className="govuk-tabs__list">
            <NavLink href={`/teams/${team.id}`}>Waiting list</NavLink>
            <NavLink href={`/teams/${team.id}/members`}>
              <>Members {users?.length && `(${users.length})`}</>
            </NavLink>
            <NavLink href={`/teams/${team.id}/allocations`}>
              Allocations
            </NavLink>
          </ul>

          <section className="govuk-tabs__panel" id="past-day">
            {children}
          </section>
        </div>
      )}
    </>
  );
};
export default TeamLayout;
