import { render, screen } from '@testing-library/react';
import { mockedCaseNote } from 'factories/cases';
import CaseNoteTile from './CaseNoteTile';
import { useWorker } from 'utils/api/workers';
import { mockedWorker } from 'factories/workers';
import { useSubmission } from 'utils/api/submissions';
import { mockSubmission } from 'factories/submissions';
import useWorkflowIds from '../../hooks/useWorkflowIds';
import { mockWorkflow } from 'fixtures/workflows';

jest.mock('utils/api/workers');
jest.mock('utils/api/submissions');
jest.mock('../../hooks/useWorkflowIds');

(useWorker as jest.Mock).mockReturnValue({ data: [mockedWorker] });
(useWorkflowIds as jest.Mock).mockReturnValue({ error: new Error() });

(useSubmission as jest.Mock).mockReturnValue({
  data: {
    ...mockSubmission,
    id: mockedCaseNote.recordId,
    formAnswers: {
      singleStep: {
        Body: 't\\t\\r\\n\\r\\nwo',
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
          formType: 'flexible-form',
        }}
      />
    );

    expect(screen.getByText('two')).toBeVisible();
  });

  it('does not display a workflow info badge by default', () => {
    render(
      <CaseNoteTile
        c={{
          ...mockedCaseNote,
          formType: 'flexible-form',
        }}
      />
    );

    expect(screen.queryByTestId('workflow-info')).toBeNull();
  });

  it('does display a workflow info badge if the workflow type is review', () => {
    (useWorkflowIds as jest.Mock).mockReturnValue({
      data: { workflow: { ...mockWorkflow, type: 'Review' } },
    });
    render(
      <CaseNoteTile
        c={{
          ...mockedCaseNote,
          formType: 'flexible-form',
        }}
      />
    );

    expect(screen.queryByTestId('workflow-info')).not.toBeNull();
    expect(screen.getByText('Review')).not.toBeNull();
  });
});
