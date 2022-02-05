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
import Link from 'next/link';
import { KeyboardEventHandler, useState } from 'react';
import RemoveCaseNoteDialog from './RemoveCaseNoteDialog';
import { generateInternalLink } from 'utils/urls';

interface SubmissionContentProps {
  submissionId: string;
  deleting: boolean;
  setDeleting: (newValue: boolean) => void;
  socialCareId: number;
}

const SubmissionContent = ({
  submissionId,
  deleting,
  setDeleting,
  socialCareId,
}: SubmissionContentProps) => {
  const { data } = useSubmission(submissionId);

  if (data)
    return (
      <>
        <FlexibleAnswers answers={data.formAnswers} />

        <RemoveCaseNoteDialog
          socialCareId={socialCareId}
          submissionId={submissionId}
          isOpen={deleting}
          onClose={() => setDeleting(false)}
        />
      </>
    );

  return <SummaryListSkeleton />;
};

interface CaseContentProps {
  recordId: string;
  socialCareId: number;
}

const prettyKey = (key: string): string =>
  key.replaceAll('_', ' ').replace(/^\w/, (char) => char.toUpperCase());

const CaseContent = ({ recordId, socialCareId }: CaseContentProps) => {
  const { data } = useCase(recordId, socialCareId);

  if (data)
    return (
      <SummaryList
        rows={Object.fromEntries(
          Object.entries(data.caseFormData || data).map(([key, value]) => [
            prettyKey(key),
            JSON.stringify(value).replaceAll('"', ''),
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

const CaseNoteDialog = ({
  caseNotes,
  socialCareId,
}: Props): React.ReactElement | null => {
  const { query, replace } = useRouter();

  const generateCaseLink = (c: Case): string => {
    if (c.formType === 'flexible-form')
      return `/people/${c.personId}/submissions/${c.recordId}`;
    if (c.caseFormUrl) return c.caseFormUrl;
    const intLink = generateInternalLink(c);

    return intLink || '';
  };

  const [deleting, setDeleting] = useState<boolean>(false);

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

  const handleKeyboardNav: KeyboardEventHandler<HTMLDivElement> = (e) => {
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

  if (note) {
    const link = generateCaseLink(note);

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

        <p className={`lbh-body-xs ${s.actions}`}>
          <button className="lbh-link">Pin to top</button>
          {link && (
            <>
              {' '}
              ·{' '}
              <Link href={link}>
                <a className="lbh-link">Printable version</a>
              </Link>
            </>
          )}
          {note.formType === 'flexible-form' && (
            <>
              {' '}
              ·{' '}
              <button
                className={`lbh-link ${s.deleteButton}`}
                onClick={() => setDeleting(true)}
              >
                Remove
              </button>
            </>
          )}
        </p>

        {note.formType === 'flexible-form' ? (
          <SubmissionContent
            deleting={deleting}
            setDeleting={setDeleting}
            submissionId={note.recordId}
            socialCareId={socialCareId}
          />
        ) : (
          <CaseContent recordId={note.recordId} socialCareId={socialCareId} />
        )}

        <div className={s.keyboardMessage}>
          <p className="lbh-body-s">
            Use <strong>arrow keys</strong> to move through case notes and
            records.
          </p>
          <span>←</span>
          <span>→</span>

          <p className="lbh-body-xs">
            This is {i + 1} of {caseNotes.length}
          </p>
        </div>
      </Dialog>
    );
  }

  return null;
};

export default CaseNoteDialog;
