/// <reference types="cypress" />

describe('Admin Dev Group', () => {
  beforeEach(() => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADMIN_DEV'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADMIN_DEV')
    );
    cy.visit(Cypress.env('HOST'));
  });

  it('Search for People by Mosaic ID as logged as Admin Dev', () => {
    cy.get('[data-testid="mosaic_id"]').type(Cypress.env('MOSAIC_ID_TEST'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('NAME_FOR_MOSAIC_ID_TEST')).should('be.visible');
  });

  it('Search of Adult group record', () => {
    cy.contains('First name').type(Cypress.env('ADULT_RECORD_FIRST_NAME'));
    cy.contains('Last name').type(Cypress.env('ADULT_RECORD_LAST_NAME'));
    cy.get('form').submit();
    cy.contains(Cypress.env('ADULT_RECORD_FULL_NAME')).should('be.visible');
  });

  it('Search of Children group record', () => {
    cy.contains('First name').type(Cypress.env('CHILDREN_RECORD_FIRST_NAME'));
    cy.contains('Last name').type(Cypress.env('CHILDREN_RECORD_LAST_NAME'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should('be.visible');
  });
});
