/// <reference types="cypress" />

describe('User Registration - Smoke Tests', () => {
  beforeEach(() => {
    cy.visit('/index.html')
    cy.clearLocalStorage()
  })

  it('TC_REG_001: Should successfully register a new user with valid data', () => {
    // Navigate to registration form
    cy.navigateToRegister()
    
    // Fill in valid registration data
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      age: 25
    }
    
    cy.get('#regName').type(userData.name)
    cy.get('#regEmail').type(userData.email)
    cy.get('#regPassword').type(userData.password)
    cy.get('#regConfirmPassword').type(userData.password)
    cy.get('#regAge').type(userData.age)
    
    // Submit registration
    cy.get('#register').submit()
    
    // Verify success message
    cy.shouldShowSuccess('registerMessage', 'Registration successful! Please login.')
    
    // Verify redirect to login form
    cy.get('#loginForm').should('be.visible')
  })

  it('TC_REG_002: Should show error for invalid email format', () => {
    cy.navigateToRegister()
    
    // Test invalid email
    cy.validateEmailField('regEmail', 'invalid-email')
    
    // Verify error message
    cy.get('#regEmailError').should('contain', 'Please enter a valid email address')
  })

  it('TC_REG_003: Should show error for weak password', () => {
    cy.navigateToRegister()
    
    // Test weak password
    cy.validatePasswordField('regPassword', '123')
    
    // Verify error message
    cy.get('#regPasswordError').should('contain', 'Password must be at least 6 characters')
  })

  it('TC_REG_004: Should show error for password mismatch', () => {
    cy.navigateToRegister()
    
    cy.get('#regPassword').type('password123')
    cy.get('#regConfirmPassword').type('different123')
    
    // Submit form
    cy.get('#register').submit()
    
    // Verify error message
    cy.get('#regConfirmPasswordError').should('contain', 'Passwords do not match')
  })

  it('TC_REG_005: Should show error for invalid age', () => {
    cy.navigateToRegister()
    
    // Test invalid age
    cy.validateAgeField('regAge', '15')
    
    // Verify error message
    cy.get('#regAgeError').should('contain', 'Age must be between 18 and 100')
  })

  it('TC_REG_006: Should show error for empty required fields', () => {
    cy.navigateToRegister()
    
    // Submit form without filling any fields
    cy.get('#register').submit()
    
    // Verify error messages for required fields
    cy.get('#regNameError').should('contain', 'Name must be at least 2 characters')
    cy.get('#regEmailError').should('contain', 'Please enter a valid email address')
    cy.get('#regPasswordError').should('contain', 'Password must be at least 6 characters')
    cy.get('#regAgeError').should('contain', 'Age must be between 18 and 100')
  })
})
