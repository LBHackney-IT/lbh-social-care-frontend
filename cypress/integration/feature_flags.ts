import { AuthRoles } from '../support/commands';

describe('feature flags', () => {
  it('should show a message in the shared footer when the default feature flag is active as the user is a developer', () => {
    cy.visitAs('/', AuthRoles.AdminDevGroup);

    cy.get('footer').contains('Feature flags are active and working');
  });

  it('should not show a message in the shared footer when the default feature flag is active as the user is an adults user', () => {
    cy.visitAs('/', AuthRoles.AdultsGroup);

    cy.get('footer')
      .contains('Feature flags are active and working')
      .should('not.exist');
  });
});
