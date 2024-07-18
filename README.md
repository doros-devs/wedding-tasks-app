# Wedding Tasks Management App

## Overview

This application is designed to manage wedding tasks for various committee members. Each coordinator role can have its own set of tasks and designated committee members in charge. The application allows for adding, viewing, and managing tasks and committee members dynamically. The data is persisted using `localStorage`.

## Features

- Add, view, and manage tasks for each coordinator role.
- Add, view, and manage committee members in charge of tasks.
- Tasks and committee members are persisted in `localStorage`.
- Tasks can be marked as completed, and they will move to the "Completed Tasks" section.
- Responsive design using Tailwind CSS for a seamless experience across devices.

## Prerequisites

- Ensure you have `json-server` installed to mock the backend.
- Tailwind CSS is used for styling.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**
    ```bash
    npm install -g json-server
    ```

3. **Start the JSON server:**
    ```bash
    json-server --watch db.json --port 3000
    ```

4. **Open the `index.html` file in your browser.**

## Project Structure

- `index.html`: Main HTML file containing the structure of the app.
- `styles.css`: Contains any additional styles for the application.
- `index.js`: JavaScript file handling the dynamic functionalities of the app.
- `db.json`: Mock data for the JSON server to simulate backend endpoints.

## Usage

### Adding a New Task

1. Click on the "Add New Tasks" button.
2. Enter the task description in the pop-up modal.
3. Click "Add Task" to save the task.
4. The task will appear in the "Current Tasks" section.

### Marking a Task as Completed

1. Check the checkbox next to the task description.
2. The task will move to the "Completed Tasks" section and have a line-through style.

### Adding a Committee Member

1. Click on the "Add Person In Charge of Task" button.
2. Enter the name of the committee member in the pop-up modal.
3. Click "Add Member" to save the member.
4. The member will appear in the list of committee members.

### Clearing All Tasks

1. Click on the "Clear" button to remove all tasks from the current section.

### Switching Between Coordinator Roles

1. Select a different coordinator role from the dropdown menu.
2. The tasks and committee members for the selected role will be displayed.

### Responsiveness

The app is designed to be responsive and should work well on tablets and mobile devices. The layout adjusts to provide a user-friendly experience across different screen sizes.

## JavaScript Explanation

1. **Event Listeners:**
    - **openModalButton & closeModalButton:** Handle opening and closing of the task modal.
    - **addTaskButton:** Adds a new task to the current section.
    - **openCommitteeModalButton & closeCommitteeModalButton:** Handle opening and closing of the committee member modal.
    - **addCommitteeMemberButton:** Adds a new committee member to the current section.
    - **sectionSelect:** Updates the displayed tasks and committee members when the selected coordinator role changes.
    - **clearAllButtonSection:** Clears all tasks from the current section.

2. **Functions:**
    - **fetchAndPopulateTasks(section):** Fetches tasks for the given section from the JSON server and populates them.
    - **populateTasks(data):** Populates the task container with tasks fetched from the server.
    - **saveData():** Saves the tasks for the current section to `localStorage`.
    - **showTask():** Loads and displays tasks for the current section from `localStorage`.
    - **saveCommitteeMembers():** Saves the committee members for the current section to `localStorage`.
    - **showCommitteeMembers(section):** Loads and displays committee members for the given section from `localStorage`.

## Contributing

If you wish to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

---

By following this README, you should be able to set up and run the Wedding Tasks Management App locally, understand its structure, and make modifications as needed.
