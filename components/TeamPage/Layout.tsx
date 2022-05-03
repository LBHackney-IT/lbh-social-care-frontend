import Link from 'next/link';
import { useRouter } from 'next/router';
import { Team, Allocation } from 'types';
import {
  useTeamWorkers,
  useAllocationsByTeam,
} from 'utils/api/allocatedWorkers';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import s from './Layout.module.scss';
import cx from 'classnames';

interface Props {
  team: Team;
  children: React.ReactChild;
}

const TeamLayout = ({ team, children }: Props): React.ReactElement => {
  const { pathname } = useRouter();

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

  const allocated = [] as Allocation[];
  const totalAllocated =
    allocatedTeamData[0] && allocatedTeamData[0].totalCount;
  const totalUnallocated =
    unallocatedTeamData[0] && unallocatedTeamData[0].totalCount;

  for (
    let i = 0;
    allocatedTeamData !== undefined && i < allocatedTeamData.length;
    i++
  ) {
    allocated.push(...allocatedTeamData[i].allocations);
  }
  const unallocated = [] as Allocation[];
  for (
    let i = 0;
    unallocatedTeamData !== undefined && i < unallocatedTeamData.length;
    i++
  ) {
    unallocated.push(...unallocatedTeamData[i].allocations);
  }

  return (
    <div className="govuk-breadcrumbs lbh-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        <li className="govuk-breadcrumbs__list-item">
          <a
            className={`lbh-link lbh-link--no-visited-state ${s.link}`}
            href="/teams"
          >
            Teams
          </a>
        </li>
        <li className="govuk-breadcrumbs__list-item">{team.name}</li>
      </ol>
      <h1 className="govuk-!-margin-top-1 govuk-!-margin-bottom-7">
        {team.name}
      </h1>

      <div className="govuk-tabs lbh-tabs">
        <ul className={s.tabList}>
          <li
            key={'waitinglist'}
            className={cx('lbh-body', s.tab, {
              [s.active]: !(
                pathname.includes('active') || pathname.includes('members')
              ),
            })}
          >
            <Link href={`/teams/${team.id}`} scroll={false}>
              <a className={`lbh-link lbh-link--no-visited-state ${s.link}`}>
                Waiting list {totalUnallocated && `(${totalUnallocated})`}
              </a>
            </Link>
          </li>
          <li
            key={'active'}
            className={cx('lbh-body', s.tab, {
              [s.active]: pathname.includes('active'),
            })}
          >
            <Link href={`/teams/${team.id}/active`} scroll={false}>
              <a className={`lbh-link lbh-link--no-visited-state ${s.link}`}>
                Active cases {totalAllocated && `(${totalAllocated})`}
              </a>
            </Link>
          </li>

          <li
            key={'members'}
            className={cx('lbh-body', s.tab, {
              [s.active]: pathname.includes('members'),
            })}
          >
            <Link href={`/teams/${team.id}/members`} scroll={false}>
              <a className={`lbh-link lbh-link--no-visited-state ${s.link}`}>
                Team members {users?.length && `(${users.length})`}
              </a>
            </Link>
          </li>
        </ul>

        <section id="past-day" style={{ marginTop: '0px', paddingTop: '0px' }}>
          {children}
        </section>
      </div>
    </div>
  );
};
export default TeamLayout;
