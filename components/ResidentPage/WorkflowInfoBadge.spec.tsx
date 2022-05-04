import { render, screen } from '@testing-library/react';
import { mockWorkflow } from 'fixtures/workflows';
import WorkflowInfoBadge from './WorkflowInfoBadge';

describe('WorkflowInfoBadge', () => {
  it('displays an unknown text if there is no workflow information', () => {
    render(<WorkflowInfoBadge {...mockWorkflow.id} />);
    const unknownLabel = screen.getByText('Unknown');
    expect(unknownLabel).toBeVisible();
    expect(
      unknownLabel.className.includes('govuk-tag lbh-tag lbh-tag--grey')
    ).toBe(true);
  });
  it('does not display a label if the workflow type is assessment', () => {
    render(<WorkflowInfoBadge {...mockWorkflow.id} />);
    const workflowLabel = screen.getByTestId('workflow-info');
    expect(workflowLabel).toBeNull();
  });
});
