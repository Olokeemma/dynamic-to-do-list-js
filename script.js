// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');  // Add Task button
    const taskInput = document.getElementById('task-input');    // Task input field
    const taskList = document.getElementById('task-list');      // Task list (UL)

    // Function to add a new task
    function addTask() {
        // Get the task text from the input field and trim whitespace
        const taskText = taskInput.value.trim();

        // If the task text is not empty
        if (taskText !== "") {
            // Create a new <li> element for the task
            const newTask = document.createElement('li');

            // Set the text of the <li> to the task text
            newTask.textContent = taskText;

            // Create a "Remove" button for this task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';

            // Assign an onclick event to the remove button that removes the <li> element from the task list
            removeButton.onclick = function() {
                taskList.removeChild(newTask); // Remove the <li> from the task list
            };

            // Append the "Remove" button to the <li> element
            newTask.appendChild(removeButton);

            // Append the <li> element to the task list
            taskList.appendChild(newTask);

            // Clear the input field after adding the task
            taskInput.value = "";
        } else {
            // If the task input is empty, show an alert to the user
            alert("Please enter a task!");
        }
    }

    // Event listener for the "Add Task" button click
    addButton.addEventListener('click', addTask);

    // Event listener for pressing the "Enter" key in the task input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // Call addTask function when "Enter" is pressed
        }
    });
});
