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
// Add event listeners with correct types for elements
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const suggestionsContainer = document.getElementById("search-suggestions");
const resultsContainer = document.getElementById("search-results");
const messageElement = document.getElementById("message");
searchButton.addEventListener("click", searchTasks);
searchInput.addEventListener("input", suggestTasks);
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchTasks();
    }
});
// Function for task suggestions
function suggestTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = searchInput.value.toLowerCase();
        if (!query)
            return;
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                showMessage("No access token found. Please log in.", "danger");
                return;
            }
            const response = yield fetch(`http://localhost:3001/todos?search=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const tasks = yield response.json();
            const filteredTasks = tasks.filter((task) => task.title.toLowerCase().startsWith(query));
            suggestionsContainer.innerHTML = "";
            if (query !== "") {
                filteredTasks.forEach((task) => {
                    const suggestionItem = document.createElement("div");
                    suggestionItem.classList.add("suggestion-item");
                    suggestionItem.textContent = task.title;
                    suggestionItem.addEventListener("click", function () {
                        searchInput.value = task.title;
                        searchTasks(); // Trigger search when a suggestion is clicked
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                showMessage(error.message, "danger");
            }
            else {
                showMessage("An unknown error occurred", "danger");
            }
        }
    });
}
// Function to search tasks
function searchTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = searchInput.value.toLowerCase();
        if (!query)
            return;
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                showMessage("No access token found. Please log in.", "danger");
                return;
            }
            const response = yield fetch(`http://localhost:3001/todos?search=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const tasks = yield response.json();
            const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(query));
            resultsContainer.innerHTML = "";
            if (filteredTasks.length === 0) {
                const li = document.createElement("li");
                li.classList.add("list-group-item");
                li.textContent = "Nothing Found";
                resultsContainer.appendChild(li);
            }
            else {
                filteredTasks.forEach((task) => {
                    const li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.textContent = task.title + (task.dueDate ? ` (Due: ${task.dueDate})` : "");
                    resultsContainer.appendChild(li);
                });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                showMessage(error.message, "danger");
            }
            else {
                showMessage("An unknown error occurred", "danger");
            }
        }
    });
}
// Function to show messages (for error handling)
function showMessage(message, type) {
    messageElement.textContent = message;
    messageElement.className = `alert alert-${type}`;
    messageElement.style.display = "block";
}
