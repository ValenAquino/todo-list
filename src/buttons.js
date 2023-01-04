const project_container = document.querySelector("#projects-btns");

var active_project_add = "add-task-btn-0";
var active_project_remove = "remove-project-btn-0";

var add_task_btn = document.querySelector(`#${active_project_add}`);
var remove_project_btn = document.querySelector(`#${active_project_remove}`);

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
        project_btn.setAttribute("id", `project-btn-${newProject.id}`);

        Buttons.addProjectBtnEvent(project_btn, newProject); 
        project_container.appendChild(project_btn);
        
        projectClickEvent(newProject);
    }

    static addProjectBtnEvent(project_btn, newProject) {
        project_btn.addEventListener("click", () => {
            projectClickEvent(newProject);
        });
    }

}

function projectClickEvent(project) {
    project.loadTasks();
            
    active_project_add = `add-task-btn-${project.id}`;
    add_task_btn.setAttribute("id", `${active_project_add}`);

    active_project_remove = `remove-project-btn-${project.id}`;
    remove_project_btn.setAttribute("id", `${active_project_remove}`);
}

export {
    Buttons
};