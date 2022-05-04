import { render, screen } from '@testing-library/react';
import { mockWorkflow } from 'fixtures/workflows';
import WorkflowInfoBadge from './WorkflowInfoBadge';
import useWorkflowIds from '../../hooks/useWorkflowIds';

jest.mock('../../hooks/useWorkflowIds');

describe('WorkflowInfoBadge', () => {
  it('displays an unknown text if there is a workflow id but an error from the api', () => {
    (useWorkflowIds as jest.Mock).mockReturnValue({ error: new Error() });

    render(<WorkflowInfoBadge workflowId={mockWorkflow.id} />);

    const unknownLabel = screen.getByText('Unknown');
    expect(unknownLabel).toBeVisible();
    expect(unknownLabel.className).toBe('govuk-tag lbh-tag lbh-tag--grey');
  });

  it('does not display a label if the workflow type is assessment', () => {
    (useWorkflowIds as jest.Mock).mockReturnValue({
      data: { workflows: [mockWorkflow] },
    });
    render(<WorkflowInfoBadge workflowId={mockWorkflow.id} />);
    const workflowLabel = screen.queryByTestId('workflow-info');
    expect(workflowLabel).toBeNull();
  });

  it('does not display a label if the there is an error from the api and no workflowid', () => {
    (useWorkflowIds as jest.Mock).mockReturnValue({ error: new Error() });
    render(<WorkflowInfoBadge workflowId={undefined} />);
    const workflowLabel = screen.queryByTestId('workflow-info');
    expect(workflowLabel).toBeNull();
  });

  it('displays a review label if the workflow type is review', () => {
    (useWorkflowIds as jest.Mock).mockReturnValue({
      data: { workflows: [{ ...mockWorkflow, type: 'Review' }] },
    });
    render(<WorkflowInfoBadge workflowId={mockWorkflow.id} />);
    const reviewLabel = screen.getByText('Review');
    expect(reviewLabel).toBeVisible();
    expect(reviewLabel.className).toBe('govuk-tag lbh-tag');
  });

  it('displays a reassessment label if the workflow type is reassessment', () => {
    (useWorkflowIds as jest.Mock).mockReturnValue({
      data: { workflows: [{ ...mockWorkflow, type: 'Reassessment' }] },
    });
    render(<WorkflowInfoBadge workflowId={mockWorkflow.id} />);
    const reviewLabel = screen.getByText('Reassessment');
    expect(reviewLabel).toBeVisible();
    expect(reviewLabel.className).toBe('govuk-tag lbh-tag');
  });
});
