import { FeatureSet } from 'lib/feature-flags/feature-flags';
import { User } from 'types';

type FeatureFlagOptions = {
  environmentName: string;
  user: User | undefined;
};

export const getFeatureFlags = ({
  environmentName,
  user,
}: FeatureFlagOptions): FeatureSet => {
  const featureFlags: FeatureSet = {
    // FEATURE-FLAG-EXPIRES [3000-12-31]: feature-flags-implementation-proof
    'feature-flags-implementation-proof': {
      isActive: environmentName === 'development',
    },
    // FEATURE-FLAG-EXPIRES [3000-12-31]: feature-flags-implementation-proof-with-user-permission
    'feature-flags-implementation-proof-with-user-permission': {
      isActive:
        environmentName === 'development' || user?.hasAdminPermissions || false,
    },
    // FEATURE-FLAG-EXPIRES [3000-12-31]: feature-flags-implementation-proof-with-dev-permission
    'feature-flags-implementation-proof-with-dev-permission': {
      isActive:
        environmentName === 'development' || user?.hasDevPermissions || false,
    },
    // FEATURE-FLAG-EXPIRES [2022-06-31]: case-notes-deletion
    'case-notes-deletion': {
      isActive:
        environmentName === 'development' || user?.hasDevPermissions || false,
    },
    // FEATURE-FLAG-EXPIRES [2022-06-31]: case-status
    'case-status': {
      isActive:
        environmentName === 'development' || user?.hasAdminPermissions || false,
    },
    // FEATURE-FLAG-EXPIRES [2022-02-25]: case-status
    'preview-new-resident-view': {
      isActive: true,
    },
    /*
      The feature-flags-implementation-proof has been setup to have an expiry date in the far future.
      The FEATURE-FLAG-EXPIRES comment above will cause ESLint errors once the date in the square brackets has passed.
      Add feature flags below following the format in the example shown.
     */
  };

  return featureFlags;
};
