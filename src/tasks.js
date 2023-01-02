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

class ProjectTaskDOM {
    tasks_Elements = [];

    constructor(project_name, id) {
        this.project_name = project_name;
        this.id = id;
    }

    createRemoveButton(id) {
        let btn_remove = document.createElement("button");
        var esteObjeto = this;

        btn_remove.innerHTML = `
            <span class="material-symbols-outlined"> 
                delete 
            </span>`;
        
        btn_remove.setAttribute("id", `remove-task-btn-${id}`);
        btn_remove.setAttribute("class", `right-button remove-btn`);
        this.addRemoveEvent(btn_remove, id);

        return btn_remove;
    }

    addRemoveEvent(btn_rm, id) {
        btn_rm.addEventListener("click", () => {
            let indice = this.tasks_Elements.findIndex(task => task.id == id);
            
            document.querySelector(`#task-${id}`).remove()
            this.tasks_Elements.splice(indice, 1);
        });
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
        let btn_remove = this.createRemoveButton(newTask.id);
        
        task_element.classList.add("task");
        task_element.setAttribute("id", `task-${newTask.id}`);
        task_element.appendChild(btn_remove);

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
        
        this.addProjectBtn(newProject);
    }

    static addBtnEvent(project_btn, newProject) {
        project_btn.addEventListener("click", ()=> {
            project_title.innerText = newProject.project_name;
            newProject.loadTasks();
        });
    }

    static addProjectBtn(newProject) {
        let project_btn = document.createElement("button");
        project_btn.innerText = newProject.project_name;
        project_btn.classList.add("project-btn");

        this.addBtnEvent(project_btn, newProject); 
        project_container.appendChild(project_btn);
    }
}

class TaskHandler {

    static addTask(description, projectID) {
        let newTask = new Task(description, projectID, TASK_COUNTER);
        let project = PROJECTS.find(aProject => aProject.id == projectID);
        
        console.log(PROJECTS, project, newTask);
        TASK_COUNTER++;
        project.createTask(newTask);
        console.log(newTask);
    }

}

export {
    TaskHandler,
    ProjectHandler
}