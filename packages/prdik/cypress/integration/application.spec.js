describe('Application', function() {
  it('opens correctly', function() {
    cy.visit('/')
    cy.contains('Hey this is a working page').should('exist')
  })
})
