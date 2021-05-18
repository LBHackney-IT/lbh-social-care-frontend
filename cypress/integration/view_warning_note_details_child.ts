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

  it('Viewing a created warning note', () => {
    cy.contains('td', 'Warning Note Created')
      .siblings()
      .contains('a', 'View')
      .click();

    cy.contains('RECORDS HISTORY').should('not.exist');

    cy.contains(Cypress.env('CHILDREN_RECORD_FULL_NAME')).should('be.visible');
    cy.contains('Expand view').click();
    cy.contains('Collapse view').should('be.visible');
    cy.contains('Warning Note Details').should('be.visible');
    cy.contains('WARNING DETAILS').should('be.visible');

    cy.contains('a', 'Back').click();
    cy.contains('RECORDS HISTORY').should('be.visible');
    cy.contains('Warning Note Details').should('not.exist');
    cy.contains('WARNING DETAILS').should('not.exist');
  });
});
