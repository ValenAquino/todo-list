import { Buttons } from "./buttons";

const task_container = document.querySelector("#task-container");

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
        task_container.innerHTML = "";
        this.tasks_Elements.forEach(task => task_container.appendChild(task));
    }

    deleteTask(id) {
        let indice = this.tasks_Elements.findIndex (
                        task => task.getAttribute("id") == `task-${id}`
                    );
        
        this.tasks_Elements.splice(indice, 1);
        document.querySelector(`#task-${id}`).remove();
    }
}

class ProjectHandler {

    static addProject(project_name) {
        let newProject = ProjectHandler.createProject(project_name);
        Buttons.createProjectBtn(newProject);
    }

    static createProject(project_name) {
        let newProject = new ProjectTaskDOM(project_name, PROJECT_COUNTER);
        PROJECT_COUNTER++;
        PROJECTS.push(newProject);

        return newProject;
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