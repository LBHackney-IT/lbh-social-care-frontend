import { AuthRoles } from '../support/commands';

describe('Deleting case notes', () => {
  describe('As a user not in the Admin group', () => {
    it('should not be possible to delete a case note', () => {
      cy.visitAs(
        `people/${Cypress.env(
          'CHILDREN_RECORD_PERSON_ID'
        )}/submissions/61a8cedff9756ca60348fee8`,
        AuthRoles.ChildrensGroup
      );
      cy.contains(/Delete record/).should('not.exist');
    });
    it('should be not possible to view a deleted case note', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );
      cy.contains(/Show deleted records/).should('not.exist');
    });
  });

  describe('As a user in the Admin group', () => {
    it('should be possible to delete a case note', () => {
      cy.visitAs(
        `people/${Cypress.env(
          'CHILDREN_RECORD_PERSON_ID'
        )}/submissions/61a8cedff9756ca60348fee8`,
        AuthRoles.AdminDevGroup
      );
      cy.contains(/Delete record/).should('exist');
    });
    it('should be possible to view a deleted case note on the time line', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.AdminDevGroup
      );

      cy.get('.lbh-timeline').scrollIntoView();
      cy.contains(/Show deleted records/).click();
      cy.contains(/Hide deleted records/);
      cy.contains(/(deleted record)/).should('be.visible');
      cy.contains(/deleted 2 Dec 2021 1.51 pm/).should('be.visible');
      cy.contains(/requested by requester/).should('be.visible');
    });
    it('should be possible to view a specific deleted case note', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.AdminDevGroup
      );
      cy.contains(/Show deleted records/).click();
      cy.contains(/(deleted record)/).click();
      cy.contains(/Case note/).should('be.visible');
      cy.contains(/(deleted record)/).should('be.visible');
      cy.contains(/Deleted by/)
        .scrollIntoView()
        .should('be.visible');
    });
  });
});
