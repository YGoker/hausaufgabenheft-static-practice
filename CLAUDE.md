# Hausaufgabenheft — Static Practice Project (Part 5)

A demo-only German primary-school homework tracker ("Hausaufgabenheft") for
families and teachers. This is a learning/practice project, not a product.

## Product Scenario

A teacher shares a link to a static web app. The app has two demo views,
switchable on the same device via a role switch (no login):

- **Teacher view**: can add, edit, and delete homework entries. Each entry
  has a subject, book/page reference, due date, and completion status.
- **Parent view**: shown against a clearly fictional parent ID and a
  fictional pupil name. Sees the same homework list (read-mostly) and can
  write a free-text note to the teacher (e.g. a pickup arrangement).

### "Send to teacher" note flow
- The parent can type a note and click "Send to teacher."
- The interface must clearly state the note is saved only in this browser
  (localStorage) and is **not actually delivered** to any teacher.
- This is a UI demo of the interaction, not a real messaging feature.

### Displayed IDs
- The "parent ID" and any pupil identifiers shown are demo labels only —
  not a real login, account, or security mechanism. No real children's
  names or other sensitive/identifying information may be used anywhere
  in the app or sample data.

## Localization

- Interface labels (buttons, headings, status text, empty states, etc.)
  are provided in **German, Turkish, and English**.
- Fictional sample homework entries are **manually translated** into all
  three languages ahead of time.
- The app does **not** translate arbitrary user-written text (e.g. the
  parent's note to the teacher) automatically. There is no translation
  API or auto-translate feature. User-entered text is stored and shown
  as-is, in whatever language it was typed.

## Technical Constraints

- Plain static site: `index.html`, `style.css`, `app.js`. No build step.
- No frameworks (no React, Next.js, etc.), no backend, no database, no
  authentication, no external translation API.
- Persistence via browser `localStorage` only — data lives in one
  browser/device and is not shared or synced anywhere.
- Hosting target: GitHub Pages (static hosting only).
- Responsive layout (usable on mobile and desktop).

## Scope for First Build

Keep the first build small. In scope:
- Add / complete / delete homework entries
- Empty state (no homework yet)
- Persistence across reloads via localStorage
- Responsive layout
- One parent note flow ("Send to teacher" demo, saved locally only)
- Role switch between teacher view and parent view
- EN/DE/TR label support for the UI and sample homework data

Explicitly **out of scope** for the first build (possible later
improvements, not to be built now):
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

This app is a **single-browser demo**. Because there is no backend, the
teacher and parent views on one device share the same localStorage — they
are not two real, separate users communicating over a network. Real
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
  before the next: theme toggle, filters + search, stats, JSON
  export/import, keyboard shortcuts. Keep the existing localStorage keys
  (`hausaufgabenheft-tasks`, `hausaufgabenheft-theme`) and task format
  `{ id, text, done }` compatible.
- Commit, push, or deploy only when the user asks. Never force-push.
