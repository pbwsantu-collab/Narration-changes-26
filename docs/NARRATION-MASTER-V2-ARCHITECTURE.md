# Narration Master V2 — Project Architecture Report

## 1) Architecture summary

### Current app architecture

The project is a static single-page web app hosted on GitHub Pages. The repository currently contains a minimal README and a single HTML file, `index.html`, which embeds all CSS and JavaScript logic into the page.

Key observations:

- No framework or build tool is used.
- The app follows a simple view-based SPA model, where different sections are toggled with CSS classes and `data-view` attributes.
- Grammar lessons and practice questions are stored as JavaScript arrays (`RULES`, `BANK`) inside the page.
- The UI supports English and Bengali toggles and a dark/light theme via `localStorage`.
- The app has a basic course-map, rules viewer, question bank, and exam mode.

### Strengths

- Educational content is substantial and stored in structured data.
- The app already covers most major narration categories.
- The question bank is large and textbook-derived.
- Bilingual UI support is already implemented.
- Responsive behavior is partly present for mobile screens.

### Technical constraints

- Everything is in a single file, which makes the project hard to maintain and extend.
- There is no PWA manifest or service worker.
- No offline caching strategy is implemented.
- There is no real progress engine beyond `localStorage` theme/language preferences.
- There is no modular separation between UI, content, and logic.

## 2) Existing feature inventory

### Already implemented

- Home dashboard with hero section and course map
- Sidebar navigation and search box
- Rules and concepts section with grammar explanations
- English + Bengali labels and localized strings
- Flashcard-style question bank
- Exam mode with timer and score summary
- Theme toggle
- Language toggle
- Responsive layout for mobile screens
- Search/filter logic in the question bank

### Content coverage already present

- Fundamentals of narration
- Assertive sentences
- Interrogative sentences
- Question tags
- Imperative sentences and “Let” construction
- Modal verbs
- Optative and exclamatory sentences
- Time and place changes
- Dialogue and summary reporting

## 3) Content inventory

The repository has a rich grammar question bank and teaching material embedded in `index.html`.

### Grammar lesson content

The `RULES` array includes nine main sections:

1. Fundamentals of Narration
2. Assertive Sentences
3. Interrogative Sentences
4. Question Tags
5. Imperative Sentences and “Let”
6. Modal Verbs
7. Optative and Exclamatory Sentences
8. Time and Place Words
9. Dialogues and Summaries

These sections include:

- English explanations
- Bengali explanations
- examples
- tables for tense changes
- rule-based discussion of pronoun, reporting verb, and structure changes

### Question bank content

The `BANK` data includes exercises from the textbook, covering:

- assertive transformations
- direct-to-indirect and indirect-to-direct conversions
- yes/no questions
- wh-questions
- question tags
- imperative constructions
- modal verb transformations
- optative and exclamatory forms
- time/place transformations
- mixed dialogue and summary exercises

The bank is large and contains educational material that should be preserved as-is unless specifically reviewed by a teacher or grammar expert.

## 4) Problems and risks

### UI and experience problems

- The design is usable but not yet aligned with a professional educational PWA experience.
- Dashboard content is still minimal compared to the product brief.
- Navigation is practical but not strongly app-like or modern.
- There are no dedicated settings, progress, or revision views.

### Technical problems

- No modular structure for styles, data, and scripts.
- No PWA manifest.
- No offline cached content.
- No service worker for update/version handling.
- No install prompt or installability flow.
- No local-first progress database (IndexedDB as recommended).

### Content and grammar risks

- Narration transformation can be context-sensitive, and many textbook examples require careful judgment.
- Some grammar cases such as question tags, optatives, and mixed dialogues should not be “automatically normalized” without review.
- Because the app largely centralizes grammar in a single large script, there is risk of accidental content changes during refactoring.

### Maintainability risk

- One-file architecture will make future enhancements difficult and brittle.
- Large data arrays embedded in HTML/JS are harder to validate, search, and extend.

## 5) Proposed implementation plan

### Phase 1 — Stabilize and document

Goal: preserve the working content and create a clean design and implementation baseline.

Actions:

- preserve all grammar content and question bank without deleting or changing answers silently
- add architecture and content documentation to the repo
- identify validation steps for grammar correctness
- establish naming conventions for future modularization

### Phase 2 — Modularize without rewriting content

Goal: separate logic and content into maintainable files while keeping the existing app functioning.

Actions:

- split CSS into a dedicated stylesheet
- split JS into logical modules:
  - app shell
  - navigation
  - language/theme state
  - rule rendering
  - question bank rendering
  - exam flow
- keep the same educational data structure and behavior in place initially

### Phase 3 — Improve UX and design system

Goal: align the app with a mobile-first educational app feel.

Actions:

- create semantic design tokens and consistent UI components
- improve home dashboard structure
- add dedicated settings and progress UI placeholders
- improve accessibility focus states and contrast

### Phase 4 — Add PWA and offline capabilities

Goal: make the project a real mobile-friendly educational PWA.

Actions:

- add a web app manifest
- add a service worker with cache versioning
- implement offline fallback
- ensure GitHub Pages paths and base URL handling work correctly

### Phase 5 — Add progress, revision, and learning flows

Goal: support real student learning beyond static grammar content.

Actions:

- add local-first progress storage
- add bookmarks and revision queue
- add daily goals
- add “continue learning” support

### Phase 6 — QA and grammar review

Goal: test the app thoroughly before claiming completion.

Actions:

- review grammar accuracy in all rule explanations and examples
- test mobile and desktop views
- test theme/lang toggles
- validate question bank and answer flows
- verify offline behavior
- review accessibility and keyboard flow

## 6) Files likely to change

Current repo files:

- `README.md`
- `index.html`

Planned future files:

- `styles.css`
- `app.js`
- `data/rules.js`
- `data/question-bank.js`
- `manifest.webmanifest`
- `service-worker.js`
- optional future assets for icons and print styles

## 7) Decision

The project should not be rewritten from scratch. Instead, it should be evolved gradually while preserving the core educational material, question bank, and grammar explanations already in the app.

The first safe step is documentation and modularization, followed by PWA and UX improvements.

## 8) Approval status

This report is prepared as the required pre-change architecture and planning document before large-scale implementation begins.

---

Prepared for: Narration Master V2
Repository: `pbwsantu-collab/Narration-changes-26`

