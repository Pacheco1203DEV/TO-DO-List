// Cargar tareas desde localStorage al iniciar la página
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const taskDate = document.getElementById("taskDate").value;

    if (taskInput.trim() === "") return;

    let tasks = getTasks();
    tasks.push({ text: taskInput, completed: false, date: taskDate });
    saveTasks(tasks);
    renderTasks(tasks);
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = ""; // Limpia el campo de fecha
}

function toggleTask(checkbox) {
    let tasks = getTasks();
    let taskIndex = checkbox.parentElement.getAttribute("data-index");
    tasks[taskIndex].completed = checkbox.checked;
    saveTasks(tasks);
    renderTasks(tasks);
}

function deleteTask(button) {
    let tasks = getTasks();
    let taskIndex = button.parentElement.getAttribute("data-index");
    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    renderTasks(tasks);
}

function editTask(button) {
    let taskItem = button.parentElement;
    let taskIndex = taskItem.getAttribute("data-index");
    let tasks = getTasks();
    let taskText = tasks[taskIndex].text;

    // Pide al usuario que edite la tarea
    let newTaskText = prompt("Edita tu tarea:", taskText);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[taskIndex].text = newTaskText.trim();
        saveTasks(tasks);
        renderTasks(tasks);
    }
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");
    taskList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task-item";
        li.setAttribute("data-index", index);
        li.innerHTML = `<input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(this)"> 
                        <span class="${task.completed ? 'completed' : ''}">${task.text} - ${task.date ? task.date : 'Sin fecha'}</span>
                        <button onclick="editTask(this)"><i class="fas fa-pencil-alt"></i></button>
                        <button onclick="deleteTask(this)"><i class="fas fa-times"></i></button>`;
                        
        if (task.completed) {
            completedList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
}

// Cargar tareas al iniciar
function loadTasks() {
    const tasks = getTasks();
    renderTasks(tasks);
}

// Modo oscuro
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    darkModeToggle.classList.toggle("dark");

    if (body.classList.contains("dark-mode")) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});