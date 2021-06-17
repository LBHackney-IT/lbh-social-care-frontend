describe('feature flags', () => {
  it('shows a happy message in the shared footer when the demo feature flag is enabled', () => {
    cy.visit('/');
    cy.get('footer').contains('The Demo Feature Flag is active');
  });
});
