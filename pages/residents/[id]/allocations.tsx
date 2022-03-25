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
import PriorityDot from 'components/PriorityDot/PriorityDot';

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
              const priorityLevel = (
                <>
                  {a.ragRating ? a.ragRating : 'No priority '}
                  {a.ragRating ? <PriorityDot colour={a.ragRating} /> : <></>}
                  <span style={{ float: 'right' }}>
                    <Link
                      href={`/residents/${resident.id}/allocations/${a.id}/editpriority`}
                    >
                      <a className="lbh-link lbh-link--muted">edit</a>
                    </Link>
                  </span>
                </>
              );

              const workerAllocation = (
                <>
                  {a.allocatedWorker ? (
                    a.allocatedWorker
                  ) : (
                    <Link
                      href={`/residents/${resident.id}/allocations/${a.id}/allocateworker`}
                    >
                      <a className="lbh-link lbh-link--muted">
                        + Add worker for {a.allocatedWorkerTeam}
                      </a>
                    </Link>
                  )}

                  {a.allocatedWorker ? (
                    <span style={{ float: 'right' }}>
                      <Link
                        href={`/residents/${resident.id}/allocations/${a.id}/deallocate?type=worker&allocationStartDate=${a.allocationStartDate}&allocatedWorkerTeam=${a.allocatedWorkerTeam}&allocatedWorker=${a.allocatedWorker}`}
                      >
                        <a className="lbh-link lbh-link--muted">
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
                      : 'Worker Allocation'
                  }
                  link={
                    <Link
                      href={`/residents/${resident.id}/allocations/${a.id}/deallocate?type=team&allocationStartDate=${a.allocationStartDate}&allocatedWorkerTeam=${a.allocatedWorkerTeam}`}
                    >
                      <a className="lbh-link lbh-link--muted">Deallocate</a>
                    </Link>
                  }
                >
                  <SummaryList
                    rows={{
                      'Priority  Level': priorityLevel,
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
