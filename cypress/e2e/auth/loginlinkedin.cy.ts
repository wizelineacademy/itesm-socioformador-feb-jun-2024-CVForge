describe('Login using linkedin', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.contains('Sign In').click();
    });

    it('takes the user to the LinkedIn signin page', () => {
      cy.contains('Sign up with Linkedin').click();
      cy.origin('https://www.linkedin.com', () => {
        cy.contains('Email').should('exist');
      });
    });
    
    it('allows the user to enter their LinkedIn credentials', () => {
      cy.contains('Sign up with Linkedin').click();
      cy.origin('https://www.linkedin.com', () => {
        cy.get('input[id="username"]').type('#VALID USERNAME');
        cy.get('input[id="password"]').type('#VALID PASSWORD');
        cy.get('button[data-litms-control-urn="login-submit"]').click();
      });
    });
  
  });
  
  export {};
  