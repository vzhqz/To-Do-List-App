/*
    Seems like you're reviewing my code.
    If you have difficulties reading and understanding this code, It's ok, because I even don't understand what's going on here...
*/
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
function createTask(task, isDone = false) {
    const doneButton = document.createElement("input");
    doneButton.type = "checkbox";
    doneButton.className = "doneButton";
    doneButton.checked = isDone;


    const listItem = document.createElement("li");

    const taskContent = document.createElement("div");
    taskContent.className = "taskContent";

    const taskText = document.createElement("span");
    taskText.className = "taskText";
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

    taskContent.appendChild(taskText);
    taskContent.appendChild(buttonContainer);

    listItem.appendChild(doneButton);
    listItem.appendChild(taskContent);

    editButton.addEventListener("click", () => {
        const newTask = window.prompt("Edit your task:", taskText.textContent);
        if(newTask !== null && newTask.trim() !== "") {
            taskText.textContent = newTask.trim();
            saveTasks();
        }
    });


    deleteButton.addEventListener("click", () => {
        taskList.removeChild(listItem);
        saveTasks();
    });

    taskList.appendChild(listItem);

    doneButton.addEventListener("change", () => {
        if(doneButton.checked) {
            taskText.style.textDecoration = "line-through";
        }
        else {
            taskText.style.textDecoration = "none";
        }
        saveTasks();
    });

    if(isDone) {
        taskText.style.textDecoration = "line-through";
    }
    
}

// A function to save tasks to local storage
function saveTasks() {
    let tasks = [];

    taskList.querySelectorAll("li").forEach(item => {
        const taskText = item.querySelector(".taskText").textContent.trim();
        const isDone = item.querySelector(".doneButton").checked;
        tasks.push({ text: taskText, isDone });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// A function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTask(task.text, task.isDone);
    });
}