import { AuthRoles } from '../support/commands';
import { format } from 'date-fns';

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

    it('returns an error if the date selected is not valid - day after today', () => {
      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations/add`,
        AuthRoles.AdminDevGroup
      );

      cy.get('input[name=allocationStartDate]')
        .clear()
        .type(format(new Date(1), 'yyyy-MM-dd'));

      cy.get('[data-testid=teamId]').click();
      cy.contains(/Date not valid/).should('be.visible');
    });
  });
});
