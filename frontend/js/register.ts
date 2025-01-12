// Event listener for form submission
document
  .getElementById("register-form")!
  .addEventListener("submit", async function (e: SubmitEvent) {
    e.preventDefault(); // Prevent form submission

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirm-password") as HTMLInputElement).value;

    const errorMessage = document.getElementById("error-message") as HTMLDivElement;
    const successMessage = document.getElementById("success-message") as HTMLDivElement;

    // Check if passwords match
    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match!";
      errorMessage.style.display = "block";
      return;
    } else {
      errorMessage.style.display = "none";
    }

    // Send data to backend (NestJS)
    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        successMessage.style.display = "block";
        setTimeout(() => {
          window.location.href = "login.html"; // Redirect to login page after registration
        }, 2000);
      } else {
        errorMessage.textContent = "Registration failed: " + data.message;
        errorMessage.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage.textContent = "An error occurred. Please try again.";
      errorMessage.style.display = "block";
    }
  });
