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
var _a;
function showMessagee(message, type) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.className = `alert alert-${type}`;
    messageElement.style.display = "block";
}
function fetchTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("access_token");
        console.log("Access Token:", token);
        if (!token) {
            showMessagee("No access token found. Please log in.", "danger");
            return;
        }
        try {
            const response = yield fetch("http://localhost:3001/todos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const tasks = yield response.json();
            const taskList = document.getElementById("task-list");
            taskList.innerHTML = "";
            tasks.forEach((task) => {
                const listItem = document.createElement("li");
                listItem.className =
                    "list-group-item d-flex justify-content-between align-items-center";
                listItem.textContent = task.title;
                // Create button container
                const buttonContainer = document.createElement("div");
                buttonContainer.className = "btn-group";
                // Edit button
                const editButton = document.createElement("button");
                editButton.className = "btn btn-warning btn-sm";
                editButton.innerHTML = "✏️"; // Pencil icon
                editButton.onclick = () => editTask(task, editButton);
                buttonContainer.appendChild(editButton);
                // Delete button
                const deleteButton = document.createElement("button");
                deleteButton.className = "btn btn-danger btn-sm";
                deleteButton.innerHTML = "🗑️"; // Trash icon
                deleteButton.onclick = () => deleteTask(task.id, listItem);
                buttonContainer.appendChild(deleteButton);
                // Append the button container to the list item
                listItem.appendChild(buttonContainer);
                // Append the list item to the task list
                taskList.appendChild(listItem);
            });
        }
        catch (error) {
            if (error instanceof Error) {
                showMessagee(error.message, "danger");
            }
            else {
                showMessagee("An unknown error occurred", "danger");
            }
        }
    });
}
function addTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const title = document.getElementById("new-task").value;
        const dueDate = document.getElementById("due-date")
            .value;
        const token = localStorage.getItem("access_token");
        if (!title || !dueDate) {
            showMessagee("Please provide a title and due date for the task.", "warning");
            return;
        }
        if (!token) {
            showMessagee("No access token found. Please log in.", "danger");
            return;
        }
        const newTask = {
            title: title,
            dueDate: dueDate,
        };
        try {
            const response = yield fetch("http://localhost:3001/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            });
            if (!response.ok) {
                throw new Error("Failed to add task");
            }
            const task = yield response.json();
            showMessagee("Task added successfully!", "success");
            fetchTasks(); // Re-fetch tasks after adding a new one
            document.getElementById("new-task").value = "";
            document.getElementById("due-date").value = "";
        }
        catch (error) {
            if (error instanceof Error) {
                showMessagee(error.message, "danger");
            }
            else {
                showMessagee("An unknown error occurred", "danger");
            }
        }
    });
}
function editTask(task, editButton) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTitle = prompt("Edit the task title:", task.title);
        if (!newTitle || newTitle === task.title)
            return;
        try {
            const token = localStorage.getItem("access_token");
            const response = yield fetch(`http://localhost:3001/todos/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: newTitle, dueDate: task.dueDate }),
            });
            if (!response.ok) {
                throw new Error("Failed to update task");
            }
            task.title = newTitle; // Update the task in the DOM
            showMessagee("Task updated successfully!", "success");
            fetchTasks(); // Re-fetch tasks to show updated title
        }
        catch (error) {
            if (error instanceof Error) {
                showMessagee(error.message, "danger");
            }
            else {
                showMessagee("An unknown error occurred", "danger");
            }
        }
    });
}
function deleteTask(taskId, listItem) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("access_token");
            const response = yield fetch(`http://localhost:3001/todos/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            listItem.remove(); // Remove the task from the DOM
            showMessagee("Task deleted successfully!", "success");
        }
        catch (error) {
            if (error instanceof Error) {
                showMessagee(error.message, "danger");
            }
            else {
                showMessagee("An unknown error occurred", "danger");
            }
        }
    });
}
// Event listeners
(_a = document.getElementById("add-task")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page is loaded, fetching tasks...");
    fetchTasks();
});
