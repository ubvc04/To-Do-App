# 📝 Advanced To-Do List App (LocalStorage Based)

A fully responsive and feature-rich **To-Do List Web App** built using **HTML, CSS, and JavaScript** — no frameworks, no backend.  
All data is saved in the browser using **localStorage**, so your tasks persist across sessions.

---

## 🚀 Features

### ✅ Core Functionality
- 🆕 Add new tasks (title + description)
- 🗑️ Edit & delete tasks
- ✔️ Mark tasks as complete/incomplete
- 📅 Set due dates with a date picker
- 🔼 Priority levels: High, Medium, Low
- 🏷️ Categorize tasks (Work, Personal, etc.)
- 🔍 Filter by:
  - Completion status
  - Category
  - Priority
- 🔎 Live search bar
- 📊 Progress bar showing % of tasks completed
- 🌙 Light/Dark mode toggle
- 💾 Auto-saves everything using `localStorage`

---

### 💡 Additional Features
- ⏰ Task reminders (via Notification API)
- ♻️ Recurring tasks (daily/weekly)
- 📆 Calendar view of tasks
- 🧠 Pomodoro timer (work session tool)
- 📋 Inline editing for tasks
- 📈 Task statistics dashboard
- 📥 Drag and drop to reorder tasks
- 📤 Export tasks as `.json`
- 📂 Import tasks from `.json` file
- 🔐 Optional password lock (stored locally)
- 🧾 Task history (created, updated, completed time)
- 📌 Pin important tasks to top

---

## 🧠 Built With

- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript (ES6+)
- LocalStorage API
- (Optional) Notification API, File API, Drag & Drop API

---

## 📂 Folder Structure

📁 todo-app/
├── index.html
├── style.css
├── script.js
└── README.md



---

## ⚙️ How It Works

- All tasks are stored using:
  ```js
  localStorage.setItem("tasks", JSON.stringify(tasksArray));



On page load, tasks are restored from:

js
Copy
Edit
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
Every action (add/edit/delete/complete) updates localStorage in real-time.



💡 Future Improvements (Ideas)
Real-time syncing with backend (Firebase/Supabase)

Multi-user login

Cross-device sync

Voice input for tasks

✨ Author
Made with ❤️ by bavesh

yaml
Copy
Edit

---

Let me know:
- Your name or GitHub username to fill in
- If you'd like a downloadable `.md` file or deployed GitHub Pages version
- Or if you'd like me to generate the codebase too!
