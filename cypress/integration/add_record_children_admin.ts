describe('Children Group', () => {
  beforeEach(() => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_CHILDREN_GROUP'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_CHILDREN_GROUP')
    );
    cy.visit(
      `${Cypress.env('HOST')}/people/${Cypress.env(
        'CHILDREN_RECORD_PERSON_ID'
      )}`
    );
  });

  it('Add new record', () => {
    cy.contains('CFS');
    cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should('be.visible');
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
  });
});
