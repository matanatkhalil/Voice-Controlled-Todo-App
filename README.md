# Voice-Controlled Todo App
A minimal to-do list web app that incorporates a basic assistive-tech element: voice-controlled task input. Users can add tasks by speaking, type if preferred, and manage tasks with simple, clear UI interactions. The app also includes keyboard-accessible control, which makes it usable for people who can’t rely on a mouse and instead interact through assistive devices such as switch controls, on-screen keyboards, or screen readers.

## Technologies Used
- HTML
- CSS
- Vanilla JavaScript (no frameworks)
- Web Speech API

## Features
- Add tasks by typing and pressing Enter 
- Speak a task, and it will be added to the list as the app uses the Web Speech API for voice-controlled task input
- Fully operable by keyboard (Tab to navigate, Enter/Space to activate) so it works with assistive tech that emulates keyboard events
- Visual feedback (mic icon changes when listening)
- Alert displayed when the browser doesn't support speech
- Click the green circle to mark tasks as complete   
- Long tasks automatically wrap  
- "Clear Now" button to reset everything
- LocalStorage persistence (tasks survive page refresh)
- Serene, focus-friendly design with custom background
- Deployed to Netlify

## What I Learned & Practiced
- Perfect vertical centering with `align-items: center` on multi-line flex items
- Preventing layout shift with `flex-shrink: 0`
- Word wrapping long text using `word-break` and `overflow-wrap`
- Made the green task box grow automatically and scroll when full by means of `overflow-y: auto`
- Dynamic DOM manipulation (adding/removing/toggling tasks)
- Toggling UI state based on microphone activity (switching mic icon styles on `onstart` / `onend`)
- Using CSS `@keyframes` to create simple pulse animations
- Working with the Web Speech API (speech recognition events, transcripts, errors)


  
## Live Demo
Check out the app here: [Voice-Controlled Todo App](https://voice-controlled-todo-app.netlify.app/)


## Screenshot
<img width="1362" height="604" alt="voice-to-text-to-do-app" src="https://github.com/user-attachments/assets/f6dfd00b-b00f-47bc-935b-6c99d3717ebd" />


## Future Improvements (Planned)
- Works on mobile
- Option to edit and delete tasks
- Dark mode toggle 🌙
- Confetti animation when all tasks are completed
- Add the number of total, completed, and incomplete tasks to the page 
- Add separate to-do lists for each day of the week (Monday–Sunday)
- Create lists for monthly and yearly tasks too
- Add three buttons to the top of the page, by clicking on which users can navigate between their yearly, monthly, and weekly to-do lists


## Feedback Welcome!
Open an issue or reach out – always happy to connect.

- - -
Built with patience and care by [Mətanət](https://github.com/matanatkhalil) while staying hydrated and focused 💛🌱
