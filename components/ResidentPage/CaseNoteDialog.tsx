import Dialog from 'components/Dialog/Dialog';
import {
  prettyCaseDate,
  prettyCaseTitle,
  prettyWorkerName,
} from 'lib/formatters';
import { useRouter } from 'next/router';
import { Case } from 'types';
import { useWorker } from 'utils/api/workers';
import SummaryList, { SummaryListSkeleton } from './SummaryList';
import s from './CaseNoteDialog.module.scss';
import { useCase } from 'utils/api/cases';
import { useSubmission } from 'utils/api/submissions';
import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';

interface SubmissionContentProps {
  submissionId: string;
}

const SubmissionContent = ({ submissionId }: SubmissionContentProps) => {
  const { data } = useSubmission(submissionId);

  if (data) return <FlexibleAnswers answers={data.formAnswers} />;

  return <SummaryListSkeleton />;
};

interface CaseContentProps {
  recordId: string;
  socialCareId: number;
}

const CaseContent = ({ recordId, socialCareId }: CaseContentProps) => {
  const { data } = useCase(recordId, socialCareId);

  if (data)
    return (
      <SummaryList
        rows={Object.fromEntries(
          Object.entries(data.caseFormData || data).map(([key, value]) => [
            key,
            JSON.stringify(value),
          ])
        )}
      />
    );

  return <SummaryListSkeleton />;
};

interface Props {
  caseNotes: Case[];
  socialCareId: number;
}

const CaseNoteDialog = ({ caseNotes }: Props): React.ReactElement | null => {
  const { query, replace } = useRouter();

  const handleClose = () =>
    replace(window.location.pathname, undefined, {
      scroll: false,
    });

  const selectedId = query['case_note'];
  const i = caseNotes.findIndex((c) => c.recordId === selectedId);
  const note = caseNotes[i];

  const { data: workerData } = useWorker({
    email: note?.officerEmail || '',
  });
  const worker = workerData?.[0];

  const handleKeyboardNav = (e: KeyboardEvent) => {
    let newId;
    if (e.key === 'ArrowLeft') {
      newId = caseNotes?.[i - 1]?.recordId; // previous/newer note
    }
    if (e.key === 'ArrowRight') {
      if (caseNotes.length > i) {
        newId = caseNotes?.[i + 1]?.recordId; // next/older note
      }
    }
    if (newId)
      replace(`${window.location.pathname}?case_note=${newId}`, undefined, {
        scroll: false,
      });
  };

  if (note)
    return (
      <Dialog
        title={prettyCaseTitle(note)}
        isOpen={!!query['case_note']}
        onDismiss={handleClose}
        onKeyUp={handleKeyboardNav}
      >
        <p className="lbh-body-s">
          Added {prettyCaseDate(note)} by{' '}
          {worker ? prettyWorkerName(worker) : note.officerEmail}
        </p>

        <p className={`lbh-body-s ${s.actions}`}>
          <button className="lbh-link lbh-link--danger">Remove</button> ·{' '}
          <button className="lbh-link lbh-link--muted">Pin to top</button>
        </p>

        {note.formType === 'flexible-form' ? (
          <SubmissionContent submissionId={note.recordId} />
        ) : (
          <CaseContent recordId={note.recordId} socialCareId={note.personId} />
        )}

        <div className={s.keyboardMessage}>
          <p className="lbh-body-s">
            Use <strong>arrow keys</strong> to move through case notes and
            records.
          </p>
          <span>←</span>
          <span>→</span>
        </div>
      </Dialog>
    );

  return null;
};

export default CaseNoteDialog;
