/// <reference types="cypress" />

describe('Navigation - Regression Tests', () => {
  beforeEach(() => {
    cy.visit('/index.html')
    cy.clearLocalStorage()
  })

  it('TC_NAV_001: Should navigate between login and register forms', () => {
    // Start on login form
    cy.get('#loginForm').should('be.visible')
    
    // Navigate to register
    cy.navigateToRegister()
    cy.get('#registerForm').should('be.visible')
    cy.get('#loginForm').should('not.be.visible')
    
    // Navigate back to login
    cy.navigateToLogin()
    cy.get('#loginForm').should('be.visible')
    cy.get('#registerForm').should('not.be.visible')
  })

  it('TC_NAV_002: Should show correct navigation after successful login', () => {
    // Create and login a test user
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      age: 25
    }
    cy.createTestUser(testUser)
    cy.loginUser('test@example.com', 'password123')
    
    // Verify navigation changes after login
    cy.get('#loginBtn').should('not.be.visible')
    cy.get('#registerBtn').should('not.be.visible')
    cy.get('#profileBtn').should('be.visible')
    cy.get('#logoutBtn').should('be.visible')
    
    // Verify profile form is displayed
    cy.get('#profileForm').should('be.visible')
  })

  it('TC_NAV_003: Should show correct navigation after logout', () => {
    // Create and login a test user
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      age: 25
    }
    cy.createTestUser(testUser)
    cy.loginUser('test@example.com', 'password123')
    
    // Logout
    cy.logoutUser()
    
    // Verify navigation changes after logout
    cy.get('#loginBtn').should('be.visible')
    cy.get('#registerBtn').should('be.visible')
    cy.get('#profileBtn').should('not.be.visible')
    cy.get('#logoutBtn').should('not.be.visible')
    
    // Verify login form is displayed
    cy.get('#loginForm').should('be.visible')
  })

  it('TC_NAV_004: Should maintain active navigation state', () => {
    // Test login navigation
    cy.navigateToLogin()
    cy.get('#loginBtn').should('have.class', 'active')
    
    // Test register navigation
    cy.navigateToRegister()
    cy.get('#registerBtn').should('have.class', 'active')
    cy.get('#loginBtn').should('not.have.class', 'active')
  })

  it('TC_NAV_005: Should handle navigation with form data', () => {
    // Fill login form
    cy.get('#loginEmail').type('test@example.com')
    cy.get('#loginPassword').type('password123')
    
    // Navigate to register
    cy.navigateToRegister()
    
    // Verify form is cleared
    cy.get('#regName').should('have.value', '')
    cy.get('#regEmail').should('have.value', '')
    cy.get('#regPassword').should('have.value', '')
    
    // Navigate back to login
    cy.navigateToLogin()
    
    // Verify login form is cleared
    cy.get('#loginEmail').should('have.value', '')
    cy.get('#loginPassword').should('have.value', '')
  })

  it('TC_NAV_006: Should handle navigation with validation errors', () => {
    // Navigate to register and create validation errors
    cy.navigateToRegister()
    cy.get('#regName').type('A') // Too short
    cy.get('#regEmail').type('invalid-email')
    cy.get('#register').submit()
    
    // Verify errors are displayed
    cy.get('#regNameError').should('contain', 'Name must be at least 2 characters')
    cy.get('#regEmailError').should('contain', 'Please enter a valid email address')
    
    // Navigate to login
    cy.navigateToLogin()
    
    // Verify login form is clean
    cy.get('#loginEmailError').should('not.exist')
    cy.get('#loginPasswordError').should('not.exist')
  })

  it('TC_NAV_007: Should handle responsive navigation', () => {
    // Test mobile viewport
    cy.viewport(375, 667)
    
    // Verify navigation is still functional
    cy.navigateToRegister()
    cy.get('#registerForm').should('be.visible')
    
    cy.navigateToLogin()
    cy.get('#loginForm').should('be.visible')
    
    // Test tablet viewport
    cy.viewport(768, 1024)
    
    // Verify navigation works on tablet
    cy.navigateToRegister()
    cy.get('#registerForm').should('be.visible')
  })
})
