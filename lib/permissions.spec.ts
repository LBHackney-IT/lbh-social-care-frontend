import { residentFactory } from '../factories/residents';
import { userFactory } from '../factories/users';

import {
  canUserEditPerson,
  canManageCases,
  canViewRelationships,
  canUserAllocateWorkerToPerson,
  canAddWorkflow,
} from './permissions';

const users = {
  none: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  admin: userFactory.build({
    hasAdminPermissions: true,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  adminUnrestricted: userFactory.build({
    hasAdminPermissions: true,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: true,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  dev: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: true,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  adults: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: true,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  adultsUnrestricted: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: true,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: true,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  adultsAllocator: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: true,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: false,
    hasAllocationsPermissions: true,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  adultsInWorkflowsPilot: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: true,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: true,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  childrens: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: false,
    hasChildrenPermissions: true,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  childrensUnrestricted: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: false,
    hasChildrenPermissions: true,
    hasUnrestrictedPermissions: true,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: false,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  childrensInWorkflowsPilot: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: false,
    hasChildrenPermissions: true,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: false,
    hasAllocationsPermissions: false,
    isInWorkflowsPilot: true,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
  inWorkflowPilot: userFactory.build({
    hasAdminPermissions: false,
    hasAdultPermissions: false,
    hasChildrenPermissions: false,
    hasUnrestrictedPermissions: false,
    hasDevPermissions: false,
    hasAllocationsPermissions: true,
    isInWorkflowsPilot: true,
    isInSafeguardingReviewing: false,
    isInPlacementManagementUnit: false,
  }),
};

describe('permissions', () => {
  describe('#canUserEditPerson()', () => {
    it('should return false when the user has no permissions', () => {
      expect(
        canUserEditPerson(
          users.none,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in CFS and the resident is a child', () => {
      expect(
        canUserEditPerson(
          users.childrens,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is in CFS, has unrestricted permissions, and the resident is a restricted child', () => {
      expect(
        canUserEditPerson(
          users.childrensUnrestricted,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in CFS, does not have unrestricted permissions, and the resident is a restricted child', () => {
      expect(
        canUserEditPerson(
          users.childrens,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in ASC and the resident is an adult', () => {
      expect(
        canUserEditPerson(
          users.adults,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is in ASC, has unrestricted permissions, and the resident is a restricted adult', () => {
      expect(
        canUserEditPerson(
          users.adultsUnrestricted,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in ASC, does not have unrestricted permissions, and the resident is a restricted adult', () => {
      expect(
        canUserEditPerson(
          users.adults,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is an admin and the resident is not restricted', () => {
      expect(
        canUserEditPerson(
          users.admin,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is an admin, has unrestricted permissions, and the resident is restricted', () => {
      expect(
        canUserEditPerson(
          users.adminUnrestricted,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is an admin and the resident is restricted', () => {
      expect(
        canUserEditPerson(
          users.admin,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });
  });

  describe('#canManageCases()', () => {
    it('should return false when the user has no permissions', () => {
      expect(
        canManageCases(
          users.none,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in ACS and the person is an adult', () => {
      expect(
        canManageCases(
          users.adults,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in ACS and the person is a restricted adult', () => {
      expect(
        canManageCases(
          users.adults,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in ACS, has unrestricted access, and the person is a restricted adult', () => {
      expect(
        canManageCases(
          users.adultsUnrestricted,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is in CFS and the person is a child', () => {
      expect(
        canManageCases(
          users.childrens,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in CFS and the person is a restricted child', () => {
      expect(
        canManageCases(
          users.childrens,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is in CFS, has unrestricted access, and the person is a restricted child', () => {
      expect(
        canManageCases(
          users.childrensUnrestricted,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is an admin and the person is not restricted', () => {
      expect(
        canManageCases(
          users.admin,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is an admin and the person is restricted', () => {
      expect(
        canManageCases(
          users.admin,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is an admin, has unrestricted access, and the person is restricted', () => {
      expect(
        canManageCases(
          users.adminUnrestricted,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });
  });

  describe('#canViewRelationships()', () => {
    it('should return false when the user has no permissions', () => {
      expect(
        canViewRelationships(
          users.none,
          residentFactory.build({
            restricted: 'N',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return true when the user is a dev', () => {
      expect(
        canViewRelationships(
          users.dev,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user has children permissions and the resident is a child', () => {
      expect(
        canViewRelationships(
          users.childrens,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user has adult permissions and the resident is an adult', () => {
      expect(
        canViewRelationships(
          users.adults,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });
    it('should return false when the user has adult permissions and the resident is a child', () => {
      expect(
        canViewRelationships(
          users.adults,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });
    it('should return false when the user has children permissions and the resident is an adult', () => {
      expect(
        canViewRelationships(
          users.childrens,
          residentFactory.build({
            restricted: 'Y',
            contextFlag: 'A',
          })
        )
      ).toEqual(false);
    });
  });

  describe('#canUserAllocateWorkerToPerson()', () => {
    it('should return true when the user is an admin', () => {
      expect(
        canUserAllocateWorkerToPerson(users.admin, residentFactory.build())
      ).toEqual(true);
    });

    it('should return true when the user is a dev', () => {
      expect(
        canUserAllocateWorkerToPerson(users.dev, residentFactory.build())
      ).toEqual(true);
    });

    it('should return true when the user is in the childrens group and the resident is a child', () => {
      expect(
        canUserAllocateWorkerToPerson(
          users.dev,
          residentFactory.build({
            contextFlag: 'C',
          })
        )
      ).toEqual(true);
    });

    it('should return true when the user is in the adults group and the resident is an adult and the user has the allocators permission', () => {
      expect(
        canUserAllocateWorkerToPerson(
          users.adultsAllocator,
          residentFactory.build({
            contextFlag: 'A',
          })
        )
      ).toEqual(true);
    });

    it('should return false when the user is in the adults group and the resident is an adult and the user does not have the allocators permission', () => {
      expect(
        canUserAllocateWorkerToPerson(
          users.adults,
          residentFactory.build({
            contextFlag: 'A',
          })
        )
      ).toEqual(false);
    });

    it('should return false when the user is in the adults group and the resident is a child', () => {
      expect(
        canUserAllocateWorkerToPerson(
          users.adults,
          residentFactory.build({
            contextFlag: 'C',
          })
        )
      ).toEqual(false);
    });

    it('should return false when the user is in the childrens group and the resident is an adult', () => {
      expect(
        canUserAllocateWorkerToPerson(
          users.childrens,
          residentFactory.build({
            contextFlag: 'A',
          })
        )
      ).toEqual(false);
    });
  });

  describe('#canAddWorkflow()', () => {
    it('should return false when the user has no permissions', () => {
      expect(canAddWorkflow(users.none)).toEqual(false);
    });

    it('should return true when the user is a dev', () => {
      expect(canAddWorkflow(users.dev)).toEqual(true);
    });

    it('should return true when the user is an admin', () => {
      expect(canAddWorkflow(users.admin)).toEqual(true);
    });

    it('should return true when the user in the workflows pilot', () => {
      expect(canAddWorkflow(users.inWorkflowPilot)).toEqual(true);
    });

    it('should return true when the user in ASC and the workflows pilot', () => {
      expect(canAddWorkflow(users.adultsInWorkflowsPilot)).toEqual(true);
    });

    it('should return false when the user in ASC and not in the workflows pilot', () => {
      expect(canAddWorkflow(users.adults)).toEqual(false);
    });

    it('should return true when the user in CFS and the workflows pilot', () => {
      expect(canAddWorkflow(users.childrensInWorkflowsPilot)).toEqual(true);
    });

    it('should return false when the user in CFS and not in the workflows pilot', () => {
      expect(canAddWorkflow(users.childrens)).toEqual(false);
    });
  });
});
