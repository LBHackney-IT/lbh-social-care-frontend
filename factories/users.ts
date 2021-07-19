import { Factory } from 'fishery';

import { User } from 'types';

export const userFactory = Factory.define<User>(() => ({
  name: 'foo',
  hasAdminPermissions: true,
  hasChildrenPermissions: true,
  hasAdultPermissions: true,
  hasDevPermissions: false,
  isAuditable: false,
  email: 'foo@bar.com',
  permissionFlag: 'A',
  isAuthorised: true,
}));

export const mockedOnlyAdultUser = userFactory.build({
  hasAdminPermissions: false,
  hasChildrenPermissions: false,
  hasDevPermissions: false,
});

export const mockedOnlyChildUser = userFactory.build({
  hasAdminPermissions: false,
  hasAdultPermissions: false,
  hasDevPermissions: false,
});

export const mockedAdminUser = userFactory.build({
  hasDevPermissions: false,
});

export const mockedUser = userFactory.build();
