/**
 * Example:
 *
 * <ConditionalFeature name="some-feature">
 *   <div>The feature is active!</div>
 * </ConditionalFeature>
 */

import { render, screen } from '@testing-library/react';

import { ConditionalFeature, FeatureFlagContext } from './feature-flags';

describe('<ConditionalFeature />', () => {
  it('should render nothing if an unknown feature name is provided', () => {
    const features = {};

    render(
      <FeatureFlagContext features={features}>
        <ConditionalFeature name="some-unknown-feature-name">
          <div data-testid="expectedElement">This should not be visible!</div>
        </ConditionalFeature>
      </FeatureFlagContext>
    );

    const children = screen.queryByTestId('expectedElement');

    expect(children).toBeNull();
  });

  it('should render nothing if a known feature name is provided and that feature is inactive', () => {
    const features = {
      'some-known-inactive-feature-name': false,
    };

    render(
      <FeatureFlagContext features={features}>
        <ConditionalFeature name="some-known-inactive-feature-name">
          <div data-testid="expectedElement">This should be visible!</div>
        </ConditionalFeature>
      </FeatureFlagContext>
    );

    const children = screen.queryByTestId('expectedElement');

    expect(children).toBeNull();
  });

  it('should render the children if a known feature name is provided and that feature is active', () => {
    const features = {
      'some-known-active-feature-name': true,
    };

    render(
      <FeatureFlagContext features={features}>
        <ConditionalFeature name="some-known-active-feature-name">
          <div data-testid="expectedElement">This should be visible!</div>
        </ConditionalFeature>
      </FeatureFlagContext>
    );

    screen.getByTestId('expectedElement');
  });
});
