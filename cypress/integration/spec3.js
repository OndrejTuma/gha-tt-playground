/// <reference types="cypress" />
it('works', () => {
  cy.visit('/')
  cy.contains('Page body')

  cy.window()
    .invoke('abs', -2)
    .should('equal', 2)
})
