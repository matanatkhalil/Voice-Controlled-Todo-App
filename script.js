const clearBtn=document.getElementById("clear-btn")
const taskList=document.getElementById("task_list")
const boxTasks=document.querySelector(".box_tasks")
clearBtn.addEventListener("click", ()=>{
    taskList.innerHTML=""
})
const taskInput=document.getElementById("task_input")
taskInput.addEventListener("keydown", (event)=>{
    if (event.key==='Enter' && taskInput.value.trim()!=="") {
        const taskText=taskInput.value.trim();
        const task=document.createElement('div')
        task.classList.add('task')
        const circle=document.createElement("div")
        circle.classList.add("task-circle")
        circle.addEventListener("click", ()=>{
            circle.classList.toggle("completed")
            task.classList.toggle("completed")
        });
        const text = document.createElement('span');
        text.textContent = taskText;

        task.appendChild(circle);
        task.appendChild(text);
        taskList.appendChild(task);

        taskInput.value = '';
    }
    
})