import WorkerAllocations from './WorkerAllocations';

import { render } from '@testing-library/react';
import {
  mockedAllocations,
  mockedAllocation,
} from 'factories/allocatedWorkers';
import { residentFactory } from 'factories/residents';

import { addDays } from 'date-fns';
import * as workerAPI from 'utils/api/allocatedWorkers';
import * as residentsAPI from 'utils/api/residents';

jest.mock('utils/api/allocatedWorkers');

jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
  data: residentFactory.build({
    reviewDate: '2022-12-12',
  }),
  revalidate: jest.fn(),
  mutate: jest.fn(),
  isValidating: false,
}));

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
    expect(queryByText('Date allocated:')).toBeInTheDocument();
    expect(queryByText('foo')).toBeInTheDocument();
    expect(queryByText('Team allocation:')).not.toBeInTheDocument();
  });
  it('displays the active cases when theres a team allocation correctly', async () => {
    mockedAllocation.allocationStartDate = new Date().toString();
    mockedAllocation.teamAllocationStartDate = new Date().toString();

    jest.spyOn(workerAPI, 'useAllocationsByWorker').mockImplementation(() => ({
      data: {
        workers: [],
        allocations: [mockedAllocation],
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(<WorkerAllocations workerId={123} />);

    expect(queryByText('Medium')).toBeInTheDocument();
    expect(queryByText('Date allocated:')).toBeInTheDocument();
    expect(queryByText('Team allocation:')).toBeInTheDocument();
    expect(queryByText('foo')).toBeInTheDocument();
  });
  it('displays the review date if it exists', async () => {
    jest.spyOn(workerAPI, 'useAllocationsByWorker').mockImplementation(() => ({
      data: {
        workers: [],
        allocations: [mockedAllocation],
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(<WorkerAllocations workerId={123} />);
    expect(queryByText('Review date:')).toBeInTheDocument();
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
    expect(queryByText('Review date')).toBeInTheDocument();
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
  it('displays the correct amount of days in the difference between today and allocation date', async () => {
    mockedAllocation.allocationStartDate = addDays(new Date(), -3).toString();
    mockedAllocation.teamAllocationStartDate = addDays(
      new Date(),
      -10
    ).toString();

    jest.spyOn(workerAPI, 'useAllocationsByWorker').mockImplementation(() => ({
      data: {
        workers: [],
        allocations: [mockedAllocation],
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { getByText } = render(<WorkerAllocations workerId={123} />);

    expect(getByText(/3 days ago/i)).toBeInTheDocument();
    expect(getByText(/10 days ago/i)).toBeInTheDocument();
  });
  it('displays (Today) if the date difference is 0', async () => {
    mockedAllocation.allocationStartDate = new Date().toString();

    jest.spyOn(workerAPI, 'useAllocationsByWorker').mockImplementation(() => ({
      data: {
        workers: [],
        allocations: [mockedAllocation],
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { getByText } = render(<WorkerAllocations workerId={123} />);

    expect(getByText(/Today/i)).toBeInTheDocument();
  });
});
