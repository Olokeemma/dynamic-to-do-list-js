// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');  // Add Task button
    const taskInput = document.getElementById('task-input');    // Task input field
    const taskList = document.getElementById('task-list');      // Task list (UL)

    // Function to load tasks from Local Storage and display them
    function loadTasks() {
        // Retrieve the tasks from Local Storage (if available), or an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // For each task, add it to the task list
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to prevent saving again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new <li> element for the task
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        // Create a "Remove" button for this task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button that removes the task
        removeButton.onclick = function() {
            // Remove the task from the DOM
            taskList.removeChild(newTask);

            // Remove the task from Local Storage
            removeTaskFromLocalStorage(taskText);
        };

        // Append the "Remove" button to the <li> element
        newTask.appendChild(removeButton);

        // Append the <li> element to the task list
        taskList.appendChild(newTask);

        // If 'save' is true, update the tasks in Local Storage
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText); // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated array to Local Storage
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated array to Local Storage
    }

    // Event listener for the "Add Task" button click
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim(); // Get and trim the task input
        if (taskText !== "") {
            addTask(taskText); // Add the task if it's not empty
        } else {
            alert("Please enter a task!"); // Alert if input is empty
        }
    });

    // Event listener for pressing the "Enter" key in the task input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get and trim the task input
            if (taskText !== "") {
                addTask(taskText); // Add the task if it's not empty
            } else {
                alert("Please enter a task!"); // Alert if input is empty
            }
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});

