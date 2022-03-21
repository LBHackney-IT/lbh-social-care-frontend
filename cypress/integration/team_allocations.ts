import { AuthRoles } from '../support/commands';

describe('Worker / team allocation', () => {
  describe('As a user in the Admin Dev group', () => {
    it('Loads correcty the "add an allocation" page', () => {
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

    it('Loads correcty the "Allocate a worker', () => {
      cy.visitAs(
        `/residents/${Cypress.env(
          'ADULT_RECORD_PERSON_ID'
        )}/allocations/${Cypress.env('ALLOCATION_ID')}/allocateworker`,
        AuthRoles.AdminDevGroup
      );

      cy.contains('Allocate a worker').should('exist');
      cy.contains('Mike Gallagher').should('exist');
      cy.contains('Total allocations').should('exist');
      cy.contains('Select an allocation date').should('exist');
      cy.contains('This is for').should('exist');
    });
  });
});
