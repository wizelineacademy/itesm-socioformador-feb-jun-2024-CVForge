describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('should find an h1 element with the id "register-h1"', () => {
        // Check if an h2 with the specified ID exists
        cy.contains('Create Account').should('exist');
    });
});