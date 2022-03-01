import { Case, Resident } from 'types';
import s from './CaseNoteGrid.module.scss';
import CaseNoteTile from './CaseNoteTile';
import { canManageCases } from 'lib/permissions';
import { useAuth } from 'components/UserContext/UserContext';
import CaseNoteDialog from './CaseNoteDialog';

interface Props {
  cases: Case[];
  size?: number;
  setSize?: (newSize: number) => void;
  resident: Resident;
  totalCount: number;
}

const CaseNoteGrid = ({
  cases,
  size,
  setSize,
  resident,
  totalCount,
}: Props): React.ReactElement => {
  const { user } = useAuth();

  if (user && !canManageCases(user, resident))
    return (
      <p className="lbh-body-s">
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
          <p className="lbh-body-xs">
            Showing {cases.length} of {totalCount}
          </p>

          <meter
            className={s.meter}
            value={cases.length}
            max={totalCount}
            aria-hidden="true"
          ></meter>

          {cases.length < totalCount && (
            <button onClick={() => setSize(size + 1)} className="lbh-link">
              Load more
            </button>
          )}
        </footer>
      )}

      <CaseNoteDialog
        socialCareId={resident.id}
        caseNotes={cases}
        totalCount={totalCount}
      />
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
