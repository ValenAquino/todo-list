import { Buttons } from "./buttons";

const task_container = document.querySelector("#task-container");
const project_title = document.querySelector("#tasks-tittle");

var PROJECTS = [];
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

class Project {
    constructor(project_name, id) {
        this.project_name = project_name;
        this.id = id;
    }
}

class ProjectTaskDOM {
    tasks_Elements = [];
    tasks = []

    constructor(project_name, id) {
        this.project_name = project_name;
        this.id = id;
    }

    createDescription(description) {
        let span = document.createElement("span");
        span.innerText = description;
        return span;
    }

    createCheckbox(id) {
        let checkbox = document.createElement("label");
        checkbox.innerHTML = `<input type="checkbox" name="chk-${id}" id="chk-${id}"/>`;
        checkbox.setAttribute("class", "chk-lbl");
        checkbox.setAttribute("for", `chk-${id}`);
    
        return checkbox;
    }

    createTaskContainer(newTask) {
        let task_element = document.createElement("DIV");
        let checkbox = this.createCheckbox(newTask.id);
        let description = this.createDescription(newTask.description);
        let btn_remove = Buttons.createRemoveButton(newTask.id, this);

        checkbox.addEventListener("click", (e) => {
            if(e.target.checked) {
                task_element.classList.add("task_done");
                description.classList.add("text_task_done");
            }
            else {
                task_element.classList.remove("task_done");
                description.classList.remove("text_task_done");
            }
        });

        task_element.appendChild(checkbox);
        task_element.appendChild(description);
        task_element.appendChild(btn_remove);
    
        task_element.classList.add("task");
        task_element.setAttribute("id", `task-${newTask.id}`);
        this.tasks_Elements.push(task_element);
        
        return task_element;
    }
    
    createTask(newTask) {
        let task_element = this.createTaskContainer(newTask);
        this.tasks.push(newTask);

        return task_element;
    }

    loadTask(newTask) {
        let task_element = this.createTask(newTask);
        task_container.appendChild(task_element);
    }

    loadTasks() {
        task_container.innerHTML = "";
        project_title.innerText = this.project_name;
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
        atualizar_storage();
    }

    static createProject(project_name) {
        let newProject = new ProjectTaskDOM(project_name, PROJECT_COUNTER);
        PROJECT_COUNTER++;
        PROJECTS.push(newProject);
    
        return newProject;
    }

    static deleteProject(projectID) {
        let indice = PROJECTS.findIndex (
            project => project.id == projectID
        );

        document.querySelector(`#project-btn-${PROJECTS[indice].id}`).remove();
        PROJECTS.splice(indice, 1);
        PROJECTS[0].loadTasks();
        atualizar_storage();

    }

    static getProject(projectID) {
        let indice = PROJECTS.findIndex (
            project => project.id == projectID
        );

        return PROJECTS[indice];
    }
}

class TaskHandler {

    static addTask(description, projectID) {
        let newTask = new Task(description, projectID, TASK_COUNTER);
        let project = PROJECTS.find(aProject => aProject.id == projectID);
        
        TASK_COUNTER++;
        project.loadTask(newTask);
        atualizar_storage();
    }
}

function atualizar_storage() {
    localStorage.setItem("PROJECTS", JSON.stringify(PROJECTS));

    console.log(JSON.parse(localStorage.getItem("PROJECTS")));
}

function create_main_project() {
    let projects_serialized = localStorage.getItem("PROJECTS");

    if(!projects_serialized) {
        PROJECTS = [];
        const main_project_btn = document.querySelector("#main-project");
        let main_project = ProjectHandler.createProject("Todas las Tareas");
        Buttons.addProjectBtnEvent(main_project_btn, main_project);
    }
    else {  
        let projects = JSON.parse(projects_serialized);
        
        console.log(projects)

        projects.forEach( project => {
            ProjectHandler.addProject(project.project_name);
        });
    }
}

// Initialization

create_main_project();

export {
    TaskHandler,
    ProjectHandler
}