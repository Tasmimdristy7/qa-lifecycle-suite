/// <reference types="cypress" />

describe('Profile Management - Regression Tests', () => {
  beforeEach(() => {
    cy.visit('/index.html')
    cy.clearLocalStorage()
    
    // Create and login a test user
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      age: 25
    }
    cy.createTestUser(testUser)
    cy.loginUser('test@example.com', 'password123')
  })

  it('TC_PROFILE_001: Should display user profile information correctly', () => {
    // Navigate to profile
    cy.navigateToProfile()
    
    // Verify profile information is displayed
    cy.get('#displayName').should('contain', 'Test User')
    cy.get('#displayEmail').should('contain', 'test@example.com')
    cy.get('#displayAge').should('contain', '25')
    cy.get('#displayJoinDate').should('not.be.empty')
    
    // Verify action buttons are visible
    cy.get('#editProfileBtn').should('be.visible')
    cy.get('#deleteAccountBtn').should('be.visible')
  })

  it('TC_PROFILE_002: Should successfully edit user profile', () => {
    // Navigate to profile
    cy.navigateToProfile()
    
    // Click edit profile button
    cy.get('#editProfileBtn').click()
    
    // Update profile information
    cy.get('#editName').clear().type('Updated Test User')
    cy.get('#editAge').clear().type('30')
    
    // Submit changes
    cy.get('#editProfile').submit()
    
    // Verify success message
    cy.shouldShowSuccess('editMessage', 'Profile updated successfully!')
    
    // Verify redirect to profile view
    cy.get('#profileForm').should('be.visible')
    
    // Verify updated information
    cy.get('#displayName').should('contain', 'Updated Test User')
    cy.get('#displayAge').should('contain', '30')
  })

  it('TC_PROFILE_003: Should cancel profile edit without saving changes', () => {
    // Navigate to profile
    cy.navigateToProfile()
    
    // Click edit profile button
    cy.get('#editProfileBtn').click()
    
    // Make changes
    cy.get('#editName').clear().type('Changed Name')
    cy.get('#editAge').clear().type('35')
    
    // Cancel edit
    cy.get('#cancelEditBtn').click()
    
    // Verify redirect to profile view
    cy.get('#profileForm').should('be.visible')
    
    // Verify original information is still displayed
    cy.get('#displayName').should('contain', 'Test User')
    cy.get('#displayAge').should('contain', '25')
  })

  it('TC_PROFILE_004: Should show validation errors for invalid profile data', () => {
    // Navigate to profile
    cy.navigateToProfile()
    
    // Click edit profile button
    cy.get('#editProfileBtn').click()
    
    // Enter invalid data
    cy.get('#editName').clear().type('A') // Too short
    cy.get('#editAge').clear().type('15') // Below minimum
    
    // Submit form
    cy.get('#editProfile').submit()
    
    // Verify validation errors
    cy.get('#editNameError').should('contain', 'Name must be at least 2 characters')
    cy.get('#editAgeError').should('contain', 'Age must be between 18 and 100')
  })

  it('TC_PROFILE_005: Should successfully delete user account', () => {
    // Navigate to profile
    cy.navigateToProfile()
    
    // Click delete account button
    cy.get('#deleteAccountBtn').click()
    
    // Confirm deletion
    cy.on('window:confirm', () => true)
    
    // Verify success message and redirect
    cy.shouldShowSuccess('loginMessage', 'Account deleted successfully')
    cy.get('#loginForm').should('be.visible')
    
    // Verify user is logged out
    cy.get('#loginBtn').should('be.visible')
    cy.get('#profileBtn').should('not.be.visible')
  })

  it('TC_PROFILE_006: Should cancel account deletion', () => {
    // Navigate to profile
    cy.navigateToProfile()
    
    // Click delete account button
    cy.get('#deleteAccountBtn').click()
    
    // Cancel deletion
    cy.on('window:confirm', () => false)
    
    // Verify user remains on profile page
    cy.get('#profileForm').should('be.visible')
    cy.get('#displayName').should('contain', 'Test User')
  })

  it('TC_PROFILE_007: Should maintain session state after profile edit', () => {
    // Navigate to profile
    cy.navigateToProfile()
    
    // Edit profile
    cy.get('#editProfileBtn').click()
    cy.get('#editName').clear().type('Session Test User')
    cy.get('#editProfile').submit()
    
    // Verify session is maintained
    cy.get('#profileBtn').should('be.visible')
    cy.get('#logoutBtn').should('be.visible')
    
    // Verify updated information
    cy.get('#displayName').should('contain', 'Session Test User')
  })
})
