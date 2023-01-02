import style from "./index.css"

import { ProjectHandler, TaskHandler } from "./tasks";
import { Buttons } from "./buttons";
import { add } from "date-fns";

const main_project_btn = document.querySelector("#main-project");
const remove_project_btn = document.querySelector("#remove-project-btn");

const add_project_btn = document.querySelector("#add-project-btn");
const add_task_btn = document.querySelector("#add-task-btn-0");

add_task_btn.addEventListener("click", () => {
    let id = add_task_btn.getAttribute("id");
    let numString = id.replace("add-task-btn-", "");
    let projectID = parseInt(numString, 10);

    console.log(id, projectID);

    TaskHandler.addTask("Tarea de Prueba", projectID);
});

add_project_btn.addEventListener("click", () => {
    ProjectHandler.addProject("Proyecto");
});

remove_project_btn.addEventListener("click", () => {
    alert("remove project")
});

function create_main_project() {
    let main_project = ProjectHandler.createProject("Todas las Tareas");
    Buttons.addProjectBtnEvent(main_project_btn, main_project);
}

create_main_project();