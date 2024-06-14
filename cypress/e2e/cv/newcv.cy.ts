describe('New CV Creation', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/cv_gallery');
      cy.get('input[type="email"]').type('a00833951@tec.mx');
      cy.get('input[type=password]').type('123');
      cy.get('form').submit();


      cy.contains('New CV').should('be.visible'); 
  });

  it('should open the new CV form, fill out the fields, and submit the form', () => {
      cy.contains('button', '+').click(); 

      cy.get('form').should('be.visible'); 
      cy.get('input[placeholder="New CV Title"]').type('CV by Cypress'); 

      cy.get('select#position').select('Software Engineer'); 

      cy.get('button[type="submit"]').click();
  });
});
export{};