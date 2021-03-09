import { useWarningNotes } from '../../utils/api/warningNotes';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { WarningNote } from 'types';
import Link from 'next/link';

const WarningBox = ({ notes }: { notes: WarningNote[] }) => {
  return (
    <dl className="govuk-summary-list govuk-summary-list--no-border">
      <div
        className="govuk-error-summary"
        aria-labelledby="error-summary-title"
        role="alert"
        tabIndex={-1}
        data-module="govuk-error-summary"
      >
        <h2
          className="govuk-error-summary__title"
          id="error-summary-title"
        ></h2>
        <div className="govuk-error-summary__body">
          <h2 className="govuk-error-summary__title" id="error-summary-title">
            WARNING NOTE
          </h2>
        </div>
        <div>
          <div className="govuk-error-summary__body">
            {notes.map((note) => (
              <div
                key="margin"
                style={{
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link href="people/:peopleId/warning-notes/:warningNoteId">
                    <a
                      style={{
                        textDecoration: 'underline',
                      }}
                      className="govuk-link"
                    >
                      {' '}
                      Review /end
                    </a>
                  </Link>
                </div>

                {note.type && (
                  <div
                    className="govuk-summary-list__row"
                    style={{ textAlign: 'left' }}
                  >
                    <dt className="govuk-summary-list__key" key={note.type}>
                      Type
                    </dt>
                    <dd className="govuk-summary-list__value">{note.type}</dd>
                  </div>
                )}
                {note.createdDate && (
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Start Date</dt>
                    <dd className="govuk-summary-list__value">
                      {new Date(note.createdDate).toLocaleDateString('en-GB')}
                      created by {note.createdBy}
                    </dd>
                  </div>
                )}
                {note.reviewedDate && (
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Review Date</dt>
                    <dd
                      className="govuk-summary-list__value"
                      style={{ marginTop: '2rem' }}
                    >
                      {new Date(note.reviewedDate).toLocaleDateString('en-GB')}
                    </dd>
                  </div>
                )}
              </div>
            ))}
            <p style={{ marginTop: '2rem' }}>
              {' '}
              For further information see Warning Note in Records History
            </p>
          </div>
        </div>
      </div>
    </dl>
  );
};

const WarningNotes = ({ id }: { id: number }) => {
  const { data: warningNotes, error } = useWarningNotes(id);
  if (error) {
    return <ErrorMessage />;
  }
  if (!warningNotes || warningNotes.length === 0) {
    return null;
  }
  return <WarningBox notes={warningNotes} />;
};

export default WarningNotes;
