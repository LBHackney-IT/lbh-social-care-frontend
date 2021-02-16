import { render } from '@testing-library/react';

import AllocationRecap from './AllocationRecap';

import { getResidentAllocation } from 'utils/api/allocatedWorkers';
import { getCaseByResident } from 'utils/api/cases';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('utils/api/allocatedWorkers', () => ({
  getResidentAllocation: jest.fn(),
}));

jest.mock('utils/api/cases', () => ({
  getCaseByResident: jest.fn(),
}));

describe(`AllocationRecap`, () => {
  const props = {
    personId: 'p_123',
    allocationId: 'a_123',
    recordId: 'r_123',
  };

  it('should render properly on deallocation', async () => {
    getCaseByResident.mockImplementation(() => ({
      data: {
        caseFormData: {
          form_name_overall: 'API_Deallocation',
          created_by: 'creator',
          deallocation_reason: 'a valid reason',
        },
      },
    }));
    getResidentAllocation.mockImplementation(() => ({
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
    expect(getResidentAllocation).toHaveBeenCalledWith('p_123', 'a_123');
    expect(getCaseByResident).toHaveBeenCalledWith('p_123', 'r_123');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly on allocation', async () => {
    getCaseByResident.mockImplementation(() => ({
      data: {
        caseFormData: {
          form_name_overall: 'API_Allocation',
          created_by: 'creator',
          deallocation_reason: 'a valid reason',
        },
      },
    }));
    getResidentAllocation.mockImplementation(() => ({
      data: {
        personName: 'person',
        allocatedWorker: 'worker',
        workerType: 'type',
        allocatedWorkerTeam: 'team',
        allocationStartDate: '2000-10-01',
      },
    }));
    const { asFragment } = render(<AllocationRecap {...props} />);
    expect(getResidentAllocation).toHaveBeenCalledWith('p_123', 'a_123');
    expect(getCaseByResident).toHaveBeenCalledWith('p_123', 'r_123');
    expect(asFragment()).toMatchSnapshot();
  });
});
