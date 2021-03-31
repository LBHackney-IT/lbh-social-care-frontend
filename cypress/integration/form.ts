describe('Test Form', () => {
  beforeEach(() => {
    cy.getCookies().should('be.empty');
    cy.setCookie('hackneyToken', Cypress.env('TEST_KEY_ADMIN_DEV'));
    cy.getCookie('hackneyToken').should(
      'have.property',
      'value',
      Cypress.env('TEST_KEY_ADMIN_DEV')
    );
    cy.visit(`${Cypress.env('HOST')}/form/test/first-step`);
  });

  it('Should work properly', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/test',
      },
      []
    ).as('apiCheck');

    cy.get('[for="show_next_input_Y"]').click();
    cy.contains('I am the conditional field').should('be.visible');
    cy.contains('I am an html title').should('be.visible');
    cy.get('[name="conditional_text"]').type('conditional name');
    cy.get('[for="show_next_step"]').click();
    cy.get('form').submit();

    cy.url().should('include', '/form/test/condition-step');
    cy.contains('Conditional Step').should('be.visible');
    cy.contains('Title').type('conditional step title');
    cy.contains('Continue').click();

    cy.url().should('include', '/form/test/multi-step');
    cy.contains('Multi Step').should('be.visible');
    cy.contains('Title').type('foo first');
    cy.contains('Add another').click();
    cy.url().should('include', '/form/test/multi-step/2');
    cy.contains('Multi Step').should('be.visible');
    cy.contains('Title').type('foo second');
    cy.contains('Continue').click();

    cy.url().should('include', '/form/test/summary');
    cy.contains('conditional name').should('be.visible');
    cy.contains('Multi Step - 1').should('be.visible');
    cy.contains('foo first').should('be.visible');
    cy.contains('Multi Step - 2').should('be.visible');
    cy.contains('foo second').should('be.visible');
    cy.contains('Add another Multi Step').should('be.visible');
    cy.contains('Edit').should('be.visible');

    cy.contains('Submit').click();
    cy.wait('@apiCheck').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        show_next_input: 'Y',
        show_next_step: true,
        show_multi_select_step: false,
        show_object_step: false,
        show_address_step: false,
        show_autocomplete_step: false,
        conditional_text: 'conditional name',
        title_2: 'conditional step title',
        'multi-step': [{ title_3: 'foo first' }, { title_3: 'foo second' }],
      });
    });

    cy.url().should('include', '/form/test/confirmation');
    cy.contains('Test Recap');
  });
});
