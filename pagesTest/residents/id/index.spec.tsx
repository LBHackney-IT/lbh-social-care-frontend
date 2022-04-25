import {
  render,
  screen,
  queryByRole,
  fireEvent,
  act,
  within,
  waitFor,
} from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import ResidentPage from 'pages/residents/[id]';
import { useCases } from 'utils/api/cases';
import { useAuth } from 'components/UserContext/UserContext';
import { useTeams, useAllocatedWorkers } from 'utils/api/allocatedWorkers';
import useWorkflows from 'hooks/useWorkflows';
import { mockedUser } from 'factories/users';
import { AppConfigProvider } from 'lib/appConfig';
import { useRouter } from 'next/router';
import { useResident } from 'utils/api/residents';

jest.mock('next/router');
(useRouter as jest.Mock).mockReturnValue({ asPath: '', query: {} });

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

jest.mock('utils/api/residents');
(useResident as jest.Mock).mockReturnValue({
  data: mockedResident,
});

describe('ResidentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it("doesn't let normal users change restricted status", () => {
    (useResident as jest.Mock).mockReturnValue({
      data: { ...mockedResident, restricted: 'Y' },
    });
    render(
      <AppConfigProvider appConfig={{}}>
        <ResidentPage resident={{ ...mockedResident, restricted: 'Y' }} />
      </AppConfigProvider>
    );

    expect(
      queryByRole(
        screen.getByText('Restricted?')?.parentElement as HTMLElement,
        'button'
      )
    ).toBeNull();
  });

  it("shows the resident's ethnicity", async () => {
    (useResident as jest.Mock).mockReturnValue({
      data: { ...mockedResident, ethnicity: 'A.A20' },
    });
    render(
      <AppConfigProvider appConfig={{}}>
        <ResidentPage resident={{ ...mockedResident, ethnicity: 'A.A20' }} />
      </AppConfigProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('See all 23 fields'));
    });

    const personalDetails = screen.getByLabelText('Personal details');
    await waitFor(() => {
      expect(within(personalDetails).getByText('Albanian'));
    });
  });

  it('shows the redirect banner if the redirect url for a workflow is in the url', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: { redirectUrl: 'link' },
    });

    render(
      <AppConfigProvider appConfig={{}}>
        <ResidentPage resident={mockedResident} />
      </AppConfigProvider>
    );

    expect(
      screen.getByText("You're updating this resident as part of a workflow")
    ).toBeVisible();
  });

  it('shows the redirect banner with the correct redirect url', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: { redirectUrl: 'link' },
    });

    render(
      <AppConfigProvider appConfig={{}}>
        <ResidentPage resident={mockedResident} />
      </AppConfigProvider>
    );

    expect(
      screen.getByText('Return to workflow').getAttribute('href')
    ).toContain('link');
  });

  it("doesn't show the redirect banner if there is no redirect url for a workflow in the url", () => {
    render(
      <AppConfigProvider appConfig={{}}>
        <ResidentPage resident={mockedResident} />
      </AppConfigProvider>
    );

    expect(
      screen.queryByText("You're updating this resident as part of a workflow")
    ).toBeNull();
  });
});
