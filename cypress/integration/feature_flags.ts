import { AuthRoles } from '../support/commands';

describe('feature flags', () => {
  it('Shows a happy message in the shared footer when the demo feature flag is active', () => {
    cy.visitAs('/?footerFlagActive=true', AuthRoles.AdultsGroup);
    cy.get('footer').contains('The Demo Feature Flag is active');
  });

  it('Does not show a happy message in the shared footer when the demo feature flag is NOT active', () => {
    cy.visitAs('/', AuthRoles.AdultsGroup);
    cy.get('footer')
      .contains('The Demo Feature Flag is active')
      .should('not.exist');
  });
});
