/**
 * Example:
 *
 * <ConditionalFeature name="some-feature">
 *   <div>The feature is active!</div>
 * </ConditionalFeature>
 */

import { render, screen } from '@testing-library/react';

import { ConditionalFeature } from './feature-flags';

describe('<ConditionalFeature />', () => {
  it('should render nothing if an unknown feature name is provided', () => {
    render(
      <ConditionalFeature name="some-unknown-feature-name">
        <h1>This should not be visible!</h1>
      </ConditionalFeature>
    );

    const children = screen.queryByText('This should not be visible!');

    expect(children).toBeNull();
  });
});
