document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired.');

    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const login =document.getElementById('login-btn'); // Changed to login-btn
    const backgroundContainer = document.querySelector('.background-container');

    registerBtn.addEventListener('click', () => {
        console.log('Register button clicked.');
        window.postMessage({ type: 'toggleForm', formType: 'sign-up' }, '*');
         
        loginBtn.addEventListener('click', async () => {
             console.log('Login button clicked.');
             window.postMessage({ type: 'toggleForm', formType: 'sign-in' }, '*');
    
    });
    
   // script.js
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form submission
        
        // Get email and password from the form
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Make a POST request to the Flask API for login
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            // Parse the JSON response
            const data = await response.json();

            if (data.success) {
                console.log('Login successful');

                // Trigger the execution of run.py after successful login
                startProcesses();
            } else {
                console.error('Login failed:', data.message);
                // Handle login failure
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    });
});

// Function to start the processes by making a request to Flask
async function startProcesses() {
    try {
        // Make a GET request to the Flask route for starting processes
        const response = await fetch('http://localhost:8080/start_processes');
        const data = await response.json();

        if (data.success) {
            console.log('Processes started successfully');
        } else {
            console.error('Failed to start processes:', data.message);
        }
    } catch (error) {
        console.error('Error starting processes:', error);
    }
}

    
    // Listen for messages from main process
    window.addEventListener('message', (event) => {
        console.log('Message received from main process:', event.data);
        const message = event.data;
        if (message.type === 'toggleForm') {
            console.log('Toggling form:', message.formType);
            const container = document.getElementById('container');
            if (message.formType === 'sign-up') {
                container.classList.add('active');
            } else if (message.formType === 'sign-in') {
                container.classList.remove('active');
            }
        }
    });

    // Function to handle registration form submission
    const registerForm = document.querySelector('.sign-up form');
    console.log('Register form:', registerForm);
    if (registerForm) {
        console.log('Register form found.');
        registerForm.addEventListener('submit', async (e) => {
            console.log('Registration form submitted.');
            e.preventDefault();
            
            const nameInput = registerForm.querySelector('input[name="name"]');
            const emailInput = registerForm.querySelector('input[type="email"]');
            const passwordInput = registerForm.querySelector('input[type="password"]');
            
            console.log('Name input:', nameInput);
            console.log('Email input:', emailInput);
            console.log('Password input:', passwordInput);
            
            if (nameInput && emailInput && passwordInput) {
                console.log('All input elements found.');
                const name = nameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;
                
                try {
                    const response = await fetch('http://localhost:8080/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, password })
                    });
                    const data = await response.json();
                    console.log(data); // Log response from Flask server
                    alert(data.message); // Show success message or error message from Flask server
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error registering user'); // Show error message
                }
            } else {
                console.error('One or more input elements not found.');
            }
        });
    } else {
        console.error('Registration form not found.');
    }
      // If using Node.js environment in Electron
      const googleSigninBtn = document.getElementById('googleSignInBtn');

      googleSigninBtn.addEventListener('click', () => {
          try {
              const googleLoginUrl = 'http://localhost:8080/google_login'; // Replace with your actual backend URL
              window.open(googleLoginUrl, '_blank');
          } catch (error) {
              console.error('Error initiating Google sign-in:', error);
          }
      });
  
    });


    // Function to handle redirect after successful sign-in
    function redirectToNewPage() {
        window.location.href = 'C:/Final-Project/www/index.html'; // Replace 're.html' with the URL of your new HTML page
    }
})
