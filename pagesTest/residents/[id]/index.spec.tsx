import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import ResidentPage from 'pages/residents/[id]';
import { useCases } from 'utils/api/cases';
import { useAuth } from 'components/UserContext/UserContext';
import { useTeams, useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import useWorkflows from 'hooks/useWorkflows';
import { mockedUser } from 'factories/users';
import { AppConfigProvider } from 'lib/appConfig';
import { useRouter } from 'next/router';

jest.mock('next/router');
(useRouter as jest.Mock).mockReturnValue({ asPath: '' });

jest.mock('utils/api/cases');
(useCases as jest.Mock).mockReturnValue({
  data: [
    {
      cases: [],
    },
  ],
});

jest.mock('components/UserContext/UserContext');
(useAuth as jest.Mock).mockReturnValue({ user: mockedUser });

jest.mock('utils/api/allocatedWorkers');
(useTeams as jest.Mock).mockReturnValue({
  data: {
    teams: [],
  },
});
(useAllocatedWorkers as jest.Mock).mockReturnValue({
  data: {
    allocations: [],
  },
});

jest.mock('hooks/useWorkflows');
(useWorkflows as jest.Mock).mockReturnValue({ data: [] });

describe('ResidentPage', () => {
  it('loads a sensible masthead with full name, meta and status tags', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <ResidentPage resident={mockedResident} />
      </AppConfigProvider>
    );

    expect(screen.getByRole('heading', { name: 'Foo Bar' }));
    expect(
      screen.getByText(/#1 · Born 13 Nov 2020 · sjakdjlk, hdsadjk/, {
        exact: false,
      })
    );
    expect(screen.getByText('Adult social care'));
    expect(screen.getByText('Closed case'));
  });

  it('correctly handles when there are no case notes', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <ResidentPage resident={mockedResident} />
      </AppConfigProvider>
    );

    expect(screen.getByText('This resident has no case notes yet.'));
  });
});
