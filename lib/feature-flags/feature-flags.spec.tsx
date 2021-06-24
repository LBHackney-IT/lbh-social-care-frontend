/**
 * Example:
 *
 * <ConditionalFeature name="some-feature">
 *   <div>The feature is active!</div>
 * </ConditionalFeature>
 */

import { render, screen } from '@testing-library/react';

import {
  ConditionalFeature,
  FeatureFlagProvider,
  FeatureSet,
} from './feature-flags';

describe('<ConditionalFeature />', () => {
  it('should render nothing if an unknown feature name is provided', () => {
    const features: FeatureSet = {};

    render(
      <FeatureFlagProvider features={features}>
        <ConditionalFeature name="some-unknown-feature-name">
          <div data-testid="expectedElement">This should not be visible!</div>
        </ConditionalFeature>
      </FeatureFlagProvider>
    );

    const children = screen.queryByTestId('expectedElement');

    expect(children).toBeNull();
  });

  it('should render nothing if a known feature name is provided and that feature is inactive', () => {
    const features: FeatureSet = {
      'some-known-inactive-feature-name': {
        isActive: false,
      },
    };

    render(
      <FeatureFlagProvider features={features}>
        <ConditionalFeature name="some-known-inactive-feature-name">
          <div data-testid="expectedElement">This should be visible!</div>
        </ConditionalFeature>
      </FeatureFlagProvider>
    );

    const children = screen.queryByTestId('expectedElement');

    expect(children).toBeNull();
  });

  it('should render the children if a known feature name is provided and that feature is active', () => {
    const features: FeatureSet = {
      'some-known-active-feature-name': {
        isActive: true,
      },
    };

    render(
      <FeatureFlagProvider features={features}>
        <ConditionalFeature name="some-known-active-feature-name">
          <div data-testid="expectedElement">This should be visible!</div>
        </ConditionalFeature>
      </FeatureFlagProvider>
    );

    screen.getByTestId('expectedElement');
  });

  it('should throw an exception if feature flag context is not provided', () => {
    expect(() => {
      render(<ConditionalFeature name="some-known-active-feature-name" />);
    }).toThrow(
      'A <FeatureFlagProvider /> must be provided as a parent of this component'
    );
  });
});
