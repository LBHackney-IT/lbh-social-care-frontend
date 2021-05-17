export enum AuthRoles {
  ChildrensGroup = 'ChildrensGroup',
  ChildrensUnrestrictedGroup = 'ChildrensUnrestrictedGroup',
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
  const config = roleConfigurations[role];

  cy.setCookie('hackneyToken', config.tokenValue);
  cy.getCookie('hackneyToken').should(
    'have.property',
    'value',
    config.tokenValue
  );

  cy.visit(url, options);
};

Cypress.Commands.add('visitAs', visitAs);
