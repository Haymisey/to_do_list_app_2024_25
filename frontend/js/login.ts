async function loginUser(event: Event): Promise<void> {
    event.preventDefault(); // Prevent the form from refreshing the page
  
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const errorMessage = document.getElementById("error-message") as HTMLDivElement;
    const successMessage = document.getElementById("success-message") as HTMLDivElement;
  
    try {
      const response = await fetch("http://localhost:3001/auth/signin", {
        // Change the URL as per your API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("access_token", data.access_token);
        // Display success message and redirect user
        successMessage.style.display = "block";
        errorMessage.style.display = "none";
        setTimeout(() => {
          window.location.href = "todolist.html"; // Redirect to the to-do list page
        }, 1000);
      } else {
        // Display error message
        errorMessage.textContent = "Login failed: " + data.message;
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
      }
    } catch (error: any) {
      errorMessage.textContent = "An error occurred: " + error.message;
      errorMessage.style.display = "block";
      successMessage.style.display = "none";
    }
  }
  