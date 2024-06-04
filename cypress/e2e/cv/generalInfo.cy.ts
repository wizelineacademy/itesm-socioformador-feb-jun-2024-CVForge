import CV from "@/app/(cv)/cv/[cv_id]/page";

describe('General Information Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('a00833951@tec.mx');
        cy.get('input[type=password]').type('123');
        cy.get('form').submit();

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

    it('loads the correct initial values', () => {
        cy.visit('http://localhost:3000/editor');
        // Asegurar que los campos se carguen con los valores esperados provenientes de la BD
        cy.get('[name="first_name"]').should('have.value', 'Franco');
        cy.get('[name=last_name]').should('have.value', 'Lugo');
        cy.get('[name=email]').should('have.value', 'francoelugo@live.com');
        cy.get('[name=phone]').should('have.value', '8116118944');
        cy.get('[name=github_link]').should('have.value', 'Peco1503')
        cy.get('[name=linkedin_link]').should('have.value', 'francoelugo')
    });

    /* it('updates general info on form submit', () => {
        // Nave a la URL especifica donde se encuentra tu componente
        cy.visit('http://localhost:3000/editor');
        // Simular los cambios en el formuario de general info
        cy.get('[name="first_name"]').clear().type('Enrique');
        cy.get('[name="last_name"]').clear().type('Swift');
        cy.get('[name=email]').clear().type('prueba@gmail.com');
        cy.get('[name=phone]').clear().type('1234567890');
        cy.get('[name=github_link]').clear().type('Prueba4290');
        cy.get('[name=linkedin_link]').clear().type('LinkedinPrueba');
        cy.get('[type=submit]').click();
    }); */

});


    