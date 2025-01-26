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
    listItem.textContent = task
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteBtn";

    listItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        taskList.removeChild(listItem);
        saveTasks();
    })
    
    taskList.appendChild(listItem);
}

// A function to save tasks to local storage
function saveTasks() {
    let tasks = [];

    taskList.querySelectorAll("li").forEach(item => {
        tasks.push(item.textContent.replace("Delete", "").trim());
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// A function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // btw this website was developed by d!aa or vzhqz;
    tasks.forEach(createTask)
}