const clearBtn=document.getElementById("clear-btn")
const taskList=document.getElementById("task_list")
const boxTasks=document.querySelector(".box_tasks")
const voiceButton=document.getElementById("voice-button")
const micIcon=document.getElementById("mic-icon")
const taskInput=document.getElementById("task_input")

const saveTasks=()=>{
    const tasks=[];
    taskList.querySelectorAll(".task").forEach((task)=>{
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const createTaskElement=(taskText, isCompleted=false)=>{
        const task=document.createElement('div')
        task.classList.add('task')
        if (isCompleted) {
            task.classList.add("completed");
        }

        const circle=document.createElement("div")
        circle.classList.add("task-circle")
        if (isCompleted) {
            circle.classList.add("completed");
        }

        //Make the circle accessible
        circle.setAttribute("role", "button"); // tells assistive tech that it's actionable
        circle.setAttribute("tabindex", "0"); // makes it reacable by Tab
        circle.setAttribute("aria-pressed", "false"); //reflects state
        circle.setAttribute("aria-label", "Mark task as completed");
        
        // Mouse toggle
        circle.addEventListener("click", ()=>{
            circle.classList.toggle("completed")
            task.classList.toggle("completed")
            circle.setAttribute("aria-pressed", circle.classList.contains("completed") ? "true" : "false");
            saveTasks();
        });

        // Keyboard toggle: Enter or Space
        circle.addEventListener("keydown", (e)=>{
            if (e.key==="Enter" || e.key===" ") {
              e.preventDefault(); // prevent scrolling for Space
              circle.classList.toggle("completed");
              task.classList.toggle("completed");
              circle.setAttribute("aria-pressed", circle.classList.contains("completed") ? "true" : "false");
              saveTasks();
            }
        })
        const text = document.createElement('span');
        text.textContent = taskText;

        task.appendChild(circle);
        task.appendChild(text);
        taskList.appendChild(task);
          
};

taskInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter' && taskInput.value.trim() !== "") {
        const taskText = taskInput.value.trim();
        createTaskElement(taskText, false);  // Use the function
        saveTasks();  // Save after adding
        taskInput.value = '';
    }
});

clearBtn.addEventListener("click", ()=>{
    taskList.innerHTML=""
    saveTasks(); // saves empty state
})

// Voice recognition feature

voiceButton.addEventListener("click", ()=>{
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Your browser does not support speech recognition. Please use Chrome or Edge.");
        return;
    }
    const recognition=new SpeechRecognition();
    recognition.lang="en-US";
    recognition.interimResults=true; 
    recognition.maxAlternatives=1; // Only need the best result 

    recognition.start();

    recognition.onstart=()=>{
    micIcon.classList.replace("mic-off", "mic-on");
}
    recognition.onresult=(event)=>{
        const transcript=event.results[0][0].transcript;
        taskInput.value=transcript;
        }
    recognition.onerror=(event)=>{
        console.error("Speech recognition error:", event.error);
    } 
    recognition.onend=()=>{
    micIcon.classList.replace("mic-on", "mic-off");
}
    recognition.onspeechend=()=>{
        console.log("Speech ended.");
        recognition.stop();
    };
});

const loadTasks=()=>{
    const tasks=JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach((taskData)=>{
            createTaskElement(taskData.text, taskData.completed);      
        });
        }   
}

window.addEventListener("load", loadTasks);
