import { render, screen } from '@testing-library/react';
import { mockWorkflow } from 'fixtures/workflows';
import WorkflowOverview from './WorkflowOverview';

describe('WorkflowOverview', () => {
  it('shows the most recent workflow', () => {
    render(
      <WorkflowOverview
        socialCareId={1}
        workflows={[
          mockWorkflow,
          {
            ...mockWorkflow,
            createdAt: '2010-10-10',
          },
          {
            ...mockWorkflow,
            createdAt: '2000-10-10',
          },
        ]}
      />
    );
    expect(screen.getByText('Most recent'));
    expect(screen.getByText('Started 10 Oct 2020', { exact: false }));
    expect(
      screen.queryByText('Started 10 Oct 2010', { exact: false })
    ).toBeNull();
    expect(
      screen.queryByText('Started 10 Oct 2000', { exact: false })
    ).toBeNull();
  });

  it('shows up to three in-progress workflows', () => {
    render(
      <WorkflowOverview
        socialCareId={1}
        workflows={[
          mockWorkflow,
          { ...mockWorkflow, id: '2' },
          { ...mockWorkflow, id: '3' },
          { ...mockWorkflow, id: '4' },
          { ...mockWorkflow, id: '5' },
          {
            ...mockWorkflow,
            id: '456def',
            createdAt: '2030-10-10',
          },
        ]}
      />
    );
    expect(screen.getAllByText('In progress').length).toBe(5);
    expect(screen.getAllByRole('link').length).toBe(6);
    expect(screen.getByText('and 2 more'));
  });

  it("doesn't list the same workflow twice", () => {
    render(
      <WorkflowOverview
        socialCareId={1}
        workflows={[
          mockWorkflow,
          {
            ...mockWorkflow,
            id: '456def',
          },
        ]}
      />
    );
    expect(screen.getAllByText('In progress').length).toBe(3);
    expect(screen.getAllByRole('link').length).toBe(4);
  });
});
