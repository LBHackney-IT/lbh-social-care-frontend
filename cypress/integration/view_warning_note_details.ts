import { AuthRoles } from '../support/commands';

describe('Viewing a created warning note', () => {
  describe('As a user in the Adults group and records are not restricted', () => {
    xit('should show only the initial details of a warning note when created', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('Warning Note Created').click();

      cy.contains('Warning Note Details').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('not.exist');

      cy.contains('a', 'Go back').click();
      cy.get('.lbh-timeline');
      cy.contains('Warning Note Details').should('not.exist');
      cy.contains('WARNING DETAILS').should('not.exist');
    });

    xit('should show the details of all submitted reviews and the initial note when a warning note has been reviewed', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('Warning Note Reviewed').click();
      cy.contains('Warning Note Review Details').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('be.visible');
      cy.contains('Have you discussed this review with the individual').should(
        'be.visible'
      );

      cy.contains('WARNING DETAILS').should('be.visible');
    });

    xit('should show the details of all submitted reviews and the initial note when a warning note has been ended', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('Warning Note Ended').click();
      cy.contains('Warning Note End Details').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('be.visible');
      cy.contains('Have you discussed this review with the individual').should(
        'be.visible'
      );

      cy.contains('WARNING DETAILS').should('be.visible');
    });
  });

  describe('As a user in the Children group and records are not restricted', () => {
    xit('should show only the initial details of a warning note when created', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Warning Note Created').click();
      cy.contains('Warning Note Details').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('not.exist');

      cy.contains('a', 'Go back').click();
      cy.get('.lbh-timeline');
      cy.contains('Warning Note Details').should('not.exist');
      cy.contains('WARNING DETAILS').should('not.exist');
    });

    xit('should show the details of all submitted reviews and the initial note when a warning note has been reviewed', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Warning Note Reviewed').click();

      cy.contains('Warning Note Review Details').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('be.visible');
      cy.contains('Have you discussed this review with the individual').should(
        'not.exist'
      );

      cy.contains('WARNING DETAILS').should('be.visible');
    });

    xit('should show the details of all submitted reviews and the initial note when a warning note has been ended', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('Warning Note Ended').click();

      cy.contains('Warning Note End Details').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('be.visible');
      cy.contains('Have you discussed this review with the individual').should(
        'not.exist'
      );

      cy.contains('WARNING DETAILS').should('be.visible');
    });
  });
});
