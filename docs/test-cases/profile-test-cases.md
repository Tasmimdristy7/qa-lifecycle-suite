# Profile Management Test Cases

## Test Case TC_PROFILE_001: View User Profile

### Test Case Information
- **Test Case ID**: TC_PROFILE_001
- **Test Case Name**: View User Profile
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: User is logged in successfully

### Test Steps
1. Login to the application with valid credentials
2. Click on "Profile" button in navigation
3. Observe the displayed profile information

### Expected Result
- Profile page should be displayed
- User information should be shown correctly:
  - Name: "John Doe"
  - Email: "john.doe@example.com"
  - Age: "25"
  - Member since: [current date]
- "Edit Profile" and "Delete Account" buttons should be visible

### Test Data
- **Logged in user**: john.doe@example.com

---

## Test Case TC_PROFILE_002: Edit User Profile

### Test Case Information
- **Test Case ID**: TC_PROFILE_002
- **Test Case Name**: Edit User Profile
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: User is logged in successfully

### Test Steps
1. Login to the application with valid credentials
2. Navigate to Profile page
3. Click "Edit Profile" button
4. Update the profile information:
   - Name: "John Updated Doe"
   - Age: "26"
5. Click "Update Profile" button

### Expected Result
- Profile should be updated successfully
- Success message should be displayed: "Profile updated successfully!"
- User should be redirected to profile view
- Updated information should be displayed
- Changes should be persisted in localStorage

### Test Data
- **Original Name**: John Doe
- **Updated Name**: John Updated Doe
- **Original Age**: 25
- **Updated Age**: 26

---

## Test Case TC_PROFILE_003: Cancel Profile Edit

### Test Case Information
- **Test Case ID**: TC_PROFILE_003
- **Test Case Name**: Cancel Profile Edit
- **Priority**: Medium
- **Test Type**: Functional
- **Prerequisites**: User is logged in successfully

### Test Steps
1. Login to the application with valid credentials
2. Navigate to Profile page
3. Click "Edit Profile" button
4. Make some changes to the profile information
5. Click "Cancel" button

### Expected Result
- Edit form should be closed
- User should be redirected to profile view
- Original profile information should be displayed
- No changes should be saved

### Test Data
- **Original Name**: John Doe
- **Attempted Name**: John Changed Doe
- **Original Age**: 25
- **Attempted Age**: 30

---

## Test Case TC_PROFILE_004: Delete User Account

### Test Case Information
- **Test Case ID**: TC_PROFILE_004
- **Test Case Name**: Delete User Account
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: User is logged in successfully

### Test Steps
1. Login to the application with valid credentials
2. Navigate to Profile page
3. Click "Delete Account" button
4. Confirm the deletion in the confirmation dialog

### Expected Result
- Confirmation dialog should appear: "Are you sure you want to delete your account? This action cannot be undone."
- After confirmation, account should be deleted
- Success message should be displayed: "Account deleted successfully"
- User should be redirected to login page
- User data should be removed from localStorage

### Test Data
- **User to delete**: john.doe@example.com

---

## Test Case TC_PROFILE_005: Profile Validation

### Test Case Information
- **Test Case ID**: TC_PROFILE_005
- **Test Case Name**: Profile Validation
- **Priority**: Medium
- **Test Type**: Functional
- **Prerequisites**: User is logged in successfully

### Test Steps
1. Login to the application with valid credentials
2. Navigate to Profile page
3. Click "Edit Profile" button
4. Test validation by entering invalid data:
   - Name: "A" (too short)
   - Age: "15" (below minimum)
5. Click "Update Profile" button

### Expected Result
- Validation should fail
- Error messages should be displayed:
  - "Name must be at least 2 characters"
  - "Age must be between 18 and 100"
- User should remain on edit form
- No changes should be saved

### Test Data
- **Invalid Name**: A
- **Invalid Age**: 15
