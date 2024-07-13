document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task}
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            taskList.appendChild(li);
        });
    };

    // Add task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    });

    // Delete task
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });

    // Initial render
    renderTasks();
});
