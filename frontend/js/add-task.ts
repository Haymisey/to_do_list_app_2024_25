interface Task {
  id: string;
  title: string;
  dueDate: string;
}

function showMessagee(message: string, type: string): void {
  const messageElement = document.getElementById("message") as HTMLElement;
  messageElement.textContent = message;
  messageElement.className = `alert alert-${type}`;
  messageElement.style.display = "block";
}

async function fetchTasks(): Promise<void> {
  const token = localStorage.getItem("access_token");
  console.log("Access Token:", token);
  if (!token) {
    showMessagee("No access token found. Please log in.", "danger");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/todos", {
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

    const tasks: Task[] = await response.json();
    const taskList = document.getElementById("task-list") as HTMLElement;
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      showMessagee(error.message, "danger");
    } else {
      showMessagee("An unknown error occurred", "danger");
    }
  }
}

async function addTask(): Promise<void> {
  const title = (document.getElementById("new-task") as HTMLInputElement).value;
  const dueDate = (document.getElementById("due-date") as HTMLInputElement)
    .value;
  const token = localStorage.getItem("access_token");
  if (!title || !dueDate) {
    showMessagee(
      "Please provide a title and due date for the task.",
      "warning"
    );
    return;
  }

  if (!token) {
    showMessagee("No access token found. Please log in.", "danger");
    return;
  }

  const newTask: Task = {
    title: title,
    dueDate: dueDate,
  };

  try {
    const response = await fetch("http://localhost:3001/todos", {
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

    const task = await response.json();
    showMessagee("Task added successfully!", "success");
    fetchTasks(); // Re-fetch tasks after adding a new one
    (document.getElementById("new-task") as HTMLInputElement).value = "";
    (document.getElementById("due-date") as HTMLInputElement).value = "";
  } catch (error: unknown) {
    if (error instanceof Error) {
      showMessagee(error.message, "danger");
    } else {
      showMessagee("An unknown error occurred", "danger");
    }
  }
}

async function editTask(task: Task, editButton: HTMLElement): Promise<void> {
  const newTitle = prompt("Edit the task title:", task.title);
  if (!newTitle || newTitle === task.title) return;

  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:3001/todos/${task.id}`, {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      showMessagee(error.message, "danger");
    } else {
      showMessagee("An unknown error occurred", "danger");
    }
  }
}

async function deleteTask(
  taskId: string,
  listItem: HTMLElement
): Promise<void> {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:3001/todos/${taskId}`, {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      showMessagee(error.message, "danger");
    } else {
      showMessagee("An unknown error occurred", "danger");
    }
  }
}

// Event listeners
document.getElementById("add-task")?.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page is loaded, fetching tasks...");
  fetchTasks();
});
