import {
  mockedUser,
  mockedAdminUser,
  mockedOnlyAdultUser,
  mockedOnlyChildUser,
} from 'factories/users';
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
      expect(getFormsByUserPermission(mockedOnlyAdultUser)).toEqual([
        'Bar - Adult',
        'Foo - Adult',
      ]);
    });

    it('should work properly - for Children', () => {
      expect(getFormsByUserPermission(mockedOnlyChildUser)).toEqual([
        'Bar - Child',
        'Foo - Child',
      ]);
    });

    it('should work properly - for Admin', () => {
      expect(getFormsByUserPermission(mockedAdminUser)).toEqual([
        'Bar - Adult',
        'Bar - Child',
        'Foo - Adult',
        'Foo - Child',
      ]);
    });

    it('should work properly - for Admin', () => {
      expect(getFormsByUserPermission(mockedUser)).toEqual([
        'Bar - Adult',
        'Bar - Child',
        'Foo - Adult',
        'Foo - Child',
      ]);
    });
  });
});
