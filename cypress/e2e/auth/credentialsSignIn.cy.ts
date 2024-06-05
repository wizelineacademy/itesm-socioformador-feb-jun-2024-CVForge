describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display the login form', () => {
    cy.get('.flex.flex-col.items-center.justify-center.h-screen.w-screen').should('be.visible');
  });

  it('should allow users to enter email and password', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');

    cy.get('button[type="submit"]').click();

    // Assert that the sign-in was successful
    cy.url().should('include', '/cv_gallery');
  });

  it('should show an error message if credentials are incorrect', () => {
    cy.get('input[type="email"]').type('wrongemail@example.com');
    cy.get('input[type="password"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();

    // Check if the error message is displayed
    cy.contains('Email or Password is not correct.').should('be.visible');
  });

  it('should navigate to register page when clicking on create account', () => {
    cy.get('a[href="/register"]').click();

    // Check if the URL changes to the register page
    cy.url().should('include', '/register');
  });
});