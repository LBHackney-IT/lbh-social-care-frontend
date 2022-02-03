import { sign } from 'jsonwebtoken';

const dateToUnix = (date: Date): number => Math.floor(date.getTime() / 1000);

const makeToken = ({
  sub = '49516349857314',
  email = 'test@example.com',
  iss = 'Hackney',
  name = 'example user',
  groups = ['test-group'],
  iat = new Date(),
}) =>
  sign(
    { sub, email, iss, name, groups, iat: dateToUnix(iat) },
    Cypress.env('HACKNEY_AUTH_TOKEN_SECRET')
  );

export enum AuthRoles {
  ChildrensGroup = 'ChildrensGroup',
  ChildrensUnrestrictedGroup = 'ChildrensUnrestrictedGroup',
  ChildrensSafeguardingReviewingGroup = 'ChildrensSafeguardingReviewingGroup',
  ChildrensPlacementManagmenetGroup = 'ChildrensPlacementManagmenetGroup',
  AdultsGroup = 'AdultsGroup',
  AdultsAllocatorGroup = 'AdultsAllocatorGroup',
  AdultsUnrestrictedGroup = 'AdultsUnrestrictedGroup',
  AdminDevGroup = 'AdminDevGroup',
}

type RoleConfig = {
  tokenValue: string;
};

const roleConfigurations: Record<AuthRoles, RoleConfig> = {
  ChildrensGroup: {
    tokenValue: Cypress.env('TEST_KEY_CHILDREN_GROUP'),
  },
  ChildrensSafeguardingReviewingGroup: {
    tokenValue: Cypress.env('TEST_KEY_CHILDREN_SAFEGUARDING_REVIEWING_GROUP'),
  },
  ChildrensPlacementManagmenetGroup: {
    tokenValue: Cypress.env('TEST_KEY_CHILDREN_PLACEMENT_MANAGEMENT_GROUP'),
  },
  ChildrensUnrestrictedGroup: {
    tokenValue: Cypress.env('TEST_KEY_CHILDREN_UNRESTRICTED_GROUP'),
  },
  AdultsGroup: {
    tokenValue: Cypress.env('TEST_KEY_ADULT_GROUP'),
  },
  AdultsAllocatorGroup: {
    tokenValue: Cypress.env('TEST_KEY_ADULT_ALLOCATOR_GROUP'),
  },
  AdultsUnrestrictedGroup: {
    tokenValue: Cypress.env('TEST_KEY_ADULT_UNRESTRICTED_GROUP'),
  },
  AdminDevGroup: {
    tokenValue: Cypress.env('TEST_KEY_ADMIN_DEV'),
  },
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      visitAs: typeof visitAs;
    }
  }
}

/**
 * Visit the given url
 *
 * @param {string} url The URL to visit. If relative uses `baseUrl`
 * @param {AuthRoles} role The user role to act as for this request
 * @param {VisitOptions} [options] Pass in an options object to change the default behavior of the underlying `cy.visit()` call
 * @example
 *    cy.visitAs('http://localhost:3000', AuthRoles.ChildrensGroup)
 *    cy.visitAs('/somewhere' AuthRoles.AdultsGroup) // opens ${baseUrl}/somewhere
 *    cy.visitAs('/' AuthRoles.AdminDevGroup, {
 *      method: 'POST'
 *    })
 *
 */
const visitAs = (
  url: string,
  role: AuthRoles,
  options?: Partial<Cypress.VisitOptions>
) => {
  // const config = roleConfigurations[role];

  cy.setCookie(
    'hackneyToken',
    makeToken({
      groups: [role],
    })
  );
  cy.getCookie('hackneyToken').should(
    'have.property',
    'value',
    makeToken({
      groups: [role],
    })
  );

  cy.visit(url, options);
};

Cypress.Commands.add('visitAs', visitAs);
