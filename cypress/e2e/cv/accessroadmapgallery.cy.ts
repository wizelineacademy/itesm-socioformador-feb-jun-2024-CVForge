describe('View Roadmap from Gallery', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cv_gallery');
    cy.get('input[type="email"]').type('juan.lebrija02@gmail.com');
    cy.get('input[type=password]').type('123');
    cy.get('form').submit();
  });

  it('displays CVs and shows the dropdown for a selected CV', () => {
    cy.get('.existing-cv').should('have.length.at.least', 1);

    cy.get('.existing-cv').first().within(() => {
      cy.get('a').first().invoke('attr', 'href').then((href) => {
        const id = href.replace('cv/', ''); 
        const roadmapUrl = `http://localhost:3000/roadmap/${id}`;
        cy.visit(roadmapUrl);
      });
    });
  });

});

export {};
