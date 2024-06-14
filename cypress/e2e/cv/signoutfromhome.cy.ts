describe('Sign out from home', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('juan.lebrija02@gmail.com');
        cy.get('input[type=password]').type('123');
        cy.get('form').submit();
        cy.url().should('include', '/cv_gallery'); // Adjust '/cv_gallery' to match your expected URL
    });
  
    it('Once logged in, go to home and then sign out', () => {
        cy.visit('http://localhost:3000');
        cy.url().should('eq', 'http://localhost:3000/'); // Adjust to match your home page URL
        cy.contains('Sign Out').click();

    });
});

export{}
