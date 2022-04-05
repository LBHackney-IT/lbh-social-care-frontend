import TeamAllocationsList from './TeamAllocationsList';

import { render } from '@testing-library/react';
import { workerAllocationFactory, allocationFactory } from 'factories/teams';
import * as teamWorkersAPI from 'utils/api/allocatedWorkers';

jest.spyOn(teamWorkersAPI, 'useAllocationsByTeam').mockImplementation(() => ({
  data: workerAllocationFactory.build({
    allocations: [allocationFactory.build()],
  }),
  revalidate: jest.fn(),
  mutate: jest.fn(),
  isValidating: false,
}));

describe('TeamAllocationsList component', () => {
  it('displays the waiting list correctly', async () => {
    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="unallocated" />
    );

    expect(queryByText('Medium')).toBeInTheDocument();
    expect(queryByText('Added to waitlist:')).toBeInTheDocument();
    expect(queryByText('Foo Bar')).toBeInTheDocument();
    expect(queryByText('#1')).toBeInTheDocument();
  });
  it('displays the active cases correctly', async () => {
    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="allocated" />
    );

    expect(queryByText('Medium')).toBeInTheDocument();
    expect(queryByText('Team allocation:')).toBeInTheDocument();
    expect(queryByText('Worker allocation:')).toBeInTheDocument();
    expect(queryByText('#1')).toBeInTheDocument();
    expect(queryByText('Foo Bar')).toBeInTheDocument();
  });
  it('displays the sorting element correctly', async () => {
    const { queryByText } = render(
      <TeamAllocationsList teamId={123} type="allocated" />
    );

    expect(queryByText('Sort by')).toBeInTheDocument();
    expect(queryByText('Priority')).toBeInTheDocument();
    expect(queryByText('Date added to team')).toBeInTheDocument();
  });
});
