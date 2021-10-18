import { AuthRoles } from '../support/commands';

describe('app config', () => {
  it('should show the correct value for the workflows app even after a page navigation event has occurred on the client side', () => {
    cy.visitAs(`/`, AuthRoles.AdminDevGroup);

    cy.get('a').contains('Work in progress').click();

    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/work-in-progress'
    );

    cy.get('a').contains('Allocations').click();

    cy.location('pathname', { timeout: 60000 }).should('eq', '/');

    cy.get('a')
      .contains('Workflows')
      .invoke('attr', 'href')
      .should('match', /^https:\/\//); // Starts with https://
  });
});
