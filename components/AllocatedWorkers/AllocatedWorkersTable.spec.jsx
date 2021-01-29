import { render } from '@testing-library/react';
import { UserContext } from 'components/UserContext/UserContext';
import AllocatedWorkersTable from './AllocatedWorkersTable';

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
    updateWorkers: jest.fn(),
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
});
