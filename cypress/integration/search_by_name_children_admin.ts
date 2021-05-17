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

  it('Access allowed - Search for People by name', () => {
    cy.contains('First name:').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
    cy.contains('Last name:').type(Cypress.env('CHILDREN_RECORD_LAST_NAME'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should('be.visible');
  });

  it('Access not allowed - Search for People by name', () => {
    cy.contains('First name:').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
    cy.contains('Last name:').type(Cypress.env('ADULT_RECORD_LAST_NAME'));
    cy.get('[type="submit"]').click();
    cy.contains('People not found').should('be.visible');
  });
});
