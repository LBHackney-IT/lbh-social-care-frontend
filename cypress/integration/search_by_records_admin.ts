describe('Admin Dev Group', () => {
  beforeEach(() => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADMIN_DEV'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADMIN_DEV')
    );
    cy.visit(Cypress.env('HOST') + '/cases');
  });

  it('Search of Adult group record', () => {
    cy.contains('First name:').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
    cy.contains('Last name:').type(Cypress.env('ADULT_RECORD_LAST_NAME'));
    cy.get('form').submit();
    cy.contains('View').click();
  });

  it('Search of Children group record', () => {
    cy.contains('First name:').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
    cy.contains('Last name:').type(Cypress.env('CHILDREN_RECORD_LAST_NAME'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
  });
});
