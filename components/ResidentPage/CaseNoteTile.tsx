import {
  prettyCaseDate,
  prettyCaseTitle,
  prettyWorkerName,
} from 'lib/formatters';
import { Case } from 'types';
import s from './CaseNoteGrid.module.scss';
import Link from 'next/link';
import { truncate } from 'lib/utils';
import React from 'react';
import { useWorker } from 'utils/api/workers';

interface TileProps {
  c: Case;
}

const CaseNoteTile = ({ c }: TileProps): React.ReactElement => {
  const { data } = useWorker({
    email: c.officerEmail || '',
  });

  const worker = data?.[0];

  return (
    <li key={c.recordId} className={s.tile}>
      <p className="lbh-body-xs">{prettyCaseDate(c)}</p>
      <h2 className="lbh-heading-h4">
        <Link
          href={`${window.location.pathname}?case_note=${c.recordId}`}
          scroll={false}
        >
          <a className="lbh-link lbh-link--no-visited-state">
            {prettyCaseTitle(c)}
          </a>
        </Link>
      </h2>

      <div aria-hidden="true" className={s.preview}>
        {c?.caseFormData?.case_note_description &&
          truncate(c?.caseFormData?.case_note_description || '', 20)}
      </div>

      {c.officerEmail && (
        <p className="lbh-body-xs">
          By {worker ? prettyWorkerName(worker) : c.officerEmail}
        </p>
      )}
    </li>
  );
};

export default CaseNoteTile;
