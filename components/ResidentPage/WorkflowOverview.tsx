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
    .filter((w) => w.id !== mostRecent?.id); // exclude most recent workflow

  return (
    <>
      <div className="govuk-grid-row">
        {inProgress && (
          <div className="govuk-grid-column-one-half">
            <h3 className="lbh-heading-h5">In progress</h3>
            {inProgress.slice(0, 3)?.map((w) => (
              <WorkflowChunk workflow={w} key={w.id} />
            ))}
            {inProgress.length > 3 && (
              <p className="lbh-body-xs govuk-!-margin-top-2">
                and {inProgress.length - 3} more
              </p>
            )}
          </div>
        )}

        {mostRecent && (
          <div className="govuk-grid-column-one-half">
            <h3 className="lbh-heading-h5">Most recent</h3>
            <WorkflowChunk workflow={mostRecent} />
          </div>
        )}
      </div>

      {/* <h3 className="lbh-heading-h5">Review soon</h3> */}

      <footer className={`lbh-body-s ${s.footer}`}>
        <Link href={`/residents/${socialCareId}/workflows`}>
          <a>See all{workflows && ` ${workflows.length} workflows`}</a>
        </Link>
        <a
          href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}?quick_filter=all&social_care_id=${socialCareId}`}
        >
          See on planner
        </a>
      </footer>
    </>
  );
};

export default WorkflowOverview;
