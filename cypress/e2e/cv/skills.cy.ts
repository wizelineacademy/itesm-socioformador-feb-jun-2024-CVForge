describe('Work Experience Editor Form Test', () => {
  // Runs before each test case
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type=email]').type('francoelugo@live.com');
    cy.get('input[type=password]').type('123');
    cy.contains('Sign In').click();

    cy.url().should((url) => {
      expect(url).to.match(/\/cv_gallery|\/editor/);
    });

    cy.url().then((url) => {
      if (!url.includes('/editor')) {
        cy.visit('http://localhost:3000/editor');
      }
    });
  });

  it('Renders Skills section correctly', () => {
    cy.contains('Skills').should('exist');
  });

  it('Updates Skills section', () => {
    cy.get('ul.steps').find('button').contains('Skills').click();
    cy.get('button').contains('Add Skill').click();
    cy.get('input[name="title"]').type('AWS');
    cy.get('select[name="proficiency"]').select('Basic');
    cy.get('button').contains('Save').click();
    cy.contains('AWS').should('be.visible');
    cy.contains('Basic').should('be.visible');
  });

  
  it('Validates Skills Form Fields', () => {
    cy.get('ul.steps').find('button').contains('Skills').click();
    cy.get('button').contains('Add Skill').click();
    cy.get('input[name="title"]').should('be.visible');
    cy.get('select[name="proficiency"]').should('be.visible');
  });

});

export {};
