import { render, screen } from '@testing-library/react';
import {
  FeatureFlagProvider,
  FeatureSet,
} from 'lib/feature-flags/feature-flags';
import { AppConfigProvider } from 'lib/appConfig';
import DashboardWrapper from './DashboardWrapper';

const mockedUseRouter = { pathname: '/my-cases' };

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

const features: FeatureSet = {
  'workflows-pilot': {
    isActive: false,
  },
};

describe(`DashboardWrapper`, () => {
  it('should render properly', () => {
    const { asFragment } = render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <FeatureFlagProvider features={features}>
          <DashboardWrapper>
            <div>foo</div>
          </DashboardWrapper>
        </FeatureFlagProvider>
      </AppConfigProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays link for workflows if workflows pilot feature flag is on', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <FeatureFlagProvider
          features={{
            'workflows-pilot': {
              isActive: true,
            },
          }}
        >
          <DashboardWrapper>
            <div>foo</div>
          </DashboardWrapper>
        </FeatureFlagProvider>
      </AppConfigProvider>
    );

    expect(screen.queryByText('Workflows')).toBeVisible();
    expect(screen.queryByText('Workflows')).toHaveAttribute(
      'href',
      'http://example.com'
    );
  });

  it('does not display link for workflows if workflows pilot feature flag is off', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <FeatureFlagProvider
          features={{
            'workflows-pilot': {
              isActive: false,
            },
          }}
        >
          <DashboardWrapper>
            <div>foo</div>
          </DashboardWrapper>
        </FeatureFlagProvider>
      </AppConfigProvider>
    );

    expect(screen.queryByText('Workflows')).not.toBeInTheDocument();
  });
});
