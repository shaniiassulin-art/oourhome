# Design

Direction: the category standard, played straight (chosen by Shani in the Impeccable direction round). Operate surface: the list is the interface; colour only does jobs.

## Type
- One family: Heebo (400–800), fallback Assistant / system.
- Fixed scale: 12.5 · 13.5 · 16 · 17.5 · 20 · 24 px (`--fs-xs … --fs-2xl`). Headings 700, -0.01em. Tabular numerals on dates, counts and meta.

## Colour (light / dark tokens live in `:root`)
- Ground `--bg`, surface `--surface`, quiet fill `--sunk`, hairline `--line`, text `--ink`, secondary `--muted` (≥4.5:1).
- Accent green `--accent` only for primary actions, selection and the current page; `--accent-soft` for selected fills.
- Category colours `--c0…--c14` appear as text and checkbox rings, never as tinted blocks.
- State: `--late` overdue, `--soon` due soon, `--ok` done.

## Components
- Rows: hairline-separated list, round checkbox (2px ring in the category colour), name 16/500, meta 13.5 muted.
- Buttons: 1px hairline, radius 10–12; primary filled accent. States: hover (fill `--sunk`), active (opacity .75), disabled (.45), focus (2px accent ring, 2px offset).
- Icon buttons 34px in the page head; tags are small pills in `--wk` / `--wk-bg`.
- Bottom sheets for editing; toast bottom-centre.

## Motion
150 ms colour/opacity transitions for state; no decorative motion; reduced-motion respected.
