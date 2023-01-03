import style from "./index.css"

import { ProjectHandler, TaskHandler } from "./tasks";
import { Buttons } from "./buttons";

/* ===== General Elements ===== */
const body = document.querySelector("#body");

/* ===== Tasks btns ===== */
const add_task_btn = document.querySelector("#add-task-btn-0");

/* ===== Tasks modal ===== */
const add_task_modal = document.querySelector("#add-task-modal");
const close_task_modal = document.querySelector("#close_modal_task");
const submit_task_modal = document.querySelector("#submit-task");
const input_task_modal = document.querySelector("#task_name");
const task_form = document.querySelector("#task-form");

/* ===== Project btns ===== */
const remove_project_btn = document.querySelector("#remove-project-btn-0");
const add_project_btn = document.querySelector("#add-project-btn");

/* ===== Project modal ===== */
const add_project_modal = document.querySelector("#add-project-modal");
const close_project_modal = document.querySelector("#close_modal_project");
const submit_project_modal = document.querySelector("#submit-project");
const input_project_modal = document.querySelector("#project_name");
const project_form = document.querySelector("#project-form");


/* ===== Tasks ===== */

add_task_btn.addEventListener("click", () => {
    showModal(add_task_modal, task_form);
});

submit_task_modal.addEventListener("click", (e) => {
    e.preventDefault();

    let id = add_task_btn.getAttribute("id");
    let task_description = input_task_modal.value;

    if(task_description < 1) {
        alert("No se puede enviar el campo vacio");
    }
    else {
        TaskHandler.addTask(task_description, getProjectID("add-task-btn-", id));
        closeModal(add_task_modal);
    }
});

close_task_modal.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(add_task_modal);
});


/* ===== Projects ===== */

add_project_btn.addEventListener("click", () => {
    showModal(add_project_modal, project_form);
});

submit_project_modal.addEventListener("click", (e) => {
    e.preventDefault();

    let project_name = input_project_modal.value;

    if(project_name < 1) {
        alert("No se puede enviar el campo vacio");
    }
    else {
        closeModal(add_project_modal);
        ProjectHandler.addProject(project_name);
    }
    
});

close_project_modal.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(add_project_modal);
});

remove_project_btn.addEventListener("click", () => {
    let id = remove_project_btn.getAttribute("id");
    let projectID = getProjectID("remove-project-btn-", id);
    let project_name = ProjectHandler.getProjectNameByID(projectID);

    if(projectID != 0 && confirm(`Desea borrar el proyecto ${project_name}`)) {
        ProjectHandler.deleteProject(projectID);
    }
});


/* ===== Utilities ===== */

function getProjectID(str, id) {
    let numString = id.replace(str, "");
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