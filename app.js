// Advanced To-Do List App
// Modular JavaScript with comments for each function

// ========== Data & State ==========
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filterStatus = 'all';
let filterPriority = 'all';
let filterCategory = 'all';
let searchKeyword = '';
let darkMode = false;
let reminderTimeouts = [];

// ========== DOM Elements ==========
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');
const taskDueDate = document.getElementById('task-due-date');
const taskPriority = document.getElementById('task-priority');
const taskTags = document.getElementById('task-tags');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const filterStatusEl = document.getElementById('filter-status');
const filterPriorityEl = document.getElementById('filter-priority');
const filterCategoryEl = document.getElementById('filter-category');
const searchInput = document.getElementById('search-input');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const themeToggle = document.getElementById('theme-toggle');
const editModal = document.getElementById('edit-modal');
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const importInput = document.getElementById('import-input');

// ========== Utility Functions ==========
// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Generate unique ID for tasks
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
// Get all unique categories from tasks
function getCategories() {
  const cats = new Set();
  tasks.forEach(t => (t.tags || []).forEach(tag => cats.add(tag)));
  return Array.from(cats);
}
// ========== CRUD Operations ==========
// Add a new task
function addTask(task) {
  tasks.push(task);
  saveTasks();
  renderTasks();
  scheduleReminders();
}
// Edit an existing task
function editTask(id, updatedTask) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    tasks[idx] = { ...tasks[idx], ...updatedTask };
    saveTasks();
    renderTasks();
    scheduleReminders();
  }
}
// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
  scheduleReminders();
}
// Toggle task completion
function toggleTaskComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}
// ========== Filtering, Searching, Sorting ==========
// Filter and search tasks
function getFilteredTasks() {
  return tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || (filterStatus === 'completed' ? task.completed : !task.completed);
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    const categoryMatch = filterCategory === 'all' || (task.tags && task.tags.includes(filterCategory));
    const searchMatch = !searchKeyword || task.title.toLowerCase().includes(searchKeyword) || (task.description && task.description.toLowerCase().includes(searchKeyword));
    return statusMatch && priorityMatch && categoryMatch && searchMatch;
  });
}
// ========== UI Rendering ==========
// Render all tasks
function renderTasks() {
  // Clear list
  taskList.innerHTML = '';
  const filtered = getFilteredTasks();
  if (filtered.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
    filtered.forEach(task => {
      const li = createTaskElement(task);
      taskList.appendChild(li);
    });
  }
  updateProgressBar();
  renderCategories();
}
// Create a task DOM element
function createTaskElement(task) {
  // TODO: Implement task item creation with all features (edit, delete, complete, priority, tags, due date, drag handle, etc.)
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' completed' : '');
  li.setAttribute('draggable', 'true');
  li.dataset.id = task.id;
  li.innerHTML = `
    <div>
      <strong>${task.title}</strong>
      <div class="task-meta">
        <span class="task-priority ${task.priority}">${task.priority}</span>
        ${task.dueDate ? `<span class="task-due">Due: ${task.dueDate}</span>` : ''}
        ${(task.tags || []).map(tag => `<span class="task-tags">${tag}</span>`).join('')}
      </div>
      <div>${task.description || ''}</div>
      <div class="task-remaining" data-due="${task.dueDate || ''}"></div>
    </div>
    <div class="task-actions">
      <button class="complete-btn" title="Mark as complete/incomplete">✔️</button>
      <button class="edit-btn" title="Edit">✏️</button>
      <button class="delete-btn" title="Delete">🗑️</button>
      <span class="drag-handle" title="Drag to reorder">⠿</span>
    </div>
  `;
  // Event listeners for actions
  li.querySelector('.complete-btn').onclick = () => toggleTaskComplete(task.id);
  li.querySelector('.edit-btn').onclick = () => openEditModal(task);
  li.querySelector('.delete-btn').onclick = () => deleteTask(task.id);
  // Drag and drop events will be added later
  return li;
}
// Render categories in filter dropdown
function renderCategories() {
  const cats = getCategories();
  filterCategoryEl.innerHTML = '<option value="all">All Categories</option>' + cats.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}
// Update progress bar
function updateProgressBar() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  progressText.textContent = `${completed} of ${total} tasks completed`;
  progressBar.style.width = total ? `${(completed / total) * 100}%` : '0%';
}
// ========== Task Form Handling ==========
// Handle add task form submit
if (taskForm) {
  taskForm.onsubmit = function(e) {
    e.preventDefault();
    const title = taskTitle.value.trim();
    if (!title) return;
    const newTask = {
      id: generateId(),
      title,
      description: taskDesc.value.trim(),
      dueDate: taskDueDate.value,
      priority: taskPriority.value,
      tags: taskTags.value.split(',').map(t => t.trim()).filter(Boolean),
      completed: false,
      createdAt: new Date().toISOString()
    };
    addTask(newTask);
    taskForm.reset();
  };
}
// ========== Edit Modal Handling ==========
// Open edit modal
function openEditModal(task) {
  // TODO: Implement modal form for editing
}
// ========== Filtering & Searching ==========
filterStatusEl.onchange = function() {
  filterStatus = this.value;
  renderTasks();
};
filterPriorityEl.onchange = function() {
  filterPriority = this.value;
  renderTasks();
};
filterCategoryEl.onchange = function() {
  filterCategory = this.value;
  renderTasks();
};
searchInput.oninput = function() {
  searchKeyword = this.value.trim().toLowerCase();
  renderTasks();
};
// ========== Dark/Light Mode ==========
themeToggle.onclick = function() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);
  themeToggle.textContent = darkMode ? '☀️' : '🌙';
  localStorage.setItem('darkMode', darkMode ? '1' : '0');
};
// Load dark mode preference
if (localStorage.getItem('darkMode') === '1') {
  darkMode = true;
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}
// ========== Export/Import ==========
exportBtn.onclick = function() {
  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tasks.json';
  a.click();
  URL.revokeObjectURL(url);
};
importBtn.onclick = function() {
  importInput.click();
};
importInput.onchange = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const imported = JSON.parse(evt.target.result);
      if (Array.isArray(imported)) {
        tasks = imported;
        saveTasks();
        renderTasks();
        scheduleReminders();
      }
    } catch (err) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
};
// ========== Drag and Drop (Bonus) ==========
// TODO: Implement drag and drop to reorder tasks
// ========== Remaining Time (Bonus) ==========
// TODO: Show remaining time till due date for each task
// ========== Notification & Reminders ==========
// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

// Show a notification for a task
function showNotification(task) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Task Due: ' + task.title, {
      body: (task.description ? task.description + '\n' : '') + (task.dueDate ? 'Due: ' + task.dueDate : ''),
      icon: '', // Optionally add an icon
    });
  }
}

// Clear all scheduled reminders
function clearReminders() {
  reminderTimeouts.forEach(timeout => clearTimeout(timeout));
  reminderTimeouts = [];
}

// Schedule reminders for all due tasks
function scheduleReminders() {
  clearReminders();
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const now = Date.now();
  tasks.forEach(task => {
    if (task.dueDate && !task.completed) {
      const dueTime = new Date(task.dueDate).getTime();
      const delay = dueTime - now;
      if (delay > 0 && delay < 2147483647) { // setTimeout max delay
        const timeout = setTimeout(() => showNotification(task), delay);
        reminderTimeouts.push(timeout);
      }
    }
  });
}
// ========== Initialize ==========
renderTasks();
scheduleReminders();
