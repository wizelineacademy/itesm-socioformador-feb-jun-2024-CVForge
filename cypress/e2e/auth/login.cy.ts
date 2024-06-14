describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('should find an h2 element with the id "login-h2"', () => {
        // Check if an h2 with the specified ID exists
        cy.contains('Login').should('exist');
    });
});