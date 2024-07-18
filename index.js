document.addEventListener("DOMContentLoaded", () => {
    const openModalButton = document.querySelector("#open-modal");
    const closeModalButton = document.querySelector("#close-modal");
    const taskModal = document.querySelector("#task-modal");
    const addTaskButton = document.querySelector("#add-task");
    const addCommitteeMemberButton = document.querySelector("#add-committee-member");
    const inputBox = document.querySelector("#input-box");
    const addTaskContainer = document.querySelector("#task-container");
    const addCommitteeMemberContainer = document.querySelector(".committee-member")
    const inputCommittee = document.querySelector("#input-committee");
    const clearAllButtonSection = document.querySelector("#clear-button");
    const completedTaskContainer = document.querySelector("#completed-task");
    const sectionSelect = document.getElementById('section-select');
    const committeeModal = document.querySelector("#committee-modal");
    const openCommitteeModalButton = document.querySelector("#open-committee-modal");
    const closeCommitteeModalButton = document.querySelector("#close-committee-modal");
    
    let currentSection = sectionSelect.value;

    function fetchAndPopulateTasks(section){
        const url = `http://localhost:3000/${encodeURIComponent(section)}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate the tasks for the default section
            console.log(sectionSelect.value);
            populateTasks(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    

    // Populate tasks based on the section
    function populateTasks(data) {
        addTaskContainer.innerHTML = '';
        completedTaskContainer.innerHTML = '';

        const tasks = data;

        if (tasks) {
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.className = "task-item flex items-center justify-between py-2";
                taskElement.innerHTML = `
                <input type="checkbox" name="" id="" class="ml-2 accent-black cursor-pointer check-box">
                <span class="task-text flex-1 m-2 text-lg">${task.task}</span>
                <span class="material-icons delete-icon cursor-pointer">delete</span>
            `;
                addTaskContainer.appendChild(taskElement);
            });
        }
    }
    
    // Update tasks when the dropdown value changes
    sectionSelect.addEventListener('change', () => {
        currentSection = sectionSelect.value;
        fetchAndPopulateTasks(currentSection);
        showCommitteeMembers(currentSection); // Show committee members for the selected section
    });

    // Open the pop-up
    openModalButton.addEventListener("click", () => {
        taskModal.classList.remove("hidden");
    });
    openCommitteeModalButton.addEventListener("click", () => {
        committeeModal.classList.remove("hidden");
    });

    // Close the pop-up
    closeModalButton.addEventListener("click", () => {
        taskModal.classList.add("hidden");
    });
    closeCommitteeModalButton.addEventListener("click", () => {
        committeeModal.classList.add("hidden");
    });

    // Add task functionality
    addTaskButton.addEventListener("click", () => {
        if (inputBox.value.trim() === "") {
            alert("Please add some text");
        } else {
            const taskElement = document.createElement("div");
            taskElement.className = "task-item flex items-center justify-between py-2"; // Add Tailwind classes for styling
            taskElement.innerHTML = `
                <input type="checkbox" name="" id="" class="ml-2 accent-black cursor-pointer check-box">
                <span class="task-text flex-1 m-2 text-lg">${inputBox.value}</span>
                <span class="material-icons delete-icon cursor-pointer">delete</span>
            `;
            addTaskContainer.appendChild(taskElement);
            inputBox.value = ""; // Clear the input field
            taskModal.classList.add("hidden"); // Hide the modal
            saveData(); // Save tasks
        }
    });

    // Add committee member functionality
    addCommitteeMemberButton.addEventListener("click", () => {
        if (inputCommittee.value.trim() === "") {
            alert("Please add some text");
        } else {
            const committeeMemberElement = document.createElement("div");
            committeeMemberElement.className = "task-item flex items-center justify-between mb-4"; // Add Tailwind classes for styling
            committeeMemberElement.innerHTML = `
                <span class="task-text flex-1 m-2 text-lg"> Person in charge: ${inputCommittee.value}</span>
                <span class="material-icons delete-icon cursor-pointer">delete</span>
            `;
            addCommitteeMemberContainer.appendChild(committeeMemberElement);
            inputCommittee.value = ""; // Clear the input field
            committeeModal.classList.add("hidden"); // Hide the modal
            saveCommitteeMembers(); // Save committee members
        }
    });

    // Line-through functionality for tasks
    document.addEventListener("change", (e) => {
        if (e.target.classList.contains("check-box")) {
            const taskText = e.target.nextElementSibling;

            if (e.target.checked) {
                // Add line-through to task text and move to completed section
                taskText.classList.add("line-through");
                completedTaskContainer.appendChild(e.target.parentElement);
            } else {
                // Remove line-through from task text and move back to task container
                taskText.classList.remove("line-through");
                addTaskContainer.appendChild(e.target.parentElement);
            }
            saveData(); // Save tasks
        }
    });

    // Delete tasks
    addTaskContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-icon")) {
            e.target.parentElement.remove();
            saveData(); // Save tasks
        }
    });

    // Delete committee members
    addCommitteeMemberContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-icon")) {
            e.target.parentElement.remove();
            saveCommitteeMembers(); // Save committee members
        }
    });

    // Delete buttons in completed tasks section
    completedTaskContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-icon")) {
            e.target.parentElement.remove();
            saveData(); // Save tasks
        }
    });

    // Clear all tasks
    clearAllButtonSection.addEventListener("click", () => {
        addTaskContainer.innerHTML = "";
        saveData(); // Save tasks
    });

    function saveData() {
        localStorage.setItem(`${currentSection}-tasks`, addTaskContainer.innerHTML);
    }

    function showTask() {
        addTaskContainer.innerHTML = localStorage.getItem(`${currentSection}-tasks`) || "";
    }

    function saveCommitteeMembers() {
        localStorage.setItem(`${currentSection}-committee`, addCommitteeMemberContainer.innerHTML);
    }

    function showCommitteeMembers(section) {
        addCommitteeMemberContainer.innerHTML = localStorage.getItem(`${section}-committee`) || "";
    }

    // Initial load
    showTask();
    showCommitteeMembers(currentSection);
    fetchAndPopulateTasks(currentSection);
});