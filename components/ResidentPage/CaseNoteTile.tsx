import {
  prettyCaseDate,
  prettyCaseTitle,
  prettyWorkerName,
  tidyText,
} from 'lib/formatters';
import { Case } from 'types';
import s from './CaseNoteGrid.module.scss';
import Link from 'next/link';
import { truncate } from 'lib/utils';
import React from 'react';
import { useWorker } from 'utils/api/workers';
import cx from 'classnames';
import { useSubmission } from 'utils/api/submissions';
import WorkflowInfoBadge from './WorkflowInfoBadge';

const prettyLink = (c: Case): string => {
  if (c?.caseFormData?.workflowId)
    return `${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}/workflows/${c.caseFormData.workflowId}`;
  return `${window.location.pathname}?case_note=${c.recordId}`;
};

interface TileProps {
  c: Case;
}

interface SubmissionPreviewProps {
  submissionId: string;
}

const SubmissionPreview = ({ submissionId }: SubmissionPreviewProps) => {
  const { data } = useSubmission(submissionId);

  const text = data?.formAnswers?.['singleStep']?.['Body'];

  if (text)
    return (
      <div aria-hidden="true" className={s.preview}>
        {truncate(tidyText(text as string), 20)}
      </div>
    );

  return null;
};

const CaseNoteTile = ({ c }: TileProps): React.ReactElement => {
  const isWorkflow = c?.caseFormData?.workflowId;

  const { data } = useWorker({
    email: c.officerEmail || '',
  });

  const worker = data?.[0];

  return (
    <li
      key={c.recordId}
      className={cx(s.tile, c.pinnedAt && s.pinned, isWorkflow && s.workflow)}
    >
      <p className="lbh-body-xs">
        {prettyCaseDate(c)}
        {isWorkflow && ` · Workflow`}
        {c.pinnedAt && ` · Pinned`}
      </p>
      <h2 className="lbh-heading-h4 govuk-!-margin-bottom-0">
        <Link href={prettyLink(c)} scroll={false}>
          <a className="lbh-link lbh-link--no-visited-state">
            {prettyCaseTitle(c)}
          </a>
        </Link>
      </h2>

      <WorkflowInfoBadge workflowId={c?.caseFormData?.workflowId} />
      {c.formType === 'flexible-form' && (
        <SubmissionPreview submissionId={c.recordId} />
      )}

      {c.officerEmail && (
        <p className="lbh-body-xs">
          By {worker ? prettyWorkerName(worker) : c.officerEmail}
        </p>
      )}
    </li>
  );
};

export default CaseNoteTile;
