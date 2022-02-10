import { render, screen } from '@testing-library/react';
import { mockWorkflow } from 'fixtures/workflows';
import { WorkflowType } from './types';
import WorkflowChunk from './WorkflowChunk';

describe('WorkflowChunk', () => {
  it('correctly displays a workflow', () => {
    render(<WorkflowChunk workflow={mockWorkflow} />);
    expect(screen.getByRole('link'));
    expect(screen.getByText('mock-form'));
    expect(screen.getByText('Started 10 Oct 2020 · In progress'));
    expect(screen.getByText('Unassigned'));
  });

  it('marks a reassessment', () => {
    render(
      <WorkflowChunk
        workflow={{
          ...mockWorkflow,
          type: WorkflowType.Reassessment,
        }}
      />
    );
    expect(screen.getByText('Reassessment'));
  });

  it('marks in progress', () => {
    render(<WorkflowChunk workflow={mockWorkflow} />);
    expect(screen.getByText('In progress'));
  });
});
