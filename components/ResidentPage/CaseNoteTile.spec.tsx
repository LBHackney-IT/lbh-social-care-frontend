import { render, screen } from '@testing-library/react';
import { mockedCaseNote } from 'factories/cases';
import CaseNoteTile from './CaseNoteTile';
import { useWorker } from 'utils/api/workers';
import { mockedWorker } from 'factories/workers';
import { useSubmission } from 'utils/api/submissions';
import { mockSubmission } from 'factories/submissions';

jest.mock('utils/api/workers');
jest.mock('utils/api/submissions');

(useWorker as jest.Mock).mockReturnValue({ data: [mockedWorker] });

(useSubmission as jest.Mock).mockReturnValue({
  data: {
    ...mockSubmission,
    id: mockedCaseNote.recordId,
    formAnswers: {
      singleStep: {
        Body: 't&nbsp;\\t\\r\\n\\r\\n&nbsp;&nbsp;&nbsp;wo',
      },
    },
  },
});

describe('CaseNoteTile', () => {
  it('shows basic case note information', () => {
    render(<CaseNoteTile c={mockedCaseNote} />);

    expect(screen.getByText('25 Oct 2020'));
    expect(screen.getByText('foorm'));
    expect(screen.getByText('By Foo Bar'));
  });

  it('links to case note', () => {
    render(<CaseNoteTile c={mockedCaseNote} />);

    expect((screen.getByRole('link') as HTMLAnchorElement).href).toContain(
      '?case_note=4'
    );
  });

  it('displays a preview of the note', () => {
    render(
      <CaseNoteTile
        c={{
          ...mockedCaseNote,
          // caseFormData: {
          //   ...mockedCaseNote.caseFormData,
          //   note: '&nbsp;\\t\\r\\n\\r\\n&nbsp;&nbsp;&nbsp;I am the \r\n\r\n\tnote',
          // },
          formType: 'flexible-form',
        }}
      />
    );

    expect(screen.getByText('two')).toBeVisible();
  });
});
