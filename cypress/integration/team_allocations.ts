import { AuthRoles } from '../support/commands';

describe('Worker / team allocation', () => {
  describe('As a user in the Admin Dev group', () => {
    it('Search of Adult group record', () => {
      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations/add`,
        AuthRoles.AdminDevGroup
      );

      cy.contains('Add an allocation').should('exist');
      cy.contains('Select a team').should('exist');
      cy.contains('Select an allocation date').should('exist');
      cy.contains('Choose a priority rating').should('exist');
      cy.contains('This is for').should('exist');
    });
  });
});
