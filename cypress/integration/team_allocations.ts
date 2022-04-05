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
    it('Loads correcty the "Edit priority" form', () => {
      cy.visitAs(
        `/residents/${Cypress.env(
          'ADULT_RECORD_PERSON_ID'
        )}/allocations/${Cypress.env('ALLOCATION_ID')}/editpriority`,
        AuthRoles.AdminDevGroup
      );

      cy.contains('Edit priority level').should('exist');
      cy.contains('Choose a priority rating').should('exist');
      cy.contains('Medium priority').should('exist');
      cy.contains('This is for').should('exist');
      cy.contains('Continue').should('exist');
    });

    it('Adds a Team and Worker allocation', () => {
      cy.visitAs(
        `/residents/${Cypress.env(
          'ADULT_RECORD_PERSON_ID'
        )}/allocations/add?teamId=78`,
        AuthRoles.AdminDevGroup
      );
      cy.url().should('include', '/add?teamId=78');

      cy.get('#priority_medium').click();
      cy.get('#allocateWorker').click();
      cy.get('#170').click();
      cy.get('button[type=submit]').click();

      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.AdminDevGroup
      );
      cy.url().should('include', '/allocations');
      cy.contains('Team allocation: testing-team').should('exist');
    });

    it('Changes the priority', () => {
      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.AdminDevGroup
      );

      cy.get(`#testing-team_editPriority`).click();

      cy.get('#priority_urgent').click();
      cy.get('button[type=submit]').click();

      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.AdminDevGroup
      );
      cy.get('#testing-team_priorityRating').should('have.text', 'Urgent ');
    });

    it('Deallocates a Worker allocation', () => {
      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.AdminDevGroup
      );

      cy.get('#testing-team_deallocateWorker').click();

      cy.get('#deallocationReason').clear().type('testing reasons');
      cy.get('button[type=submit]').click();

      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.AdminDevGroup
      );

      cy.get('#testing-team_deallocateWorker').should('not.exist');
    });

    it('Deallocates a Team allocation', () => {
      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.AdminDevGroup
      );

      cy.get('#testing-team_deallocate').click();

      cy.url().should('include', '/deallocate');
      cy.get('#deallocationReason').clear().type('testing reasons');
      cy.get('button[type=submit]').click();

      cy.visitAs(
        `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.AdminDevGroup
      );

      cy.contains('Team allocation: testing-team').should('not.exist');
    });
  });
});

describe('Team view', () => {
  describe('As a user in the Admin Dev group', () => {
    it('Search of Adult group record', () => {
      cy.visitAs(`/teams/${Cypress.env('TEAM_ID')}`, AuthRoles.AdminDevGroup);

      cy.contains('Team').should('exist');
      cy.contains('Waiting list').should('exist');
      cy.contains('Active cases').should('exist');
      cy.contains('Team members').should('exist');
    });
  });
});
