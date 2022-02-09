import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import { mockWorkflow } from 'fixtures/workflows';
import WorkflowTree from './WorkflowTree';

const mockTree = [
  mockWorkflow,
  // children
  {
    ...mockWorkflow,
    id: '456def',
    workflowId: '123abc',
  },
  {
    ...mockWorkflow,
    id: '789efg',
    workflowId: '123abc',
  },
  // grandchild
  {
    ...mockWorkflow,
    id: '012hij',
    workflowId: '789efg',
  },
];

describe('WorkflowTree', () => {
  it('shows workflows and their children', () => {
    render(<WorkflowTree workflows={mockTree} resident={mockedResident} />);
    expect(screen.getAllByRole('list').length).toBe(3);
    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('link').length).toBe(4);

    expect(
      screen.getAllByText('Started 10 Oct 2020 · In progress').length
    ).toBe(4);
    expect(screen.getAllByText('Unassigned').length).toBe(4);

    expect(
      screen.queryByText('4 workflows started over over 1 year')
    ).toBeNull();
  });

  it('summarises the workflow chain when asked', () => {
    render(
      <WorkflowTree workflows={mockTree} resident={mockedResident} summarise />
    );
    expect(screen.getByText('4 workflows started over over 1 year'));
  });

  it('marks in progress work differently', () => {
    render(
      <WorkflowTree workflows={mockTree} resident={mockedResident} summarise />
    );
    expect(screen.getAllByText('In progress').length).toBe(4);
    expect(screen.getAllByText(' · In progress', { exact: false }).length).toBe(
      4
    );
  });
});
