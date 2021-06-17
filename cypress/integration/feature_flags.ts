import { AuthRoles } from '../support/commands';

describe('feature flags', () => {
  it('Show a features message in the shared footer when the default feature flag is active', () => {
    cy.visitAs('/', AuthRoles.AdultsGroup);

    cy.get('footer').contains('Feature flags are active and working');
  });
});
