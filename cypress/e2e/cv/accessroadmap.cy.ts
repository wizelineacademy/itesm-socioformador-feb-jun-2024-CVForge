describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('AC').click()
    cy.contains('9').click()
    cy.contains('+/-').click()
    cy.get('.component-display').first().should('contain.text', '-')
    cy.contains('x').click()
    cy.contains('7').click()
    cy.contains('=').click()
    cy.get('.component-display').first().should('contain.text', '-')
    //cy.get('.component-display').first().should('not.have.text', '10')
  })
})
