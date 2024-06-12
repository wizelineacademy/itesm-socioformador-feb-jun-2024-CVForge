describe('View Roadmap from Insight', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/cv_gallery');
      cy.get('input[type="email"]').type('juan.lebrija02@gmail.com');
      cy.get('input[type=password]').type('123');
      cy.get('form').submit();
    });
  
    it('accesses insight and then roadmap from there', () => {
      cy.get('.existing-cv').should('have.length.at.least', 1);
  
      cy.get('.existing-cv').first().within(() => {
        cy.get('a').first().invoke('attr', 'href').then((href) => {
          const roadmapUrl = `http://localhost:3000/${href}`;
          cy.visit(roadmapUrl);
        });
      });
      cy.contains('button', 'Roadmap').click();
    });
  
  });
  
  export {};
  