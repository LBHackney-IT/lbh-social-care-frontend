import { render, screen } from '@testing-library/react';
import {
  FeatureFlagProvider,
  FeatureSet,
} from '../../lib/feature-flags/feature-flags';

import Layout from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
  }),
}));

jest.mock('./Header/Header', () => () => 'Header');
jest.mock('./PhaseBanner/PhaseBanner', () => () => 'MockedPhaseBanner');

const features: FeatureSet = {
  'workflows-pilot': {
    isActive: false,
  },
};

describe('Layout component', () => {
  it('should render properly', async () => {
    const { asFragment } = render(
      <FeatureFlagProvider features={features}>
        <Layout goBackButton={false} noLayout={false}>
          <p>I am the children</p>
        </Layout>
      </FeatureFlagProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('when workflows pilot feature flag is on', () => {
    it('displays the onboarding dialog', () => {
      render(
        <FeatureFlagProvider
          features={{
            'workflows-pilot': {
              isActive: true,
            },
          }}
        >
          <Layout goBackButton={false} noLayout={false}>
            <p>I am the children</p>
          </Layout>
        </FeatureFlagProvider>
      );

      expect(
        screen.queryByText(
          "Good news! You're part of the brand new workflow pilot."
        )
      ).toBeVisible();
    });
  });

  describe('when workflows pilot feature flag is off', () => {
    it("doesn't display the onboarding dialog", () => {
      render(
        <FeatureFlagProvider
          features={{
            'workflows-pilot': {
              isActive: false,
            },
          }}
        >
          <Layout goBackButton={false} noLayout={false}>
            <p>I am the children</p>
          </Layout>
        </FeatureFlagProvider>
      );

      expect(
        screen.queryByText(
          "Good news! You're part of the brand new workflow pilot."
        )
      ).not.toBeInTheDocument();
    });
  });
});
