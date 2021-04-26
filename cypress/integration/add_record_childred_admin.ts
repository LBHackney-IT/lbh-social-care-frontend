describe('Adult Group', () => {
  beforeEach(() => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_CHILDREN_GROUP'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_CHILDREN_GROUP')
    );
    cy.visit(Cypress.env('HOST') + '/search');
  });

  it('Confirm person type is adult', () => {
    cy.contains('First name:').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('CHILDREN_RECORD_PERSON_TYPE')).should(
      'be.visible'
    );
  });

  it('Add new record', () => {
    cy.contains('First name:').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('CHILDREN_RECORD_PERSON_TYPE')).should(
      'be.visible'
    );
    cy.contains('Add a new record').click();
    cy.contains('Add a new record for').should('be.visible');
    cy.contains('Expand view').click();
    cy.contains('Collapse view').should('be.visible');
    cy.get('[data-testid="formList"]').click();
    cy.contains('CFS Case Note').should('be.visible');
    cy.contains('CFS Visit').should('be.visible');
    cy.get('[data-testid="formList"]').type('CFS Visit');
    cy.contains('CFS Visit').should('be.visible');
    cy.contains('CFS Case Note').should('not.exist');
    cy.get('[data-module="govuk-button"]').click();
  });
});
