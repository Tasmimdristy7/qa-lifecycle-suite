// User Management System - Demo Application
// This is a simple demo app for QA testing purposes

class UserManagementApp {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateUI();
        this.loadUsers();
    }

    bindEvents() {
        // Navigation
        document.getElementById('loginBtn').addEventListener('click', () => this.showForm('login'));
        document.getElementById('registerBtn').addEventListener('click', () => this.showForm('register'));
        document.getElementById('profileBtn').addEventListener('click', () => this.showForm('profile'));
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

        // Forms
        document.getElementById('login').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('editProfile').addEventListener('submit', (e) => this.handleEditProfile(e));

        // Profile actions
        document.getElementById('editProfileBtn').addEventListener('click', () => this.showEditForm());
        document.getElementById('cancelEditBtn').addEventListener('click', () => this.showForm('profile'));
        document.getElementById('deleteAccountBtn').addEventListener('click', () => this.deleteAccount());
    }

    showForm(formType) {
        // Hide all forms
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('profileForm').style.display = 'none';
        document.getElementById('editProfileForm').style.display = 'none';
        document.getElementById('userList').style.display = 'none';

        // Show selected form
        switch(formType) {
            case 'login':
                document.getElementById('loginForm').style.display = 'block';
                break;
            case 'register':
                document.getElementById('registerForm').style.display = 'block';
                break;
            case 'profile':
                document.getElementById('profileForm').style.display = 'block';
                this.displayUserInfo();
                break;
            case 'edit':
                document.getElementById('editProfileForm').style.display = 'block';
                this.populateEditForm();
                break;
        }

        // Update navigation
        this.updateNavigation(formType);
    }

    updateNavigation(activeForm) {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => btn.classList.remove('active'));

        if (this.currentUser) {
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('registerBtn').style.display = 'none';
            document.getElementById('profileBtn').style.display = 'inline-block';
            document.getElementById('logoutBtn').style.display = 'inline-block';
        } else {
            document.getElementById('loginBtn').style.display = 'inline-block';
            document.getElementById('registerBtn').style.display = 'inline-block';
            document.getElementById('profileBtn').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'none';
        }
    }

    updateUI() {
        this.updateNavigation();
    }

    // Validation functions
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    validateName(name) {
        return name.trim().length >= 2;
    }

    validateAge(age) {
        const ageNum = parseInt(age);
        return ageNum >= 18 && ageNum <= 100;
    }

    // Login functionality
    handleLogin(e) {
        e.preventDefault();
        this.clearErrors('login');

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!this.validateEmail(email)) {
            this.showError('loginEmailError', 'Please enter a valid email address');
            return;
        }

        if (!this.validatePassword(password)) {
            this.showError('loginPasswordError', 'Password must be at least 6 characters');
            return;
        }

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.showMessage('loginMessage', 'Login successful!', 'success');
            setTimeout(() => {
                this.showForm('profile');
            }, 1000);
        } else {
            this.showMessage('loginMessage', 'Invalid email or password', 'error');
        }
    }

    // Registration functionality
    handleRegister(e) {
        e.preventDefault();
        this.clearErrors('register');

        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        const age = document.getElementById('regAge').value;

        let hasErrors = false;

        if (!this.validateName(name)) {
            this.showError('regNameError', 'Name must be at least 2 characters');
            hasErrors = true;
        }

        if (!this.validateEmail(email)) {
            this.showError('regEmailError', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (this.users.find(u => u.email === email)) {
            this.showError('regEmailError', 'Email already exists');
            hasErrors = true;
        }

        if (!this.validatePassword(password)) {
            this.showError('regPasswordError', 'Password must be at least 6 characters');
            hasErrors = true;
        }

        if (password !== confirmPassword) {
            this.showError('regConfirmPasswordError', 'Passwords do not match');
            hasErrors = true;
        }

        if (!this.validateAge(age)) {
            this.showError('regAgeError', 'Age must be between 18 and 100');
            hasErrors = true;
        }

        if (hasErrors) return;

        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.toLowerCase(),
            password: password,
            age: parseInt(age),
            joinDate: new Date().toISOString().split('T')[0]
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.showMessage('registerMessage', 'Registration successful! Please login.', 'success');
        setTimeout(() => {
            this.showForm('login');
        }, 2000);
    }

    // Profile management
    displayUserInfo() {
        if (this.currentUser) {
            document.getElementById('displayName').textContent = this.currentUser.name;
            document.getElementById('displayEmail').textContent = this.currentUser.email;
            document.getElementById('displayAge').textContent = this.currentUser.age;
            document.getElementById('displayJoinDate').textContent = this.currentUser.joinDate;
        }
    }

    showEditForm() {
        this.showForm('edit');
    }

    populateEditForm() {
        if (this.currentUser) {
            document.getElementById('editName').value = this.currentUser.name;
            document.getElementById('editAge').value = this.currentUser.age;
        }
    }

    handleEditProfile(e) {
        e.preventDefault();
        this.clearErrors('edit');

        const name = document.getElementById('editName').value;
        const age = document.getElementById('editAge').value;

        let hasErrors = false;

        if (!this.validateName(name)) {
            this.showError('editNameError', 'Name must be at least 2 characters');
            hasErrors = true;
        }

        if (!this.validateAge(age)) {
            this.showError('editAgeError', 'Age must be between 18 and 100');
            hasErrors = true;
        }

        if (hasErrors) return;

        // Update user in array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex].name = name.trim();
            this.users[userIndex].age = parseInt(age);
            this.currentUser = this.users[userIndex];
            localStorage.setItem('users', JSON.stringify(this.users));
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            this.showMessage('editMessage', 'Profile updated successfully!', 'success');
            setTimeout(() => {
                this.showForm('profile');
            }, 1000);
        }
    }

    deleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users.splice(userIndex, 1);
                localStorage.setItem('users', JSON.stringify(this.users));
                localStorage.removeItem('currentUser');
                this.currentUser = null;
                this.showForm('login');
                this.showMessage('loginMessage', 'Account deleted successfully', 'success');
            }
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showForm('login');
        this.showMessage('loginMessage', 'Logged out successfully', 'success');
    }

    loadUsers() {
        // This would typically be an admin function
        // For demo purposes, we'll show all users
        if (this.users.length > 0) {
            this.displayUsersTable();
        }
    }

    displayUsersTable() {
        const table = document.getElementById('usersTable');
        let html = '<table><thead><tr><th>Name</th><th>Email</th><th>Age</th><th>Join Date</th></tr></thead><tbody>';
        
        this.users.forEach(user => {
            html += `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.joinDate}</td>
            </tr>`;
        });
        
        html += '</tbody></table>';
        table.innerHTML = html;
    }

    // Utility functions
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    clearErrors(formType) {
        const errorElements = document.querySelectorAll(`#${formType}Form .error`);
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    showMessage(elementId, message, type) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `message ${type}`;
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new UserManagementApp();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserManagementApp;
}
