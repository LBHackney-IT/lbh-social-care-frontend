import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import AllocatedWorkers from './AllocatedWorkers';

import { getAllocatedWorkers } from 'utils/api/allocatedWorkers';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('utils/api/allocatedWorkers', () => ({
  getAllocatedWorkers: jest.fn(),
}));

jest.mock('components/AllocatedWorkers/AllocatedWorkersTable', () => () => (
  <div>MockedAllocatedWorkersTable</div>
));

describe(`AddAllocatedWorker`, () => {
  getAllocatedWorkers.mockImplementation(() =>
    Promise.resolve({
      allocations: [
        { id: '1', name: 'Team 1' },
        { id: '2', name: 'Team 2' },
        { id: '3', name: 'Team 3' },
      ],
    })
  );

  const props = {
    id: '123',
  };

  it('should render only the table if not allocator', async () => {
    const { findByText, queryByText } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo', email: 'foo@bar.com' },
        }}
      >
        <AllocatedWorkers {...props} type="people" />
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
            email: 'foo@bar.com',
            hasAllocationsPermissions: true,
          },
        }}
      >
        <AllocatedWorkers {...props} type="people" />
      </UserContext.Provider>
    );
    const allocateTable = await findByText('MockedAllocatedWorkersTable');
    expect(allocateTable).toBeInTheDocument();
    const addAllocate = await queryByText('Allocate worker');
    expect(addAllocate).toBeInTheDocument();
  });
});
