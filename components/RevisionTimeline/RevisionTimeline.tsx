import { format } from 'date-fns';
import { Submission } from 'data/flexibleForms/forms.types';
import s from './MiniRevisionTimeline.module.scss';

interface Props {
  submission: Submission;
}

const RevisionTimeline = ({ submission }: Props): React.ReactElement | null => {
  // reverse the array so it's in reverse-chronological order and take the three most recent events
  const revisions = Array.from(submission.editHistory).reverse().slice(0, 3);

  return (
    <>
      <h2>History</h2>
      <ol className="lbh-timeline">
        {submission.deleted && (
          <li
            className={`lbh-timeline__event lbh-timeline__event--minor && 'lbh-timeline__event--gap-below'
            }`}
            key={'deleted'}
          >
            <h3 className="lbh-body">
              Deleted by {submission.deletionDetails?.deletedBy}
            </h3>

            {submission.deletionDetails?.deletedAt && (
              <p className="lbh-body-xs">
                {format(
                  new Date(submission.deletionDetails?.deletedAt),
                  'd MMM yyyy K.mm aaa'
                )}
              </p>
            )}
          </li>
        )}
        {submission.panelApprovedAt && (
          <li className={`lbh-timeline__event ${s.approvalEvent}`}>
            <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
              <path
                d="M3 16.4167L10.4286 24L31 3"
                stroke="white"
                strokeWidth="8"
              />
            </svg>
            <h3 className="lbh-body">
              Approved on behalf of panel by {submission.panelApprovedBy?.email}
            </h3>
            <p className="lbh-body-xs">
              {format(
                new Date(submission.panelApprovedAt),
                'd MMM yyyy K.mm aaa'
              )}
            </p>
          </li>
        )}

        {submission.approvedAt && (
          <li className={`lbh-timeline__event ${s.approvalEvent}`}>
            <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
              <path
                d="M3 16.4167L10.4286 24L31 3"
                stroke="white"
                strokeWidth="8"
              />
            </svg>
            <h3 className="lbh-body">
              Approved by {submission.approvedBy?.email}
            </h3>
            <p className="lbh-body-xs">
              {format(new Date(submission.approvedAt), 'd MMM yyyy K.mm aaa')}
            </p>
          </li>
        )}
        {revisions.map((revision, i) => (
          <li
            className={`lbh-timeline__event lbh-timeline__event--minor ${
              i === revisions.length - 1 && 'lbh-timeline__event--gap-below'
            }`}
            key={i}
          >
            <h3 className="lbh-body">Edited by {revision.worker.email}</h3>

            <p className="lbh-body-xs">
              {format(new Date(revision.editTime), 'd MMM yyyy K.mm aaa')}
            </p>
          </li>
        ))}

        <li className="lbh-timeline__event">
          <h3 className="lbh-body">Started by {submission.createdBy.email}</h3>
          <p className="lbh-body-xs">
            {format(new Date(submission.createdAt), 'd MMM yyyy K.mm aaa')}
          </p>
        </li>
      </ol>
    </>
  );
};

export default RevisionTimeline;
