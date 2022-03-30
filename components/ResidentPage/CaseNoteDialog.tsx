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
import { useCase, useCases, useHistoricCaseNote } from 'utils/api/cases';
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

interface HistoricContentProps {
  recordId: string;
}

const prettyKey = (key: string): string =>
  key?.replace(/_/g, ' ')?.replace(/^\w/, (char) => char.toUpperCase());

const PrettyValue = ({ value }: { value: string }): React.ReactElement => {
  if (
    // detect urls
    // eslint-disable-next-line no-useless-escape
    /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi.test(
      value
    )
  )
    return <a href={value}>{value}</a>;

  return <>{JSON.stringify(value).replace(/"/g, '')}</>;
};

const HistoricCaseContent = ({ recordId }: HistoricContentProps) => {
  const { data } = useHistoricCaseNote(recordId);

  if (data)
    return (
      <SummaryList
        rows={Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            prettyKey(key),
            JSON.stringify(value).replace(/"/g, ''),
          ])
        )}
      />
    );

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
      <dl className={`govuk-summary-list lbh-summary-list ${s.summaryList}`}>
        {Object.entries(data?.caseFormData || data).map(([key, value]) => (
          <div key={key} className="govuk-summary-list__row lbh-body-s">
            <dt className="govuk-summary-list__key">{prettyKey(key)}</dt>
            <dd className="govuk-summary-list__value">
              <PrettyValue value={value} />
            </dd>
          </div>
        ))}
      </dl>
    );

  return <SummaryListSkeleton />;
};

interface Props {
  caseNotes: Case[];
  socialCareId: number;
  totalCount: number;
}

const CaseNoteDialog = ({
  caseNotes,
  socialCareId,
  totalCount,
}: Props): React.ReactElement | null => {
  const { query, replace } = useRouter();

  const { mutate } = useCases({
    mosaic_id: socialCareId,
    exclude_audit_trail_events: true,
    pinned_first: true,
  });

  const generateCaseLink = (c: Case): string => {
    if (c.formType === 'flexible-form')
      return `/people/${c.personId}/submissions/${c.recordId}`;
    if (c.caseFormUrl) return c.caseFormUrl;
    const intLink = generateInternalLink(c);

    return intLink || '';
  };

  const [deleting, setDeleting] = useState<boolean>(false);

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

  const handleClose = () =>
    replace(window.location.pathname, undefined, {
      scroll: false,
    });

  const pinOrUnpin = async () => {
    await fetch(`/api/submissions/${note.recordId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        pinnedAt: note.pinnedAt ? '' : new Date().toISOString(),
      }),
    });
    mutate();
  };

  if (note) {
    const link = generateCaseLink(note);
    const isWorkflow = note?.caseFormData?.workflowId;

    return (
      <Dialog
        title={prettyCaseTitle(note)}
        isOpen={!!query['case_note']}
        onDismiss={handleClose}
        onKeyUp={handleKeyboardNav}
        className={s.dialog}
      >
        <p className="lbh-body-s">
          {note.pinnedAt && `Pinned · `}
          Added {prettyCaseDate(note)} by{' '}
          {worker ? prettyWorkerName(worker) : note.officerEmail}
        </p>

        <p className={`lbh-body-xs ${s.actions}`}>
          {isWorkflow ? (
            <Link
              href={`${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/workflows/${note.caseFormData.workflowId}`}
            >
              Go to workflow
            </Link>
          ) : (
            link && (
              <>
                <Link href={link}>
                  <a className="lbh-link">Printable version</a>
                </Link>
              </>
            )
          )}

          {note.formType === 'flexible-form' && (
            <>
              {' '}
              ·{' '}
              <button className="lbh-link" onClick={pinOrUnpin}>
                {note.pinnedAt ? 'Unpin from top' : 'Pin to top'}
              </button>{' '}
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
        ) : isWorkflow ? (
          <></>
        ) : note?.caseFormData?.is_historical ? (
          <HistoricCaseContent recordId={note.recordId} />
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
            This is {i + 1} of {totalCount}
          </p>
        </div>
      </Dialog>
    );
  }

  return null;
};

export default CaseNoteDialog;
