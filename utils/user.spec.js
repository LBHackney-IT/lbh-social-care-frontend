import {
  isOnlyAdult,
  isOnlyChildren,
  getPermissionFlag,
  getUserType,
} from './user';

const PERMISSIONS = {
  ONLY_ADULT: {
    hasAdminPermissions: false,
    hasAdultPermissions: true,
    hasChildrenPermissions: false,
  },
  ONLY_CHILDREN: {
    hasAdminPermissions: false,
    hasAdultPermissions: false,
    hasChildrenPermissions: true,
  },
  ONLY_ADMIN: {
    hasAdminPermissions: true,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
  },
  ADMIN_AND_ADULT: {
    hasAdminPermissions: true,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
  },
  ADMIN_AND_CHILDREN: {
    hasAdminPermissions: true,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
  },
  ADMIN_AND_ADULT_AND_CHILDREN: {
    hasAdminPermissions: true,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
  },
  ADULT_AND_CHILDREN: {
    hasAdminPermissions: true,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
  },
};

describe('user', () => {
  describe('isOnlyAdult', () => {
    it('should be false if admin', () => {
      expect(isOnlyAdult(PERMISSIONS.ADMIN_AND_ADULT)).toEqual(false);
    });
    it('should be false if both adult and child', () => {
      expect(isOnlyAdult(PERMISSIONS.ADULT_AND_CHILDREN)).toEqual(false);
    });
    it('should be true if only adult is true', () => {
      expect(isOnlyAdult(PERMISSIONS.ONLY_ADULT)).toEqual(true);
    });
    it('should be false if only child is true', () => {
      expect(isOnlyAdult(PERMISSIONS.ONLY_CHILDREN)).toEqual(false);
    });
  });

  describe('isOnlyChildren', () => {
    it('should be false if admin', () => {
      expect(isOnlyChildren(PERMISSIONS.ADMIN_AND_CHILDREN)).toEqual(false);
    });
    it('should be false if both adult and child', () => {
      expect(isOnlyChildren(PERMISSIONS.ADULT_AND_CHILDREN)).toEqual(false);
    });
    it('should be false if only adult is true', () => {
      expect(isOnlyChildren(PERMISSIONS.ONLY_ADULT)).toEqual(false);
    });
    it('should be true if only child is true', () => {
      expect(isOnlyChildren(PERMISSIONS.ONLY_CHILDREN)).toEqual(true);
    });
  });

  describe('getPermissionFlag', () => {
    it('should be undefined if admin', () => {
      expect(getPermissionFlag(PERMISSIONS.ADMIN_AND_ADULT)).toEqual(undefined);
    });
    it('should be undefined if both adult and child', () => {
      expect(getPermissionFlag(PERMISSIONS.ADULT_AND_CHILDREN)).toEqual(
        undefined
      );
    });
    it('should be "A" if only adult is true', () => {
      expect(getPermissionFlag(PERMISSIONS.ONLY_ADULT)).toEqual('A');
    });
    it('should be "C" if only child is true', () => {
      expect(getPermissionFlag(PERMISSIONS.ONLY_CHILDREN)).toEqual('C');
    });
  });

  describe('getUserType', () => {
    it('should be "Admin" if admin', () => {
      expect(getUserType(PERMISSIONS.ADMIN_AND_ADULT)).toEqual('Admin');
    });
    it('should be "Admin" if both adult and child', () => {
      expect(getUserType(PERMISSIONS.ADULT_AND_CHILDREN)).toEqual('Admin');
    });
    it('should be "Adult" if only adult is true', () => {
      expect(getUserType(PERMISSIONS.ONLY_ADULT)).toEqual('Adult');
    });
    it('should be "Children" if only child is true', () => {
      expect(getUserType(PERMISSIONS.ONLY_CHILDREN)).toEqual('Children');
    });
    it('should return undefined if no user is passed', () => {
      expect(getUserType()).toBeUndefined();
    });
  });
});
