import { Buttons } from "./buttons";
import { ProjectDOM } from "./components";

var PROJECTS = [];
var PROJECTS_DOM = [];
var PROJECT_COUNTER = 0;
var TASK_COUNTER = 0;

class Task {
    isDone = false;

    constructor(description, projectID, id) {
        this.description = description;
        this.projectID = projectID;
        this.id = id;
    }

}

class Project {
    tasks = [];

    constructor(project_name, id) {
        this.project_name = project_name;
        this.id = id;
    }

}

class ProjectHandler {

    static addFirstProject() {
        let main_project_btn = document.querySelector("#main-project");
        let main_project = new ProjectDOM("Todas las Tareas", PROJECT_COUNTER);
    
        Buttons.addProjectBtnEvent(main_project_btn, main_project);
        ProjectHandler.createProject("Todas las Tareas");
        PROJECTS_DOM.push(main_project);
        PROJECT_COUNTER++; 
    }
    
    static addProject(project_name) {        
        if(PROJECTS.length == 0) {
            ProjectHandler.addFirstProject();
        }   
        else {
            ProjectHandler.createProject(project_name);
            ProjectHandler.createProjectElement(project_name);
        }

        PROJECT_COUNTER++;
    }

    static createProject(project_name) {
        let newProject = new Project(project_name, PROJECT_COUNTER);
        PROJECTS.push(newProject);
        update_storage();
    }

    static createProjectElement(project_name) {
        let projectElemet = new ProjectDOM(project_name, PROJECT_COUNTER);
        PROJECTS_DOM.push(projectElemet);
        Buttons.createProjectBtn(projectElemet); // Crea y agrega el btn al DOM
    }

    static deleteProject(projectID) {
        let project_index = PROJECTS.findIndex(project => project.id == projectID);
        let project_element_index = PROJECTS_DOM.findIndex(project => project.id == projectID);

        document.querySelector(`#project-btn-${projectID}`).remove();
        PROJECTS.splice(project_index, 1);
        PROJECTS_DOM.splice(project_element_index, 1);
        update_storage();
    }

    static getProjectNameByID(projectID) {
        return PROJECTS.find(project => project.id == projectID).project_name;
    }
}

class TaskHandler {

    static addTask(description, projectID) {
        TaskHandler.createTask(description, projectID);
        TaskHandler.createTaskElement(description, projectID);
        TASK_COUNTER++;
    }
    
    static createTask(description, projectID) {
        let newTask = new Task(description, projectID, TASK_COUNTER);
        let project = PROJECTS.find (project => project.id == projectID);
    
        project.tasks.push(newTask);
        update_storage();
    }
    
    static createTaskElement(description, projectID) {
        let project_element = PROJECTS_DOM.find (project => project.id == projectID);
        project_element.loadTask(description, TASK_COUNTER);
    }

    static deleteTask(projectID, taskID) {
        let project_DOM = PROJECTS_DOM.find(project => project.id == projectID);
        let taskIndex_DOM = project_DOM.tasks_elements.findIndex(task => task.id == taskID);
        project_DOM.tasks_elements.splice(taskIndex_DOM, 1);
        
        let project = PROJECTS.find(project => project.id == projectID);
        let taskIndex = project.tasks.findIndex(task => task.id == taskID);
        project.tasks.splice(taskIndex, 1);
        
        update_storage();
    }

}

/* ===== Utilities ===== */

function update_storage() {
    localStorage.setItem("PROJECTS", JSON.stringify(PROJECTS));
}

function load_storage() {
    let temp_storage = localStorage.getItem("PROJECTS");
    
    if(temp_storage) {
        let temp_projects = JSON.parse(temp_storage);
        load_projects(temp_projects);
    }
    else {
        ProjectHandler.addFirstProject();
    }
}

function load_tasks(project) {
    project.tasks.forEach(task => {
        TaskHandler.addTask(task.description, project.id);
    });
}

    function load_projects(temp_projects) {
    temp_projects.forEach(project => {
        ProjectHandler.addProject(project.project_name);
        load_tasks(project);
    });
    
    PROJECTS_DOM[0].loadTasks();
}

/* ===== Initialization ===== */

window.addEventListener("load", load_storage);

export {
    TaskHandler,
    ProjectHandler,
}