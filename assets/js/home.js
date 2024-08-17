document.addEventListener("DOMContentLoaded", function () {
  const userNameElement = document.getElementById("user-name");
  const servicesContainer = document.getElementById("services-container");
  const logoutButton = document.getElementById("logout-button");

  // Fetch user info and services data
  fetchUserInfo();
  fetchServices();

  logoutButton.addEventListener("click", function () {
    // Handle logout
    fetch("your-logout-endpoint", {
      method: "POST",
      credentials: "include", // To include cookies in the request if needed
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/"; // Redirect to login page
        } else {
          alert("Logout failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });

  function fetchUserInfo() {
    fetch("your-user-info-endpoint", {
      method: "GET",
      credentials: "include", // To include cookies in the request if needed
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          userNameElement.textContent = `Welcome, ${data.user.name}`;
        } else {
          window.location.href = "/"; // Redirect to login page if not logged in
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        window.location.href = "/";
      });
  }

  function fetchServices() {
    fetch("your-services-endpoint", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          data.services.forEach((service) => {
            const serviceCard = document.createElement("div");
            serviceCard.classList.add("service-card");
            serviceCard.innerHTML = `
                        <img src="${service.image}" alt="${service.name}">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                    `;
            serviceCard.addEventListener("click", function () {
              window.location.href = service.link; // Redirect to the service page
            });
            servicesContainer.appendChild(serviceCard);
          });
        } else {
          servicesContainer.innerHTML = "<p>No services available.</p>";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        servicesContainer.innerHTML = "<p>Failed to load services.</p>";
      });
  }
});
