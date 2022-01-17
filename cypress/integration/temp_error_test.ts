import { AuthRoles } from '../support/commands';

describe('Test Errors are sent to Sentry', () => {
  // it('By Error Button', () => {
  //   cy.visitAs('/throw-error', AuthRoles.ChildrensPlacementManagmenetGroup);
  //   cy.contains('throw frontend error').click();
  // })

  it('By Server Error', () => {
    cy.visitAs('/throw-error', AuthRoles.ChildrensPlacementManagmenetGroup);
    cy.contains('throw server error').click();
  });

  it('By API Error', () => {
    cy.visitAs('/throw-error', AuthRoles.ChildrensPlacementManagmenetGroup);
    cy.contains('throw api error').click();
  });
});
