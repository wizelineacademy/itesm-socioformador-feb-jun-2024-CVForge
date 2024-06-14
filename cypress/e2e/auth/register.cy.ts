describe('Register Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('should render all input fields', () => {
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('have.length', 2); // For password and confirm password
    });

    it('should update input fields on user input', () => {
        cy.get('input[type="email"]').type('test@example.com').should('have.value', 'test@example.com');
        cy.get('input[type="password"]').first().type('password123').should('have.value', 'password123');
        cy.get('input[type="password"]').last().type('password123').should('have.value', 'password123');
    });

    it('should alert when passwords do not match', () => {
        cy.get('input[type="password"]').first().type('password123');
        cy.get('input[type="password"]').last().type('different');
        cy.get('button').contains('Create Account').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Passwords do not match!');
        });
    });

    it('should prevent form submission if email is in use', () => {
        cy.intercept('POST', '/api/check-email', {
            statusCode: 200,
            body: { inUse: true }
        });
        cy.get('input[type="email"]').type('used@example.com');
        cy.get('button').contains('Create Account').click();
        cy.on('window:alert', (str) => {
            expect(str).to.include('This email is already in use.');
        });
    });

    it('should navigate back to the login page when back link is clicked', () => {
        cy.get('a').contains('Back').click();
        cy.url().should('include', '/login');
    });

    // it('should redirect to cv_gallery page on successful registration', () => {
    //     cy.intercept('POST', '/api/register', {
    //         statusCode: 200
    //     }).as('registerRequest');
    //     cy.fillRegistrationForm('Jane', 'Doe', 'jane.doe@example.com', 'password123', 'password123'); // Assume this command fills the form correctly
    //     cy.get('button').contains('Create Account').click();
    //     cy.wait('@registerRequest');
    //     cy.url().should('include', '/cv_gallery');
    // });
});

