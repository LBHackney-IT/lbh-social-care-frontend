import { render, screen } from '@testing-library/react';
import {
  FeatureFlagProvider,
  FeatureSet,
} from 'lib/feature-flags/feature-flags';

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

process.env.NEXT_PUBLIC_WORKFLOWS_PILOT_URL = 'http://example.com';

describe(`DashboardWrapper`, () => {
  it('should render properly', () => {
    const { asFragment } = render(
      <FeatureFlagProvider features={features}>
        <DashboardWrapper>
          <div>foo</div>
        </DashboardWrapper>
      </FeatureFlagProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays link for workflows if workflows pilot feature flag is on', () => {
    render(
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
    );

    expect(screen.queryByText('Workflows')).toBeVisible();
    expect(screen.queryByText('Workflows')).toHaveAttribute(
      'href',
      'http://example.com'
    );
  });

  it('does not display link for workflows if workflows pilot feature flag is off', () => {
    render(
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
    );

    expect(screen.queryByText('Workflows')).not.toBeInTheDocument();
  });
});
