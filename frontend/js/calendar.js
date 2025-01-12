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
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
let currentDate = new Date();
// Function to render the calendar
function renderCalendar() {
    return __awaiter(this, void 0, void 0, function* () {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthYearElement = document.getElementById("month-year");
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const calendarDays = document.getElementById("calendar-days");
        calendarDays.innerHTML = "";
        // Fetch tasks from the backend
        const tasks = yield fetchTaskks();
        // Get task due dates for the current month
        const taskDates = tasks
            .map((task) => {
            const taskDate = new Date(task.dueDate);
            return {
                day: taskDate.getDate(),
                month: taskDate.getMonth(),
                year: taskDate.getFullYear(),
            };
        })
            .filter((taskDate) => taskDate.year === year && taskDate.month === month)
            .map((taskDate) => taskDate.day);
        // Render empty cells before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("col", "empty");
            calendarDays.appendChild(emptyCell);
        }
        // Render the days of the month
        for (let day = 1; day <= lastDate; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("col");
            dayCell.textContent = day.toString();
            // Highlight the day if it has tasks
            if (taskDates.includes(day)) {
                dayCell.style.backgroundColor = "#ffeb3b"; // Highlight the date
            }
            // Add click event to the day cell
            dayCell.addEventListener("click", () => displayTasksForDate(day));
            calendarDays.appendChild(dayCell);
        }
    });
}
// Function to fetch tasks from the backend
function fetchTaskks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3001/todos"); // Change this to your backend URL
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            return yield response.json();
        }
        catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    });
}
// Show tasks for the selected date
function displayTasksForDate(day) {
    return __awaiter(this, void 0, void 0, function* () {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const selectedDate = new Date(year, month, day);
        // Format the date as 'YYYY-MM-DD'
        const formattedDate = selectedDate.toISOString().split("T")[0];
        // Update the selected date display
        const selectedDateElement = document.getElementById("selected-date");
        selectedDateElement.textContent = formattedDate;
        // Fetch tasks for the selected date
        const tasks = yield fetchTaskks();
        const tasksForSelectedDate = tasks.filter((task) => task.dueDate === formattedDate);
        const taskListElement = document.getElementById("task-list");
        taskListElement.innerHTML = "";
        // Display tasks or show message if no tasks exist for this date
        if (tasksForSelectedDate.length === 0) {
            const noTasksMessage = document.createElement("li");
            noTasksMessage.classList.add("list-group-item");
            noTasksMessage.textContent = "No tasks for this date";
            taskListElement.appendChild(noTasksMessage);
        }
        else {
            tasksForSelectedDate.forEach((task) => {
                const taskItem = document.createElement("li");
                taskItem.classList.add("list-group-item");
                taskItem.textContent = task.title;
                taskListElement.appendChild(taskItem);
            });
        }
        // Show the task details section
        const taskDetailsSection = document.getElementById("task-details");
        taskDetailsSection.style.display = "block";
    });
}
// Navigate to the previous month
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}
// Navigate to the next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}
// Initialize the calendar on page load
renderCalendar();
