import { getPermissionFlag } from './user';

describe('user', () => {
  describe('getPermissionFlag', () => {
    it('should be undefined if admin', () => {
      expect(
        getPermissionFlag({
          hasAdminPermissions: true,
          hasAdultPermissions: true,
          hasChildrenPermissions: false,
        })
      ).toEqual(undefined);
    });

    it('should be undefined if both adult and child', () => {
      expect(
        getPermissionFlag({
          hasAdminPermissions: false,
          hasAdultPermissions: true,
          hasChildrenPermissions: true,
        })
      ).toEqual(undefined);
    });

    it('should be "A" if only adult is true', () => {
      expect(
        getPermissionFlag({
          hasAdminPermissions: false,
          hasAdultPermissions: true,
          hasChildrenPermissions: false,
        })
      ).toEqual('A');
    });

    it('should be "C" if only child is true', () => {
      expect(
        getPermissionFlag({
          hasAdminPermissions: false,
          hasAdultPermissions: false,
          hasChildrenPermissions: true,
        })
      ).toEqual('C');
    });
  });
});
