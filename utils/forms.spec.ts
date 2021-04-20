import { getFormsByUserPermission } from './forms';

jest.mock('data/formFilterNames/adultFormNames', () => [
  'Bar - Adult',
  'Foo - Adult',
]);

jest.mock('data/formFilterNames/childFormNames', () => [
  'Bar - Child',
  'Foo - Child',
]);

describe('forms', () => {
  describe('getFormsByUserPermission', () => {
    it('should work properly - for Adults', () => {
      expect(
        getFormsByUserPermission({
          hasAdultPermissions: true,
          hasChildrenPermissions: false,
          hasAdminPermissions: false,
        })
      ).toEqual(['Bar - Adult', 'Foo - Adult']);
    });

    it('should work properly - for Children', () => {
      expect(
        getFormsByUserPermission({
          hasChildrenPermissions: true,
          hasAdminPermissions: false,
          hasAdultPermissions: false,
        })
      ).toEqual(['Bar - Child', 'Foo - Child']);
    });

    it('should work properly - for Admin', () => {
      expect(
        getFormsByUserPermission({
          hasAdminPermissions: true,
          hasChildrenPermissions: false,
          hasAdultPermissions: false,
        })
      ).toEqual(['Bar - Adult', 'Bar - Child', 'Foo - Adult', 'Foo - Child']);
    });
  });
});
