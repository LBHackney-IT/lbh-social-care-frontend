import TeamList from './TeamsList';

import { render } from '@testing-library/react';
import * as teamWorkersAPI from 'utils/api/allocatedWorkers';
import { mockedTeamFactory } from 'factories/teams';

jest.spyOn(teamWorkersAPI, 'useTeams').mockImplementation(() => ({
  data: {
    teams: [
      mockedTeamFactory.build({
        id: 123,
        name: 'testTeam',
      }),
      mockedTeamFactory.build({
        id: 456,
        name: 'fooTeam',
      }),
    ],
  },
  revalidate: jest.fn(),
  mutate: jest.fn(),
  isValidating: false,
}));

describe('TeamList component', () => {
  it('displays the TeamList component', async () => {
    const { queryByText } = render(<TeamList />);

    expect(queryByText(`List of teams (2)`)).toBeInTheDocument();
  });

  it('Renders the team list', async () => {
    const { queryByTestId, getByText } = render(<TeamList />);
    expect(getByText(`testTeam`)).toBeInTheDocument();
    expect(getByText(`fooTeam`)).toBeInTheDocument();

    expect(queryByTestId(`teamlink_123`)).toBeInTheDocument();
    expect(queryByTestId(`teamlink_456`)).toBeInTheDocument();
  });
});
