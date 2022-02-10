import { WarningNote } from 'types';
import { useWarningNotes } from 'utils/api/warningNotes';
import Link from 'next/link';
import { canManageCases } from 'lib/permissions';
import { useAuth } from 'components/UserContext/UserContext';
import { useResident } from 'utils/api/residents';
import { useWorker } from 'utils/api/workers';
import { prettyWorkerName } from 'lib/formatters';
import { formatDate } from 'utils/date';
import s from './WarningNotes.module.scss';

interface WarningNoteProps {
  note: WarningNote;
  socialCareId: number;
}

const WarningNoteAnnouncement = ({ note, socialCareId }: WarningNoteProps) => {
  const { user } = useAuth();
  const { data: resident } = useResident(socialCareId);
  const { data: workers } = useWorker({
    email: note.createdBy,
  });
  const worker = workers?.[0];

  return (
    <section className="lbh-page-announcement lbh-page-announcement--warning">
      <h3 className="lbh-page-announcement__title lbh-heading-h5">
        Warning: <span className={s.warning}>{note.noteType}</span>
      </h3>
      <div className="lbh-page-announcement__content">
        <p className="lbh-body-xs">
          Added {formatDate(note.startDate)} by{' '}
          {worker && prettyWorkerName(worker)}
          {note.reviewDate && ` · Last reviewed ${formatDate(note.reviewDate)}`}
          {user && resident && canManageCases(user, resident) && (
            <>
              {' '}
              ·{' '}
              <Link href={`/people/${socialCareId}/warning-notes/${note.id}`}>
                <a className="govuk-link lbh-link">Review or end</a>
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
};

interface Props {
  socialCareId: number;
}

const WarningNotes = ({ socialCareId }: Props): React.ReactElement | null => {
  const { data } = useWarningNotes(socialCareId);

  if (data && data.length > 0)
    return (
      <>
        {data?.map((note) => (
          <WarningNoteAnnouncement
            note={note}
            key={note.id}
            socialCareId={socialCareId}
          />
        ))}
      </>
    );

  return null;
};

export default WarningNotes;
