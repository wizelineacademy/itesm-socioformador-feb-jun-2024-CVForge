describe('Register Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/register'); // Adjust the path as necessary
    });
  
    it('fills out the registration form and submits', () => {
      let dateTime = new Date();
      cy.get('input[type="email"]').type(dateTime + '@example.com');
      cy.get('input[placeholder="password"]').type('securePassword123');
      cy.get('input[placeholder="confirm password"]').type('securePassword123');
  
      cy.get('button').click();
  
      // Assuming the form submission redirects to /cv_gallery
      cy.url().should('include', '/cv_gallery');
    });
  
    it('shows an error if passwords do not match', () => {
      cy.get('input[placeholder="password"]').type('securePassword123');
      cy.get('input[placeholder="confirm password"]').type('differentPassword');
  
      cy.get('button').click();
  
      // Check if the error message is displayed
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Passwords do not match');
      });
    });
  
    it('alerts the user if the email is already in use', () => {
      cy.intercept('POST', '**/api/register', {
        statusCode: 400,
        body: { error: 'Email already in use' },
      }).as('registerApi');
  
      cy.get('input[type="email"]').type('existing.email@example.com');
      cy.get('input[placeholder="password"]').type('securePassword123');
      cy.get('input[placeholder="confirm password"]').type('securePassword123');
  
      cy.wait('@registerApi');
  
      // Check if the alert is shown
      cy.on('window:alert', (msg) => {
        expect(msg).to.equal('This email is already in use. Check if you have already logged in with Google or LinkedIn.');
      });
  
      cy.get('button[type="submit"]').click();
    });
  });