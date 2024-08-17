document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const errorElement = document.getElementById("email-error");
  const form = document.getElementById("password-reset-form");

  form.addEventListener("submit", function (event) {
    const email = emailInput.value;

    // Simulate a request to the server to check if the email exists
    fetch(`your-check-email-endpoint?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.exists) {
          event.preventDefault(); // Prevent form submission
          errorElement.style.display = "block";
          errorElement.textContent = "This email address is not registered.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        event.preventDefault(); // Prevent form submission
        errorElement.style.display = "block";
        errorElement.textContent = "An error occurred. Please try again later.";
      });
  });
});
