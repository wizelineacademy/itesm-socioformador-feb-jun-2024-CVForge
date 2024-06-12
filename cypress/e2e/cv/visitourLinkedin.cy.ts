describe('Visit our linkedin', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('click LinkedIn at our footer', () => {
        cy.scrollTo('bottom', { ensureScrollable: false });
        cy.contains('LinkedIn').click();
    });
  
  });

  export {};
  