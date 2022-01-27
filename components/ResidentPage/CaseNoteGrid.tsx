import { prettyCaseDate, prettyCaseTitle } from 'lib/formatters';
import { Case } from 'types';
import s from './CaseNoteGrid.module.scss';
import Link from 'next/link';
import { truncate } from 'lib/utils';
import React from 'react';

interface TileProps {
  c: Case;
}

const CaseNoteTile = ({ c }: TileProps) => (
  <li key={c.recordId} className={s.tile}>
    <p className="lbh-body-xs">{prettyCaseDate(c)}</p>
    <h2 className="lbh-heading-h4">
      <Link href="#">
        <a>{prettyCaseTitle(c)}</a>
      </Link>
    </h2>

    <div aria-hidden="true" className={s.preview}>
      {c?.caseFormData?.case_note_description &&
        truncate(c.caseFormData.case_note_description || '', 20)}
    </div>

    <p className="lbh-body-xs">By {c.officerEmail}</p>
  </li>
);

interface Props {
  cases: Case[];
}

const CaseNoteGrid = ({ cases }: Props): React.ReactElement => (
  <ul className={s.grid}>
    {cases?.map((c) => (
      <CaseNoteTile key={c.recordId} c={c} />
    ))}
  </ul>
);

const CaseTileSkeleton = () => (
  <div className={s.tileSkeleton}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export const CaseNoteGridSkeleton = (): React.ReactElement => (
  <div className={s.grid} aria-label="Loading...">
    <CaseTileSkeleton />
    <CaseTileSkeleton />
    <CaseTileSkeleton />
    <CaseTileSkeleton />
    <CaseTileSkeleton />
    <CaseTileSkeleton />
  </div>
);

export default CaseNoteGrid;
