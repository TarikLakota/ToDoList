const api_url = "https://todolist-19aq.onrender.com/api/task";

async function fetchTask() {
    try {
        const response = await fetch("api_url");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const tasks = await response.json();
        console.log("Fetched tasks:", tasks);

        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear existing tasks

        tasks.forEach(task => {
            console.log("Checking task object:", task);

            const taskItem = document.createElement("li");
            taskItem.classList.add("task-item");
            taskItem.setAttribute("data-id", task.id); // Ensure each task has a unique ID

            if (task.isCompleted) {
                taskItem.classList.add("completed");
            }

            taskItem.innerHTML = `
                <span>${task.name}: ${task.description}</span>
                <button onclick="toggleTask(${task.id}, ${task.isCompleted})">✔</button>
                <button onclick="deleteTask(${task.id})">❌</button>
            `;

            taskList.appendChild(taskItem);
        });

    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}



//add new task

async function addTask() {
    const name = document.getElementById("taskName").value;
    const description = document.getElementById("taskDescription").value;

    if ( !name || !description) {
        alert("Please enter a task name and description!");
        return;
    }

    const task = { name, description, isCompleted: false };

    await fetch(api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },//this says to server "I am sending JSON data"
        body: JSON.stringify(task)
    });

    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    fetchTask();//reloading the task list
}

//toggle task completion
async function toggleTask(id, isCompleted) {
    try {
        const response = await fetch(`${api_url}/${id}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${respons.status}`);

        const task = await response.json();//fetch full task details
        console.log("Task before updating: ", task);

        const updatedTask = {
            id: task.id,
            name: task.name,
            description: task.description,
            isCompleted: !isCompleted // this will only change because this method is only activated when we want to change is to completed
        };

        console.log("Sending PUT request with:", updatedTask);
        const updatedResponse = await fetch(`${api_url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)//convert js object to JSON
        });

        if (!updatedResponse.ok) {
            const errorData = await updatedResponse.text();
            throw new Error(`Error updating task: ${errorData}`);
        }
        console.log("Task updated successfully");
        fetchTask();
    } catch (error) {
        console.error(error);
    }
}

//delete a task
async function deleteTask(id) {
    try {
        const response = await fetch(`${api_url}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(`Error deleting task: ${response.statusText}`);

        console.log(`Task ${id} deleted successfully`);

        const taskItem = document.querySelector(`[data-id="${id}"]`);
        if (taskItem) taskItem.remove();

    } catch (error) {
        console.error("Error deleting task: ", error);
    }
}

fetchTask();