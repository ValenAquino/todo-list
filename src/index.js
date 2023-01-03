import style from "./index.css"

import { ProjectHandler, TaskHandler } from "./tasks";
import { Buttons } from "./buttons";

const body = document.querySelector("#body");

// Task buttons
const add_task_btn = document.querySelector("#add-task-btn-0");

// Task Modal
const add_task_modal = document.querySelector("#add-task-modal");
const close_task_modal = document.querySelector("#close_modal_task");
const submit_task_modal = document.querySelector("#submit-task");
const input_task_modal = document.querySelector("#task_name");
const task_form = document.querySelector("#task-form");

// Project buttons
const main_project_btn = document.querySelector("#main-project");
const remove_project_btn = document.querySelector("#remove-project-btn");
const add_project_btn = document.querySelector("#add-project-btn");

// Project Modal
const add_project_modal = document.querySelector("#add-project-modal");
const close_project_modal = document.querySelector("#close_modal_project");
const submit_project_modal = document.querySelector("#submit-project");
const input_project_modal = document.querySelector("#project_name");
const project_form = document.querySelector("#project-form");

// Tasks

add_task_btn.addEventListener("click", () => {
    showModal(add_task_modal, task_form);
});

close_task_modal.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(add_task_modal);
})

submit_task_modal.addEventListener("click", (e) => {
    e.preventDefault();

    let id = add_task_btn.getAttribute("id");
    let task_description = input_task_modal.value;    
    
    TaskHandler.addTask(task_description, getProjectID(id));
    closeModal(add_task_modal);
})

// Project

add_project_btn.addEventListener("click", () => {
    showModal(add_project_modal, project_form);
});

close_project_modal.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(add_project_modal);
})

submit_project_modal.addEventListener("click", (e) => {
    e.preventDefault();

    let project_name = input_project_modal.value;    
    ProjectHandler.addProject(project_name);
    closeModal(add_project_modal);
})

remove_project_btn.addEventListener("click", () => {
    alert("remove project")
});

// Utilities

function create_main_project() {
    let main_project = ProjectHandler.createProject("Todas las Tareas");
    Buttons.addProjectBtnEvent(main_project_btn, main_project);
}

function getProjectID(id) {
    let numString = id.replace("add-task-btn-", "");
    return parseInt(numString, 10);
}

function showModal(modal, form) {
    modal.classList.add("modal--show");
    body.classList.add("overflow-hidden");
    form.reset();
}

function closeModal(modal) {
    modal.classList.remove("modal--show");
    body.classList.remove("overflow-hidden");
}

// Initialization

create_main_project();