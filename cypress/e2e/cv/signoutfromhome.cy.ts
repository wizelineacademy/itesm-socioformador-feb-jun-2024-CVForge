describe('Sign out from home', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/cv_gallery');
        cy.get('input[type="email"]').type('juan.lebrija02@gmail.com');
        cy.get('input[type=password]').type('123');
        cy.get('form').submit();
    });
  
    it('Once logged in, go to home and then sign out', () => {
        cy.get('#to-home').click();
        cy.contains('Sign Out').click();
    });
  });
  export {};
  