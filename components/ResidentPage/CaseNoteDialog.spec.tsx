import { fireEvent, render, screen } from '@testing-library/react';
import { mockedCaseNote } from 'factories/cases';
import { mockSubmission } from 'factories/submissions';
import CaseNoteDialog from './CaseNoteDialog';
import { useRouter } from 'next/router';
import { useCase, useCases, useHistoricCaseNote } from 'utils/api/cases';
import { useSubmission } from 'utils/api/submissions';
import { mockedHistoricCaseNote } from 'fixtures/cases.fixtures';
import useWorkflowIds from '../../hooks/useWorkflowIds';
import { mockWorkflow } from 'fixtures/workflows';

jest.mock('next/router');
jest.mock('utils/api/cases');
jest.mock('utils/api/submissions');
jest.mock('../../hooks/useWorkflowIds');
(useWorkflowIds as jest.Mock).mockReturnValue({ error: new Error() });

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
  data: {
    ...mockedHistoricCaseNote,
    content:
      '<h1>&nbsp;\\r\\n\\r\\n\\r\\n\\t\\r\\n\\t\\t\\r\\n\\t\\t\\t\\r\\n\\t\\t\\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; foo &amp; historic&rsquo;s</h1>',
  },
});
(useSubmission as jest.Mock).mockReturnValue({
  data: {
    ...mockSubmission,
    id: mockedCaseNote.recordId,
    formAnswers: {
      foo: {
        one: 't\\t\\r\\n\\r\\nwo',
        three: '\r\n\r\n\tfour',
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
        caseFormData: {
          ...mockedCaseNote.caseFormData,
          note: '&nbsp;\\t\\r\\n\\r\\n&nbsp;&nbsp;&nbsp;I am the \r\n\r\n\tnote',
        },
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
    expect(screen.getByText('I am the note'));
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
              ...mockedCaseNote.caseFormData,
              form_url: 'https://example.com/foo',
            },
          },
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
    expect(screen.getByText('two')).toBeVisible();
    expect(screen.getByText('four')).toBeVisible();
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

  it('strips tags from historic case notes', () => {
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

    expect(screen.getByText("foo & historic's"));
    expect(screen.queryByText('<h1>')).toBeNull();
    expect(screen.queryByText('</h1>')).toBeNull();
    expect(screen.queryByText('\r')).toBeNull();
    expect(screen.queryByText('\n')).toBeNull();
    expect(screen.queryByText('\t')).toBeNull();
    expect(screen.queryByText('&nbsp;')).toBeNull();
  });

  it('can be navigate to an older note by keyboard', () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/case-notes',
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
      pathname: '/case-notes',
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

  it('does not show a workflow info badge by default', () => {
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
              ...mockedCaseNote.caseFormData,
              form_url: 'https://example.com/foo',
            },
          },
        ]}
        socialCareId={123}
      />
    );

    expect(screen.queryByTestId('workflow-info')).toBeNull();
  });

  it('does show a review workflow info badge if the workflow type is review', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        case_note: mockedCaseNote.recordId,
      },
    });
    (useWorkflowIds as jest.Mock).mockReturnValue({
      data: { workflow: { ...mockWorkflow, type: 'Review' } },
    });

    render(
      <CaseNoteDialog
        totalCount={1}
        caseNotes={[
          {
            ...mockedCaseNote,
            caseFormData: {
              ...mockedCaseNote.caseFormData,
              form_url: 'https://example.com/foo',
            },
          },
        ]}
        socialCareId={123}
      />
    );

    expect(screen.queryByTestId('workflow-info')).not.toBeNull();
    expect(screen.getByText('Review')).toBeVisible();
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
