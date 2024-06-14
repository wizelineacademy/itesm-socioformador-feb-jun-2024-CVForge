describe('View Roadmap from Insight', () => {
  beforeEach(() => {
    // Login to the application
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="email"]').type('yuvanuber1@gmail.com');
    cy.get('input[type="password"]').type('123');
    cy.get('form').submit();

    cy.url().should('match', /\/cv_gallery|\/homepage/);
  });

  it('accesses the roadmap from the CV detail page', () => {
    cy.visit('http://localhost:3000/cv/079a2caa-9600-4e9d-8de8-7384e68adffe');

    cy.contains('button', 'Roadmap').click();

  });
});

export {};
