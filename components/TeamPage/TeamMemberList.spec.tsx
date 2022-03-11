import TeamMemberList from './TeamMemberList';

import { fireEvent, render, screen } from '@testing-library/react';
import {
  mockedTeamWorkerFactory,
  workerAllocationFactory,
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

describe('TeamMemberList component', () => {
  it('displays a TeamMember component per user passed', async () => {
    const { queryByTestId } = render(<TeamMemberList users={users} />);
    expect(queryByTestId(`team_member_1`)).toBeInTheDocument();
    expect(queryByTestId(`team_member_2`)).toBeInTheDocument();
  });
  it('displays a prettified name initials', async () => {
    const { queryByText } = render(<TeamMemberList users={users} />);
    expect(queryByText(`TT`)).toBeInTheDocument();
    expect(queryByText(`FF`)).toBeInTheDocument();
  });

  it('make sure that Expand allocations button works', async () => {
    jest
      .spyOn(teamWorkersAPI, 'useAllocationsByWorker')
      .mockImplementation(() => ({
        data: workerAllocationFactory.build(),
        revalidate: jest.fn(),
        mutate: jest.fn(),
        isValidating: false,
      }));

    render(
      <TeamMemberList
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
