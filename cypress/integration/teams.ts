import { AuthRoles } from '../support/commands';

describe('Team view', () => {
  describe('As a user in the Admin Dev group', () => {
    it('Search of Adult group record', () => {
      cy.visitAs(`/teams/${Cypress.env('TEAM_ID')}`, AuthRoles.AdminDevGroup);

      cy.contains('Team').should('exist');
      cy.contains('Waiting list').should('exist');
      cy.contains('Members').should('exist');
      cy.contains('Allocations').should('exist');
    });
  });
});
