import { render, screen } from '@testing-library/react';
import PersonDetails from './PersonDetails';
import { AuthProvider } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
import { mockedResident } from 'factories/residents';
import { FeatureFlagProvider } from 'lib/feature-flags/feature-flags';

jest.mock('next/router', () => ({
  __esModule: true,
  default: {
    events: {
      on: jest.fn(),
    },
    push: jest.fn(),
  },
  useRouter: () => ({
    query: { foo: 'bar' },
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));

describe('PersonDetails component', () => {
  it('should render properly', () => {
    render(
      <AuthProvider user={mockedUser}>
        <FeatureFlagProvider features={{}}>
          <PersonDetails person={mockedResident} />
        </FeatureFlagProvider>
      </AuthProvider>
    );
    expect(screen.getByText('Personal details'));
    expect(screen.getAllByRole('heading').length).toBe(2);
    expect(screen.getAllByRole('definition').length).toBe(6);
  });

  it('only shows health info if there is data to show', () => {
    render(
      <AuthProvider user={mockedUser}>
        <FeatureFlagProvider features={{}}>
          <PersonDetails person={{ ...mockedResident, nhsNumber: undefined }} />
        </FeatureFlagProvider>
      </AuthProvider>
    );
    expect(screen.queryByText('Medical and health')).toBeNull();
  });

  it('should not render the "Edit" button if the current user is of a different type to the resident', async () => {
    render(
      <AuthProvider
        user={{
          ...mockedUser,
          hasAdultPermissions: false,
          hasAdminPermissions: false,
        }}
      >
        <FeatureFlagProvider features={{}}>
          <PersonDetails person={mockedResident} />
        </FeatureFlagProvider>
      </AuthProvider>
    );
    expect(screen.queryByText('Edit details')).toBeNull();
  });

  it('should not render the "Edit" button if the current user is of the same context type as the resident, but the resident is restricted and the user does not have unrestricted access', async () => {
    render(
      <AuthProvider
        user={{
          ...mockedUser,
          hasUnrestrictedPermissions: false,
          hasDevPermissions: false,
          hasAdminPermissions: false,
        }}
      >
        <FeatureFlagProvider features={{}}>
          <PersonDetails person={{ ...mockedResident, restricted: 'Y' }} />
        </FeatureFlagProvider>
      </AuthProvider>
    );
    expect(screen.queryByText('Edit details')).toBeNull();
  });

  it('should render the "Edit" button if the resident is an adult and the user is in ASC', async () => {
    render(
      <AuthProvider user={mockedUser}>
        <FeatureFlagProvider features={{}}>
          <PersonDetails person={mockedResident} />
        </FeatureFlagProvider>
      </AuthProvider>
    );
    expect(screen.getByText('Edit details'));
  });

  it('should render the "Edit" button if the resident is a child and the user is in CFS', async () => {
    render(
      <AuthProvider user={mockedUser}>
        <FeatureFlagProvider features={{}}>
          <PersonDetails person={{ ...mockedResident, contextFlag: 'C' }} />
        </FeatureFlagProvider>
      </AuthProvider>
    );
    expect(screen.getByText('Edit details'));
  });
});
