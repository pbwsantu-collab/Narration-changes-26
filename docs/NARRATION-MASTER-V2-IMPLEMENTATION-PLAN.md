# Narration Master V2 — Implementation Plan

## Goal

Improve the existing static narration app into a professional mobile-first educational PWA without deleting or silently altering the current grammar content.

## Implementation sequence

### Phase 1: Documentation and stabilization

- preserve the current content and question bank
- document architecture and content inventory
- confirm the grammar source remains intact
- decide naming conventions for the refactor

### Phase 2: Modular architecture

- separate styles from the HTML
- separate app logic from the page markup
- move rule data and question data to dedicated JS files
- keep the current UI behavior while making the code easier to maintain

### Phase 3: UX and design refresh

- implement a consistent semantic design system
- add stronger mobile-first navigation
- improve dashboard and settings readiness
- maintain the existing bilingual structure

### Phase 4: PWA and offline support

- create a manifest file
- add a service worker for offline caching
- version caches and support update handling
- validate on GitHub Pages

### Phase 5: Student learning workflow

- add progress tracking through local-first storage
- add bookmarks, revision queue, and goal tracking
- create logic for “continue learning” and recommendations

### Phase 6: QA and grammar validation

- review grammar explanations and examples for correctness
- test all flows on mobile and desktop
- verify offline behavior, theming, and accessibility
- review the question bank for duplicates and unclear answers

## Rules for implementation

- Do not delete existing educational content.
- Do not silently change grammar answers.
- Do not rewrite the entire project framework unnecessarily.
- Keep the app static-host friendly for GitHub Pages in the short term.
- Use small, testable changes rather than a single large rewrite.

## Success criteria

- content remains preserved and educationally useful
- app remains mobile-first and responsive
- offline and installability support works
- code becomes easier to maintain and further extend
- grammar examples remain reviewable and teacher-safe

