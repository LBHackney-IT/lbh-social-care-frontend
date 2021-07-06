import { FeatureSet } from 'lib/feature-flags/feature-flags';
import { isFeatureFlagActive } from './featureFlags';

describe('featureFlags', () => {
  describe('isFeatureActive', () => {
    it('should return true if the feature is active', () => {
      const features: FeatureSet = {
        'test-feature': {
          isActive: true,
        },
      };

      const someFeatureIsActive = isFeatureFlagActive('test-feature');

      expect(someFeatureIsActive).toBe(true);
    });
  });
});
