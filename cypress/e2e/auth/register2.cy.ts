describe('Register Component', () => {
  beforeEach(() => {
    cy.visit('/register') // Adjust the path as necessary
  })

  it('fills out the registration form and submits', () => {
    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('input[name="email"]').type('john.doe@example.com')
    cy.get('input[name="password"]').type('securePassword123')
    cy.get('input[name="confirmPassword"]').type('securePassword123')

    cy.get('button[type="submit"]').click()

    // Assuming the form submission redirects to /cv_gallery
    cy.url().should('include', '/cv_gallery')
  })

  it('shows an error if passwords do not match', () => {
    cy.get('input[name="password"]').type('securePassword123')
    cy.get('input[name="confirmPassword"]').type('differentPassword')

    cy.get('button[type="submit"]').click()

    // Check if the error message is displayed
    cy.contains('Passwords do not match').should('be.visible')
  })

  it('alerts the user if the email is already in use', () => {
    cy.intercept('POST', '**/api/register', {
      statusCode: 400,
      body: { error: 'Email already in use' },
    }).as('registerApi')

    cy.get('input[name="email"]').type('existing.email@example.com')
    cy.get('input[name="password"]').type('securePassword123')
    cy.get('input[name="confirmPassword"]').type('securePassword123')

    cy.wait('@registerApi')

    // Check if the alert is shown
    cy.on('window:alert', (msg) => {
      expect(msg).to.equal(
        'This email is already in use. Check if you have already logged in with Google or LinkedIn.',
      )
    })

    cy.get('button[type="submit"]').click()
  })
})
