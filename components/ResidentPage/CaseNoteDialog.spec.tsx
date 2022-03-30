import { fireEvent, render, screen } from '@testing-library/react';
import { mockedCaseNote } from 'factories/cases';
import { mockSubmission } from 'factories/submissions';
import CaseNoteDialog from './CaseNoteDialog';
import { useRouter } from 'next/router';
import { useCase, useCases, useHistoricCaseNote } from 'utils/api/cases';
import { useSubmission } from 'utils/api/submissions';
import { mockedHistoricCaseNote } from 'fixtures/cases.fixtures';
import { Case } from 'types';

jest.mock('next/router');
jest.mock('utils/api/cases');
jest.mock('utils/api/submissions');

(useRouter as jest.Mock).mockReturnValue({
  query: {},
});
(useCases as jest.Mock).mockReturnValue({
  mutate: jest.fn(),
});
(useCase as jest.Mock).mockReturnValue({
  data: mockedCaseNote,
});
(useHistoricCaseNote as jest.Mock).mockReturnValue({
  data: mockedHistoricCaseNote,
});
(useSubmission as jest.Mock).mockReturnValue({
  data: {
    ...mockSubmission,
    id: mockedCaseNote.recordId,
    formAnswers: {
      foo: {
        one: 'two',
        three: 'four',
      },
    },
  },
});

describe('CaseNoteDialog', () => {
  it('renders nothing when there is no matching record ID in the URL query', () => {
    render(
      <CaseNoteDialog
        totalCount={1}
        caseNotes={[mockedCaseNote]}
        socialCareId={123}
      />
    );
    expect(screen.queryByText('Close')).toBeNull();
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('renders an old-style case note (record/case) correctly', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        case_note: mockedCaseNote.recordId,
      },
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        caseNotes={[mockedCaseNote]}
        socialCareId={123}
      />
    );

    expect(screen.getByText('foorm'));
    expect(screen.getByText('Added 25 Oct 2020 by Fname.Lname@hackney.gov.uk'));

    expect(screen.queryByText('Remove')).toBeNull();
    expect(screen.queryByText('Pin to top')).toBeNull();
    expect(screen.getByText('Printable version'));

    expect(screen.getAllByRole('term').length).toBe(11);
    expect(screen.getAllByRole('definition').length).toBe(11);

    expect(screen.getByText('Context flag'));
    expect(screen.getByText('Date of event'));
  });

  it('turns google doc urls into links', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        case_note: mockedCaseNote.recordId,
      },
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        caseNotes={[
          {
            ...mockedCaseNote,
            caseFormData: {
              form_url: 'http://example.com/foo',
            },
          } as Case,
        ]}
        socialCareId={123}
      />
    );

    expect(screen.getByRole('link'));
  });

  it('renders a new-style case note (submission/flexible-form) correctly', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        case_note: mockedCaseNote.recordId,
      },
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        socialCareId={123}
        caseNotes={[
          {
            ...mockedCaseNote,
            formType: 'flexible-form',
          },
        ]}
      />
    );

    expect(screen.getByText('Form'));
    expect(screen.getByText('Added 25 Oct 2020 by Fname.Lname@hackney.gov.uk'));
    expect(screen.getByText('Remove'));
    expect(screen.getByText('Pin to top'));
    expect(screen.getByText('Printable version'));

    expect(screen.getAllByRole('term').length).toBe(2);
    expect(screen.getAllByRole('definition').length).toBe(2);
  });

  it('renders a historic case note correctly', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        case_note: mockedCaseNote.recordId,
      },
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        socialCareId={123}
        caseNotes={[
          {
            ...mockedCaseNote,
            caseFormData: {
              ...mockedCaseNote.caseFormData,
              is_historical: true,
            },
          },
        ]}
      />
    );

    expect(screen.getByRole('heading', { name: 'foorm' }));
    expect(screen.getByText(/Added 25 Oct 2020 by Fname.Lname@hackney.gov.uk/));

    expect(screen.getAllByRole('term').length).toBe(6);
    expect(screen.getAllByRole('definition').length).toBe(6);
  });

  it('can be navigate to an older note by keyboard', () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        case_note: 'abc',
      },
      replace: mockReplace,
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        socialCareId={123}
        caseNotes={[
          {
            ...mockedCaseNote,
            recordId: 'abc',
          },
          {
            ...mockedCaseNote,
            recordId: 'def',
          },
        ]}
      />
    );
    fireEvent.keyUp(screen.getByRole('dialog'), { key: 'ArrowRight' });

    expect(mockReplace).toBeCalledWith(
      '/?case_note=def',
      undefined,
      expect.anything()
    );
  });

  it('can be navigate to a newer note by keyboard', () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        case_note: 'def',
      },
      replace: mockReplace,
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        socialCareId={123}
        caseNotes={[
          {
            ...mockedCaseNote,
            recordId: 'abc',
          },
          {
            ...mockedCaseNote,
            recordId: 'def',
          },
        ]}
      />
    );
    fireEvent.keyUp(screen.getByRole('dialog'), { key: 'ArrowLeft' });

    expect(mockReplace).toBeCalledWith(
      '/?case_note=abc',
      undefined,
      expect.anything()
    );
  });

  it('updates the url when closed', () => {
    const mockReplace = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      query: {
        case_note: mockedCaseNote.recordId,
      },
      replace: mockReplace,
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        socialCareId={123}
        caseNotes={[mockedCaseNote]}
      />
    );
    fireEvent.click(screen.getByText('Close'));
    expect(mockReplace).toBeCalledWith(expect.anything(), undefined, {
      scroll: false,
    });
  });

  it('can be removed/deleted', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        case_note: mockedCaseNote.recordId,
      },
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        socialCareId={123}
        caseNotes={[
          {
            ...mockedCaseNote,
            formType: 'flexible-form',
          },
        ]}
      />
    );
    fireEvent.click(screen.getByText('Remove'));
    expect(
      screen.getByText(
        'Are you sure you want to remove this case note or record?'
      )
    );
  });

  it.skip('only shows "Printable version" on records that have a full page version to go to', () => {
    expect(screen.queryByText('Printable version')).toBeNull();
  });

  it.skip('can be pinned to the top', () => {
    render(
      <CaseNoteDialog
        totalCount={1}
        socialCareId={123}
        caseNotes={[mockedCaseNote]}
      />
    );
    fireEvent.click(screen.getByText('Pin to top'));
  });
});
