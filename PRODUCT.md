# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Shani and her household, a Hebrew-speaking home in Israel. Used mostly on a phone, quick glances during the day and a weekly planning moment (the week runs Friday → Thursday). Inferred from the working conversation that built the app.

## Product Purpose
"הבית שלנו" keeps the home running: recurring household chores with a frequency and a "last done" date, and the family shopping list. Success is opening it, seeing at once what is due this week and what to buy, ticking things off in one tap, and closing it.

## Positioning
A private two-area home app (משימות הבית / קניות) that replaced a Glide app: chores are scheduled by frequency and pulled into a weekly list; shopping is grouped by main categories (דחוף / בית / שני) and categories, with an after-the-10th-of-the-month list and tags.

## Operating Context
- Weekly ritual: on Friday the "done" week closes; tasks are picked into "משימות לשבוע"; fixed ("קבועות") tasks appear every week.
- Shopping is used in-store, one hand, ticking items; urgent items and things to buy after the 10th have their own pages.
- Same data synced on every device through Netlify.

## Capabilities and Constraints
- Single-file HTML/CSS/JS app, RTL Hebrew, light and dark themes, PWA-like on the home screen, zoom disabled.
- Tasks: categories (with colours), frequency, room, tags, done today / done last Friday, weekly list, history, filters/sorts saved as pages, multi-select, long press.
- Shopping: main categories and categories (editable, collapsible), inline add with category + tag, inline edit, drag to reorder/move, archive, tags, filter pages.

## Brand Commitments
- Name: הבית שלנו. Hebrew only.
- The user prefers little text and few elements ("סדר בעיניים"), clear larger type, category colour shown as text rather than tinted blocks, and rejected two earlier redesigns (an iOS-like grey grouped look, and a blue/green "family app" palette).

## Evidence on Hand
Real household data (≈36 tasks, ≈50 shopping items) lives on the server; no imagery or illustrations exist.

## Product Principles
- One tap to record what was done.
- Calm and orderly: the list is the interface, chrome stays quiet.
- Hebrew first, phone first.
