import { render, screen } from '@testing-library/react';
import {
  mockedCaseNote,
  mockedWarningNoteCase,
  mockedDeletedCaseNote,
} from 'factories/cases';
import { AppConfigProvider } from 'lib/appConfig';
import Event from './Event';

describe('Event', () => {
  it('renders the right info for a form wizard case note', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Event event={mockedCaseNote} />
      </AppConfigProvider>
    );

    expect(screen.getAllByRole('heading').length).toBe(1);
    expect(screen.getAllByRole('link').length).toBe(1);

    expect(screen.getByText('foorm'));
    expect(screen.getByText('i am a case title', { exact: false }));
    expect(screen.getByText('25 Oct 2020 1.49 pm', { exact: false }));
    expect(screen.getByText('Fname.Lname@hackney.gov.uk', { exact: false }));
  });

  it('renders the right info for a warning note', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Event event={mockedWarningNoteCase} />
      </AppConfigProvider>
    );

    expect(screen.getAllByRole('heading').length).toBe(1);
    expect(screen.getAllByRole('link').length).toBe(1);

    expect(screen.getByText('Warning Note'));
    expect(screen.getByText('25 Oct 2020 1.49 pm', { exact: false }));
    expect(screen.getByText('Fname.Lname@hackney.gov.uk', { exact: false }));
  });
  it('renders the right info for a deleted case note', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Event event={mockedDeletedCaseNote} />
      </AppConfigProvider>
    );

    expect(screen.getAllByRole('heading').length).toBe(1);
    expect(screen.getAllByRole('link').length).toBe(1);

    expect(screen.queryByText('deleted 31 Dec 2020')).toBeInTheDocument;
    expect(screen.queryByText('Some reason')).toBeInTheDocument;
    expect(screen.queryByText('requested by Some people')).not
      .toBeInTheDocument;
  });

  it('generates and truncates a snippet for form wizard case notes', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Event
          event={{
            ...mockedWarningNoteCase,
            caseFormData: {
              ...mockedWarningNoteCase.caseFormData,
              case_note_title: 'my title here',
              case_note_description:
                'my description here my description here my description here',
            },
          }}
        />
      </AppConfigProvider>
    );
    expect(
      screen.getByText(
        'my title here: my description here my description here my...',
        {
          exact: false,
        }
      )
    );
  });

  it('marks google docs', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <Event
          event={{
            ...mockedWarningNoteCase,
            caseFormUrl: 'google.com/123',
          }}
        />
      </AppConfigProvider>
    );
    expect(screen.getByText('Google document', { exact: false }));
  });
});
