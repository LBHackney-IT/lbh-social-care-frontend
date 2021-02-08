import { render } from '@testing-library/react';
import { UserContext } from 'components/UserContext/UserContext';
import AllocatedWorkersTable from './AllocatedWorkersTable';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
  }),
}));

describe('AllocatedWorkers component', () => {
  const props = {
    records: [
      {
        allocatedWorkerTeam: 'Safeguarding and Reviewing Team',
        allocatedWorker: 'Officer Name',
        allocationEndDate: '2019-03-28 00:00:00',
        allocationStartDate: '2019-03-28 00:00:00',
        workerType: 'Consultant Social Worker',
        id: 123,
        personId: 1234,
      },
    ],
    hasAllocationsPermissions: false,
  };

  it('should render properly', () => {
    const { asFragment } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo' },
        }}
      >
        <AllocatedWorkersTable {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly - with deallocate button', () => {
    const { asFragment } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo' },
        }}
      >
        <AllocatedWorkersTable {...props} hasAllocationsPermissions={true} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
