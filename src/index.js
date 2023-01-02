import style from "./index.css"

import { TaskHandler } from "./tasks";

const add_task_btn = document.querySelector("#add-task-btn");
const remove_project_btn = document.querySelector("#remove-project-btn");


add_task_btn.addEventListener("click", () => {
    TaskHandler.addTask(
        "Tarea de Prueba",
        0
    );
});

remove_project_btn.addEventListener("click", () => alert("remove project"));