import { render, screen } from '@testing-library/react';
import { AuthProvider } from 'components/UserContext/UserContext';
import { mockedResident } from 'factories/residents';
import {
  mockedOnlyChildUser,
  mockedUser,
  mockedOnlyAdultUser,
  mockedUserInWorkflowsPilot,
} from 'factories/users';
import * as relationshipsAPI from 'utils/api/relationships';
import Layout from './Layout';
import 'next/router';

import {
  FeatureFlagProvider,
  FeatureSet,
} from 'lib/feature-flags/feature-flags';

import {
  mockedRelationshipData,
  mockedExistingRelationship,
} from 'factories/relationships';

import { AppConfigProvider } from 'lib/appConfig';

const mockedUseRouter = {
  query: { foo: 'bar' },
  replace: jest.fn(),
  pathname: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

const features: FeatureSet = {
  'workflows-pilot': {
    isActive: false,
  },
};

describe('Layout', () => {
  it('renders children, navigation and a primary action', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <FeatureFlagProvider features={features}>
            <Layout person={mockedResident}>Foo</Layout>
          </FeatureFlagProvider>
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.getByText('Foo'));
    expect(screen.getByText('Add something new'));
    expect(screen.getByRole('navigation'));
    expect(screen.getByText('Timeline'));
  });

  it("renders the user's name and caption", () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedUser}>
          <FeatureFlagProvider features={features}>
            <Layout person={mockedResident}>Foo</Layout>
          </FeatureFlagProvider>
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.getByText('Foo Bar'));
    expect(screen.getByText('#1 · Born 13 Nov 2020'));
  });

  it('displays correctly the number of relationships', () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: mockedResident.id,
        personalRelationships: [
          mockedRelationshipData.build({
            type: 'parent',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Neil',
                lastName: 'Muciaccia',
              }),
              mockedExistingRelationship.build({
                firstName: 'Giovanni',
                lastName: 'Muciaccia',
              }),
            ],
          }),
          mockedRelationshipData.build({
            type: 'child',
            relationships: [
              mockedExistingRelationship.build({
                firstName: 'Oppo',
                lastName: 'Muciaccia',
              }),
            ],
          }),
        ],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedOnlyChildUser}>
          <FeatureFlagProvider features={features}>
            <Layout person={mockedResident}>Foo</Layout>
          </FeatureFlagProvider>
        </AuthProvider>
      </AppConfigProvider>
    );

    const parentsRow = screen.queryByText('Relationships (3)');
    expect(parentsRow).not.toBeNull();
  });

  it('displays no relationship count where the received object is empty', () => {
    jest.spyOn(relationshipsAPI, 'useRelationships').mockImplementation(() => ({
      data: {
        personId: mockedResident.id,
        personalRelationships: [],
      },
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));

    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedOnlyChildUser}>
          <FeatureFlagProvider features={features}>
            <Layout person={mockedResident}>Foo</Layout>
          </FeatureFlagProvider>
        </AuthProvider>
      </AppConfigProvider>
    );

    const parentsRow = screen.queryByText('Relationships');
    expect(parentsRow).not.toBeNull();
  });

  it("hides the timeline link if the user isn't authorised", () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedOnlyChildUser}>
          <FeatureFlagProvider features={features}>
            <Layout person={mockedResident}>Foo</Layout>
          </FeatureFlagProvider>
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.queryByText('Timeline')).toBe(null);
  });

  it('tells unauthorised users when a resident is restricted', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider user={mockedOnlyAdultUser}>
          <FeatureFlagProvider features={features}>
            <Layout
              person={{
                ...mockedResident,
                restricted: 'Y',
              }}
            >
              Foo
            </Layout>
          </FeatureFlagProvider>
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.getByText('This person is restricted'));
  });

  it("doesn't bother to tell authorised users when a resident is restricted", () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <AuthProvider
          user={{
            ...mockedUser,
            hasUnrestrictedPermissions: true,
          }}
        >
          <FeatureFlagProvider features={features}>
            <Layout
              person={{
                ...mockedResident,
                restricted: 'Y',
              }}
            >
              Foo
            </Layout>
          </FeatureFlagProvider>
        </AuthProvider>
      </AppConfigProvider>
    );
    expect(screen.queryByText('This person is restricted')).toBeNull();
  });

  describe('when workflows pilot feature flag is on', () => {
    it('displays link to start a workflow if user is in workflows pilot', () => {
      render(
        <AppConfigProvider
          appConfig={{ workflowsPilotUrl: 'http://example.com' }}
        >
          <AuthProvider user={mockedUserInWorkflowsPilot}>
            <FeatureFlagProvider
              features={{
                'workflows-pilot': {
                  isActive: true,
                },
              }}
            >
              <Layout
                person={{
                  ...mockedResident,
                  id: 123456789,
                  restricted: 'Y',
                }}
              >
                Foo
              </Layout>
            </FeatureFlagProvider>
          </AuthProvider>
        </AppConfigProvider>
      );

      expect(screen.queryByText('Start workflow')).toBeVisible();
      expect(screen.queryByText('Start workflow')).toHaveAttribute(
        'href',
        'http://example.com/workflows/new?social_care_id=123456789'
      );
    });

    it("doesn't display link to start a workflow if user is in not workflows pilot", () => {
      render(
        <AppConfigProvider
          appConfig={{ workflowsPilotUrl: 'http://example.com' }}
        >
          <AuthProvider user={mockedUser}>
            <FeatureFlagProvider
              features={{
                'workflows-pilot': {
                  isActive: true,
                },
              }}
            >
              <Layout
                person={{
                  ...mockedResident,
                  id: 123456789,
                  restricted: 'Y',
                }}
              >
                Foo
              </Layout>
            </FeatureFlagProvider>
          </AuthProvider>
        </AppConfigProvider>
      );

      expect(screen.queryByText('Start workflow')).not.toBeInTheDocument();
    });

    it('displays link to the workflows for the person', () => {
      render(
        <AppConfigProvider
          appConfig={{ workflowsPilotUrl: 'http://example.com' }}
        >
          <AuthProvider user={mockedUser}>
            <FeatureFlagProvider
              features={{
                'workflows-pilot': {
                  isActive: true,
                },
              }}
            >
              <Layout
                person={{
                  ...mockedResident,
                  id: 123456789,
                  restricted: 'Y',
                }}
              >
                Foo
              </Layout>
            </FeatureFlagProvider>
          </AuthProvider>
        </AppConfigProvider>
      );

      expect(screen.queryByText('Workflows')).toBeVisible();
      expect(screen.queryByText('Workflows')).toHaveAttribute(
        'href',
        'http://example.com?social_care_id=123456789&show_historic=true'
      );
    });
  });

  describe('when workflows pilot feature flag is off', () => {
    it('does not display to start a workflow', () => {
      render(
        <AppConfigProvider
          appConfig={{ workflowsPilotUrl: 'http://example.com' }}
        >
          <AuthProvider user={mockedUser}>
            <FeatureFlagProvider
              features={{
                'workflows-pilot': {
                  isActive: false,
                },
              }}
            >
              <Layout
                person={{
                  ...mockedResident,
                  restricted: 'Y',
                }}
              >
                Foo
              </Layout>
            </FeatureFlagProvider>
          </AuthProvider>
        </AppConfigProvider>
      );

      expect(screen.queryByText('Start workflow')).not.toBeInTheDocument();
    });
  });
});
