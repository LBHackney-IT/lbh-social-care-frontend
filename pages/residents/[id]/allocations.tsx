import Collapsible, {
  CollapsibleSkeleton,
} from 'components/ResidentPage/Collapsible';
import Layout from 'components/ResidentPage/Layout';
import { getResident } from 'lib/residents';
import { GetServerSideProps } from 'next';
import { Resident, Allocation } from 'types';
import { useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import { isAuthorised } from 'utils/auth';
import Link from 'next/link';
import SummaryList, {
  SummaryListSkeleton,
} from 'components/ResidentPage/SummaryList';
import { formatDate } from 'utils/date';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import PriorityRating from 'components/PriorityRating/PriorityRating';

interface Props {
  resident: Resident;
}

const AllocationsPage = ({ resident }: Props): React.ReactElement => {
  const { data, error } = useAllocatedWorkers(resident.id);

  const allocationsToShow = data?.allocations && data.allocations.length > 0;

  const allocateButton = (
    <Link href={`/residents/${resident.id}/allocations/add`}>
      <a className="govuk-button lbh-button lbh-button--secondary lbh-button--add">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M6.94 0L5 0V12H6.94V0Z" />
          <path d="M12 5H0V7H12V5Z" />
        </svg>
        Allocate a team/worker
      </a>
    </Link>
  );

  return (
    <Layout resident={resident} title="Allocations">
      <>
        {!data && !error ? (
          <CollapsibleSkeleton>
            <SummaryListSkeleton />
          </CollapsibleSkeleton>
        ) : allocationsToShow ? (
          <>
            {data.allocations?.map((a: Allocation) => {
              const workerAllocation = (
                <>
                  {a.allocatedWorker ? (
                    a.allocatedWorker
                  ) : (
                    <Link
                      href={`/residents/${resident.id}/allocations/${a.id}/allocateworker?teamAllocationStartDate=${a.allocationStartDate}&teamId=${a.allocatedWorkerTeamId}`}
                    >
                      <a className="lbh-link lbh-link--no-visited-state">
                        + Add worker
                        {a.allocatedWorkerTeam
                          ? ` for ${a.allocatedWorkerTeam}`
                          : ''}
                      </a>
                    </Link>
                  )}

                  {a.allocatedWorker && a.allocatedWorkerTeam ? (
                    <span style={{ float: 'right', marginRight: '-18px' }}>
                      <Link
                        href={`/residents/${resident.id}/allocations/${
                          a.id
                        }/deallocate?type=worker&allocationStartDate=${
                          a.allocationStartDate
                        }&allocatedWorker=${a.allocatedWorker}${
                          a.allocatedWorkerTeam
                            ? `&allocatedWorkerTeam=${a.allocatedWorkerTeam}`
                            : ''
                        }`}
                      >
                        <a
                          id={`${a.allocatedWorkerTeam}_deallocateWorker`}
                          className="lbh-link lbh-link--muted"
                        >
                          Deallocate worker
                        </a>
                      </Link>
                    </span>
                  ) : (
                    <></>
                  )}
                </>
              );

              return (
                <Collapsible
                  key={a.id}
                  title={
                    a.allocatedWorkerTeam
                      ? `Team allocation: ${a.allocatedWorkerTeam}`
                      : `Worker Allocation: ${a.allocatedWorker}`
                  }
                  link={
                    <Link
                      href={`/residents/${resident.id}/allocations/${a.id}/deallocate?type=team&allocationStartDate=${a.allocationStartDate}&allocatedWorkerTeam=${a.allocatedWorkerTeam}`}
                    >
                      <a
                        className="lbh-link lbh-link--muted"
                        id={`${
                          a.allocatedWorkerTeam && a.allocatedWorkerTeam
                        }_deallocate`}
                      >
                        Deallocate
                      </a>
                    </Link>
                  }
                >
                  <SummaryList
                    rows={{
                      'Priority  Level': (
                        <PriorityRating resident={resident} allocation={a} />
                      ),
                      'Date allocated to team': `${formatDate(
                        a.allocationStartDate
                      )} — ${
                        a.allocationEndDate
                          ? formatDate(a.allocationEndDate)
                          : 'present'
                      }`,
                      Worker: workerAllocation,
                    }}
                  />
                </Collapsible>
              );
            })}
            {allocateButton}
          </>
        ) : error ? (
          <ErrorMessage />
        ) : (
          <p>
            No one is allocated to this resident yet.
            <br />
            {allocateButton}
          </p>
        )}
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const user = isAuthorised(req);

  // redirect unauthorised users to login
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: `/login`,
      },
    };
  }

  const resident = await getResident(Number(params?.id), user);
  // does the resident exist?
  if (!resident.id) {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  return {
    props: {
      resident,
    },
  };
};

export default AllocationsPage;
