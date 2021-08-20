import Spinner from 'components/Spinner/Spinner';
import { InProgressSubmission } from 'data/flexibleForms/forms.types';
import { format } from 'date-fns';
import { useSubmission } from 'utils/api/submissions';
import s from './MiniRevisionTimeline.module.scss';

interface Props {
  inProgressSubmission: InProgressSubmission;
}

const RevisionTimeline = ({
  inProgressSubmission,
}: Props): React.ReactElement | null => {
  const {
    data: submission,
    error,
    isValidating,
  } = useSubmission(inProgressSubmission.submissionId);

  // reverse the array so it's in reverse-chronological order and take the three most recent events
  const revisions = Array.from(submission?.editHistory ?? [])
    .reverse()
    .slice(0, 3);
  if (error) {
    return <p>Error fetching submission edit history</p>;
  }
  if (isValidating) {
    return <Spinner />;
  }
  return (
    <ol className={`lbh-timeline ${s.timeline}`}>
      {revisions.map((revision, i) => (
        <li
          className={`lbh-timeline__event lbh-timeline__event--minor ${s.event}`}
          key={i}
        >
          <h3 className="lbh-body-s">{revision.worker.email}</h3>

          <p className="lbh-body-xs">
            {format(new Date(revision.editTime), 'd MMM yyyy K.mm aaa')}
          </p>
        </li>
      ))}
    </ol>
  );
};

export default RevisionTimeline;
