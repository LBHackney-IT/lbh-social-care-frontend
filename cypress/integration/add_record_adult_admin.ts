describe('Adult Group', () => {
  beforeEach(() => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADULT_GROUP'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADULT_GROUP')
    );
    cy.visit(Cypress.env('HOST') + '/search');
  });

  it('Confirm person type is adult', () => {
    cy.contains('First name:').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('ADULT_RECORD_PERSON_TYPE')).should('be.visible');
  });

  it('Add new record', () => {
    cy.contains('First name:').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('ADULT_RECORD_PERSON_TYPE')).should('be.visible');
    cy.contains('Add a new record').click();
    cy.contains('Add a new record for').should('be.visible');
    cy.contains('Expand view').click();
    cy.contains('Collapse view').should('be.visible');
    cy.get('[data-testid="formList"]').click();
    cy.contains('Blue Badge').should('be.visible');
    cy.contains('Appointeeship').should('be.visible');
    cy.get('[data-testid="formList"]').type('Blue Badge');
    cy.contains('Blue Badge').should('be.visible');
    cy.contains('Appointeeship').should('not.exist');
    cy.get('[data-module="govuk-button"]').click();
  });
});
