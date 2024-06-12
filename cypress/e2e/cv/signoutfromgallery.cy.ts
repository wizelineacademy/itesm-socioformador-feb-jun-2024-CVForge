describe('Sign out from gallery', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/cv_gallery');
      cy.get('input[type="email"]').type('juan.lebrija02@gmail.com');
      cy.get('input[type=password]').type('123');
      cy.get('form').submit();
    });
  
    it('Once logged in, sign out from gallery', () => {
      cy.contains('Sign Out').click();
    });
  
  });
  
  export {};
  