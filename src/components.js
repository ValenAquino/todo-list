import { Buttons } from "./buttons";
import { TaskHandler } from "./tasks";

const TASK_CONTAINER = document.querySelector("#task-container");
const PROJECT_TITLE = document.querySelector("#tasks-tittle");

class TaskDOM {
    id;
    task_element;
    checkbox;
    description;
    btn_remove;
    
    createTask(description, id, projectDom) {
        this.id = id;
        this.task_element = this.createTaskContainer();
        this.checkbox = this.createCheckbox();
        this.description = this.createDescription(description);
        this.btn_remove = Buttons.createRemoveButton(id, projectDom);

        return this.todoElement();
    }
    
    createTaskContainer() {
        this.task_element = document.createElement("DIV");
        this.task_element.classList.add("task");
        this.task_element.setAttribute("id", `task-${this.id}`);
        
        return this.task_element;
    }

    createDescription(description) {
        this.description = document.createElement("span");
        this.description.innerText = description;
        
        return this.description;
    }

    createCheckbox() {
        this.checkbox = document.createElement("label");
        this.checkbox.innerHTML = `
            <input 
                type="checkbox" 
                name="chk-${this.id}" 
                id="chk-${this.id}"
            />`;
        
        this.checkbox.setAttribute("class", "chk-lbl");
        this.checkbox.setAttribute("for", `chk-${this.id}`);
        this.addEventListenerCheckbox();
    
        return this.checkbox;
    }

    addEventListenerCheckbox() {
        this.checkbox.addEventListener("click", (e) => {
            if(e.target.checked) {
                this.task_element.classList.add("task_done");
                this.description.classList.add("text_task_done");
            }
            else {
                this.task_element.classList.remove("task_done");
                this.description.classList.remove("text_task_done");
            }
        });
    }
    
    todoElement() {
        this.task_element.appendChild(this.checkbox);
        this.task_element.appendChild(this.description);
        this.task_element.appendChild(this.btn_remove);

        return this.task_element;
    }
}

class ProjectDOM {
    tasks_elements = [];

    constructor(project_name, id) {
        this.project_name = project_name;
        this.id = id;
    }

    loadTask(description, id) {
        let task_element = new TaskDOM();
        let todo_element = task_element.createTask(description, id, this);
        
        this.tasks_elements.push(todo_element)
        TASK_CONTAINER.appendChild(todo_element);
    }

    loadTasks() {
        TASK_CONTAINER.innerHTML = "";
        PROJECT_TITLE.innerText = this.project_name;
        
        if(this.tasks_elements.length != 0) {
            this.tasks_elements.forEach(task => TASK_CONTAINER.appendChild(task));
        }
    }

    deleteTask(taskID) {
        TaskHandler.deleteTask(this.id, taskID);
        document.querySelector(`#task-${taskID}`).remove();
    }

}

export {
    ProjectDOM
}