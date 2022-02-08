import { Case, Resident } from 'types';
import s from './CaseNoteGrid.module.scss';
import Link from 'next/link';
import CaseNoteTile from './CaseNoteTile';
import { canManageCases } from 'lib/permissions';
import { useAuth } from 'components/UserContext/UserContext';
import CaseNoteDialog from './CaseNoteDialog';

interface Props {
  cases: Case[];
  size?: number;
  setSize?: (newSize: number) => void;
  resident: Resident;
}

const CaseNoteGrid = ({
  cases,
  size,
  setSize,
  resident,
}: Props): React.ReactElement => {
  const { user } = useAuth();

  if (user && !canManageCases(user, resident))
    return (
      <p>
        You don&apos;t have permission to see this resident&apos;s case notes
        and records.
      </p>
    );

  return (
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

      <CaseNoteDialog socialCareId={resident.id} caseNotes={cases} />
    </>
  );
};

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
