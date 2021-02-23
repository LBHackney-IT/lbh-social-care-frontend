import { getFormsByUserPermission } from './forms';

jest.mock('data/googleForms/adultForms', () => [
  {
    text: 'Foo - Adult',
    value: 'https://foo.com',
    category: 'General',
    id: 'foo_adult',
  },
  {
    text: 'Bar - Adult',
    value: 'https://foo.com',
    category: 'General',
  },
]);

jest.mock('data/googleForms/childForms', () => [
  {
    text: 'Foo - Child',
    value: 'https://foo.com',
    category: 'General',
  },
  {
    text: 'Bar - Child',
    value: 'https://foo.com',
    category: 'General',
  },
]);

describe('forms', () => {
  describe('getFormsByUserPermission', () => {
    it('should work properly - for Adults', () => {
      expect(getFormsByUserPermission({ hasAdultPermissions: true })).toEqual([
        { text: 'Bar - Adult', value: 'Bar - Adult' },
        { text: 'Foo - Adult', value: 'foo_adult' },
      ]);
    });

    it('should work properly - for Children', () => {
      expect(
        getFormsByUserPermission({ hasChildrenPermissions: true })
      ).toEqual([
        { text: 'Bar - Child', value: 'Bar - Child' },
        { text: 'Foo - Child', value: 'Foo - Child' },
      ]);
    });

    it('should work properly - for Admin', () => {
      expect(getFormsByUserPermission({ hasAdminPermissions: true })).toEqual([
        { text: 'Bar - Adult', value: 'Bar - Adult' },
        { text: 'Bar - Child', value: 'Bar - Child' },
        { text: 'Foo - Adult', value: 'foo_adult' },
        { text: 'Foo - Child', value: 'Foo - Child' },
      ]);
    });
  });
});
