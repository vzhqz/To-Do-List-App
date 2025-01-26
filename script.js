const userTask = document.getElementById("userTask");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Call the function loadTasks when webpage is loaded
loadTasks();

// If user is in the input thingy and the user clicks enter it adds a task
userTask.addEventListener("keydown", event => {
    if(event.key === "Enter") {
        addTask();
    }
})

// Toggles the userTask input when / is pressed and Escape to un toggle  
document.addEventListener("keydown", event => {
    if(event.key === "/") {
        event.preventDefault();
        userTask.focus();
    }
    else if(event.key === "Escape") {
        userTask.blur();
    }
    else if(event.key === "Delete") {
        const lastTask = taskList.lastElementChild;
        if(lastTask) {
            taskList.removeChild(lastTask);
            saveTasks();
        }
    }
})

// A function to add a task to display
function addTask() {
    const task = userTask.value.trim();

    if(task) {
        createTask(task);
        userTask.value = "";
        saveTasks();
    }
    else {
        window.alert("Please enter a task!")
    }
}

// If the button is clicked then call the addTask function
addTaskBtn.addEventListener("click", addTask);

// A function to create the task for the add task thing idk
function createTask(task) {
    const listItem = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.className = "deleteBtn";

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton.className = "editButton";

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(taskText);
    listItem.appendChild(buttonContainer);

    editButton.addEventListener("click", () => {
        const newTask = window.prompt("Edit your task:", taskText.textContent);
        if(newTask !== null && newTask.trim() !== "") {
            taskText.textContent = newTask.trim();
            saveTasks();
        }
    })

    deleteButton.addEventListener("click", () => {
        taskList.removeChild(listItem);
        saveTasks();
    })
    
    taskList.appendChild(listItem);
}

// A function to save tasks to local storage
function saveTasks() {
    let tasks = [];

    taskList.querySelectorAll("li span").forEach(item => {
        tasks.push(item.textContent.trim());
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// A function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createTask);
}