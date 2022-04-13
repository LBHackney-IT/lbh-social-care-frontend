import WorkerAllocations from './WorkerAllocations';

import { render } from '@testing-library/react';
import { mockedAllocations } from 'factories/allocatedWorkers';

import * as workerAPI from 'utils/api/allocatedWorkers';

jest.mock('utils/api/allocatedWorkers');

describe('WorkerAllocations component', () => {
  it('displays the active cases correctly', async () => {
    jest.spyOn(workerAPI, 'useAllocationsByWorker').mockImplementation(() => ({
      data: {
        workers: [],
        allocations: mockedAllocations,
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(<WorkerAllocations workerId={123} />);

    expect(queryByText('Medium')).toBeInTheDocument();
    expect(queryByText('Worker allocation:')).toBeInTheDocument();
    expect(queryByText('foo')).toBeInTheDocument();
  });
  it('displays the sorting element correctly', async () => {
    jest.spyOn(workerAPI, 'useAllocationsByWorker').mockImplementation(() => ({
      data: {
        workers: [],
        allocations: mockedAllocations,
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(<WorkerAllocations workerId={123} />);

    expect(queryByText('Sort by')).toBeInTheDocument();
    expect(queryByText('Priority')).toBeInTheDocument();
    expect(queryByText('Date added to team')).toBeInTheDocument();
  });
  it('displays "No people are assigned to you" if there are no allocated elements', async () => {
    jest.spyOn(workerAPI, 'useAllocationsByWorker').mockImplementation(() => ({
      data: {
        workers: [],
        allocations: [],
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(<WorkerAllocations workerId={123} />);
    expect(queryByText('No people are assigned to you')).toBeInTheDocument();
  });
});
