const task_container = document.querySelector("#tasks");

const project_container = document.querySelector("#projects-btns");
const project_title = document.querySelector("#tasks-tittle");

const PROJECTS = [];
var PROJECT_COUNTER = 0;
var TASK_COUNTER = 0;

class Task {
    isDone = false;

    constructor(description, projectID, id) {
        this.description = description;
        this.projectID = projectID;
        this.id = id;
    }

    set setDone(value) {
        this.isDone = value;
    }

    set setDescription(value) {
        this.description = value;
    }

    get getDone() {
        return this.isDone;
    }

    get getDescription() {
        return this.description;
    }
}

/*
<div class="project-add-container tittle-and-tools-container">
    <h2 id="tasks-tittle">Todas las Tareas</h2>
   
    <div class="tools">

        <button id="add-task-btn" class="right-button">
            <span class="material-symbols-outlined">
                add
            </span>
        </button>

        <button id="remove-project-btn" class="right-button">
            <span class="material-symbols-outlined">
                delete
            </span>
        </button>

        </div>
</div>
*/


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
            let indice = project.tasks_Elements.findIndex(task => task.id == id);
            document.querySelector(`#task-${id}`).remove();
            project.tasks_Elements.splice(indice, 1);
        });
    }

    static addProjectBtnEvent(project_btn, newProject) {
        project_btn.addEventListener("click", ()=> {
            project_title.innerText = newProject.project_name;
            newProject.loadTasks();
        });
    }

    static addProjectBtn(newProject) {
        let project_btn = document.createElement("button");
        project_btn.innerText = newProject.project_name;
        project_btn.classList.add("project-btn");

        Buttons.addProjectBtnEvent(project_btn, newProject); 
        project_container.appendChild(project_btn);
    }

}

class ProjectTaskDOM {
    tasks_Elements = [];

    constructor(project_name, id) {
        this.project_name = project_name;
        this.id = id;
    }

    createTaskContainer(newTask) {
        let task_element = document.createElement("DIV");
        
        task_element.innerHTML = `
            <label class="chk-lbl" for="chk-${newTask.id}">
                <input 
                    type="checkbox" 
                    name="chk-${newTask.id}" 
                    id="chk-${newTask.id}"
                />
            </label>
            <span>
                ${newTask.description} ${newTask.id}
            </span>`;

        return task_element;
    }

    createTask(newTask) {
        let task_element = this.createTaskContainer(newTask);
        let btn_remove = Buttons.createRemoveButton(newTask.id, this);
        
        task_element.classList.add("task");
        task_element.setAttribute("id", `task-${newTask.id}`);
        task_element.appendChild(btn_remove);

        return task_element;
    }

    loadTask(newTask) {
        let task_element = this.createTask(newTask);

        this.tasks_Elements.push(task_element);
        task_container.appendChild(task_element);
    }

    loadTasks() {
        this.tasks_Elements.forEach(task => task_container.appendChild(task));
    }
}

class ProjectHandler {

    static addProject(project_name) {
        let newProject = new ProjectTaskDOM(project_name, PROJECT_COUNTER);
        PROJECT_COUNTER++;
        PROJECTS.push(newProject);
        Buttons.addProjectBtn(newProject);
    }

}

class TaskHandler {

    static addTask(description, projectID) {
        let newTask = new Task(description, projectID, TASK_COUNTER);
        let project = PROJECTS.find(aProject => aProject.id == projectID);
        
        TASK_COUNTER++;
        project.loadTask(newTask);
    }
}

export {
    TaskHandler,
    ProjectHandler
}