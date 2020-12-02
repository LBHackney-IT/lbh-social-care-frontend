describe('Adult group', () => {
  it('Access not allowed - Search for People by name', () => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADULT_GROUP'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADULT_GROUP')
    );
    cy.visit(Cypress.env('HOST'));
    cy.get('[data-testid="first_name"]').type(
      Cypress.env('CHILDREN_RECORD_FIRST_NAME')
    );
    cy.get('[data-testid="last_name"]').type(
      Cypress.env('CHILDREN_RECORD_LAST_NAME')
    );
    cy.get('[type="submit"]').click();
    cy.get('.govuk-error-message').should('be.visible');
  });
});

describe('Adult group', () => {
  it('Access allowed - Search for People by name', () => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADULT_GROUP'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADULT_GROUP')
    );
    cy.visit(Cypress.env('HOST'));
    cy.get('[data-testid="first_name"]').type(
      Cypress.env('ADULT_RECORD_FIRST_NAME')
    );
    cy.get('[data-testid="last_name"]').type(
      Cypress.env('ADULT_RECORD_LAST_NAME')
    );
    cy.get('[type="submit"]').click();
    cy.contains(Cypress.env('ADULT_RECORD_FULL_NAME')).should('be.visible');
  });
});
