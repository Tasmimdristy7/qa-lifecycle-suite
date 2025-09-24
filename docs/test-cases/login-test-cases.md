# Login Test Cases

## Test Case TC_LOGIN_001: Valid User Login

### Test Case Information
- **Test Case ID**: TC_LOGIN_001
- **Test Case Name**: Valid User Login
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible, user with credentials exists

### Test Steps
1. Navigate to the User Management System
2. Ensure "Login" tab is selected
3. Enter valid credentials:
   - Email: "john.doe@example.com"
   - Password: "password123"
4. Click "Login" button

### Expected Result
- User should be successfully logged in
- Success message should be displayed: "Login successful!"
- User should be redirected to profile page
- Navigation should show "Profile" and "Logout" options

### Test Data
- **Email**: john.doe@example.com
- **Password**: password123

---

## Test Case TC_LOGIN_002: Login with Invalid Email

### Test Case Information
- **Test Case ID**: TC_LOGIN_002
- **Test Case Name**: Login with Invalid Email
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Ensure "Login" tab is selected
3. Enter invalid email format:
   - Email: "invalid-email"
   - Password: "password123"
4. Click "Login" button

### Expected Result
- Login should fail
- Error message should be displayed: "Please enter a valid email address"
- User should remain on login form
- No login should occur

### Test Data
- **Email**: invalid-email
- **Password**: password123

---

## Test Case TC_LOGIN_003: Login with Invalid Password

### Test Case Information
- **Test Case ID**: TC_LOGIN_003
- **Test Case Name**: Login with Invalid Password
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible, user with email exists

### Test Steps
1. Navigate to the User Management System
2. Ensure "Login" tab is selected
3. Enter valid email with invalid password:
   - Email: "john.doe@example.com"
   - Password: "wrongpassword"
4. Click "Login" button

### Expected Result
- Login should fail
- Error message should be displayed: "Invalid email or password"
- User should remain on login form
- No login should occur

### Test Data
- **Email**: john.doe@example.com
- **Password**: wrongpassword

---

## Test Case TC_LOGIN_004: Login with Empty Fields

### Test Case Information
- **Test Case ID**: TC_LOGIN_004
- **Test Case Name**: Login with Empty Fields
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Ensure "Login" tab is selected
3. Leave both email and password fields empty
4. Click "Login" button

### Expected Result
- Login should fail
- Error messages should be displayed for both fields
- User should remain on login form
- No login should occur

### Test Data
- **Email**: (empty)
- **Password**: (empty)

---

## Test Case TC_LOGIN_005: Login with Non-existent User

### Test Case Information
- **Test Case ID**: TC_LOGIN_005
- **Test Case Name**: Login with Non-existent User
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Ensure "Login" tab is selected
3. Enter credentials for non-existent user:
   - Email: "nonexistent@example.com"
   - Password: "password123"
4. Click "Login" button

### Expected Result
- Login should fail
- Error message should be displayed: "Invalid email or password"
- User should remain on login form
- No login should occur

### Test Data
- **Email**: nonexistent@example.com
- **Password**: password123
