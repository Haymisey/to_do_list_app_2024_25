// Add event listeners with correct types for elements
const searchButton = document.getElementById("search-button") as HTMLButtonElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const suggestionsContainer = document.getElementById("search-suggestions") as HTMLDivElement;
const resultsContainer = document.getElementById("search-results") as HTMLUListElement;
const messageElement = document.getElementById("message") as HTMLDivElement;

searchButton.addEventListener("click", searchTasks);
searchInput.addEventListener("input", suggestTasks);
searchInput.addEventListener("keypress", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
        searchTasks();
    }
});

// Define the Task type to provide proper typing
interface Task {
    title: string;
    dueDate: string;
}

// Function for task suggestions
async function suggestTasks(): Promise<void> {
    const query = searchInput.value.toLowerCase();
    if (!query) return;

    try {
        const token = localStorage.getItem("access_token");
        if (!token) {
            showMessage("No access token found. Please log in.", "danger");
            return;
        }

        const response = await fetch(`http://localhost:3001/todos?search=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const tasks: Task[] = await response.json();
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
    } catch (error: unknown) {
        if (error instanceof Error) {
            showMessage(error.message, "danger");
        } else {
            showMessage("An unknown error occurred", "danger");
        }
    }
}

// Function to search tasks
async function searchTasks(): Promise<void> {
    const query = searchInput.value.toLowerCase();
    if (!query) return;

    try {
        const token = localStorage.getItem("access_token");
        if (!token) {
            showMessage("No access token found. Please log in.", "danger");
            return;
        }

        const response = await fetch(`http://localhost:3001/todos?search=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const tasks: Task[] = await response.json();
        const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(query));

        resultsContainer.innerHTML = "";

        if (filteredTasks.length === 0) {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = "Nothing Found";
            resultsContainer.appendChild(li);
        } else {
            filteredTasks.forEach((task) => {
                const li = document.createElement("li");
                li.classList.add("list-group-item");
                li.textContent = task.title + (task.dueDate ? ` (Due: ${task.dueDate})` : "");
                resultsContainer.appendChild(li);
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            showMessage(error.message, "danger");
        } else {
            showMessage("An unknown error occurred", "danger");
        }
    }
}

// Function to show messages (for error handling)
function showMessage(message: string, type: string): void {
    messageElement.textContent = message;
    messageElement.className = `alert alert-${type}`;
    messageElement.style.display = "block";
}
