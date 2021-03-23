import { render } from '@testing-library/react';

import AllocationRecap from './AllocationRecap';
import * as allocatedWorkersAPI from 'utils/api/allocatedWorkers';
import * as caseAPI from 'utils/api/cases';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedAllocationNote, mockedDeallocationNote } from 'factories/cases';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`AllocationRecap`, () => {
  const props = {
    personId: 123,
    allocationId: 321,
    recordId: 'r_123',
  };

  jest
    .spyOn(allocatedWorkersAPI, 'useResidentAllocation')
    .mockImplementation(() => ({
      data: mockedAllocations[0],
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

  it('should render properly on deallocation', async () => {
    jest.spyOn(caseAPI, 'useCase').mockImplementation(() => ({
      data: mockedAllocationNote,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { asFragment } = render(<AllocationRecap {...props} />);
    expect(allocatedWorkersAPI.useResidentAllocation).toHaveBeenCalledWith(
      123,
      321
    );
    expect(caseAPI.useCase).toHaveBeenCalledWith('r_123');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly on allocation', async () => {
    jest.spyOn(caseAPI, 'useCase').mockImplementation(() => ({
      data: mockedDeallocationNote,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));
    const { asFragment } = render(<AllocationRecap {...props} />);
    expect(allocatedWorkersAPI.useResidentAllocation).toHaveBeenCalledWith(
      123,
      321
    );
    expect(caseAPI.useCase).toHaveBeenCalledWith('r_123');
    expect(asFragment()).toMatchSnapshot();
  });
});
