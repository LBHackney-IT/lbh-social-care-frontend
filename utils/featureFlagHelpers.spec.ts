import { getFeatureFlags } from 'features';
import { FeatureSet } from 'lib/feature-flags/feature-flags';
import { isFeatureFlagActive } from './featureFlagHelpers';

jest.mock('features');
const mockedGetFeatureFlags = getFeatureFlags as jest.Mocked<
  typeof getFeatureFlags
>;

describe('featureFlagHelpers', () => {
  describe('isFeatureFlagActive', () => {
    it('should return true if the feature is active', () => {
      const stubbedFeatures: FeatureSet = {
        'test-feature': {
          isActive: true,
        },
      };

      (mockedGetFeatureFlags as jest.Mock).mockReturnValueOnce(stubbedFeatures);

      const someFeatureIsActive = isFeatureFlagActive('test-feature');

      expect(someFeatureIsActive).toBe(true);
    });

    it('should return false if the feature is not active', () => {
      const stubbedFeatures: FeatureSet = {
        'test-feature': {
          isActive: false,
        },
      };

      (mockedGetFeatureFlags as jest.Mock).mockReturnValueOnce(stubbedFeatures);

      const someFeatureIsActive = isFeatureFlagActive('test-feature');

      expect(someFeatureIsActive).toBe(false);
    });
  });
});
