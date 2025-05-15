document.addEventListener('DOMContentLoaded', function() {
  // Login form handling
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorElement = document.getElementById('auth-error');
      const buttonText = document.getElementById('login-button-text');
      const loader = document.getElementById('login-loader');
      
      // Show loader
      if (buttonText) buttonText.textContent = 'Logging in...';
      if (loader) loader.classList.remove('hidden');
      
      // Simulate API call with timeout
      setTimeout(() => {
        if (email && password) {
          // In a real app, this would validate credentials against a backend
          const user = {
            id: 'user123',
            email: email,
            name: 'Test User'
          };
          
          // Store user in localStorage (in a real app, you'd use secure cookies or tokens)
          localStorage.setItem('user', JSON.stringify(user));
          
          // Redirect to dashboard
          window.location.href = 'dashboard.html';
        } else {
          if (errorElement) {
            errorElement.textContent = 'Invalid email or password';
          }
          
          // Hide loader
          if (buttonText) buttonText.textContent = 'Log in';
          if (loader) loader.classList.add('hidden');
        }
      }, 1500);
    });
  }
  
  // Signup form handling
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const errorElement = document.getElementById('password-error');
      const buttonText = document.getElementById('signup-button-text');
      const loader = document.getElementById('signup-loader');
      
      // Password validation
      if (password !== confirmPassword) {
        if (errorElement) {
          errorElement.textContent = 'Passwords do not match';
        }
        return;
      }
      
      if (password.length < 6) {
        if (errorElement) {
          errorElement.textContent = 'Password must be at least 6 characters';
        }
        return;
      }
      
      // Clear any previous errors
      if (errorElement) {
        errorElement.textContent = '';
      }
      
      // Show loader
      if (buttonText) buttonText.textContent = 'Creating account...';
      if (loader) loader.classList.remove('hidden');
      
      // Simulate API call with timeout
      setTimeout(() => {
        if (email && password) {
          // In a real app, this would create an account via API
          
          // Redirect to login page
          window.location.href = 'login.html?registered=true';
        } else {
          if (errorElement) {
            errorElement.textContent = 'Please fill all fields';
          }
          
          // Hide loader
          if (buttonText) buttonText.textContent = 'Sign up';
          if (loader) loader.classList.add('hidden');
        }
      }, 1500);
    });
  }
  
  // Check for query parameters (like successful registration)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('registered') === 'true') {
    const errorElement = document.getElementById('auth-error');
    if (errorElement) {
      errorElement.textContent = 'Registration successful! Please log in.';
      errorElement.style.color = 'var(--green-400)';
    }
  }
});
