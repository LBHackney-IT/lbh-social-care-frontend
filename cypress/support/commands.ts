export enum AuthRoles {
  ChildrensGroup = 'ChildrensGroup',
  AdultsGroup = 'AdultsGroup',
  AdminDevGroup = 'AdminDevGroup',
}

type RoleConfig = {
  tokenValue: string;
};

const roleConfigurations: Record<AuthRoles, RoleConfig> = {
  ChildrensGroup: {
    tokenValue: Cypress.env('TEST_KEY_CHILDREN_GROUP'),
  },
  AdultsGroup: {
    tokenValue: Cypress.env('TEST_KEY_ADULT_GROUP'),
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

const visitAs = (
  path: string,
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

  cy.visit(path, options);
};

Cypress.Commands.add('visitAs', (path: string, role: AuthRoles) => {
  const config = roleConfigurations[role];

  cy.setCookie('hackneyToken', config.tokenValue);
  cy.getCookie('hackneyToken').should(
    'have.property',
    'value',
    config.tokenValue
  );

  cy.visit(path);
});
