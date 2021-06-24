describe('feature flags', () => {
  it('should show a message in the shared footer when the default feature flag is active', () => {
    cy.visit('/');

    cy.get('footer').contains('Feature flags are active and working');
  });
});
