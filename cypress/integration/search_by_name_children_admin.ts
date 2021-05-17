describe('Children Group', () => {
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

  it('should show a list that contains children records when a search is completed', () => {
    cy.contains('First name:').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
    cy.contains('Last name:').type(Cypress.env('CHILDREN_RECORD_LAST_NAME'));
    cy.get('[type="submit"]').click();

    cy.get('[data-testid="residents-table"]').contains(
      Cypress.env('CHILDREN_RECORD_PERSON_ID')
    );

    cy.get('[data-testid="residents-table"]').contains(
      Cypress.env('CHILDREN_RECORD_FULL_NAME')
    );
  });

  it('should show a list that contains adult records when a search is completed', () => {
    cy.contains('First name:').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
    cy.contains('Last name:').type(Cypress.env('ADULT_RECORD_LAST_NAME'));
    cy.get('[type="submit"]').click();

    cy.get('[data-testid="residents-table"]').contains(
      Cypress.env('ADULT_RECORD_PERSON_ID')
    );

    cy.get('[data-testid="residents-table"]').contains(
      Cypress.env('ADULT_RECORD_FULL_NAME')
    );
  });
});
