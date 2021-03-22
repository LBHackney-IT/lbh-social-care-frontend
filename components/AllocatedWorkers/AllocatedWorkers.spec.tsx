import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import * as allocatedWorkersAPI from 'utils/api/allocatedWorkers';
import { mockedAllocations } from 'fixtures/allocatedWorkers.fixtures';
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
          user: {
            name: 'foo',
            hasAdminPermissions: true,
            hasChildrenPermissions: true,
            hasAdultPermissions: true,
            email: 'foo@bar.com',
            permissionFlag: 'A',
            isAuthorised: true,
          },
        }}
      >
        <AllocatedWorkers {...props} />
      </UserContext.Provider>
    );
    const allocateTable = await findByText('MockedAllocatedWorkersTable');
    expect(allocateTable).toBeInTheDocument();
    const addAllocate = await queryByText('Allocate worker');
    expect(addAllocate).not.toBeInTheDocument();
  });

  it('should render everything if allocator', async () => {
    const { findByText, queryByText } = render(
      <UserContext.Provider
        value={{
          user: {
            name: 'foo',
            hasAdminPermissions: true,
            hasChildrenPermissions: true,
            hasAdultPermissions: true,
            email: 'foo@bar.com',
            permissionFlag: 'A',
            isAuthorised: true,
            hasAllocationsPermissions: true,
          },
        }}
      >
        <AllocatedWorkers {...props} />
      </UserContext.Provider>
    );
    const allocateTable = await findByText('MockedAllocatedWorkersTable');
    expect(allocateTable).toBeInTheDocument();
    const addAllocate = await queryByText('Allocate worker');
    expect(addAllocate).toBeInTheDocument();
  });
});
