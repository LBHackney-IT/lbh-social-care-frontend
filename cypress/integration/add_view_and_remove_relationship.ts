import { AuthRoles } from '../support/commands';

describe('Adding, viewing and remove a relationship', () => {
  beforeEach(() => {
    // This is required as the email address stored in the cookie is not an
    // existing worker.
    cy.intercept('POST', '/api/relationships', (req) => {
      req.body.createdBy = 'e2e.tests.adult@hackney.gov.uk';
    });
  });

  it('allows a user to add, view and remove a relationship', () => {
    cy.visitAs(
      `/residents/${Cypress.env('ADULT_RECORD_PERSON_ID')}/relationships`,
      AuthRoles.AdultsGroup
    );

    cy.contains('Add a relationship').click();

    // Search for related person
    cy.get('input[name=first_name]').type(
      Cypress.env('CHILDREN_RECORD_FIRST_NAME')
    );

    cy.contains('button', 'Search').click();

    cy.get(`input[value=${Cypress.env('CHILDREN_RECORD_PERSON_ID')}]`).check();
    cy.contains('Choose relationship').click();

    // Define the relationship to related person
    cy.get('select').select('Child');
    cy.get('input[name=details]').type('Some context of relationship');

    cy.contains('button', 'Continue').click();

    // Review and confirm relationship
    cy.contains('Child').should('be.visible');
    cy.contains('Some context of relationship').should('be.visible');

    cy.contains('button', 'Submit').click();

    cy.contains('Relationship has been added').should('be.visible');

    // View added relationship of person
    cy.contains('button', 'View person').click();

    cy.contains('a', 'Relationships').click();

    cy.contains('Children').should('be.visible');
    cy.contains(Cypress.env('CHILDREN_RECORD_FIRST_NAME')).should('be.visible');
    cy.contains(Cypress.env('CHILDREN_RECORD_LAST_NAME')).should('be.visible');
    cy.contains('Some context of relationship').should('be.visible');

    // Remove added relationship of person
    cy.contains(
      'a',
      `Remove relationship with ${Cypress.env(
        'CHILDREN_RECORD_FIRST_NAME'
      )} ${Cypress.env('CHILDREN_RECORD_LAST_NAME')}`
    ).click();

    cy.contains('Are you sure you want to remove this relationship?').should(
      'be.visible'
    );

    cy.contains('button', 'Yes, remove').click();

    cy.contains('No relationships found for this person').should('be.visible');
  });
});
