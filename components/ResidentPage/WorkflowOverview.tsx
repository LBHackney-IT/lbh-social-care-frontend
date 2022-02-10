import { Workflow } from './types';
import Link from 'next/link';
import WorkflowChunk from './WorkflowChunk';
import s from './WorkflowOverview.module.scss';

interface Props {
  workflows?: Workflow[];
  socialCareId: number;
}

const WorkflowOverview = ({
  workflows,
  socialCareId,
}: Props): React.ReactElement => {
  const mostRecent = workflows?.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  )[0];

  const inProgress = workflows
    ?.filter((w) => !w.submittedAt)
    .filter((w) => w.id !== mostRecent?.id);
  const inProgressCount = (inProgress?.length || 0) - 3;
  const inProgressThree = inProgress?.slice(0, 3);

  return (
    <>
      {mostRecent && (
        <>
          <h3 className="lbh-heading-h5">Most recent</h3>
          <WorkflowChunk workflow={mostRecent} />
        </>
      )}

      {inProgressThree && (
        <>
          <h3 className="lbh-heading-h5">In progress</h3>
          {inProgressThree?.map((w) => (
            <WorkflowChunk workflow={w} key={w.id} />
          ))}
          {inProgressCount && (
            <p className="lbh-body-xs">and {inProgressCount} more</p>
          )}
        </>
      )}

      {/* <h3 className="lbh-heading-h5">Review soon</h3> */}

      <footer className={`lbh-body-s ${s.footer}`}>
        <Link href={`/residents/${socialCareId}/workflows`}>See all</Link>
        <a
          href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}?quick_filter=all&social_care_id=${socialCareId}&touched_by_me=true`}
        >
          See on planner
        </a>
      </footer>
    </>
  );
};

export default WorkflowOverview;
