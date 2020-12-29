import { getPermissionFlag, getUserType } from './user';

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

  describe('getUserType', () => {
    it('should be "Admin" if admin', () => {
      expect(
        getUserType({
          hasAdminPermissions: true,
          hasAdultPermissions: true,
          hasChildrenPermissions: false,
        })
      ).toEqual('Admin');
    });

    it('should be "Admin" if both adult and child', () => {
      expect(
        getUserType({
          hasAdminPermissions: false,
          hasAdultPermissions: true,
          hasChildrenPermissions: true,
        })
      ).toEqual('Admin');
    });

    it('should be "Adult" if only adult is true', () => {
      expect(
        getUserType({
          hasAdminPermissions: false,
          hasAdultPermissions: true,
          hasChildrenPermissions: false,
        })
      ).toEqual('Adult');
    });

    it('should be "Children" if only child is true', () => {
      expect(
        getUserType({
          hasAdminPermissions: false,
          hasAdultPermissions: false,
          hasChildrenPermissions: true,
        })
      ).toEqual('Children');
    });
  });
});
