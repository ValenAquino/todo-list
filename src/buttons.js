const project_container = document.querySelector("#projects-btns");
const project_title = document.querySelector("#tasks-tittle");

var active_project = "add-task-btn-0";

class Buttons {

    static createRemoveButton(id, project) {
        let btn_remove = document.createElement("button");

        btn_remove.innerHTML = `<span class="material-symbols-outlined"> delete </span>`;
        btn_remove.setAttribute("id", `remove-task-btn-${id}`);
        btn_remove.setAttribute("class", `right-button remove-btn`);
        Buttons.addRemoveEvent(btn_remove, id, project);

        return btn_remove;
    }

    static addRemoveEvent(btn_rm, id, project) {
        btn_rm.addEventListener("click", () => {
            project.deleteTask(id);
        });
    }

    static createProjectBtn(newProject) {
        let project_btn = document.createElement("button");
        project_btn.innerText = newProject.project_name;
        project_btn.classList.add("project-btn");

        Buttons.addProjectBtnEvent(project_btn, newProject); 
        project_container.appendChild(project_btn);
    }

    static addProjectBtnEvent(project_btn, newProject) {
        var add_task_btn = document.querySelector(`#${active_project}`);

        project_btn.addEventListener("click", ()=> {
            project_title.innerText = newProject.project_name;
            newProject.loadTasks();
            active_project = `add-task-btn-${newProject.id}`;
            add_task_btn.setAttribute("id", `${active_project}`);
        });
    }
}

export {
    Buttons
};