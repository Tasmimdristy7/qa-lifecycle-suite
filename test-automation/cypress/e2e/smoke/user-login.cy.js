/// <reference types="cypress" />

describe('User Login - Smoke Tests', () => {
  beforeEach(() => {
    cy.visit('/index.html')
    cy.clearLocalStorage()
    
    // Create a test user for login tests
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      age: 25
    }
    cy.createTestUser(testUser)
  })

  it('TC_LOGIN_001: Should successfully login with valid credentials', () => {
    // Navigate to login form
    cy.navigateToLogin()
    
    // Login with valid credentials
    cy.loginUser('test@example.com', 'password123')
    
    // Verify successful login and redirect to profile
    cy.get('#profileForm').should('be.visible')
    cy.get('#displayName').should('contain', 'Test User')
    cy.get('#displayEmail').should('contain', 'test@example.com')
  })

  it('TC_LOGIN_002: Should show error for invalid email format', () => {
    cy.navigateToLogin()
    
    // Test invalid email format
    cy.validateEmailField('loginEmail', 'invalid-email')
    
    // Verify error message
    cy.get('#loginEmailError').should('contain', 'Please enter a valid email address')
  })

  it('TC_LOGIN_003: Should show error for invalid password', () => {
    cy.navigateToLogin()
    
    // Test invalid password
    cy.get('#loginEmail').type('test@example.com')
    cy.get('#loginPassword').type('wrongpassword')
    cy.get('#login').submit()
    
    // Verify error message
    cy.shouldShowError('loginMessage', 'Invalid email or password')
  })

  it('TC_LOGIN_004: Should show error for empty fields', () => {
    cy.navigateToLogin()
    
    // Submit form without filling fields
    cy.get('#login').submit()
    
    // Verify error messages
    cy.get('#loginEmailError').should('contain', 'Please enter a valid email address')
    cy.get('#loginPasswordError').should('contain', 'Password must be at least 6 characters')
  })

  it('TC_LOGIN_005: Should show error for non-existent user', () => {
    cy.navigateToLogin()
    
    // Test with non-existent user
    cy.get('#loginEmail').type('nonexistent@example.com')
    cy.get('#loginPassword').type('password123')
    cy.get('#login').submit()
    
    // Verify error message
    cy.shouldShowError('loginMessage', 'Invalid email or password')
  })

  it('TC_LOGIN_006: Should show error for short password', () => {
    cy.navigateToLogin()
    
    // Test short password
    cy.validatePasswordField('loginPassword', '123')
    
    // Verify error message
    cy.get('#loginPasswordError').should('contain', 'Password must be at least 6 characters')
  })
})
