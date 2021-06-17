import { AuthRoles } from '../support/commands';

describe('feature flags', () => {
  it('shows a happy message in the shared footer when the demo feature flag is enabled', () => {
    cy.visitAs('/?footerFlagActive=true', AuthRoles.AdultsGroup);
    cy.get('footer').contains('The Demo Feature Flag is active');
  });

  it('Does not show a happy message in the shared footer when the demo feature flag is NOT enabled', () => {
    cy.visitAs('/', AuthRoles.AdultsGroup);
    cy.get('footer')
      .contains('The Demo Feature Flag is active')
      .should('not.exist');
  });
});
