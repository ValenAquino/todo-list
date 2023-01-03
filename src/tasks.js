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
        ProjectHandler.createProject(project_name);
        ProjectHandler.createProjectElement(project_name);
        PROJECT_COUNTER++;
    }

    static createProject(project_name) {
        let newProject = new Project(project_name, PROJECT_COUNTER);
        PROJECTS.push(newProject);
        // Actualizar local storage ();
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
        // Actualizar local storage ();
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
        // Actualizar local storage ();
    }
    
    static createTaskElement(description, projectID) {
        let project_element = PROJECTS_DOM.find (project => project.id == projectID);
        project_element.loadTask(description, TASK_COUNTER);
    }

}

/* ===== Utilities ===== */


/* ===== Initialization ===== */

ProjectHandler.addFirstProject();

export {
    TaskHandler,
    ProjectHandler
}