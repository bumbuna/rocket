document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const errorElement = document.getElementById('login-error');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const formData = new FormData(form);
        const loginData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        // Perform an AJAX request to the server to validate the login credentials
        fetch('your-login-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to the dashboard or homepage if login is successful
                window.location.href = 'your-redirect-url';
            } else {
                // Display an error message if credentials are incorrect
                errorElement.style.display = 'block';
                errorElement.textContent = 'Invalid username or password.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorElement.style.display = 'block';
            errorElement.textContent = 'An error occurred. Please try again later.';
        });
    });
});
