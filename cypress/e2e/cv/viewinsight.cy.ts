describe('View Insight', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cv_gallery');
    cy.get('input[type="email"]').type('yuvanuber1@gmail.com');
    cy.get('input[type=password]').type('123');
    cy.get('form').submit();
  });

  it('opens Insight link', () => {
    cy.get('.existing-cv').should('have.length.at.least', 1);

    cy.get('.existing-cv').first().within(() => {
      cy.get('a').first().click(); // Click on the link to open the CV
    });
  });

});

export {};
