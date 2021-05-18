import { AuthRoles } from '../support/commands';

describe('Viewing a resident', () => {
  describe('As a user in the Childrens group', () => {
    it('should show the records as restricted when the current user does not have access to them because they are in the wrong user group', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('The records for this profile are restricted for viewing');
    });

    it('should show a list of records when the current user has access to them because they are in the correct user group', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Date created');
      cy.contains('Record type');
    });
  });

  describe('As a user in the Adults group', () => {
    it('should show the records as restricted when the current user does not have access to them because they are in the wrong user group', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('The records for this profile are restricted for viewing');
    });

    it('should show a list of records when the current user has access to them because they are in the correct user group', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('Date created');
      cy.contains('Record type');
    });
  });
});
