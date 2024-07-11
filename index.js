document.addEventListener("DOMContentLoaded", () => {
    const openModalButton = document.querySelector("#open-modal");
    const closeModalButton = document.querySelector("#close-modal");
    const taskModal = document.querySelector("#task-modal");
    const addTaskButton = document.querySelector("#add-task");
    const inputBox = document.querySelector("#input-box");
    const addTaskContainer = document.querySelector("#task-container");
    const clearAllButtonSection = document.querySelector("#clear-button");

    // This is to open the pop-up
    openModalButton.addEventListener("click", () => {
        taskModal.classList.remove("hidden");
    })

    // This is to close the pop-up
    closeModalButton.addEventListener("click", () => {
        taskModal.classList.add("hidden");
    })

    // This is to add the task functionality

    addTaskButton.addEventListener("click", () => {
        if (inputBox.value.trim() === "") {
            alert("Please add some text");
        } else {
            let p = document.createElement("p")
            p.innerText = inputBox.value;
            p.className = "task-item flex items-center justify-between py-2"; // Add Tailwind classes for styling
            p.innerHTML = `
                <span class="material-icons cursor-pointer">check_box_outline_blank</span>
                <span class="task-text flex-1 m-2">${inputBox.value}</span>
                <span class="material-icons delete-icon cursor-pointer">delete</span>
            `;
            addTaskContainer.appendChild(p);
            let clearbutton = document.createElement("button");
            clearbutton.className = "bg-red-500 clear-all text-white px-4 py-2 rounded hover:bg-red-700";
            clearbutton.innerHTML = "clear"
            inputBox.value = ""; // Clear the input field
            taskModal.classList.add("hidden"); // Hide the modal
        }
        saveData();
    })

    // To handle delete tasks

    addTaskContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-icon")) {
        e.target.parentElement.remove();
        }
        saveData();
        
    })

     clearAllButtonSection.addEventListener("click", () => {
        addTaskContainer.innerHTML = "";
        saveData();
    });


    function saveData(){
    localStorage.setItem("data", addTaskContainer.innerHTML);
    }

    function showTask(){
        addTaskContainer.innerHTML = localStorage.getItem("data");
    }
    showTask();

})