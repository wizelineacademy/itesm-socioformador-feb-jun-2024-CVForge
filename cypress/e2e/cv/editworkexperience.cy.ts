describe('Edit Existing Work Experience', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[type=email]').type('francoelugo@live.com');
      cy.get('input[type=password]').type('123');
      cy.get('form').submit();

      cy.url().should(url => {
          expect(url).to.match(/\/cv_gallery|\/editor/);
      });

      // Navigate to the editor if not already there
      cy.url().then(url => {
          if (!url.includes('/editor')) {
              cy.visit('http://localhost:3000/editor');
          }
      });
  });

  it('Edits existing Work Experience', () => {
      cy.get('ul.work-experience-list').contains('Software Developer').click();
      cy.get('input[name="description"]').clear().type('Led a team to develop software solutions');
      cy.get('button').contains('Save').click();
      cy.contains('Work Experience updated successfully');
  });
});

export{}