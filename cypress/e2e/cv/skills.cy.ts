describe('Work Experience Editor Form Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type=email]').type('francoelugo@live.com');
        cy.get('input[type=password]').type('123');
        cy.contains('Sign In').click();

        cy.url().should(url => {
            expect(url).to.match(/\/cv_gallery|\/editor/);
          });
  
          // navegar al editor
          cy.url().then(url => {
            if (!url.includes('/editor')) {
              cy.visit('http://localhost:3000/editor');
            }
        });
    });

    it ('Renders skills section correctly', () => {
      cy.contains('Skills').should('exist');
    });

    it ('Updates skills section', () => {
        cy.get('ul.steps').find('button').contains('Skills').click();
        cy.get('button').contains('Add Skill').click();

        // Fill out the form
        cy.get('input[name="title"]').type('AWS');
        cy.get('select[name="proficiency"]').select('Basic');

        // Save the new work experience 
        cy.get('button').contains('Save').click();

    });

});