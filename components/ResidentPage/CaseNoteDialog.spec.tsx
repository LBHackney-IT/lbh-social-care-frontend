import { fireEvent, render, screen } from '@testing-library/react';
import { mockedCaseNote } from 'factories/cases';
import { mockSubmission } from 'factories/submissions';
import CaseNoteDialog from './CaseNoteDialog';
import { useRouter } from 'next/router';
import { useCase } from 'utils/api/cases';
import { useSubmission } from 'utils/api/submissions';

jest.mock('next/router');
jest.mock('utils/api/cases');
jest.mock('utils/api/submissions');

(useRouter as jest.Mock).mockReturnValue({
  query: {},
});
(useCase as jest.Mock).mockReturnValue({
  data: mockedCaseNote,
});
(useSubmission as jest.Mock).mockReturnValue({
  data: {
    ...mockSubmission,
    id: mockedCaseNote.recordId,
    answers: {
      foo: 'bar',
      one: 'two',
    },
  },
});

describe('CaseNoteDialog', () => {
  it('renders nothing when there is no matching record ID in the URL query', () => {
    render(<CaseNoteDialog caseNotes={[mockedCaseNote]} />);
    expect(screen.queryByText('Close')).toBeNull();
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('renders an old-style case note (record/case) correctly', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        case_note: mockedCaseNote.recordId,
      },
    });

    render(<CaseNoteDialog caseNotes={[mockedCaseNote]} />);

    expect(screen.getByText('foorm'));
    expect(screen.getByText('Added 25 Oct 2020 by Fname.Lname@hackney.gov.uk'));
    expect(screen.getByText('Remove'));
    expect(screen.getByText('Pin to top'));

    expect(screen.getAllByRole('term').length).toBe(11);
    expect(screen.getAllByRole('definition').length).toBe(11);
  });

  it('renders a new-style case note (submission/flexible-form) correctly', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        case_note: mockedCaseNote.recordId,
      },
    });

    render(
      <CaseNoteDialog
        caseNotes={[
          {
            ...mockedCaseNote,
            formType: 'flexible-form',
          },
        ]}
      />
    );

    screen.debug();

    expect(screen.getByText('Form'));
    expect(screen.getByText('Added 25 Oct 2020 by Fname.Lname@hackney.gov.uk'));
    expect(screen.getByText('Remove'));
    expect(screen.getByText('Pin to top'));

    // expect(screen.getAllByRole('term').length).toBe(11);
    // expect(screen.getAllByRole('definition').length).toBe(11);
  });

  //   it('can be navigated by keyboard', () => {
  //     render(<CaseNoteDialog caseNotes={[mockedCaseNote]} />);
  //     screen.debug();
  //   });

  //   it('updates the url when closed', () => {
  //     render(<CaseNoteDialog caseNotes={[mockedCaseNote]} />);
  //     screen.debug();
  //   });

  it.skip('can be removed/deleted', () => {
    render(<CaseNoteDialog caseNotes={[mockedCaseNote]} />);
    fireEvent.click(screen.getByText('Remove'));
  });

  it.skip('can be pinned to the top', () => {
    render(<CaseNoteDialog caseNotes={[mockedCaseNote]} />);
    fireEvent.click(screen.getByText('Pin to top'));
  });
});
