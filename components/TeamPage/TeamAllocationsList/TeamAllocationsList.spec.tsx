import TeamAllocationsList from './TeamAllocationsList';

import { render } from '@testing-library/react';
import { workerAllocationFactory, allocationFactory } from 'factories/teams';
import * as teamWorkersAPI from 'utils/api/allocatedWorkers';

describe('TeamAllocationsList component', () => {
  it('displays the TeamAllocationsList component', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByTeam')
      .mockImplementation(() => ({
        data: workerAllocationFactory.build({
          allocations: [allocationFactory.build()],
        }),
        revalidate: jest.fn(),
        mutate: jest.fn(),
        isValidating: false,
      }));

    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="unallocated" />
    );

    expect(queryByText('medium')).toBeInTheDocument();
  });
});
