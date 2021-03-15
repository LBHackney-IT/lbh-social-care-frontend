import { render } from '@testing-library/react';

import AllocationRecap from './AllocationRecap';

import { useResidentAllocation } from 'utils/api/allocatedWorkers';
import { useCase } from 'utils/api/cases';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('utils/api/allocatedWorkers', () => ({
  useResidentAllocation: jest.fn(),
}));

jest.mock('utils/api/cases', () => ({
  useCase: jest.fn(),
}));

describe(`AllocationRecap`, () => {
  const props = {
    personId: 'p_123',
    allocationId: 'a_123',
    recordId: 'r_123',
  };

  it('should render properly on deallocation', async () => {
    useCase.mockImplementation(() => ({
      data: {
        caseFormData: {
          form_name_overall: 'API_Deallocation',
          created_by: 'creator',
          deallocation_reason: 'a valid reason',
        },
      },
    }));
    useResidentAllocation.mockImplementation(() => ({
      data: {
        personName: 'person',
        allocatedWorker: 'worker',
        workerType: 'type',
        allocatedWorkerTeam: 'team',
        allocationStartDate: '2000-10-01',
        allocationEndDate: '2000-11-01',
      },
    }));
    const { asFragment } = render(<AllocationRecap {...props} />);
    expect(useResidentAllocation).toHaveBeenCalledWith('p_123', 'a_123');
    expect(useCase).toHaveBeenCalledWith('r_123');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly on allocation', async () => {
    useCase.mockImplementation(() => ({
      data: {
        caseFormData: {
          form_name_overall: 'API_Allocation',
          created_by: 'creator',
          deallocation_reason: 'a valid reason',
        },
      },
    }));
    useResidentAllocation.mockImplementation(() => ({
      data: {
        personName: 'person',
        allocatedWorker: 'worker',
        workerType: 'type',
        allocatedWorkerTeam: 'team',
        allocationStartDate: '2000-10-01',
      },
    }));
    const { asFragment } = render(<AllocationRecap {...props} />);
    expect(useResidentAllocation).toHaveBeenCalledWith('p_123', 'a_123');
    expect(useCase).toHaveBeenCalledWith('r_123');
    expect(asFragment()).toMatchSnapshot();
  });
});
