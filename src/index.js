import style from "./index.css"

import { TaskHandler, ProjectHandler } from "./tasks";

const add_task_btn = document.querySelector("#add-task-btn");
const remove_project_btn = document.querySelector("#remove-project-btn");
const add_project_btn = document.querySelector("#add-project-btn");

var active_project = 0;

add_task_btn.addEventListener("click", () => {
    // TO DO: agregar los botones de add task y remove project a cada projecto 
    // para que el id quede guardado así agrego y borro exclusivamente de ese proyecto
    TaskHandler.addTask("Tarea de Prueba", active_project);
});

add_project_btn.addEventListener("click", () => {
    ProjectHandler.addProject("Proyecto");
});

remove_project_btn.addEventListener("click", () => alert("remove project"));