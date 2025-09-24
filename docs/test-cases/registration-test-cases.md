# Registration Test Cases

## Test Case TC_REG_001: Valid User Registration

### Test Case Information
- **Test Case ID**: TC_REG_001
- **Test Case Name**: Valid User Registration
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Click on "Register" button
3. Enter valid data in all fields:
   - Name: "John Doe"
   - Email: "john.doe@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
   - Age: "25"
4. Click "Register" button

### Expected Result
- User should be successfully registered
- Success message should be displayed
- User should be redirected to login form
- User data should be stored in localStorage

### Test Data
- **Name**: John Doe
- **Email**: john.doe@example.com
- **Password**: password123
- **Confirm Password**: password123
- **Age**: 25

---

## Test Case TC_REG_002: Registration with Invalid Email

### Test Case Information
- **Test Case ID**: TC_REG_002
- **Test Case Name**: Registration with Invalid Email
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Click on "Register" button
3. Enter data with invalid email:
   - Name: "Jane Doe"
   - Email: "invalid-email"
   - Password: "password123"
   - Confirm Password: "password123"
   - Age: "30"
4. Click "Register" button

### Expected Result
- Registration should fail
- Error message should be displayed: "Please enter a valid email address"
- User should remain on registration form
- No data should be stored

### Test Data
- **Name**: Jane Doe
- **Email**: invalid-email
- **Password**: password123
- **Confirm Password**: password123
- **Age**: 30

---

## Test Case TC_REG_003: Registration with Weak Password

### Test Case Information
- **Test Case ID**: TC_REG_003
- **Test Case Name**: Registration with Weak Password
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Click on "Register" button
3. Enter data with weak password:
   - Name: "Bob Smith"
   - Email: "bob.smith@example.com"
   - Password: "123"
   - Confirm Password: "123"
   - Age: "28"
4. Click "Register" button

### Expected Result
- Registration should fail
- Error message should be displayed: "Password must be at least 6 characters"
- User should remain on registration form
- No data should be stored

### Test Data
- **Name**: Bob Smith
- **Email**: bob.smith@example.com
- **Password**: 123
- **Confirm Password**: 123
- **Age**: 28

---

## Test Case TC_REG_004: Registration with Duplicate Email

### Test Case Information
- **Test Case ID**: TC_REG_004
- **Test Case Name**: Registration with Duplicate Email
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible, user with email "test@example.com" already exists

### Test Steps
1. Navigate to the User Management System
2. Click on "Register" button
3. Enter data with existing email:
   - Name: "Alice Johnson"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
   - Age: "35"
4. Click "Register" button

### Expected Result
- Registration should fail
- Error message should be displayed: "Email already exists"
- User should remain on registration form
- No new data should be stored

### Test Data
- **Name**: Alice Johnson
- **Email**: test@example.com
- **Password**: password123
- **Confirm Password**: password123
- **Age**: 35

---

## Test Case TC_REG_005: Registration with Invalid Age

### Test Case Information
- **Test Case ID**: TC_REG_005
- **Test Case Name**: Registration with Invalid Age
- **Priority**: High
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Click on "Register" button
3. Enter data with invalid age:
   - Name: "Charlie Brown"
   - Email: "charlie.brown@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
   - Age: "15"
4. Click "Register" button

### Expected Result
- Registration should fail
- Error message should be displayed: "Age must be between 18 and 100"
- User should remain on registration form
- No data should be stored

### Test Data
- **Name**: Charlie Brown
- **Email**: charlie.brown@example.com
- **Password**: password123
- **Confirm Password**: password123
- **Age**: 15

---

## Test Case TC_REG_006: Registration with Empty Fields

### Test Case Information
- **Test Case ID**: TC_REG_006
- **Test Case Name**: Registration with Empty Fields
- **Priority**: Medium
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Click on "Register" button
3. Leave all fields empty
4. Click "Register" button

### Expected Result
- Registration should fail
- Error messages should be displayed for all required fields
- User should remain on registration form
- No data should be stored

### Test Data
- **Name**: (empty)
- **Email**: (empty)
- **Password**: (empty)
- **Confirm Password**: (empty)
- **Age**: (empty)

---

## Test Case TC_REG_007: Registration Form Validation

### Test Case Information
- **Test Case ID**: TC_REG_007
- **Test Case Name**: Registration Form Validation
- **Priority**: Medium
- **Test Type**: Functional
- **Prerequisites**: Application is loaded and accessible

### Test Steps
1. Navigate to the User Management System
2. Click on "Register" button
3. Test real-time validation by:
   - Entering invalid email format
   - Entering short password
   - Entering mismatched passwords
   - Entering age outside range
4. Observe validation messages

### Expected Result
- Real-time validation should work
- Appropriate error messages should appear
- Form should prevent submission with invalid data
- Validation should be clear and helpful

### Test Data
- **Name**: Test User
- **Email**: invalid-email-format
- **Password**: 123
- **Confirm Password**: 456
- **Age**: 150
