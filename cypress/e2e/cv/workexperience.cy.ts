describe('Work Experience Editor Form Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[type=email]').type('francoelugo@live.com')
    cy.get('input[type=password]').type('123')
    cy.get('form').submit()

    cy.url().should((url) => {
      expect(url).to.match(/\/cv_gallery|\/editor/)
    })

    // navegar al editor
    cy.url().then((url) => {
      if (!url.includes('/editor')) {
        cy.visit('http://localhost:3000/editor')
      }
    })
  })

  it('Updates work experience section', () => {
    cy.get('ul.steps').find('button').contains('Work Experience').click()
    cy.get('button').contains('Add New Work Experience').click()

    // Fill out the form
    cy.get('input[name="work_position"]').type('Software Developer')
    cy.get('input[name="description"]').type('Developed software for a company')
    cy.get('input[name="start_date"]').type('2018-01-01')
    cy.get('input[name="end_date"]').type('2020-01-01')

    // Save the new work experience
    cy.get('button').contains('Save').click()
  })
})
