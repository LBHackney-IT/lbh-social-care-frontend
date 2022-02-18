import { AuthRoles } from '../support/commands';

describe('app config', () => {
  it('should show the correct value for the workflows app link even after a page navigation event has occurred on the client side', () => {
    cy.visitAs(`/`, AuthRoles.AdminDevGroup);

    cy.get('a').contains('Allocations').click();

    cy.location('pathname', { timeout: 60000 }).should('eq', '/');

    cy.get('a')
      .contains('Workflows')
      .invoke('attr', 'href')
      .should('match', /^https:\/\//); // Starts with https://
  });

  it('should show the correct value for the workflows app link even after the browser back button is used to navigate', () => {
    cy.visitAs(`/`, AuthRoles.AdminDevGroup);

    cy.get('a').contains('My work').click();

    cy.location('pathname', { timeout: 60000 }).should('include', '/my-work');

    cy.go('back');

    cy.location('pathname', { timeout: 60000 }).should('eq', '/');

    cy.get('a')
      .contains('Workflows')
      .invoke('attr', 'href')
      .should('match', /^https:\/\//); // Starts with https://
  });
});
