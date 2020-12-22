import { render } from '@testing-library/react';

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
      },
    ],
  };
  it('should render properly', () => {
    const { asFragment } = render(<AllocatedWorkersTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
