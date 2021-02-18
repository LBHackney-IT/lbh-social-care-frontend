import { render } from '@testing-library/react';

import AllocatedCasesTable from './AllocatedCasesTable';

describe('AllocatedCasesTable component', () => {
  const props = {
    cases: [
      {
        id: 123,
        personId: '87987',
        personName: 'James Smith',
        personAddress: 'Flat 11, Test road, E2 8TF',
        personDateOfBirth: '2021-01-21T09:38:02.186078',
        allocatedWorkerTeam: 'Long Term - case type: reviews',
      },
    ],
  };

  it('should render records properly', () => {
    const { asFragment } = render(<AllocatedCasesTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
