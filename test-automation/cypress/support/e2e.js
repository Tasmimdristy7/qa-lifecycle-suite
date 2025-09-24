// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Custom commands for User Management System
Cypress.Commands.add('clearLocalStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})

Cypress.Commands.add('createTestUser', (userData) => {
  cy.window().then((win) => {
    const users = JSON.parse(win.localStorage.getItem('users')) || []
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      age: userData.age,
      joinDate: new Date().toISOString().split('T')[0]
    }
    users.push(newUser)
    win.localStorage.setItem('users', JSON.stringify(users))
  })
})

Cypress.Commands.add('loginUser', (email, password) => {
  cy.visit('/index.html')
  cy.get('#loginEmail').type(email)
  cy.get('#loginPassword').type(password)
  cy.get('#login').submit()
  cy.get('#loginMessage').should('contain', 'Login successful!')
})

Cypress.Commands.add('registerUser', (userData) => {
  cy.visit('/index.html')
  cy.get('#registerBtn').click()
  cy.get('#regName').type(userData.name)
  cy.get('#regEmail').type(userData.email)
  cy.get('#regPassword').type(userData.password)
  cy.get('#regConfirmPassword').type(userData.password)
  cy.get('#regAge').type(userData.age)
  cy.get('#register').submit()
  cy.get('#registerMessage').should('contain', 'Registration successful!')
})

Cypress.Commands.add('logoutUser', () => {
  cy.get('#logoutBtn').click()
  cy.get('#loginMessage').should('contain', 'Logged out successfully')
})

// Custom assertions
Cypress.Commands.add('shouldShowError', (elementId, message) => {
  cy.get(`#${elementId}`).should('contain', message)
})

Cypress.Commands.add('shouldShowSuccess', (elementId, message) => {
  cy.get(`#${elementId}`).should('contain', message)
})

// Navigation helpers
Cypress.Commands.add('navigateToLogin', () => {
  cy.get('#loginBtn').click()
  cy.get('#loginForm').should('be.visible')
})

Cypress.Commands.add('navigateToRegister', () => {
  cy.get('#registerBtn').click()
  cy.get('#registerForm').should('be.visible')
})

Cypress.Commands.add('navigateToProfile', () => {
  cy.get('#profileBtn').click()
  cy.get('#profileForm').should('be.visible')
})

// Form validation helpers
Cypress.Commands.add('validateEmailField', (fieldId, invalidEmail) => {
  cy.get(`#${fieldId}`).type(invalidEmail)
  cy.get(`#${fieldId}Error`).should('contain', 'Please enter a valid email address')
})

Cypress.Commands.add('validatePasswordField', (fieldId, weakPassword) => {
  cy.get(`#${fieldId}`).type(weakPassword)
  cy.get(`#${fieldId}Error`).should('contain', 'Password must be at least 6 characters')
})

Cypress.Commands.add('validateAgeField', (fieldId, invalidAge) => {
  cy.get(`#${fieldId}`).type(invalidAge)
  cy.get(`#${fieldId}Error`).should('contain', 'Age must be between 18 and 100')
})

// Before each test
beforeEach(() => {
  // Clear localStorage before each test
  cy.clearLocalStorage()
})

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  return false
})
