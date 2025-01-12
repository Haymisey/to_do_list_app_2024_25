"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loginUser(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault(); // Prevent the form from refreshing the page
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");
        const successMessage = document.getElementById("success-message");
        try {
            const response = yield fetch("http://localhost:3001/auth/signin", {
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
            const data = yield response.json();
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
            }
            else {
                // Display error message
                errorMessage.textContent = "Login failed: " + data.message;
                errorMessage.style.display = "block";
                successMessage.style.display = "none";
            }
        }
        catch (error) {
            errorMessage.textContent = "An error occurred: " + error.message;
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
        }
    });
}
