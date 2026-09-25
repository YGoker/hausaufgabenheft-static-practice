const STORAGE_KEY = "hausaufgabenheft-tasks";

const FICTIONAL_SAMPLE_TASKS = [
  { id: "sample-1", text: "Math: page 12, exercises 1-3", done: false },
  { id: "sample-2", text: "Read chapter 4 of the reading book", done: false },
  { id: "sample-3", text: "Spelling words: practice list B", done: true },
];

const THEME_KEY = "hausaufgabenheft-theme";

const form = document.getElementById("add-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const themeToggle = document.getElementById("theme-toggle");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("no-results");

let tasks = loadTasks();
// View state only; not saved, so the stored task format is unchanged.
let currentFilter = "all";
let searchQuery = "";

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (err) {
    // Storage unavailable (e.g. private mode): theme still switches for this visit.
  }
}

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return FICTIONAL_SAMPLE_TASKS.slice();
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(text) {
  const trimmed = text.trim();
  if (trimmed === "") {
    return;
  }
  tasks.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    text: trimmed,
    done: false,
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter));
  });
  render();
}

function visibleTasks() {
  const query = searchQuery.trim().toLowerCase();
  return tasks.filter((task) => {
    if (currentFilter === "active" && task.done) return false;
    if (currentFilter === "completed" && !task.done) return false;
    return query === "" || String(task.text).toLowerCase().includes(query);
  });
}

function render() {
  list.innerHTML = "";

  const shown = visibleTasks();
  emptyState.classList.toggle("hidden", tasks.length !== 0);
  noResults.classList.toggle("hidden", tasks.length === 0 || shown.length !== 0);

  for (const task of shown) {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark task complete");
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(input.value);
  input.value = "";
  input.focus();
});

themeToggle.addEventListener("click", toggleTheme);

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value;
  render();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

applyTheme(currentTheme());
render();
