const monthNames: string[] = [
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

let currentDate: Date = new Date();

// Function to render the calendar
async function renderCalendar(): Promise<void> {
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();

  const monthYearElement = document.getElementById("month-year") as HTMLElement;
  monthYearElement.textContent = `${monthNames[month]} ${year}`;

  const firstDay: number = new Date(year, month, 1).getDay();
  const lastDate: number = new Date(year, month + 1, 0).getDate();

  const calendarDays = document.getElementById("calendar-days") as HTMLElement;
  calendarDays.innerHTML = "";

  // Fetch tasks from the backend
  const tasks: { dueDate: string; title: string }[] = await fetchTaskks();

  // Get task due dates for the current month
  const taskDates: number[] = tasks
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
    const emptyCell: HTMLDivElement = document.createElement("div");
    emptyCell.classList.add("col", "empty");
    calendarDays.appendChild(emptyCell);
  }

  // Render the days of the month
  for (let day = 1; day <= lastDate; day++) {
    const dayCell: HTMLDivElement = document.createElement("div");
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
}

// Function to fetch tasks from the backend
async function fetchTaskks(): Promise<{ dueDate: string; title: string }[]> {
  try {
    const response = await fetch("http://localhost:3001/todos"); // Change this to your backend URL
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

// Show tasks for the selected date
async function displayTasksForDate(day: number): Promise<void> {
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();
  const selectedDate: Date = new Date(year, month, day);

  // Format the date as 'YYYY-MM-DD'
  const formattedDate: string = selectedDate.toISOString().split("T")[0];

  // Update the selected date display
  const selectedDateElement = document.getElementById("selected-date") as HTMLElement;
  selectedDateElement.textContent = formattedDate;

  // Fetch tasks for the selected date
  const tasks: { dueDate: string; title: string }[] = await fetchTaskks();
  const tasksForSelectedDate = tasks.filter(
    (task) => task.dueDate === formattedDate
  );

  const taskListElement = document.getElementById("task-list") as HTMLElement;
  taskListElement.innerHTML = "";

  // Display tasks or show message if no tasks exist for this date
  if (tasksForSelectedDate.length === 0) {
    const noTasksMessage: HTMLLIElement = document.createElement("li");
    noTasksMessage.classList.add("list-group-item");
    noTasksMessage.textContent = "No tasks for this date";
    taskListElement.appendChild(noTasksMessage);
  } else {
    tasksForSelectedDate.forEach((task) => {
      const taskItem: HTMLLIElement = document.createElement("li");
      taskItem.classList.add("list-group-item");
      taskItem.textContent = task.title;
      taskListElement.appendChild(taskItem);
    });
  }

  // Show the task details section
  const taskDetailsSection = document.getElementById("task-details") as HTMLElement;
  taskDetailsSection.style.display = "block";
}

// Navigate to the previous month
function prevMonth(): void {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

// Navigate to the next month
function nextMonth(): void {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

// Initialize the calendar on page load
renderCalendar();
