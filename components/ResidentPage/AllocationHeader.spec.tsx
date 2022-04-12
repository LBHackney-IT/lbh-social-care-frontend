import { render, screen } from '@testing-library/react';
import AllocationHeader from './AllocationHeader';
import { allocationFactory } from 'factories/allocatedWorkers';

describe('CaseNoteDialog', () => {
  it('renders a single team/worker allocation', () => {
    const allocation = allocationFactory.build({
      allocatedWorker: 'Jon Doe',
      allocatedWorkerTeam: 'The Best Team',
    });

    render(<AllocationHeader allocations={[allocation]} />);

    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to Jon Doe (The Best Team)'
    );
    expect(screen.getByTestId('teamLink')).toBeInTheDocument();
  });
  it('renders a single team-only allocation', () => {
    const allocation = allocationFactory.build({
      allocatedWorker: undefined,
      allocatedWorkerTeam: 'The Best Team',
    });

    render(<AllocationHeader allocations={[allocation]} />);
    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to The Best Team'
    );
    expect(screen.getByTestId('teamLink')).toBeInTheDocument();
  });
  it('renders a single worker-only allocation', () => {
    const allocation = allocationFactory.build({
      allocatedWorker: 'Jon Doe',
      allocatedWorkerTeam: undefined,
    });

    render(<AllocationHeader allocations={[allocation]} />);
    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to Jon Doe'
    );
  });
  it('renders a worker-only allocation + 1', () => {
    render(
      <AllocationHeader
        allocations={[
          allocationFactory.build({
            allocatedWorker: 'Jon Doe',
            allocatedWorkerTeam: undefined,
          }),
          allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
        ]}
      />
    );
    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to Jon Doe and 1 other'
    );
    expect(screen.getByTestId('allocationLink')).toBeInTheDocument();
  });
  it('renders a worker-only allocation + 2', () => {
    render(
      <AllocationHeader
        allocations={[
          allocationFactory.build({
            allocatedWorker: 'Jon Doe',
            allocatedWorkerTeam: undefined,
          }),
          allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
          allocationFactory.build({ allocatedWorker: 'Agent Smith' }),
        ]}
      />
    );
    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to Jon Doe and 2 other'
    );
    expect(screen.getByTestId('allocationLink')).toBeInTheDocument();
  });
  it('renders a two allocations - one team/worker + 1', () => {
    render(
      <AllocationHeader
        allocations={[
          allocationFactory.build({
            allocatedWorker: 'Jon Doe',
            allocatedWorkerTeam: 'The Best Team',
          }),
          allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
        ]}
      />
    );
    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to Jon Doe (The Best Team) and 1 other'
    );
    expect(screen.getByTestId('teamLink')).toBeInTheDocument();
    expect(screen.getByTestId('allocationLink')).toBeInTheDocument();
  });
  it('renders a two allocations - one team only + 1', () => {
    render(
      <AllocationHeader
        allocations={[
          allocationFactory.build({
            allocatedWorker: undefined,
            allocatedWorkerTeam: 'The Best Team',
          }),
          allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
        ]}
      />
    );
    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to The Best Team and 1 other'
    );
    expect(screen.getByTestId('teamLink')).toBeInTheDocument();
    expect(screen.getByTestId('allocationLink')).toBeInTheDocument();
  });
  it('renders multiple allocations - one team/worker + other', () => {
    render(
      <AllocationHeader
        allocations={[
          allocationFactory.build({
            allocatedWorker: 'Jon Doe',
            allocatedWorkerTeam: 'The Best Team',
          }),
          allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
          allocationFactory.build({ allocatedWorker: 'Agent Smith' }),
        ]}
      />
    );
    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to Jon Doe (The Best Team) and 2 other'
    );
    expect(screen.getByTestId('teamLink')).toBeInTheDocument();
    expect(screen.getByTestId('allocationLink')).toBeInTheDocument();
  });
  it('renders multiple allocations - one team only + other', () => {
    render(
      <AllocationHeader
        allocations={[
          allocationFactory.build({
            allocatedWorker: undefined,
            allocatedWorkerTeam: 'The Best Team',
          }),
          allocationFactory.build({ allocatedWorker: 'Foo Bar' }),
          allocationFactory.build({ allocatedWorker: 'Agent Smith' }),
        ]}
      />
    );
    expect(screen.getByTestId('allocationHeader')).toHaveTextContent(
      'Allocated to The Best Team and 2 other'
    );
    expect(screen.getByTestId('teamLink')).toBeInTheDocument();
    expect(screen.getByTestId('allocationLink')).toBeInTheDocument();
  });
});
