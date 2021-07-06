import { getFeatureFlags } from '../features';

export const isFeatureFlagActive = (featureName: string) => {
  const features = getFeatureFlags();

  return features[featureName].isActive;
};
