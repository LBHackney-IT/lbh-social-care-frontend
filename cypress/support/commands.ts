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
    Cypress.env('HACKNEY_JWT_SECRET')
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

const roleConfigurations: Record<AuthRoles, Array<string>> = {
  ChildrensGroup: [Cypress.env('AUTHORISED_CHILD_GROUP')],
  ChildrensSafeguardingReviewingGroup: [
    Cypress.env('AUTHORISED_CHILD_GROUP'),
    Cypress.env('AUTHORISED_SAFEGUARDING_REVIEWING_GROUP'),
  ],
  ChildrensPlacementManagmenetGroup: [
    Cypress.env('AUTHORISED_CHILD_GROUP'),
    Cypress.env('AUTHORISED_PLACEMENT_MANAGEMENT_UNIT_GROUP'),
  ],
  ChildrensUnrestrictedGroup: [
    Cypress.env('AUTHORISED_CHILD_GROUP'),
    Cypress.env('AUTHORISED_UNRESTRICTED_GROUP'),
  ],
  AdultsGroup: [Cypress.env('AUTHORISED_ADULT_GROUP')],
  AdultsAllocatorGroup: [
    Cypress.env('AUTHORISED_ADULT_GROUP'),
    Cypress.env('AUTHORISED_ALLOCATORS_GROUP'),
  ],
  AdultsUnrestrictedGroup: [
    Cypress.env('AUTHORISED_ADULT_GROUP'),
    Cypress.env('AUTHORISED_UNRESTRICTED_GROUP'),
  ],
  AdminDevGroup: [Cypress.env('AUTHORISED_DEV_GROUP')],
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
  cy.setCookie(
    'hackneyToken',
    makeToken({
      groups: roleConfigurations[role],
    })
  );
  cy.getCookie('hackneyToken').should(
    'have.property',
    'value',
    makeToken({
      groups: roleConfigurations[role],
    })
  );

  cy.visit(url, options);
};

Cypress.Commands.add('visitAs', visitAs);
