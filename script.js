
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearAllBtn");

function renderTasks() {
taskList.innerHTML = "";
tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
    <input type="checkbox" class="completeBox" ${task.completed ? "checked" : ""} data-index="${index}">
    <span class="task-text">${task.text}</span>
    <button class="deleteBtn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(li);
});
}

addBtn.addEventListener("click", () => {
const text = taskInput.value.trim();
if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveAndRender();
}
});

taskList.addEventListener("click", (e) => {
const index = e.target.getAttribute("data-index");

if (e.target.classList.contains("deleteBtn")) {
    tasks.splice(index, 1);
}

if (e.target.classList.contains("completeBox")) {
    tasks[index].completed = e.target.checked;
}

saveAndRender();
});

clearBtn.addEventListener("click", () => {
tasks = [];
saveAndRender();
});

function saveAndRender() {
localStorage.setItem("tasks", JSON.stringify(tasks));
renderTasks();
}

renderTasks();
