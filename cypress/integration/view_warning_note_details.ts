import { AuthRoles } from '../support/commands';

describe('Viewing a created warning note', () => {
  describe('As a user in the Adults group and records are not restricted', () => {
    it('should show only the initial details of a warning note when created', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('td', 'Warning Note Created')
        .siblings()
        .contains('a', 'View')
        .click();

      cy.contains('RECORDS HISTORY').should('not.exist');

      cy.contains(Cypress.env('ADULT_RECORD_FULL_NAME')).should('be.visible');
      cy.contains('Show details').click();
      cy.contains('Hide details').should('be.visible');
      cy.contains('Warning Note Details').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('not.exist');

      cy.contains('a', 'Go back').click();
      cy.contains('RECORDS HISTORY').should('be.visible');
      cy.contains('Warning Note Details').should('not.exist');
      cy.contains('WARNING DETAILS').should('not.exist');
    });

    it('should show the details of all submitted reviews and the initial note when a warning note has been reviewed', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('td', 'Warning Note Reviewed')
        .siblings()
        .contains('a', 'View')
        .click();

      cy.contains('RECORDS HISTORY').should('not.exist');

      cy.contains(Cypress.env('ADULT_RECORD_FULL_NAME')).should('be.visible');
      cy.contains('Show details').click();
      cy.contains('Hide details').should('be.visible');
      cy.contains('Warning Note Review Details').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');
    });

    it('should show the details of all submitted reviews and the initial note when a warning note has been ended', () => {
      cy.visitAs(
        `/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`,
        AuthRoles.AdultsGroup
      );

      cy.contains('td', 'Warning Note Ended')
        .siblings()
        .contains('a', 'View')
        .click();

      cy.contains('RECORDS HISTORY').should('not.exist');

      cy.contains(Cypress.env('ADULT_RECORD_FULL_NAME')).should('be.visible');
      cy.contains('Show details').click();
      cy.contains('Hide details').should('be.visible');
      cy.contains('Warning Note End Details').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');
    });
  });

  describe('As a user in the Children group and records are not restricted', () => {
    it('should show only the initial details of a warning note when created', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('td', 'Warning Note Created')
        .siblings()
        .contains('a', 'View')
        .click();

      cy.contains('RECORDS HISTORY').should('not.exist');

      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should(
        'be.visible'
      );
      cy.contains('Show details').click();
      cy.contains('Hide details').should('be.visible');
      cy.contains('Warning Note Details').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('not.exist');

      cy.contains('a', 'Go back').click();
      cy.contains('RECORDS HISTORY').should('be.visible');
      cy.contains('Warning Note Details').should('not.exist');
      cy.contains('WARNING DETAILS').should('not.exist');
    });

    it('should show the details of all submitted reviews and the initial note when a warning note has been reviewed', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('td', 'Warning Note Reviewed')
        .siblings()
        .contains('a', 'View')
        .click();

      cy.contains('RECORDS HISTORY').should('not.exist');

      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should(
        'be.visible'
      );
      cy.contains('Show details').click();
      cy.contains('Hide details').should('be.visible');
      cy.contains('Warning Note Review Details').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');
    });

    it('should show the details of all submitted reviews and the initial note when a warning note has been ended', () => {
      cy.visitAs(
        `/people/${Cypress.env('CHILDREN_RECORD_PERSON_ID')}`,
        AuthRoles.ChildrensGroup
      );

      cy.contains('td', 'Warning Note Ended')
        .siblings()
        .contains('a', 'View')
        .click();

      cy.contains('RECORDS HISTORY').should('not.exist');

      cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should(
        'be.visible'
      );
      cy.contains('Show details').click();
      cy.contains('Hide details').should('be.visible');
      cy.contains('Warning Note End Details').should('be.visible');
      cy.contains('WARNING REVIEW DETAILS').should('be.visible');
      cy.contains('WARNING DETAILS').should('be.visible');
    });
  });
});
