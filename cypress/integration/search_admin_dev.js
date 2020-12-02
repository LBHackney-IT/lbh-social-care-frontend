/// <reference types="cypress" />

describe('Admin Dev Group', () => {
  it('Search for People by Mosaic ID as logged as Admin Dev', () => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADMIN_DEV'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADMIN_DEV')
    );
    cy.visit(Cypress.env('HOST'));
    cy.get('[data-testid="mosaic_id"]').type(Cypress.env('MOSAIC_ID_TEST'));
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('NAME_FOR_MOSAIC_ID_TEST')).should('be.visible');
  });
});

describe('Admin Dev Group', () => {
  it('Search of Adult group record', () => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADMIN_DEV'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADMIN_DEV')
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

describe('Admin Dev Group', () => {
  it('Search of Children group record', () => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADMIN_DEV'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADMIN_DEV')
    );
    cy.visit(Cypress.env('HOST'));
    cy.get('[data-testid="first_name"]').type(
      Cypress.env('CHILDREN_RECORD_FIRST_NAME')
    );
    cy.get('[data-testid="last_name"]').type(
      Cypress.env('CHILDREN_RECORD_LAST_NAME')
    );
    cy.get('[type="submit"]').click();
    cy.contains('View').click();
    cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should('be.visible');
  });
});
