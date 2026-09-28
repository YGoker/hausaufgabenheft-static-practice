# Hausaufgabenheft — Static Practice Project (Part 5)

A demo-only German primary-school homework tracker ("Hausaufgabenheft") for
families and teachers. This is a learning/practice project, not a product.

## Current Implementation

What `index.html`, `app.js`, and `style.css` actually do today:

- A static, **English-language**, single-browser demo. There is one view
  (no teacher/parent role switch).
- A **fictional parent profile card** ("Viewing as"): demo parent
  "Kim Mustermann", fictional child "Lina Mustermann · Class 2b", and demo
  parent ID `DEMO-P-0001`, with a note that these are display-only sample
  names, not an account, login, or access control.
- A homework list where tasks can be **added, completed, and deleted**
  (no editing). Each task is a single free-text line; subject, page, etc.
  are just part of that text.
- Three fictional English sample tasks, loaded only when nothing is saved
  yet.
- An empty state ("No homework yet") and a no-results message for search
  and filters.
- **Persistence** in `localStorage`: tasks under `hausaufgabenheft-tasks`
  as an array of `{ id, text, done }`.
- **Theme toggle** (light/dark), saved under `hausaufgabenheft-theme`; falls
  back to the system preference and is applied before first paint by an
  inline script in `index.html`.
- **Search and filters** (All / Active / Completed). This is view state
  only and is not saved.
- **Task statistics** (Total / Completed / Remaining), always counted from
  the full task list, independent of search and filters.
- **Responsive layout**; the stats stack as rows below 400px.
- No custom keyboard shortcuts; only native browser behaviour (e.g. Enter
  submits the add form).

## Not Implemented (Future Ideas)

None of the following exists in the code yet. They describe the intended
direction; build them only when the user asks, one at a time.

- **Role switch** between a teacher view and a parent view on the same
  device (no login). The teacher would add, edit, and delete entries; the
  parent would see the same list (read-mostly).
- **Separate homework fields**: subject, book/page reference, and due date
  instead of one free-text line (would need a compatible extension of
  `{ id, text, done }`).
- **Parent note ("Send to teacher") flow**: the parent types a free-text
  note (e.g. a pickup arrangement). The interface must clearly state the
  note is saved only in this browser (localStorage) and is **not actually
  delivered** to any teacher. It is a UI demo, not real messaging.
- **Multilingual UI**: interface labels in **German, Turkish, and English**,
  with fictional sample homework **manually translated** into all three.
  User-written text (tasks, notes) is never auto-translated; there is no
  translation API. It is stored and shown as typed.
- **JSON export/import** of tasks.
- **Keyboard shortcuts** beyond native browser behaviour.

## Demo Data & Privacy

- The parent ID and any pupil names shown are demo labels only — not a real
  login, account, or security mechanism. No real children's names or other
  sensitive/identifying information may be used anywhere in the app or
  sample data.

## Technical Constraints

- Plain static site: `index.html`, `style.css`, `app.js`. No build step.
- No frameworks (no React, Next.js, etc.), no backend, no database, no
  authentication, no external translation API.
- Persistence via browser `localStorage` only — data lives in one
  browser/device and is not shared or synced anywhere.
- Hosting target: GitHub Pages (static hosting only).
- Responsive layout (usable on mobile and desktop).

## Out of Scope

Not planned for this static practice project:
- Multiple pupils/classes, multiple parents, or multi-teacher support
- Real notifications, reminders, or due-date alerts
- Editable/configurable languages or user-added translations
- Any real cross-device or cross-user communication
- Any authentication, accounts, or real identity handling
- Automatic translation of free-text user input

## Running Locally

No build step is required. Any of the following works:
- Open `index.html` directly in a browser, or
- Serve the folder locally, e.g. `python3 -m http.server 8000` and visit
  `http://localhost:8000`.

## Important Limitation

This app is a **single-browser demo**. Because there is no backend, all
data lives in one browser's localStorage. Even if teacher and parent views
are added later, on one device they would share that storage — they would
not be two real, separate users communicating over a network. Real
cross-device teacher–parent communication (e.g. a parent's note actually
reaching a teacher on a different device) would require a backend and
database, and is planned as a **later, separate project**, not part of
this static practice build.

## Repository & Workflow

- Git repository for this project only; GitHub Pages serves the root of the
  `main` branch. Asset paths in `index.html` must stay relative
  (`style.css`, `app.js`).
- Never commit secrets, `.env` files, or real personal data about any child
  or family. Demo names (e.g. "Kim/Lina Mustermann", `DEMO-P-0001`) must stay
  obviously fictional. See `.gitignore`.
- Part 5 stretch features are added one at a time, each tested by the user
  before the next. Done: theme toggle, filters + search, stats. Remaining:
  JSON export/import, keyboard shortcuts. Keep the existing localStorage
  keys (`hausaufgabenheft-tasks`, `hausaufgabenheft-theme`) and task format
  `{ id, text, done }` compatible.
- Commit, push, or deploy only when the user asks. Never force-push.
