import { FeatureSet } from 'lib/feature-flags/feature-flags';

export const getFeatureFlags = (): FeatureSet => {
  return featureFlags;
};

const featureFlags: FeatureSet = {
  // FEATURE-FLAG-EXPIRES [3000-12-31]: feature-flags-implementation-proof
  'feature-flags-implementation-proof': {
    isActive: false,
  },

  /*
    The feature-flags-implementation-proof has been setup to have an expiry date in the far future.
    The FEATURE-FLAG-EXPIRES comment above will cause ESLint errors once the date in the square brackets has passed.
    Add feature flags below following the format in the example shown.
    */
};
