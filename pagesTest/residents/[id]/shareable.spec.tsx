import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import { useCases } from 'utils/api/cases';
import { useAuth } from 'components/UserContext/UserContext';
// import { useTeams, useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import useWorkflows from 'hooks/useWorkflows';
import { useRelationships } from 'utils/api/relationships';
import { mockedOnlyAdultUser, mockedUser } from 'factories/users';
import { AppConfigProvider } from 'lib/appConfig';
import { useRouter } from 'next/router';
import ShareableResidentPage from 'pages/residents/[id]/shareable';

jest.mock('next/router');
(useRouter as jest.Mock).mockReturnValue({ asPath: '' });

jest.mock('utils/api/cases');
(useCases as jest.Mock).mockReturnValue([
  {
    cases: [],
  },
]);

jest.mock('utils/api/relationships');
(useRelationships as jest.Mock).mockReturnValue([
  {
    relationships: [],
  },
]);

jest.mock('components/UserContext/UserContext');
(useAuth as jest.Mock).mockReturnValue({ user: mockedOnlyAdultUser });

jest.mock('hooks/useWorkflows');
(useWorkflows as jest.Mock).mockReturnValue({ data: [] });

describe('ResidentPage', () => {
  it('loads a sensible masthead', () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <ShareableResidentPage resident={mockedResident} />
      </AppConfigProvider>
    );

    expect(screen.getByRole('heading', { name: 'Foo Bar' }));
    expect(screen.getByRole('button', { name: 'Print or save as PDF' }));
    expect(screen.getByRole('heading', { name: 'Details' }));
    expect(screen.getByRole('heading', { name: 'Relationships' }));
  });

  it("shows limited info if user isn't allowed to see", () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <ShareableResidentPage
          resident={{ ...mockedResident, restricted: 'Y' }}
        />
      </AppConfigProvider>
    );

    expect(screen.queryByText('Case notes')).toBeNull();
    expect(screen.queryByText('Workflows')).toBeNull();
  });

  it('shows everything if user is allowed', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockedUser,
        hasUnrestrictedPermissions: true,
      },
    });
    render(
      <AppConfigProvider appConfig={{}}>
        <ShareableResidentPage
          resident={{ ...mockedResident, restricted: 'Y' }}
        />
      </AppConfigProvider>
    );

    expect(screen.getByText('Case notes'));
    expect(screen.getByText('Workflows'));
  });
});
