(()=>{"use strict";const e=document.querySelector("#projects-btns");var t="add-task-btn-0",s="remove-project-btn-0",c=document.querySelector(`#${t}`),n=document.querySelector(`#${s}`);class a{static createRemoveButton(e,t){let s=document.createElement("button");return s.innerHTML='<span class="material-symbols-outlined"> delete </span>',s.setAttribute("id",`remove-task-btn-${e}`),s.setAttribute("class","right-button remove-btn"),a.addRemoveEvent(s,e,t),s}static addRemoveEvent(e,t,s){e.addEventListener("click",(()=>{s.deleteTask(t)}))}static createProjectBtn(t){let s=document.createElement("button");s.innerText=t.project_name,s.classList.add("project-btn"),s.setAttribute("id",`project-btn-${t.id}`),a.addProjectBtnEvent(s,t),e.appendChild(s),r(t)}static addProjectBtnEvent(e,t){e.addEventListener("click",(()=>{r(t)}))}}function r(e){e.loadTasks(),t=`add-task-btn-${e.id}`,c.setAttribute("id",`${t}`),s=`remove-project-btn-${e.id}`,n.setAttribute("id",`${s}`)}const o=document.querySelector("#task-container"),i=document.querySelector("#tasks-tittle");class d{id;task_element;checkbox;description;btn_remove;createTask(e,t,s){return this.id=t,this.task_element=this.createTaskContainer(),this.checkbox=this.createCheckbox(),this.description=this.createDescription(e),this.btn_remove=a.createRemoveButton(t,s),this.todoElement()}createTaskContainer(){return this.task_element=document.createElement("DIV"),this.task_element.classList.add("task"),this.task_element.setAttribute("id",`task-${this.id}`),this.task_element}createDescription(e){return this.description=document.createElement("span"),this.description.innerText=e,this.description}createCheckbox(){return this.checkbox=document.createElement("label"),this.checkbox.innerHTML=`\n            <input \n                type="checkbox" \n                name="chk-${this.id}" \n                id="chk-${this.id}"\n            />`,this.checkbox.setAttribute("class","chk-lbl"),this.checkbox.setAttribute("for",`chk-${this.id}`),this.addEventListenerCheckbox(),this.checkbox}addEventListenerCheckbox(){this.checkbox.addEventListener("click",(e=>{e.target.checked?(this.task_element.classList.add("task_done"),this.description.classList.add("text_task_done")):(this.task_element.classList.remove("task_done"),this.description.classList.remove("text_task_done"))}))}todoElement(){return this.task_element.appendChild(this.checkbox),this.task_element.appendChild(this.description),this.task_element.appendChild(this.btn_remove),this.task_element}}class l{tasks_elements=[];constructor(e,t){this.project_name=e,this.id=t}loadTask(e,t){let s=(new d).createTask(e,t,this);this.tasks_elements.push(s),o.appendChild(s)}loadTasks(){o.innerHTML="",i.innerText=this.project_name,0!=this.tasks_elements.length&&this.tasks_elements.forEach((e=>o.appendChild(e)))}deleteTask(e){let t=this.tasks_elements.findIndex((t=>t.id==e));this.tasks_elements.splice(t,1),document.querySelector(`#task-${e}`).remove()}}var m=[],u=[],h=0,k=0;class p{isDone=!1;constructor(e,t,s){this.description=e,this.projectID=t,this.id=s}}class b{tasks=[];constructor(e,t){this.project_name=e,this.id=t}}class v{static addFirstProject(){let e=document.querySelector("#main-project"),t=new l("Todas las Tareas",h);a.addProjectBtnEvent(e,t),v.createProject("Todas las Tareas"),u.push(t),h++}static addProject(e){0==m.length?v.addFirstProject():(v.createProject(e),v.createProjectElement(e)),h++}static createProject(e){let t=new b(e,h);m.push(t),_()}static createProjectElement(e){let t=new l(e,h);u.push(t),a.createProjectBtn(t)}static deleteProject(e){let t=m.findIndex((t=>t.id==e)),s=u.findIndex((t=>t.id==e));document.querySelector(`#project-btn-${e}`).remove(),m.splice(t,1),u.splice(s,1),_()}static getProjectNameByID(e){return m.find((t=>t.id==e)).project_name}}class j{static addTask(e,t){j.createTask(e,t),j.createTaskElement(e,t),k++}static createTask(e,t){let s=new p(e,t,k);m.find((e=>e.id==t)).tasks.push(s),_()}static createTaskElement(e,t){u.find((e=>e.id==t)).loadTask(e,k)}}function _(){localStorage.setItem("PROJECTS",JSON.stringify(m))}!function(){let e=localStorage.getItem("PROJECTS");if(e){let t=JSON.parse(e);console.log(t),function(e){e.forEach((e=>{v.addProject(e.project_name),function(e){e.tasks.forEach((t=>{j.addTask(t.description,e.id)}))}(e)})),u[0].loadTasks()}(t)}else v.addFirstProject()}();const E=document.querySelector("#body"),T=document.querySelector("#add-task-btn-0"),f=document.querySelector("#add-task-modal"),y=document.querySelector("#close_modal_task"),S=document.querySelector("#submit-task"),L=document.querySelector("#task_name"),q=document.querySelector("#task-form"),x=document.querySelector("#remove-project-btn-0"),P=document.querySelector("#add-project-btn"),$=document.querySelector("#add-project-modal"),C=document.querySelector("#close_modal_project"),g=document.querySelector("#submit-project"),D=document.querySelector("#project_name"),A=document.querySelector("#project-form");function I(e,t){let s=t.replace(e,"");return parseInt(s,10)}function w(e,t){e.classList.add("modal--show"),E.classList.add("overflow-hidden"),t.reset()}function B(e){e.classList.remove("modal--show"),E.classList.remove("overflow-hidden")}T.addEventListener("click",(()=>{w(f,q)})),S.addEventListener("click",(e=>{e.preventDefault();let t=T.getAttribute("id"),s=L.value;s<1?alert("No se puede enviar el campo vacio"):(j.addTask(s,I("add-task-btn-",t)),B(f))})),y.addEventListener("click",(e=>{e.preventDefault(),B(f)})),P.addEventListener("click",(()=>{w($,A)})),g.addEventListener("click",(e=>{e.preventDefault();let t=D.value;t<1?alert("No se puede enviar el campo vacio"):(B($),v.addProject(t))})),C.addEventListener("click",(e=>{e.preventDefault(),B($)})),x.addEventListener("click",(()=>{let e=I("remove-project-btn-",x.getAttribute("id")),t=v.getProjectNameByID(e);0!=e&&confirm(`Desea borrar el proyecto ${t}`)&&v.deleteProject(e)}))})();