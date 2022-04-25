import { render, fireEvent, within } from '@testing-library/react';
import * as allocatedWorkerAPI from 'utils/api/allocatedWorkers';
import { AppConfigProvider } from 'lib/appConfig';
import UpdateWorkerPage from 'pages/workers/[id]/edit/[[...stepId]]';
import { userFactory } from 'factories/workers';
import * as useWorkers from 'utils/api/workers';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockImplementation(() => ({
    query: { id: 2 },
  })),
  default: {
    events: {
      on: jest.fn(),
    },
  },
}));

jest.spyOn(allocatedWorkerAPI, 'useTeams').mockImplementation(() => ({
  data: {
    teams: [
      { id: 456, name: 'B-Team' },
      { id: 123, name: 'A-Team' },
    ],
  },
  revalidate: jest.fn(),
  mutate: jest.fn(),
  isValidating: false,
}));

describe('WorkersUpdate page', () => {
  it('should diplay the form correctly', () => {
    jest.spyOn(useWorkers, 'useWorkerById').mockImplementation(() => ({
      data: userFactory.build({
        teams: [{ id: 123, name: 'A-Team' }],
      }),
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { getByText } = render(
      <AppConfigProvider appConfig={{}}>
        <UpdateWorkerPage />
      </AppConfigProvider>
    );
    expect(getByText('Worker details')).toBeInTheDocument();
    expect(getByText('First Name')).toBeInTheDocument();
    expect(getByText('Last Name')).toBeInTheDocument();
    expect(
      getByText('Which main service is the worker in?')
    ).toBeInTheDocument();
    expect(getByText('Date Started')).toBeInTheDocument();
    expect(getByText('Save and finish later')).toBeInTheDocument();
    expect(getByText('Continue')).toBeInTheDocument();
  });
  it('should diplay the team dropdown in alphabetical order', () => {
    jest.spyOn(useWorkers, 'useWorkerById').mockImplementation(() => ({
      data: userFactory.build({
        teams: [{ id: 123, name: 'A-Team' }],
      }),
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));

    const { getByText, getByTestId } = render(
      <AppConfigProvider appConfig={{}}>
        <UpdateWorkerPage />
      </AppConfigProvider>
    );

    fireEvent.click(getByText('ASC'));

    expect(
      within(getByTestId('team')).getAllByRole('option')[1]
    ).toHaveTextContent('A-Team');
    expect(
      within(getByTestId('team')).getAllByRole('option')[2]
    ).toHaveTextContent('B-Team');
  });
});
