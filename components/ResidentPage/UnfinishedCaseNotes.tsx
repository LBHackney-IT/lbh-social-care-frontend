import { useUnfinishedSubmissions } from 'utils/api/submissions';
import { useState } from 'react';
import Dialog from '../Dialog/Dialog';
import { generateSubmissionUrl } from '../../lib/submissions';
import Link from 'next/link';
import { formatDate } from '../../utils/date';
import { useWorker } from '../../utils/api/workers';
import { prettyWorkerName } from '../../lib/formatters';

interface Props {
  socialCareId: number;
}

const UnfinishedCaseNotes = ({
  socialCareId,
}: Props): React.ReactElement | null => {
  const { data } = useUnfinishedSubmissions(socialCareId, 1, 9999);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  if (data && data.items.length > 0)
    return (
      <>
        <p>
          There are{' '}
          <button className="lbh-link" onClick={() => setDialogOpen(true)}>
            {data.items.length} unfinished case notes
          </button>{' '}
          for this resident
        </p>
        <Dialog
          isOpen={dialogOpen}
          onDismiss={() => {
            setDialogOpen(false);
          }}
          title="Unfinished case notes"
        >
          <ul>
            {data.items.map((submission) => (
              <Submission
                key={submission.submissionId}
                submission={submission}
              />
            ))}
          </ul>
        </Dialog>
      </>
    );
  return (
    <>
      <p>There are no unfinished case notes for this resident</p>
    </>
  );
};

export const Submission = ({ submission }): React.ReactElement => {
  const { data } = useWorker({
    email: submission.createdBy.email || '',
  });
  const worker = data?.[0];
  return (
    <li key={submission.submissionId}>
      <Link href={generateSubmissionUrl(submission)}>
        {worker ? prettyWorkerName(worker) : submission.createdBy.email} at
        {formatDate(submission.createdAt)}
      </Link>
    </li>
  );
};

export default UnfinishedCaseNotes;
