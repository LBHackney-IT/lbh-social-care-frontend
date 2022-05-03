import TeamLayout from './Layout';

import { render } from '@testing-library/react';
import {
  mockedTeam,
  mockedTeamWorker,
  allocationDataFactory,
  allocationFactory,
} from 'factories/teams';
import * as teamWorkersAPI from 'utils/api/allocatedWorkers';
import { AllocationData } from 'types';

import { SWRInfiniteResponse } from 'swr';
jest.mock('utils/api/allocatedWorkers');

const mockedUseRouter = { pathname: '/foo' };

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

jest.spyOn(teamWorkersAPI, 'useAllocationsByTeam').mockImplementation(() => {
  const response = {
    data: [
      allocationDataFactory.build({
        allocations: [allocationFactory.build()],
        totalCount: 256,
      }),
    ],
  } as unknown as SWRInfiniteResponse<AllocationData, Error>;

  return response;
});

jest.spyOn(teamWorkersAPI, 'useTeamWorkers').mockImplementation(() => ({
  data: [mockedTeamWorker],
  revalidate: jest.fn(),
  mutate: jest.fn(),
  isValidating: false,
}));

describe('TeamLayout component', () => {
  it('displays the team name', async () => {
    mockedTeam.name = 'example-team';
    const { queryAllByText } = render(
      <TeamLayout team={mockedTeam}>
        <></>
      </TeamLayout>
    );

    expect(queryAllByText('example-team')).toHaveLength(2);
  });

  it('loads correctly the team worker count', async () => {
    const { queryByText } = render(
      <TeamLayout team={mockedTeam}>
        <></>
      </TeamLayout>
    );
    expect(queryByText('Team members (1)')).toBeInTheDocument();
  });

  it('loads correctly the allocations count', async () => {
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
    expect(queryByText('Waiting list (256)')).toBeInTheDocument();
    expect(queryByText('Active cases (256)')).toBeInTheDocument();
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
