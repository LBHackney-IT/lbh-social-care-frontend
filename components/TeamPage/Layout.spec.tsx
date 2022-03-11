import TeamLayout from './Layout';

import { render } from '@testing-library/react';
import { mockedTeam, mockedTeamWorker } from 'factories/teams';
import * as teamWorkersAPI from 'utils/api/allocatedWorkers';

const mockedUseRouter = { pathname: '/foo' };

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe('TeamLayout component', () => {
  it('displays the team name', async () => {
    mockedTeam.name = 'example-team';
    const { queryByText } = render(
      <TeamLayout team={mockedTeam}>
        <></>
      </TeamLayout>
    );

    expect(queryByText('example-team')).toBeInTheDocument();
  });
  it('displays unknow team when the team is null', async () => {
    const { queryByText } = render(
      <TeamLayout>This is a child component</TeamLayout>
    );
    expect(queryByText('Unknown team')).toBeInTheDocument();
  });

  it('loads correctly the team worker count', async () => {
    jest.spyOn(teamWorkersAPI, 'useTeamWorkers').mockImplementation(() => ({
      data: [mockedTeamWorker],
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByText } = render(
      <TeamLayout team={mockedTeam}>
        <></>
      </TeamLayout>
    );
    expect(queryByText('Members (1)')).toBeInTheDocument();
  });

  it('displays correctly children components', async () => {
    const { queryByText } = render(
      <TeamLayout team={mockedTeam}>This is a child component</TeamLayout>
    );
    expect(queryByText('This is a child component')).toBeInTheDocument();
  });

  it('displays correctly NavLinks', async () => {
    jest.spyOn(teamWorkersAPI, 'useTeamWorkers').mockImplementation(() => ({
      data: [mockedTeamWorker],
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { queryByTestId } = render(
      <TeamLayout team={mockedTeam}>This is a child component</TeamLayout>
    );
    expect(queryByTestId(`navlink_content_/teams/${mockedTeam.id}`)).not
      .toBeNull;
    expect(queryByTestId(`navlink_content_/teams/${mockedTeam.id}/members`)).not
      .toBeNull;
    expect(queryByTestId(`navlink_content_/teams/${mockedTeam.id}/allocations`))
      .not.toBeNull;
  });
});
