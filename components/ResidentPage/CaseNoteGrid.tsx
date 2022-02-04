import { Case } from 'types';
import s from './CaseNoteGrid.module.scss';
import Link from 'next/link';
import CaseNoteTile from './CaseNoteTile';

interface Props {
  cases: Case[];
  size?: number;
  setSize?: (newSize: number) => void;
}

const CaseNoteGrid = ({ cases, size, setSize }: Props): React.ReactElement => (
  <>
    <ul className={s.grid}>
      {cases?.map((c) => (
        <CaseNoteTile key={c.recordId} c={c} />
      ))}
    </ul>

    {size && setSize && (
      <footer className={s.footer}>
        <button
          onClick={() => setSize(size + 1)}
          className="govuk-button lbh-button"
        >
          Load more
        </button>
        <p className="lbh-body-s">
          Looking for something specific? Try{' '}
          <Link href="/search">
            <a className="lbh-link lbh-link--no-visited-state">
              searching for it
            </a>
          </Link>
          .
        </p>
      </footer>
    )}
  </>
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
