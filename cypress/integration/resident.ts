import { AuthRoles } from '../support/commands';

describe('resident pages', () => {
  describe('As a user in the Admin Dev group', () => {
    it('lets me visit the shareable version if i have permission', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsUnrestrictedGroup
      );

      cy.contains('Shareable version').click();

      cy.contains('Details');
      cy.contains('Relationships');

      cy.contains('Case notes');
      cy.contains('Workflows');
    });

    it("hides sensitive parts of the shareable version if i don't", () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}/shareable`,
        AuthRoles.AdultsGroup
      );

      cy.contains('Case notes').should('not.be.visible');
      cy.contains('Workflows').should('not.be.visible');
    });
  });
});
