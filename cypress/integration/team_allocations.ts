import { AuthRoles } from '../support/commands';
import { format } from 'date-fns';

describe('Worker / team allocation', () => {
  describe('As a user in the Admin Dev group', () => {
    it('Loads correctly the "add an allocation" page', () => {
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

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      cy.get('input[name=allocationStartDate]')
        .clear()
        .type(format(futureDate, 'yyyy-MM-dd'));

      cy.get('[data-testid=teamId]').click();
      cy.contains(/Date not valid/).should('be.visible');
    });
    it('Loads correcty the "Allocate a worker', () => {
      cy.visitAs(
        `/residents/${Cypress.env(
          'ADULT_RECORD_PERSON_ID'
        )}/allocations/${Cypress.env(
          'ALLOCATION_ID'
        )}/allocateworker?teamId=${Cypress.env('TEAM_ID')}`,
        AuthRoles.AdminDevGroup
      );

      cy.contains('Allocate a worker').should('exist');
      cy.contains('Total allocations').should('exist');
      cy.contains('Select an allocation date').should('exist');
      cy.contains('This is for').should('exist');
    });

    it('Display an error message if the passed date is not valid', () => {
      cy.visitAs(
        `/residents/${Cypress.env(
          'ADULT_RECORD_PERSON_ID'
        )}/allocations/${Cypress.env(
          'ALLOCATION_ID'
        )}/allocateworker?teamId=${Cypress.env(
          'TEAM_ID'
        )}&teamAllocationStartDate=12-31-2022`,
        AuthRoles.AdminDevGroup
      );

      cy.contains('Allocate a worker').should('exist');
      cy.contains('Total allocations').should('exist');
      cy.contains('Select an allocation date').should('exist');
      cy.contains('This is for').should('exist');
    });
  });
});
