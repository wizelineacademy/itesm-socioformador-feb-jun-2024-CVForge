describe('Education Editor Form Test', () => {
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

  it('Updated Education Section', () => {
    cy.get('ul.steps').find('button').contains('Projects').click()
    cy.get('button').contains('Add New Project').click()

    // Fill out the form
    cy.get('input[name="name"]').type('CVBuilder')
    cy.get('input[name="description"]').type(
      'Developed a SaaS to generate better CVs than CVForge',
    )
    cy.get('input[name="start_date"]').type('2018-01-01')
    cy.get('input[name="end_date"]').type('2022-01-01')

    cy.get('button').contains('Save').click()
  })
})
