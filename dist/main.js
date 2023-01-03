(()=>{"use strict";const e=document.querySelector("#projects-btns");var t="add-task-btn-0",r="remove-project-btn-0";class c{static createRemoveButton(e,t){let r=document.createElement("button");return r.innerHTML='<span class="material-symbols-outlined"> delete </span>',r.setAttribute("id",`remove-task-btn-${e}`),r.setAttribute("class","right-button remove-btn"),c.addRemoveEvent(r,e,t),r}static addRemoveEvent(e,t,r){e.addEventListener("click",(()=>{r.deleteTask(t)}))}static createProjectBtn(t){let r=document.createElement("button");r.innerText=t.project_name,r.classList.add("project-btn"),r.setAttribute("id",`project-btn-${t.id}`),c.addProjectBtnEvent(r,t),e.appendChild(r),s(t)}static addProjectBtnEvent(e,c){var n=document.querySelector(`#${t}`),a=document.querySelector(`#${r}`);e.addEventListener("click",(()=>{s(c,n,a)}))}}function s(e,c,s){e.loadTasks(),t=`add-task-btn-${e.id}`,c.setAttribute("id",`${t}`),r=`remove-project-btn-${e.id}`,s.setAttribute("id",`${r}`)}const n=document.querySelector("#task-container"),a=document.querySelector("#tasks-tittle"),o=[];var d=0,i=0;class l{isDone=!1;constructor(e,t,r){this.description=e,this.projectID=t,this.id=r}set setDone(e){this.isDone=e}set setDescription(e){this.description=e}get getDone(){return this.isDone}get getDescription(){return this.description}}class u{tasks_Elements=[];constructor(e,t){this.project_name=e,this.id=t}createDescription(e){let t=document.createElement("span");return t.innerText=e,t}createCheckbox(e){let t=document.createElement("label");return t.innerHTML=`<input type="checkbox" name="chk-${e}" id="chk-${e}"/>`,t.setAttribute("class","chk-lbl"),t.setAttribute("for",`chk-${e}`),t}createTaskContainer(e){let t=document.createElement("DIV"),r=this.createCheckbox(e.id),c=this.createDescription(e.description);return r.addEventListener("click",(e=>{e.target.checked?(t.classList.add("task_done"),c.classList.add("text_task_done")):(t.classList.remove("task_done"),c.classList.remove("text_task_done"))})),t.appendChild(r),t.appendChild(c),t}createTask(e){let t=this.createTaskContainer(e),r=c.createRemoveButton(e.id,this);return t.classList.add("task"),t.setAttribute("id",`task-${e.id}`),t.appendChild(r),t}loadTask(e){let t=this.createTask(e);this.tasks_Elements.push(t),n.appendChild(t)}loadTasks(){n.innerHTML="",a.innerText=this.project_name,this.tasks_Elements.forEach((e=>n.appendChild(e)))}deleteTask(e){let t=this.tasks_Elements.findIndex((t=>t.getAttribute("id")==`task-${e}`));this.tasks_Elements.splice(t,1),document.querySelector(`#task-${e}`).remove()}}class m{static addProject(e){let t=m.createProject(e);c.createProjectBtn(t)}static createProject(e){let t=new u(e,d);return d++,o.push(t),t}static deleteProject(e){let t=o.findIndex((t=>t.id==e));document.querySelector(`#project-btn-${o[t].id}`).remove(),o.splice(t,1),o[0].loadTasks()}static getProject(e){let t=o.findIndex((t=>t.id==e));return o[t]}}class p{static addTask(e,t){let r=new l(e,t,i),c=o.find((e=>e.id==t));i++,c.loadTask(r)}}const k=document.querySelector("#body"),v=document.querySelector("#add-task-btn-0"),h=document.querySelector("#add-task-modal"),b=document.querySelector("#close_modal_task"),j=document.querySelector("#submit-task"),y=document.querySelector("#task_name"),E=document.querySelector("#task-form"),L=document.querySelector("#main-project"),q=document.querySelector("#remove-project-btn-0"),S=document.querySelector("#add-project-btn"),T=document.querySelector("#add-project-modal"),_=document.querySelector("#close_modal_project"),f=document.querySelector("#submit-project"),D=document.querySelector("#project_name"),$=document.querySelector("#project-form");function P(e,t){let r=t.replace(e,"");return parseInt(r,10)}function g(e,t){e.classList.add("modal--show"),k.classList.add("overflow-hidden"),t.reset()}function x(e){e.classList.remove("modal--show"),k.classList.remove("overflow-hidden")}v.addEventListener("click",(()=>{g(h,E)})),b.addEventListener("click",(e=>{e.preventDefault(),x(h)})),j.addEventListener("click",(e=>{e.preventDefault();let t=v.getAttribute("id"),r=y.value;r<1?alert("No se puede enviar el campo vacio"):(p.addTask(r,P("add-task-btn-",t)),x(h))})),S.addEventListener("click",(()=>{g(T,$)})),_.addEventListener("click",(e=>{e.preventDefault(),x(T)})),f.addEventListener("click",(e=>{e.preventDefault();let t=D.value;t<1?alert("No se puede enviar el campo vacio"):(x(T),m.addProject(t))})),q.addEventListener("click",(()=>{let e=P("remove-project-btn-",q.getAttribute("id")),t=m.getProject(e);0!=e&&confirm(`Desea borrar el proyecto ${t.project_name}`)&&m.deleteProject(e)})),function(){let e=m.createProject("Todas las Tareas");c.addProjectBtnEvent(L,e)}()})();