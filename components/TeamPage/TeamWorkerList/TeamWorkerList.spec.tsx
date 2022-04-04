import TeamWorkerList from './TeamWorkerList';

import { fireEvent, render, screen } from '@testing-library/react';
import {
  mockedTeamWorkerFactory,
  workerAllocationFactory,
  allocationFactory,
} from 'factories/teams';
import * as teamWorkersAPI from 'utils/api/allocatedWorkers';

const users = [
  mockedTeamWorkerFactory.build({
    id: 1,
    firstName: 'Test',
    lastName: 'Testington',
  }),
  mockedTeamWorkerFactory.build({
    id: 2,
    firstName: 'Foo',
    lastName: 'Fighter',
  }),
];

describe('TeamWorkerList component', () => {
  it('displays a TeamMember component per user passed', async () => {
    const { queryByTestId } = render(<TeamWorkerList users={users} />);
    expect(queryByTestId(`team_member_1`)).toBeInTheDocument();
    expect(queryByTestId(`team_member_2`)).toBeInTheDocument();
  });
  it('displays a prettified name initials', async () => {
    const { queryByText } = render(<TeamWorkerList users={users} />);
    expect(queryByText(`TT`)).toBeInTheDocument();
    expect(queryByText(`FF`)).toBeInTheDocument();
  });

  it('make sure that Expand allocations button works', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByWorker')
      .mockImplementation(() => ({
        data: workerAllocationFactory.build({
          allocations: [allocationFactory.build()],
        }),
        revalidate: jest.fn(),
        mutate: jest.fn(),
        isValidating: false,
      }));

    render(
      <TeamWorkerList
        users={[
          mockedTeamWorkerFactory.build({
            id: 1,
          }),
        ]}
      />
    );

    fireEvent.click(screen.getByTestId(`expand_1`));
    expect(screen.queryByText(`Allocated residents`)).toBeInTheDocument();
  });
});
