describe('Education Editor Form Test', () => {
  // Runs before each test case
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type=email]').type('francoelugo@live.com');
    cy.get('input[type=password]').type('123');
    cy.get('form').submit();
    cy.url().should((url) => {
      expect(url).to.match(/\/cv_gallery|\/editor/);
    });

    cy.url().then((url) => {
      if (!url.includes('/editor')) {
        cy.visit('http://localhost:3000/editor');
      }
    });
  });

  // E2E
  it('Updates the Education Section', () => {
    cy.get('ul.steps').find('button').contains('Education').click();
    cy.get('button').contains('Add New Education').click();

    cy.get('input[name="school"]').type('UC Berkeley');
    cy.get('input[name="education_degree"]').type('Bachelors in Computer Science');
    cy.get('input[name="gpa"]').type('3.5');
    cy.get('input[name="start_date"]').type('2018-01-04');
    cy.get('input[name="end_date"]').type('2022-01-01');

    cy.get('button').contains('Save').click();

    cy.contains('UC Berkeley').should('be.visible');
    cy.contains('Bachelors in Computer Science').should('be.visible');
  });

  it('Validates Education Form Fields', () => {
    cy.get('ul.steps').find('button').contains('Education').click();
    cy.get('button').contains('Add New Education').click();

    cy.get('input[name="school"]').should('be.visible');
    cy.get('input[name="education_degree"]').should('be.visible');
    cy.get('input[name="gpa"]').should('be.visible');
    cy.get('input[name="start_date"]').should('be.visible');
    cy.get('input[name="end_date"]').should('be.visible');
  });


  it('Handles Invalid Form Submissions', () => {
    cy.get('ul.steps').find('button').contains('Education').click();
    cy.get('button').contains('Add New Education').click();

    cy.get('button').contains('Save').click();

  });

  
  });

export {};
