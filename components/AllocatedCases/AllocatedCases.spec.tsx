import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { userFactory } from 'factories/users';
import * as allocatedWorkersAPI from 'utils/api/allocatedWorkers';
import { mockedAllocations } from 'factories/allocatedWorkers';
import { mockedWorkers } from 'factories/workers';
import AllocatedCases from './AllocatedCases';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('components/AllocatedCases/AllocatedCasesTable', () => () =>
  'MockedAllocatedCasesTable'
);

describe(`AllocatedCases`, () => {
  jest
    .spyOn(allocatedWorkersAPI, 'useAllocationsByWorker')
    .mockImplementation(() => ({
      data: {
        workers: mockedWorkers,
        allocations: mockedAllocations,
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

  it('should render properly', async () => {
    const props = {
      id: 123,
    };
    const { findByText, asFragment } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <AllocatedCases {...props} />
      </UserContext.Provider>
    );
    const allocateTable = await findByText('MockedAllocatedCasesTable');
    expect(allocateTable).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
