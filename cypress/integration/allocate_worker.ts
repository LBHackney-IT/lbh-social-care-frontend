import { AuthRoles } from '../support/commands';

describe('Allocating workers', () => {
  describe('As a user in the Adults group', () => {
    it('should show the allocate worker button on an adult resident if the user has allocator permissions', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.AdultsAllocatorGroup
      );

      cy.contains('Allocate someone else').should('be.visible');
    });

    it('should not show the allocate worker button on an adult resident if the user does not have allocator permissions', () => {
      cy.intercept(
        `http://localhost:3000/api/residents/${Cypress.env(
          'ADULT_RECORD_PERSON_ID'
        )}/allocations`
      ).as('getAllocations');

      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.wait('@getAllocations');

      cy.contains('Allocate someone else').should('not.exist');
    });

    it('should show the allocate worker form for an adult resident if the user has allocator permissions', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations/add`,
        AuthRoles.AdultsAllocatorGroup
      );

      cy.contains('Allocate worker to');
    });

    it('should redirect away from the allocate worker form for an adult resident if the user does not have allocator permissions', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations/add`,
        AuthRoles.AdultsGroup
      );

      cy.location('pathname').should(
        'eq',
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`
      );
    });

    it('should redirect away from the allocate worker form for a childrens resident', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/allocations/add`,
        AuthRoles.AdultsGroup
      );

      cy.location('pathname').should(
        'eq',
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/details`
      );
    });
  });

  describe('As a user in the Childrens group', () => {
    it('should show the allocate worker button on a child resident', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/allocations`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Allocate someone else').should('be.visible');
    });

    it('should show the allocate worker form for an child resident', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}/allocations/add`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Allocate worker to');
    });

    it('should redirect away from the allocate worker form for an adults resident', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}/allocations/add`,
        AuthRoles.ChildrensGroup
      );

      cy.location('pathname').should(
        'eq',
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}/details`
      );
    });
  });
});
