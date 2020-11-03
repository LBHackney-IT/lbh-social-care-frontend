import { getPermissionFilter } from './user';

describe('user', () => {
  describe('getPermissionFilter', () => {
    it('should be undefined if admin', () => {
      expect(
        getPermissionFilter({
          hasAdminPermissions: true,
          hasAdultPermissions: true,
          hasChildrenPermissions: false,
        })
      ).toEqual(undefined);
    });

    it('should be undefined if both adult and child', () => {
      expect(
        getPermissionFilter({
          hasAdminPermissions: false,
          hasAdultPermissions: true,
          hasChildrenPermissions: true,
        })
      ).toEqual(undefined);
    });

    it('should be "a" if only adult is true', () => {
      expect(
        getPermissionFilter({
          hasAdminPermissions: false,
          hasAdultPermissions: true,
          hasChildrenPermissions: false,
        })
      ).toEqual('a');
    });

    it('should be "c" if only child is true', () => {
      expect(
        getPermissionFilter({
          hasAdminPermissions: false,
          hasAdultPermissions: false,
          hasChildrenPermissions: true,
        })
      ).toEqual('c');
    });
  });
});
