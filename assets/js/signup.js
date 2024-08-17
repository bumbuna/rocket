document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const usernameErrorElement = document.getElementById("username-error");
  const emailErrorElement = document.getElementById("email-error");
  const passwordErrorElement = document.getElementById("password-error");
  const errorElement = document.getElementById("signup-error");
  const form = document.getElementById("signup-form");
  let isUsernameAvailable = false;
  let isEmailAddressAvailable = false;

  usernameInput.addEventListener("blur", function () {
    const username = this.value;

    // Simulate a request to the server to check if the username is available
    fetch(`/backend/v1/cua?username=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.available) {
          isUsernameAvailable = true;
          usernameErrorElement.style.display = "none"; // Hide the error message
        } else {
          isUsernameAvailable = false;
          usernameErrorElement.style.display = "block"; // Show the error message
          usernameErrorElement.textContent = "Username is already taken";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        isUsernameAvailable = false;
        usernameErrorElement.style.display = "block";
        usernameErrorElement.textContent = "Error checking username";
      });
  });

  emailInput.addEventListener("blur", function () {
    const email = this.value;

    // Simulate a request to the server to check if the email is available
    fetch(`/backend/v1/cea?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.available) {
          isEmailAddressAvailable = true;
          emailErrorElement.style.display = "none"; // Hide the error message
        } else {
          isEmailAddressAvailable = false;
          emailErrorElement.style.display = "block"; // Show the error message
          emailErrorElement.textContent = "Email is already taken";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        isEmailAddressAvailable = false;
        emailErrorElement.style.display = "block";
        emailErrorElement.textContent = "Error checking email";
      });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Prevent form submission if the username is not available or passwords do not match
    if (
      !isUsernameAvailable ||
      password !== confirmPassword ||
      !isEmailAddressAvailable
    ) {
      // event.preventDefault(); // Prevent form submission

      if (!isUsernameAvailable) {
        usernameErrorElement.style.display = "block";
        usernameErrorElement.textContent =
          "Please choose a different username before submitting";
      }

      if (!isEmailAddressAvailable) {
        emailErrorElement.style.display = "block";
        emailErrorElement.textContent =
          "Please choose a different email before submitting";
      }

      if (password !== confirmPassword) {
        passwordErrorElement.style.display = "block";
        passwordErrorElement.textContent = "Passwords do not match";
      }
    }

    for_data = FormData(form);
  });

  // Hide password error message when user starts typing in the confirm password field
  confirmPasswordInput.addEventListener("input", function () {
    if (passwordErrorElement.style.display === "block") {
      passwordErrorElement.style.display = "none";
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const formData = new FormData(form);
    const signupData = {
      username: formData.get("username"),
      password: formData.get("password"),
      name: formData.get("name"),
      email: formData.get("email"),
    };

    // Perform an AJAX request to the server to validate the login credentials
    fetch("/backend/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to the dashboard or homepage if login is successful
          window.location.href = "/login";
        } else {
          // Display an error message if credentials are incorrect
          errorElement.style.display = "block";
          errorElement.textContent = "Failed to register. Try again later.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorElement.style.display = "block";
        errorElement.textContent = "An error occurred. Please try again later.";
      });
  });
});
