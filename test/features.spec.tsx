import { getFeatureFlags } from 'features';
import { mockedUser } from 'factories/users';

describe('Test feature-flags-implementation-proof-with-user-permission feature flag', () => {
  it('should returns false if no parameters are passed', () => {
    const featureFlagResult = getFeatureFlags({
      environmentName: '',
      user: undefined,
    });
    expect(
      featureFlagResult[
        'feature-flags-implementation-proof-with-user-permission'
      ].isActive
    ).toBe(false);
  });

  it('should returns true if the environment name is development', () => {
    const featureFlagResult = getFeatureFlags({
      environmentName: 'development',
      user: undefined,
    });
    expect(
      featureFlagResult[
        'feature-flags-implementation-proof-with-user-permission'
      ].isActive
    ).toBe(true);
  });

  it('should returns false if the user is not an admin', () => {
    mockedUser.hasAdminPermissions = false;
    const featureFlagResult = getFeatureFlags({
      environmentName: '',
      user: mockedUser,
    });
    expect(
      featureFlagResult[
        'feature-flags-implementation-proof-with-user-permission'
      ].isActive
    ).toBe(false);
  });

  it('should returns true if the user is an admin', () => {
    mockedUser.hasAdminPermissions = true;
    const featureFlagResult = getFeatureFlags({
      environmentName: '',
      user: mockedUser,
    });
    expect(
      featureFlagResult[
        'feature-flags-implementation-proof-with-user-permission'
      ].isActive
    ).toBe(true);
  });

  it('should returns true if the user is an admin and environment is production', () => {
    mockedUser.hasAdminPermissions = true;
    const featureFlagResult = getFeatureFlags({
      environmentName: 'production',
      user: mockedUser,
    });
    expect(
      featureFlagResult[
        'feature-flags-implementation-proof-with-user-permission'
      ].isActive
    ).toBe(true);
  });

  it('should returns false if the user is not an admin and environment is production', () => {
    mockedUser.hasAdminPermissions = false;
    const featureFlagResult = getFeatureFlags({
      environmentName: 'production',
      user: mockedUser,
    });
    expect(
      featureFlagResult[
        'feature-flags-implementation-proof-with-user-permission'
      ].isActive
    ).toBe(false);
  });
});
