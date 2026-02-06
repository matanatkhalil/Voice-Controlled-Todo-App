const clearBtn = document.getElementById("clear-btn");
const taskList = document.getElementById("task-list");
const boxTasks = document.querySelector(".box-tasks");
const voiceButton = document.getElementById("voice-button");
const micIcon = document.getElementById("mic-icon");
const taskInput = document.getElementById("task-input");
const voiceStatus = document.getElementById("voice-status");

const saveTasks = () => {
  const tasks = [];
  taskList.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const createTaskElement = (taskText, isCompleted = false) => {
  const task = document.createElement("div");
  task.classList.add("task");

  const circle = document.createElement("div");
  circle.classList.add("task-circle");

  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const groupBtns = document.createElement("div");
  groupBtns.classList.add("group-btns");
  deleteBtn.classList.add("delete-btn");
  editBtn.classList.add("edit-btn");
  deleteBtn.textContent = "🗑️";
  editBtn.textContent = "✏️";
  groupBtns.appendChild(editBtn);
  groupBtns.appendChild(deleteBtn);

  if (isCompleted) {
    task.classList.add("completed");
    circle.classList.add("completed");
    circle.setAttribute("aria-pressed", "true");
  } else {
    circle.setAttribute("aria-pressed", "false");
  }

  //Make the circle accessible
  circle.setAttribute("role", "button"); // tells assistive tech that it's actionable
  circle.setAttribute("tabindex", "0"); // makes it reacable by Tab
  circle.setAttribute("aria-label", `Mark task "${taskText}" as completed`);

  deleteBtn.setAttribute("aria-label", `Delete task "${taskText}"`);
  editBtn.setAttribute("aria-label", `Edit task "${taskText}"`);
  deleteBtn.setAttribute("title", `Delete task "${taskText}"`);
  editBtn.setAttribute("title", `Edit task "${taskText}"`);

  // Mouse toggle
  circle.addEventListener("click", () => {
    circle.classList.toggle("completed");
    task.classList.toggle("completed");
    circle.setAttribute(
      "aria-pressed",
      circle.classList.contains("completed") ? "true" : "false",
    );
    saveTasks();
  });

  // Keyboard toggle: Enter or Space
  circle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // prevent scrolling for Space
      circle.classList.toggle("completed");
      task.classList.toggle("completed");
      circle.setAttribute(
        "aria-pressed",
        circle.classList.contains("completed") ? "true" : "false",
      );
      saveTasks();
    }
  });
  const text = document.createElement("span");
  text.textContent = taskText;

  task.appendChild(circle);
  task.appendChild(text);
  task.appendChild(groupBtns);
  taskList.appendChild(task);

  // Delete functionality
  deleteBtn.addEventListener("click", () => {
    if (confirm(`Are you sure you want to delete the task: "${taskText}"?`)) {
      task.remove();
      saveTasks();
    }
  });

  // Edit functionality
  editBtn.addEventListener("click", () => {
    let isCancelled = false;
    const newText = document.createElement("input");
    newText.type = "text";
    newText.value = text.textContent;
    newText.classList.add("edit-input");
    task.replaceChild(newText, text);
    newText.focus();

    const saveEdit = () => {
      if (isCancelled) return; // Don't save if cancelled
      const updatedText = newText.value.trim();
      if (updatedText) {
        text.textContent = updatedText;
        task.replaceChild(text, newText);
        saveTasks();
      } else {
        task.replaceChild(text, newText); // Cancel edit if empty
      }
    };

    newText.addEventListener("blur", saveEdit);
    newText.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && newText.value.trim() !== "") {
        saveEdit();
      } else if (e.key === "Escape") {
        isCancelled = true;
        task.replaceChild(text, newText); // Cancel edit
      }
    });
  });
};

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && taskInput.value.trim() !== "") {
    const taskText = taskInput.value.trim();
    createTaskElement(taskText, false); // Use the function
    saveTasks(); // Save after adding
    taskInput.value = "";
  }
});

clearBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  saveTasks(); // saves empty state
});

// Voice recognition feature

voiceButton.addEventListener("click", () => {
  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!speechRecognition) {
    alert(
      "Your browser does not support speech recognition. Please use Chrome or Edge.",
    );
    return;
  }
  const recognition = new speechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1; // Only need the best result

  recognition.start();

  recognition.onstart = () => {
    micIcon.classList.replace("mic-off", "mic-on");
    voiceStatus.textContent = "Listening for your task";
  };
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    taskInput.value = transcript;
  };
  recognition.onerror = (event) => {
    voiceStatus.textContent = "Error occurred: " + event.error;
    if (event.error === "not-allowed") {
      alert("Microphone access denied or blocked by browser settings.");
    }
  };
  recognition.onend = () => {
    micIcon.classList.replace("mic-on", "mic-off");
    voiceStatus.textContent = "Voice input ended.";

    setTimeout(() => {
      voiceStatus.textContent = "";
    }, 2000);
  };
  recognition.onspeechend = () => {
    console.log("Speech ended.");
    recognition.stop();
  };
});

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((taskData) => {
      createTaskElement(taskData.text, taskData.completed);
    });
  }
};

window.addEventListener("load", loadTasks);

// Confetti effect when all tasks are completed

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("task-circle")) {
    setTimeout(() => {
      const total = taskList.querySelectorAll(".task").length;
      const completed = taskList.querySelectorAll(".task.completed").length;
      if (total > 0 && total === completed) {
        confetti({
          particleCount: 111,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 50); // slight delay to ensure state is updated
  }
});
