import { ConditionalFeature } from '../hooks/use-feature-flags';

const getLocalStorageFlagValue = (flagName: string): 'active' | 'inactive' => {
  if (typeof window === 'undefined') {
    return 'inactive';
  }

  const value = window.localStorage.getItem(`feature-flag:${flagName}`);

  if (value !== 'active') {
    return 'inactive';
  }

  return 'active';
};

export const getFeatureFlags = (): ConditionalFeature[] => {
  return [
    {
      // FEATURE-FLAG-EXPIRES[2021-06-30]
      name: 'dashboard',
      get isActive() {
        if (getLocalStorageFlagValue('dashboard') === 'active') {
          return true;
        }

        if (process.env.NEXT_PUBLIC_FEATURE_FLAG_DASHBOARD === 'active') {
          return true;
        }

        return false;
      },
    },
    {
      // FEATURE-FLAG-EXPIRES[2022-01-01]
      name: 'some-custom-feature',
      get isActive() {
        return Math.random() > 0.5;
      },
    },
  ];
};

export const isFeatureActive = (featureName: string): boolean => {
  const features = getFeatureFlags();

  const feature = features.find(({ name }) => name === featureName);

  if (!feature) {
    return false;
  }

  return feature.isActive || false;
};
