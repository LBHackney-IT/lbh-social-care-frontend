import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { userFactory } from 'factories/users';
import * as allocatedWorkersAPI from 'utils/api/allocatedWorkers';
import { mockedAllocations } from 'factories/allocatedWorkers';
import AllocatedWorkers from './AllocatedWorkers';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('components/AllocatedWorkers/AllocatedWorkersTable', () => () =>
  'MockedAllocatedWorkersTable'
);

describe(`AddAllocatedWorker`, () => {
  jest
    .spyOn(allocatedWorkersAPI, 'useAllocatedWorkers')
    .mockImplementation(() => ({
      data: {
        allocations: mockedAllocations,
      },
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

  const props = {
    id: 123,
  };

  it('should render only the table if not allocator', async () => {
    const { findByText, queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build(),
        }}
      >
        <AllocatedWorkers {...props} />
      </UserContext.Provider>
    );
    const allocateTable = await findByText('MockedAllocatedWorkersTable');
    expect(allocateTable).toBeInTheDocument();
    const addAllocate = queryByText('Allocate worker');
    expect(addAllocate).not.toBeInTheDocument();
  });

  it('should render everything if allocator', async () => {
    const { findByText, queryByText } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAllocationsPermissions: true,
          }),
        }}
      >
        <AllocatedWorkers {...props} />
      </UserContext.Provider>
    );
    const allocateTable = await findByText('MockedAllocatedWorkersTable');
    expect(allocateTable).toBeInTheDocument();
    const addAllocate = queryByText('Allocate worker');
    expect(addAllocate).toBeInTheDocument();
  });
});
