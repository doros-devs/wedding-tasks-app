document.addEventListener("DOMContentLoaded", () => {
    const openModalButton = document.querySelector("#open-modal");
    const closeModalButton = document.querySelector("#close-modal");
    const taskModal = document.querySelector("#task-modal");
    const addTaskButton = document.querySelector("#add-task");
    const inputBox = document.querySelector("#input-box");
    const addTaskContainer = document.querySelector("#task-container");
    const clearAllButtonSection = document.querySelector("#clear-button");
    const completedTaskContainer = document.querySelector("#completed-task")
    

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
                <input type="checkbox" name="" id="" class="ml-2 accent-black cursor-pointer check-box">
                <span class="task-text flex-1 m-2 text-lg">${inputBox.value}</span>
                <span class="material-icons delete-icon cursor-pointer">delete</span>
            `;
            addTaskContainer.appendChild(p);
            inputBox.value = ""; // Clear the input field
            taskModal.classList.add("hidden"); // Hide the modal
        }
        saveData();
    })

    // To handle the linethrough functionality

    addTaskContainer.addEventListener("change", (e) => {
         if (e.target.classList.contains("check-box")) {
            const taskText = e.target.nextElementSibling;

            if (e.target.checked) {
                // Add line-through to task text and move to completed section
                taskText.classList.add("line-through");
                e.target.parentElement.remove();
                completedTaskContainer.appendChild(e.target.parentElement)
            
            
            } else {
                // Remove line-through from task text and move
                e.target.parentElement.remove();
                taskText.classList.remove("line-through");
                addTaskContainer.appendChild(e.target.parentElement)
            }
            saveData();
        }
    }) 

    // To handle delete tasks

    addTaskContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-icon" )) {
        e.target.parentElement.remove();
        }
        saveData();
        
    })

    // To handle deleted buttons in completed tasks section
    completedTaskContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-icon" )) {
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