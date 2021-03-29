import { Factory } from 'fishery';

import { User } from 'types';

export const userFactory = Factory.define<User>(() => ({
  name: 'foo',
  hasAdminPermissions: true,
  hasChildrenPermissions: true,
  hasAdultPermissions: true,
  email: 'foo@bar.com',
  permissionFlag: 'A',
  isAuthorised: true,
}));

export const mockedUser = userFactory.build();
