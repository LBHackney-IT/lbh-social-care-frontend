describe('Adult Group', () => {
  beforeEach(() => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADULT_GROUP'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADULT_GROUP')
    );
    cy.visit(
      `${Cypress.env('HOST')}/people/${Cypress.env('ADULT_RECORD_PERSON_ID')}`
    );
  });

  it('Add new record', () => {
    cy.contains('ASC');
    cy.contains('Add a new record').click();
    cy.contains('Add a new record for').should('be.visible');
    cy.contains('Expand view').click();
    cy.contains('Collapse view').should('be.visible');
    cy.get('[data-testid="formList"]').click();
    cy.contains('Blue Badge').should('be.visible');
    cy.contains('Case Note Recording').should('be.visible');
    cy.get('[data-testid="formList"]').type('Case Note Recording');
    cy.contains('Case Note Recording').should('be.visible');
    cy.contains('Appointeeship').should('not.exist');
    cy.contains('Case Note Recording').click();
    cy.get('[data-module="govuk-button"]').click();
    cy.url().should(
      'include',
      `/people/${Cypress.env(
        'ADULT_RECORD_PERSON_ID'
      )}/records/case-notes-recording`
    );
    cy.contains('Case note for').should('be.visible');
  });
});
