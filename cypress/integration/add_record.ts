import { AuthRoles } from '../support/commands';

describe('Adding records', () => {
  describe('As a user in the Adults group', () => {
    it('should go to the submission when a system form is selected', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('Add something new').click();
      cy.contains('Add something new').should('be.visible');

      cy.contains('Document Upload').should('be.visible');
      cy.contains('Safeguarding concern').should('be.visible');
      cy.get("input[placeholder='Search forms...']").type(
        'Review of Care and Support Plan (3C)'
      );
      cy.contains('Review of Care and Support Plan (3C)').should('be.visible');
      cy.contains('Appointeeship').should('not.exist');
      cy.contains('Review of Care and Support Plan (3C)').click();
      cy.url().should('include', `/submissions`);
      cy.contains('Case note for').should('be.visible');
    });
  });

  describe('As a user in the Childrens group', () => {
    it('should show the correct, searchable, form options', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should(
        'be.visible'
      );
      cy.contains('Add something new').click();
      cy.contains('Add something new').should('be.visible');

      cy.contains('CFS Case Note').should('be.visible');
      cy.contains('CFS Visit').should('be.visible');
      cy.get("input[placeholder='Search forms...']").type('CFS Visit');
      cy.contains('CFS Visit').should('be.visible');
      cy.contains('CFS Case Note').should('not.exist');
    });
  });
});
